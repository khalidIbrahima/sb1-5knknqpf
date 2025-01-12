import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { getCampaignById } from '../queries/getCampaignById';

export const createCampaign = async (campaign) => {
  try {
    const { products, ...campaignData } = campaign;
    
    // Get user ID first
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: newCampaign, error: campaignError } = await withRetry(() =>
      supabase
        .from('campaigns')
        .insert([{
          ...campaignData,
          created_by: user.id
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

    return getCampaignById(newCampaign.id);
  } catch (error) {
    throw handleSupabaseError(error);
  }
};