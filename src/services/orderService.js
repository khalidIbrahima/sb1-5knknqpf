import { supabase, handleSupabaseError, withRetry } from '../lib/supabase';
import { ORDER_STATUSES } from '../constants/orderStatus';

export const orderService = {
  // ... existing methods ...

  async updateOrderStatus(orderId, status) {
    try {
      // Validate status
      if (!Object.values(ORDER_STATUSES).includes(status)) {
        throw new Error('Invalid order status');
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update order status with retry mechanism
      const { data: order, error: orderError } = await withRetry(() =>
        supabase
          .from('orders')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', orderId)
          .select(`
            *,
            items:order_items(
              id,
              quantity,
              price,
              size,
              color,
              product:product_id(
                name,
                images
              )
            ),
            campaign:campaign_id(*),
            history:order_history(*)
          `)
          .single()
      );

      if (orderError) throw orderError;

      // Add status history entry
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
  }
};