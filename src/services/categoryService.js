import { supabase, handleSupabaseError } from '../lib/supabase';

export const categoryService = {
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*, parent:parent_id(*)')
        .order('path');

      if (error) throw error;
      return this.buildCategoryTree(data);
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async createCategory(categoryData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select('*, parent:parent_id(*)')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async deleteCategory(id) {
    try {
      // First check if category has children
      const { data: children, error: checkError } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', id);

      if (checkError) throw checkError;

      if (children?.length > 0) {
        throw new Error('Cannot delete category with subcategories');
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  // Helper method to build category tree
  buildCategoryTree(categories) {
    const categoryMap = new Map();
    const roots = [];

    // First pass: Create nodes
    categories.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        children: []
      });
    });

    // Second pass: Build tree
    categories.forEach(category => {
      const node = categoryMap.get(category.id);
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
};