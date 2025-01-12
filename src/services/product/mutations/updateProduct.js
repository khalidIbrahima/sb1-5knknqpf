import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const updateProduct = async (id, updates) => {
  try {
    // Remove categories field and convert numeric values
    const { categories, ...updateFields } = updates;
    const numericFields = {
      price: Number(updateFields.price),
      market_price: updateFields.market_price ? Number(updateFields.market_price) : null,
      sea_shipping_cost: updateFields.sea_shipping_available ? Number(updateFields.sea_shipping_cost) : 0,
      air_shipping_cost: updateFields.air_shipping_available ? Number(updateFields.air_shipping_cost) : 0
    };

    // Update product
    const { data, error } = await withRetry(() =>
      supabase
        .from('products')
        .update({
          ...updateFields,
          ...numericFields,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()
    );

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error);
  }
};