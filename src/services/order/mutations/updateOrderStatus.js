import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';
import { ORDER_STATUSES } from '../../../constants/orderStatus';

export const updateOrderStatus = async (orderId, status) => {
  try {
    if (!Object.values(ORDER_STATUSES).includes(status)) {
      throw new Error('Invalid order status');
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: order, error: orderError } = await withRetry(() =>
      supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single()
    );

    if (orderError) throw orderError;

    const { error: historyError } = await withRetry(() =>
      supabase
        .from('order_history')
        .insert({
          order_id: orderId,
          status,
          created_by: user.id
        })
    );

    if (historyError) throw historyError;

    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw handleSupabaseError(error);
  }
};