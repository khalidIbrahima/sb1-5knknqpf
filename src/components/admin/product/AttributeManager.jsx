import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const AttributeManager = ({ formData, onChange }) => {
  const [newSize, setNewSize] = React.useState('');
  const [newColor, setNewColor] = React.useState('');

  const addSize = (e) => {
    e.preventDefault();
    if (newSize && !formData.sizes.includes(newSize)) {
      onChange({ sizes: [...formData.sizes, newSize] });
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    onChange({
      sizes: formData.sizes.filter(size => size !== sizeToRemove)
    });
  };

  const addColor = (e) => {
    e.preventDefault();
    if (newColor && !formData.colors.includes(newColor)) {
      onChange({ colors: [...formData.colors, newColor] });
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    onChange({
      colors: formData.colors.filter(color => color !== colorToRemove)
    });
  };

  return (
    <div className="space-y-6">
      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tailles disponibles
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.sizes?.map(size => (
            <span
              key={size}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
            >
              {size}
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <Minus size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Ajouter une taille"
            className="flex-1 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addSize}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Couleurs disponibles
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.colors?.map(color => (
            <span
              key={color}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
            >
              {color}
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <Minus size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Ajouter une couleur"
            className="flex-1 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addColor}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};