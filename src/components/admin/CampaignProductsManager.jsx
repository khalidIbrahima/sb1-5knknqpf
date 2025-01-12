import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CampaignProductList } from './campaign/CampaignProductList';
import { SearchInput } from './SearchInput';

export const CampaignProductsManager = ({ campaign, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Gérer les produits - {campaign.name}
        </h2>

        <div className="mb-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher un produit..."
          />
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <CampaignProductList 
            campaign={campaign}
            searchQuery={searchQuery}
            onProductToggle={onClose}
          />
        </div>
      </div>
    </div>
  );
};