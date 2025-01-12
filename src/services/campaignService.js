import { supabase, handleSupabaseError, withRetry } from '../lib/supabase';

export const campaignService = {
  async getCampaigns() {
    try {
      const { data, error } = await withRetry(() => 
        supabase
          .from('campaigns')
          .select(`
            *,
            products:campaign_products(
              product:product_id(*)
            )
          `)
          .order('start_date', { ascending: false })
      );

      if (error) throw error;

      // Transform the data to flatten the products array
      return data.map(campaign => ({
        ...campaign,
        products: campaign.products?.map(p => p.product) || []
      }));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw handleSupabaseError(error);
    }
  },

  async getCampaignById(id) {
    try {
      const { data, error } = await withRetry(() =>
        supabase
          .from('campaigns')
          .select(`
            *,
            products:campaign_products(
              product:product_id(*)
            )
          `)
          .eq('id', id)
          .single()
      );

      if (error) throw error;

      return {
        ...data,
        products: data.products?.map(p => p.product) || []
      };
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw handleSupabaseError(error);
    }
  },

  async createCampaign(campaign) {
    try {
      const { products, ...campaignData } = campaign;
      
      const { data: newCampaign, error: campaignError } = await withRetry(() =>
        supabase
          .from('campaigns')
          .insert([{
            ...campaignData,
            created_by: (await supabase.auth.getUser()).data.user?.id
          }])
          .select()
          .single()
      );

      if (campaignError) throw campaignError;

      if (products?.length > 0) {
        const campaignProducts = products.map(productId => ({
          campaign_id: newCampaign.id,
          product_id: productId,
          is_active: true
        }));

        const { error: productsError } = await withRetry(() =>
          supabase
            .from('campaign_products')
            .insert(campaignProducts)
        );

        if (productsError) throw productsError;
      }

      return this.getCampaignById(newCampaign.id);
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw handleSupabaseError(error);
    }
  },

  async updateCampaign(id, updates) {
    try {
      const { products, ...campaignData } = updates;

      const { error: campaignError } = await withRetry(() =>
        supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', id)
      );

      if (campaignError) throw campaignError;

      if (products !== undefined) {
        // First delete existing products
        const { error: deleteError } = await withRetry(() =>
          supabase
            .from('campaign_products')
            .delete()
            .eq('campaign_id', id)
        );

        if (deleteError) throw deleteError;

        // Then insert new products if any
        if (products.length > 0) {
          const campaignProducts = products.map(productId => ({
            campaign_id: id,
            product_id: productId,
            is_active: true
          }));

          const { error: productsError } = await withRetry(() =>
            supabase
              .from('campaign_products')
              .insert(campaignProducts)
          );

          if (productsError) throw productsError;
        }
      }

      return this.getCampaignById(id);
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw handleSupabaseError(error);
    }
  },

  async endCampaign(id) {
    try {
      const { error } = await withRetry(() =>
        supabase.rpc('end_campaign', { campaign_uuid: id })
      );

      if (error) throw error;

      return this.getCampaignById(id);
    } catch (error) {
      console.error('Error ending campaign:', error);
      throw handleSupabaseError(error);
    }
  }
};