import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { getCampaignById } from '../queries/getCampaignById';

export const endCampaign = async (id) => {
  try {
    const { error } = await withRetry(() =>
      supabase.rpc('end_campaign', { campaign_uuid: id })
    );

    if (error) throw error;

    return getCampaignById(id);
  } catch (error) {
    throw handleSupabaseError(error);
  }
};