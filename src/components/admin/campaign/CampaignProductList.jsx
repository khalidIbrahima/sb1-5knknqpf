import React from 'react';
import { CampaignProductCard } from './CampaignProductCard';
import { useCampaignProducts } from '../../../hooks/useCampaignProducts';

export const CampaignProductList = ({ campaign, searchQuery, onProductToggle }) => {
  const products = useCampaignProducts(campaign);

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    
    const searchTerm = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.sizes?.some(size => size.toLowerCase().includes(searchTerm)) ||
      product.colors?.some(color => color.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredProducts.map(product => (
        <CampaignProductCard
          key={product.id}
          product={product}
          campaign={campaign}
          onToggle={() => onProductToggle?.(product.id)}
        />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-2 text-center py-8 text-gray-500">
          {searchQuery ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
        </div>
      )}
    </div>
  );
};