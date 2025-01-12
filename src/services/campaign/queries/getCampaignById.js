import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const getCampaignById = async (id) => {
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
    throw handleSupabaseError(error);
  }
};