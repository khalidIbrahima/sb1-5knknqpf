import { create } from 'zustand';
import { productService } from '../services/product';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await productService.getProducts();
      set({ products, loading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ 
        error: error.message || 'Error fetching products',
        loading: false 
      });
    }
  },

  updateProduct: async (id, updates) => {
    set({ error: null });
    try {
      const updatedProduct = await productService.updateProduct(id, updates);
      set(state => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, ...updatedProduct } : p
        )
      }));
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      set({ error: error.message });
      throw error;
    }
  }
}));