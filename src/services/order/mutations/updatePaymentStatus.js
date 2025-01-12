import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const updatePaymentStatus = async (orderId, isPaid) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: order, error } = await withRetry(() =>
      supabase
        .from('orders')
        .update({ 
          is_paid: isPaid,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single()
    );

    if (error) throw error;
    return order;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw handleSupabaseError(error);
  }
};