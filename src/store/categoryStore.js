import { create } from 'zustand';
import { categoryService } from '../services/categoryService';

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getCategories();
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createCategory: async (categoryData) => {
    try {
      const data = await categoryService.createCategory(categoryData);
      set(state => ({
        categories: [...state.categories, data]
      }));
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoryService.deleteCategory(id);
      set(state => ({
        categories: state.categories.filter(c => c.id !== id)
      }));
    } catch (error) {
      throw error;
    }
  }
}));