import React, { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import { Loader } from 'lucide-react';

const CategoryNode = ({ category, level = 0 }) => {
  const indent = level * 20;
  
  return (
    <div className="space-y-2">
      <div 
        className="p-4 bg-white rounded-lg shadow-sm"
        style={{ marginLeft: `${indent}px` }}
      >
        <h3 className="font-medium">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.slug}</p>
      </div>
      {category.children?.length > 0 && (
        <div className="space-y-2 mt-2">
          {category.children.map(child => (
            <CategoryNode 
              key={child.id} 
              category={child} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Categories = () => {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Une erreur est survenue lors du chargement des catégories
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Catégories</h1>
      <div className="space-y-4">
        {categories.length > 0 ? (
          categories.map(category => (
            <CategoryNode key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            Aucune catégorie trouvée
          </div>
        )}
      </div>
    </div>
  );
};