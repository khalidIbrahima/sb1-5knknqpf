import React from 'react';

export const ProductBasicInfo = ({ formData, onChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Nom</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => onChange({ name: e.target.value })}
        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Catégorie</label>
      <select
        value={formData.category}
        onChange={(e) => onChange({ category: e.target.value })}
        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">Sélectionner une catégorie</option>
        {formData.categories?.map(category => (
          <option key={category.id} value={category.slug}>
            {category.displayName}
          </option>
        ))}
      </select>
    </div>
  </div>
);