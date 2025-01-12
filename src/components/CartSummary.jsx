import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAuthModal } from '../hooks/useAuthModal';

export const CartSummary = ({ totals }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openAuthModal } = useAuthModal();
  const { subtotal, shippingTotal, total } = totals;

  const handleCheckout = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Résumé du panier</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{shippingTotal.toLocaleString()} FCFA</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{total.toLocaleString()} FCFA</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={total === 0}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {user ? 'Passer la commande' : 'Se connecter pour commander'}
      </button>
    </div>
  );
};