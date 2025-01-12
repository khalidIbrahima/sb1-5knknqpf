import React from 'react';
import { Package, Ship, Plane } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { calculateCartTotals } from '../../utils/cartUtils';

const OrderSummary = ({ items = [] }) => {
  if (!items?.length) return null;

  const { subtotal, shippingTotal, total } = calculateCartTotals(items);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 py-4 border-t">
            <div className="w-20 h-20">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Quantité: {item.quantity}</p>
                {item.size && <p>Taille: {item.size}</p>}
                {item.color && <p>Couleur: {item.color}</p>}
                <div className="flex items-center gap-1">
                  {item.shippingMethod === 'air' ? (
                    <Plane size={16} />
                  ) : (
                    <Ship size={16} />
                  )}
                  <span>
                    Transport {item.shippingMethod === 'air' ? 'aérien' : 'maritime'}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medium">{formatPrice(item.price)}</p>
                <p className="text-sm text-gray-600">
                  +{formatPrice(item.shippingCost)} (port)
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frais de livraison</span>
            <span>{formatPrice(shippingTotal)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
          <Package size={16} />
          <p>Livraison estimée: 2-3 semaines</p>
        </div>
      </div>
    </div>
  );
};

export { OrderSummary };