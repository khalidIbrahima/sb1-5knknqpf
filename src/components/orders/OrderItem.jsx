import React from 'react';
import { Ship, Plane } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const OrderItem = ({ item }) => {
  return (
    <div className="flex gap-4 items-start border-b pb-4">
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.product?.images?.[0]}
          alt={item.product?.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{item.product?.name}</h4>
            {(item.size || item.color) && (
              <p className="text-sm text-gray-500">
                {item.size && `Taille: ${item.size}`}
                {item.size && item.color && ' | '}
                {item.color && `Couleur: ${item.color}`}
              </p>
            )}
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              {item.shipping_method === 'air' ? <Plane size={16} /> : <Ship size={16} />}
              <span>Transport {item.shipping_method === 'air' ? 'aérien' : 'maritime'}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatPrice(item.price)}</p>
            <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};