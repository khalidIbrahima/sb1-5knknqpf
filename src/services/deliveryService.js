import { supabase, handleSupabaseError, withRetry } from '../lib/supabase';

export const deliveryService = {
  async getAddresses() {
    try {
      const { data, error } = await withRetry(() =>
        supabase
          .from('delivery_addresses')
          .select('*')
          .order('is_default', { ascending: false })
          .order('created_at', { ascending: false })
      );

      if (error) throw error;
      return data;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async addAddress(addressData) {
    try {
      const { data, error } = await withRetry(() =>
        supabase
          .from('delivery_addresses')
          .insert([addressData])
          .select()
          .single()
      );

      if (error) throw error;
      return data;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async updateAddress(id, addressData) {
    try {
      const { data, error } = await withRetry(() =>
        supabase
          .from('delivery_addresses')
          .update(addressData)
          .eq('id', id)
          .select()
          .single()
      );

      if (error) throw error;
      return data;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  },

  async deleteAddress(id) {
    try {
      const { error } = await withRetry(() =>
        supabase
          .from('delivery_addresses')
          .delete()
          .eq('id', id)
      );

      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }
};