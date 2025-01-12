import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const getOrders = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('No authenticated user');
      return [];
    }

    // First check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    // Build query based on user role
    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          id,
          quantity,
          price,
          size,
          color,
          shipping_method,
          product:product_id (
            name,
            images
          )
        ),
        campaign:campaign_id (
          id,
          name
        ),
        history:order_history (
          id,
          status,
          notes,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    // If not admin, only fetch user's orders
    if (!userData?.is_admin) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await withRetry(() => query);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return empty array instead of throwing
  }
};