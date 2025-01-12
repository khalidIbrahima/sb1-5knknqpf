import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { ShippingForm } from '../components/checkout/ShippingForm';
import { calculateCartTotals } from '../utils/cartUtils';
import { useCampaignStore } from '../store/campaignStore';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { activeCampaign } = useCampaignStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo || !paymentMethod) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { total } = calculateCartTotals(items);
      const orderData = {
        items,
        shipping_info: shippingInfo,
        payment_method: paymentMethod,
        total,
        campaign_id: activeCampaign?.id
      };

      await createOrder(orderData);
      clearCart();
      navigate('/orders');
    } catch (error) {
      setError('Une erreur est survenue lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ShippingForm 
              onSubmit={setShippingInfo} 
              error={!shippingInfo && error}
            />
            
            <PaymentMethodSelector
              selected={paymentMethod}
              onSelect={setPaymentMethod}
              error={!paymentMethod && error}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !shippingInfo || !paymentMethod}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </div>

          <div>
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};