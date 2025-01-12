import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export const SearchBar = ({ 
  value, 
  onChange, 
  onFilterClick,
  showFilters = false,
  placeholder = "Rechercher un produit..." 
}) => {
  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        {showFilters && (
          <button
            onClick={onFilterClick}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2"
          >
            <SlidersHorizontal size={20} />
            <span className="hidden sm:inline">Filtres</span>
          </button>
        )}
      </div>
    </div>
  );
};