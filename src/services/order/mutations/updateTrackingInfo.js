import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const updateTrackingInfo = async (orderId, trackingUrl) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: order, error } = await withRetry(() =>
      supabase
        .from('orders')
        .update({ 
          tracking_url: trackingUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single()
    );

    if (error) throw error;
    return order;
  } catch (error) {
    console.error('Error updating tracking info:', error);
    throw handleSupabaseError(error);
  }
};