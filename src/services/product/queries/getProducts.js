import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const getProducts = async () => {
  try {
    const { data, error } = await withRetry(async () => 
      supabase
        .from('products')
        .select(`
          *,
          campaign_products (
            campaign_id,
            is_active
          )
        `)
        .order('created_at', { ascending: false })
    );

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};