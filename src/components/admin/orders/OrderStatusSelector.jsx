import React from 'react';
import { useOrderStore } from '../../../store/orderStore';
import { ORDER_STATUSES } from '../../../constants/orderStatus';
import { AlertCircle } from 'lucide-react';

export const OrderStatusSelector = ({ order, compact = false }) => {
  const { updateOrderStatus } = useOrderStore();
  const [error, setError] = React.useState(null);
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Don't allow status changes for cancelled orders
  if (order.status === ORDER_STATUSES.CANCELLED) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Annulée
      </span>
    );
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setError(null);
    setIsUpdating(true);

    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (error) {
      setError(error.message || 'Une erreur est survenue');
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-2">
      <select
        value={order.status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`${compact ? 'text-sm' : 'w-full md:w-auto'} rounded-md border-gray-300 shadow-sm 
          focus:border-primary focus:ring-primary 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-300' : ''}`}
      >
        {Object.entries(ORDER_STATUSES)
          .filter(([key]) => key !== 'CANCELLED') // Remove CANCELLED from options
          .map(([key, value]) => (
            <option key={key} value={value}>
              {value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
      </select>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};