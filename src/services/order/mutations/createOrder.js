import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const createOrder = async (orderData) => {
  try {
    const { items, shipping_info, payment_method, total, campaign_id } = orderData;
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Create order
    const { data: order, error: orderError } = await withRetry(() =>
      supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          shipping_info,
          payment_method,
          total_amount: total,
          campaign_id,
          status: 'en_attente',
          is_paid: false
        }])
        .select()
        .single()
    );

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
      shipping_method: item.shippingMethod
    }));

    const { error: itemsError } = await withRetry(() =>
      supabase
        .from('order_items')
        .insert(orderItems)
    );

    if (itemsError) throw itemsError;

    // Create initial history entry
    const { error: historyError } = await withRetry(() =>
      supabase
        .from('order_history')
        .insert({
          order_id: order.id,
          status: 'en_attente',
          created_by: user.id
        })
    );

    if (historyError) throw historyError;

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw handleSupabaseError(error);
  }
};