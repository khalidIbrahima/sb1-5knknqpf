```javascript
import { useState } from 'react';
import { useOrderStore } from '../store/orderStore';

export const useOrderManagement = (order) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const { updateOrderStatus, updatePaymentStatus } = useOrderStore();

  const handleStatusChange = async (newStatus) => {
    setError(null);
    setIsUpdating(true);

    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      console.error('Error updating order status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePaymentToggle = async () => {
    setError(null);
    setIsUpdating(true);

    try {
      await updatePaymentStatus(order.id, !order.is_paid);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      console.error('Error updating payment status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    error,
    handleStatusChange,
    handlePaymentToggle,
    clearError: () => setError(null)
  };
};
```