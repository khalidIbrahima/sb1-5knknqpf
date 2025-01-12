import React from 'react';
import { Power, Edit } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

export const ProductStatusToggle = ({ product, onEdit, activeCampaign }) => {
  const toggleProductStatus = useProductStore(state => state.toggleProductStatus);

  const campaignProduct = product.campaign_products?.find(
    cp => cp.campaign_id === activeCampaign?.id
  );
  const isActive = campaignProduct?.is_active ?? false;

  const handleToggle = () => {
    if (activeCampaign) {
      toggleProductStatus(product.id, activeCampaign.id, !isActive);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.price.toLocaleString()} FCFA</p>
        <p className="text-xs text-gray-500">Catégorie: {product.category || 'Non catégorisé'}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          disabled={!activeCampaign}
        >
          <Power className={isActive ? 'text-green-600' : 'text-red-600'} />
          <span>{isActive ? 'Actif' : 'Inactif'}</span>
        </button>
      </div>
    </div>
  );
};