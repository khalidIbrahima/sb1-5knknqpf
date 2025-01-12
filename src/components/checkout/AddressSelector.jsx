import React from 'react';
import { Plus, MapPin, Edit, Trash } from 'lucide-react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { AddressForm } from './AddressForm';
import { formatPhoneNumber } from '../../utils/formatters';

export const AddressSelector = ({ selectedAddress, onSelect }) => {
  const { addresses, loading } = useDeliveryStore();
  const [showForm, setShowForm] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState(null);

  if (loading) {
    return <div className="text-center py-4">Chargement des adresses...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Adresse de livraison</h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary-600"
        >
          <Plus size={16} />
          Nouvelle adresse
        </button>
      </div>

      <div className="grid gap-4">
        {addresses.map(address => (
          <label
            key={address.id}
            className={`relative flex gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedAddress?.id === address.id
                ? 'border-primary bg-primary-50'
                : 'border-gray-200 hover:border-primary'
            }`}
          >
            <input
              type="radio"
              name="delivery_address"
              checked={selectedAddress?.id === address.id}
              onChange={() => onSelect(address)}
              className="sr-only"
            />
            <MapPin className={selectedAddress?.id === address.id ? 'text-primary' : 'text-gray-400'} />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{address.full_name}</p>
                  <p className="text-sm text-gray-600">{formatPhoneNumber(address.phone)}</p>
                </div>
                {address.is_default && (
                  <span className="text-xs bg-primary-100 text-primary px-2 py-1 rounded-full">
                    Par défaut
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{address.address}</p>
              <p className="text-sm text-gray-600">{address.city}</p>
              {address.additional_info && (
                <p className="text-sm text-gray-500 mt-1">{address.additional_info}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditingAddress(address);
                  setShowForm(true);
                }}
                className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100"
              >
                <Edit size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
                    useDeliveryStore.getState().deleteAddress(address.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash size={16} />
              </button>
            </div>
          </label>
        ))}
      </div>

      {showForm && (
        <AddressForm
          address={editingAddress}
          onClose={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
};