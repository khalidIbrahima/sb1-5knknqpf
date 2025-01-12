import React from 'react';
import { CreditCard } from 'lucide-react';
import { useOrderStore } from '../../../store/orderStore';

export const PaymentStatusToggle = ({ order }) => {
  const { updatePaymentStatus } = useOrderStore();

  const handleToggle = async () => {
    try {
      await updatePaymentStatus(order.id, !order.is_paid);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
        order.is_paid
          ? 'bg-green-100 text-green-700'
          : 'bg-amber-100 text-amber-700'
      }`}
    >
      <CreditCard size={16} />
      <span>{order.is_paid ? 'Payé' : 'En attente'}</span>
    </button>
  );
};