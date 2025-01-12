import React from 'react';
import { Package } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { ORDER_STATUSES } from '../../constants/orderStatus';

export const OrderStatusManager = ({ order }) => {
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="text-blue-600" />
          <span className="font-medium">Commande #{order.id}</span>
        </div>
        <select
          value={order.status}
          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.entries(ORDER_STATUSES).map(([key, value]) => (
            <option key={key} value={value}>
              {value.replace('_', ' ').charAt(0).toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-600">
        Total: {order.total.toLocaleString()} FCFA
      </div>
    </div>
  );
};