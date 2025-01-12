import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { useOrderStore } from '../../../store/orderStore';

export const TrackingInfo = ({ order }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState(order.tracking_url || '');
  const { updateTrackingInfo } = useOrderStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrackingInfo(order.id, trackingUrl);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating tracking info:', error);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium flex items-center gap-2">
        <Truck size={16} className="text-gray-500" />
        Suivi de livraison
      </h4>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="url"
            value={trackingUrl}
            onChange={(e) => setTrackingUrl(e.target.value)}
            placeholder="URL de suivi"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="text-sm">
          {order.tracking_url ? (
            <div className="flex items-center justify-between">
              <a
                href={order.tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Voir le suivi
              </a>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                Modifier
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Ajouter un lien de suivi
            </button>
          )}
        </div>
      )}
    </div>
  );
};