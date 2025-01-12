import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useWishlistStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          created_at,
          product:product_id (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ items: data, loading: false });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      set({ error: error.message, loading: false });
    }
  },

  addToWishlist: async (productId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('wishlist')
        .insert([{ user_id: user.id, product_id: productId }])
        .select(`
          id,
          product_id,
          created_at,
          product:product_id (*)
        `)
        .single();

      if (error) throw error;

      set(state => ({
        items: [data, ...state.items]
      }));
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      set(state => ({
        items: state.items.filter(item => item.product_id !== productId)
      }));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }
}));