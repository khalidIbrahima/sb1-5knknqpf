import React from 'react';
import { Plus, X } from 'lucide-react';

export const ImageManager = ({ images = [''], onChange }) => {
  const addImageField = () => {
    onChange([...images, '']);
  };

  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages.length ? newImages : ['']);
  };

  const updateImage = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    onChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Images (URLs)
      </label>
      <div className="space-y-2">
        {images.map((url, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => updateImage(index, e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
              required
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addImageField}
        className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
      >
        <Plus size={16} />
        Ajouter une image
      </button>
    </div>
  );
};