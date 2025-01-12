import React from 'react';
import { SIZES, SHOE_SIZES } from '../constants/productCategories';

export const ProductOptions = ({ category, sizes, colors, onSizeChange, onColorChange }) => {
  const availableSizes = category === 'chaussures' ? SHOE_SIZES : SIZES;
  
  return (
    <div className="space-y-3">
      {sizes && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Taille</label>
          <select 
            onChange={(e) => onSizeChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionner une taille</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      {colors && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Couleur</label>
          <select 
            onChange={(e) => onColorChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionner une couleur</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};