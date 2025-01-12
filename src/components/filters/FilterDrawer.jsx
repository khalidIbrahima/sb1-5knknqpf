import React from 'react';
import { X } from 'lucide-react';

export const FilterDrawer = ({ 
  isOpen, 
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  shippingMethods,
  onShippingMethodChange,
  categories
}) => {
  if (!isOpen) return null;

  const sortOptions = [
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'popular', label: 'Plus populaires' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filtres</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-medium">Catégories</h4>
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange('all')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                Toutes les catégories
              </button>
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-3">
            <h4 className="font-medium">Trier par</h4>
            <div className="space-y-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedSort === option.value
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium">Prix</h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Min</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">Max</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Shipping Methods */}
          <div className="space-y-3">
            <h4 className="font-medium">Mode de livraison</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={shippingMethods.air}
                  onChange={(e) => onShippingMethodChange({ ...shippingMethods, air: e.target.checked })}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Transport aérien</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={shippingMethods.sea}
                  onChange={(e) => onShippingMethodChange({ ...shippingMethods, sea: e.target.checked })}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Transport maritime</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};