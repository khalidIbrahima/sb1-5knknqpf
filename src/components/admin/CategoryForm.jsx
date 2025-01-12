import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCategoryStore } from '../../store/categoryStore';

export const CategoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    parent_id: ''
  });
  const { categories, createCategory } = useCategoryStore();

  const generateSlug = (text) => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({
        name: formData.name,
        slug: generateSlug(formData.name),
        parent_id: formData.parent_id || null
      });
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const flattenCategories = (cats, level = 0) => {
    return cats.reduce((acc, cat) => {
      acc.push({
        ...cat,
        level,
        displayName: '  '.repeat(level) + cat.name
      });
      if (cat.children?.length) {
        acc.push(...flattenCategories(cat.children, level + 1));
      }
      return acc;
    }, []);
  };

  const flatCategories = flattenCategories(categories);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Nouvelle Catégorie</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catégorie parente (optionnel)
            </label>
            <select
              value={formData.parent_id}
              onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Aucune (catégorie principale)</option>
              {flatCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.displayName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Créer la catégorie
          </button>
        </form>
      </div>
    </div>
  );
};