import React from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import { useCategoryStore } from '../../store/categoryStore';

const CategoryItem = ({ category, level = 0, onDelete }) => {
  return (
    <>
      <div 
        className="flex items-center justify-between p-3 bg-white rounded-lg border"
        style={{ marginLeft: `${level * 1.5}rem` }}
      >
        <div className="flex items-center gap-2">
          {level > 0 && <ChevronRight size={16} className="text-gray-400" />}
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.slug}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
      {category.children?.map(child => (
        <CategoryItem 
          key={child.id} 
          category={child} 
          level={level + 1}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export const CategoryList = () => {
  const { categories, deleteCategory } = useCategoryStore();

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      if (error.message === 'Cannot delete category with subcategories') {
        alert('Impossible de supprimer une catégorie qui contient des sous-catégories');
      } else {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="space-y-2">
      {categories.map(category => (
        <CategoryItem 
          key={category.id} 
          category={category}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};