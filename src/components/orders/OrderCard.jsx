import React from 'react';
import { Package, CreditCard } from 'lucide-react';
import { OrderTimeline } from './timeline/OrderTimeline';
import { formatDate } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/formatters';

export const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Package className="text-primary" />
          <h3 className="font-semibold">Commande #{order.id}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {formatDate(order.created_at)}
          </span>
          <span className={`flex items-center gap-1 text-sm ${
            order.is_paid ? 'text-green-600' : 'text-amber-600'
          }`}>
            <CreditCard size={16} />
            {order.is_paid ? 'Payé' : 'En attente de paiement'}
          </span>
        </div>
      </div>

      <OrderTimeline history={order.history} />

      <div className="mt-6 border-t pt-4">
        <h4 className="font-medium mb-2">Articles</h4>
        <div className="space-y-2">
          {order.items?.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <span>{item.product?.name} x{item.quantity}</span>
                {(item.size || item.color) && (
                  <p className="text-gray-500">
                    {item.size && `Taille: ${item.size}`}
                    {item.size && item.color && ' | '}
                    {item.color && `Couleur: ${item.color}`}
                  </p>
                )}
              </div>
              <span className="text-gray-600">
                {formatPrice(item.price)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total_amount)}</span>
        </div>
      </div>
    </div>
  );
};
