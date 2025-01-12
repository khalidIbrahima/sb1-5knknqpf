import React from 'react';
import { useProductStore } from '../../../store/productStore';

export const CampaignProductCard = ({ product, campaign, onToggle }) => {
  const { toggleProductStatus } = useProductStore();

  const handleToggle = async () => {
    try {
      await toggleProductStatus(product.id, campaign.id, !product.isActive);
      onToggle?.();
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  return (
    <div
      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
        product.isActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        checked={product.isActive}
        onChange={() => {}}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="ml-3">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">
          {product.price.toLocaleString()} FCFA
        </p>
        <p className="text-xs text-gray-400">
          Catégorie: {product.category || 'Non catégorisé'}
        </p>
      </div>
    </div>
  );
};