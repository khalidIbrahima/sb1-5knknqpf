import React from 'react';
import { useCategoryStore } from '../store/categoryStore';
import { CategoryFilterItem } from './filters/CategoryFilterItem';

export const ProductFilters = ({ selectedCategory, onCategoryChange }) => {
  const { categories } = useCategoryStore();

  // Only show root level categories
  const rootCategories = categories.filter(cat => !cat.parent_id);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === 'all' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        Tous
      </button>
      
      {rootCategories.map(category => (
        <CategoryFilterItem
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          onSelect={onCategoryChange}
        />
      ))}
    </div>
  );
};