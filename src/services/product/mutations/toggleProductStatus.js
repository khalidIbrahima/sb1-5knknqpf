import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { validateProductForCampaign } from '../../../utils/validation';

export const toggleProductStatus = async (productId, campaignId, isActive) => {
  try {
    // First get the product to validate
    const { data: product, error: productError } = await withRetry(async () =>
      supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
    );

    if (productError) throw productError;

    // Validate product if we're activating it
    if (isActive) {
      validateProductForCampaign(product);
    }

    // Check if product is already in campaign
    const { data: existing } = await withRetry(async () =>
      supabase
        .from('campaign_products')
        .select('id')
        .eq('product_id', productId)
        .eq('campaign_id', campaignId)
        .maybeSingle()
    );

    let result;
    if (existing) {
      const { data, error } = await withRetry(async () =>
        supabase
          .from('campaign_products')
          .update({ is_active: isActive })
          .eq('id', existing.id)
          .select()
          .single()
      );

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await withRetry(async () =>
        supabase
          .from('campaign_products')
          .insert({
            product_id: productId,
            campaign_id: campaignId,
            is_active: isActive
          })
          .select()
          .single()
      );

      if (error) throw error;
      result = data;
    }

    return result;
  } catch (error) {
    const message = error.message || 'Une erreur est survenue';
    throw new Error(message);
  }
};