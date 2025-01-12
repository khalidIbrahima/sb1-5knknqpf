import { supabase, handleSupabaseError, withRetry } from '../../../lib/supabase';

export const createProduct = async (productData) => {
  try {
    const { categories, ...productFields } = productData;
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await withRetry(async () =>
      supabase
        .from('products')
        .insert([{
          ...productFields,
          price: Number(productFields.price),
          market_price: Number(productFields.market_price) || null,
          air_shipping_cost: Number(productFields.air_shipping_cost),
          created_by: user?.id
        }])
        .select()
        .single()
    );

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
};