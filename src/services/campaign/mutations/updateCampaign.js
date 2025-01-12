import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { getCampaignById } from '../queries/getCampaignById';

export const updateCampaign = async (id, updates) => {
  try {
    const { products, ...campaignData } = updates;

    // Update campaign data
    const { error: campaignError } = await withRetry(() =>
      supabase
        .from('campaigns')
        .update(campaignData)
        .eq('id', id)
    );

    if (campaignError) throw campaignError;

    // Handle products update if provided
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

    return getCampaignById(id);
  } catch (error) {
    throw handleSupabaseError(error);
  }
};