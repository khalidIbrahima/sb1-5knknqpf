import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { transformCampaignData } from '../utils/transformers';

export const getCampaigns = async () => {
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

    return data.map(transformCampaignData);
  } catch (error) {
    throw handleSupabaseError(error);
  }
};