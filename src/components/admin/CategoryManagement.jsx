import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategoryStore } from '../../store/categoryStore';
import { CategoryForm } from './CategoryForm';

export const CategoryManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const { categories, createCategory } = useCategoryStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des Catégories</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Nouvelle Catégorie
        </button>
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <div
            key={category.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <CategoryForm
          onClose={() => setShowForm(false)}
          onSubmit={createCategory}
        />
      )}
    </div>
  );
};