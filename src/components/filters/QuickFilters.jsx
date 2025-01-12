import React from 'react';
import { Sparkles, TrendingUp, Clock, Flame, Tag } from 'lucide-react';

export const QuickFilters = ({ onFilterClick, activeFilter }) => {
  const filters = [
    { id: 'featured', label: 'En vedette', icon: Sparkles },
    { id: 'bestsellers', label: 'Meilleures ventes', icon: TrendingUp },
    { id: 'new', label: 'Nouveautés', icon: Clock },
    { id: 'trending', label: 'Tendances', icon: Flame },
    { id: 'deals', label: 'Promotions', icon: Tag }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterClick(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-full transition-colors whitespace-nowrap ${
            activeFilter === filter.id
              ? 'border-primary text-primary bg-primary/5'
              : 'border-gray-200 hover:border-primary hover:text-primary'
          }`}
        >
          <filter.icon size={16} />
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};