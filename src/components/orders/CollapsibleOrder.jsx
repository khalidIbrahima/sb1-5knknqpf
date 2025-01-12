import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { OrderTimeline } from './timeline/OrderTimeline';
import { OrderItem } from './OrderItem';
import { formatDate } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/formatters';

export const CollapsibleOrder = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <Package className="text-gray-400" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-left">
            <div>
              <span className="text-sm text-gray-500">Commande #</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(order.created_at)}
            </div>
            <div className={`text-sm font-medium ${
              order.is_paid ? 'text-green-600' : 'text-amber-600'
            }`}>
              {order.is_paid ? 'Payé' : 'En attente de paiement'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium">{formatPrice(order.total_amount)}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t p-6">
          <OrderTimeline history={order.history} />
          <div className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Informations de livraison</h4>
                <div className="text-sm text-gray-600">
                  <p>{order.shipping_info.full_name}</p>
                  <p>{order.shipping_info.phone}</p>
                  <p>{order.shipping_info.address}</p>
                  <p>{order.shipping_info.city}</p>
                  {order.shipping_info.additional_info && (
                    <p className="mt-2 text-gray-500">{order.shipping_info.additional_info}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Articles</h4>
                <div className="space-y-4">
                  {order.items?.map(item => (
                    <OrderItem key={item.id} item={item} />
                  ))}
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};