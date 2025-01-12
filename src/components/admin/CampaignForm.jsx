import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import { useProductStore } from '../../store/productStore';

export const CampaignForm = ({ onClose, campaign = null }) => {
  const { products } = useProductStore();
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    start_date: campaign?.start_date || '',
    end_date: campaign?.end_date || '',
    is_active: campaign?.is_active ?? true,
    products: campaign?.products?.map(p => p.id) || []
  });

  const { createCampaign, updateCampaign } = useCampaignStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (campaign) {
        await updateCampaign(campaign.id, formData);
      } else {
        await createCampaign(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleProductToggle = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {campaign ? 'Modifier la Campagne' : 'Nouvelle Campagne'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la campagne
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de début
            </label>
            <input
              type="datetime-local"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de fin
            </label>
            <input
              type="datetime-local"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
              Campagne active
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produits de la campagne
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.products.includes(product.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <input
                    type="checkbox"
                    checked={formData.products.includes(product.id)}
                    onChange={() => {}}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.price.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {campaign ? 'Mettre à jour' : 'Créer la campagne'}
          </button>
        </form>
      </div>
    </div>
  );
};