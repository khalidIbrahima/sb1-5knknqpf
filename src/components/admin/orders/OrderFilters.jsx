import React from 'react';
import { LayoutGrid, List, Ship, Plane } from 'lucide-react';
import { SearchInput } from '../../filters/SearchInput';
import { ORDER_STATUSES } from '../../../constants/orderStatus';

export const OrderFilters = ({
  view,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Rechercher une commande..."
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Tous les statuts</option>
            {Object.entries(ORDER_STATUSES).map(([key, value]) => (
              <option key={key} value={value}>
                {value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 rounded ${
                view === 'list' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 rounded ${
                view === 'grid' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};