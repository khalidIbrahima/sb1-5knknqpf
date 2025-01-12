import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrderStatusSelector } from './OrderStatusSelector';
import { PaymentStatusToggle } from './PaymentStatusToggle';
import { formatDate } from '../../../utils/dateUtils';
import { formatPrice } from '../../../utils/formatters';

export const AdminOrderRow = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          #{order.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {order.shipping_info.full_name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(order.created_at)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <OrderStatusSelector order={order} compact />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <PaymentStatusToggle order={order} compact />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {formatPrice(order.total_amount)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary-600"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="7" className="px-6 py-4 bg-gray-50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Informations de livraison</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shipping_info.address}</p>
                    <p>{order.shipping_info.city}</p>
                    <p>{order.shipping_info.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Articles</h4>
                  <div className="space-y-2">
                    {order.items?.map(item => (
                      <div key={item.id} className="text-sm">
                        <span className="font-medium">{item.product?.name}</span>
                        <span className="text-gray-500"> x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};