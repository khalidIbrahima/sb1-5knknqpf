import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { validatePhoneNumber } from '../../utils/validation';

export const AddressForm = ({ address = null, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: address?.full_name || '',
    phone: address?.phone || '',
    address: address?.address || '',
    city: address?.city || '',
    additional_info: address?.additional_info || '',
    is_default: address?.is_default || false
  });
  const [error, setError] = useState(null);
  const { addAddress, updateAddress } = useDeliveryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validatePhoneNumber(formData.phone)) {
      setError('Numéro de téléphone invalide');
      return;
    }

    try {
      if (address) {
        await updateAddress(address.id, formData);
      } else {
        await addAddress(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-medium mb-4">
          {address ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ville
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Informations complémentaires
            </label>
            <textarea
              value={formData.additional_info}
              onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_default"
              checked={formData.is_default}
              onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_default" className="ml-2 text-sm text-gray-700">
              Définir comme adresse par défaut
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors"
          >
            {address ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
};