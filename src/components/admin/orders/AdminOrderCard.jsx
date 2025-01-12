import React from 'react';
import { Package, CreditCard } from 'lucide-react';
import { OrderStatus } from '../../OrderStatus';
import { OrderStatusSelector } from './OrderStatusSelector';
import { PaymentStatusToggle } from './PaymentStatusToggle';
import { AdminOrderTimeline } from './timeline/AdminOrderTimeline';
import { TrackingInfo } from './TrackingInfo';
import { formatPrice } from '../../../utils/formatters';
import { formatDate } from '../../../utils/dateUtils';

export const AdminOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Package className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Commande #{order.id}</h3>
            <p className="text-sm text-gray-500">
              {formatDate(order.created_at)}
            </p>
          </div>
        </div>
        <PaymentStatusToggle order={order} />
      </div>

      <OrderStatus order={order} />
      <OrderStatusSelector order={order} />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Informations de livraison</h4>
          <div className="text-sm text-gray-600">
            <p>{order.shipping_info.full_name}</p>
            <p>{order.shipping_info.phone}</p>
            <p>{order.shipping_info.address}</p>
            <p>{order.shipping_info.city}</p>
            {order.shipping_info.additional_info && (
              <p className="mt-1 text-gray-500">
                {order.shipping_info.additional_info}
              </p>
            )}
          </div>
        </div>

        <div>
          <TrackingInfo order={order} />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Articles ({order.total_items})</h4>
        <div className="space-y-2">
          {order.items?.map(item => (
            <div key={item.id} className="flex justify-between text-sm border-b pb-2">
              <div>
                <p className="font-medium">{item.product?.name}</p>
                {(item.size || item.color) && (
                  <p className="text-gray-500">
                    {item.size && `Taille: ${item.size}`}
                    {item.size && item.color && ' | '}
                    {item.color && `Couleur: ${item.color}`}
                  </p>
                )}
                <p className="text-gray-500">Quantité: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p>{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold pt-2">
          <span>Total</span>
          <span>{formatPrice(order.total_amount)}</span>
        </div>
      </div>

      <AdminOrderTimeline history={order.history} />
    </div>
  );
};