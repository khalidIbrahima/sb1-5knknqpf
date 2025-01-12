import React from 'react';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { calculateCartTotals } from '../utils/cartUtils';

export const Cart = () => {
  const { items } = useCartStore();
  const totals = calculateCartTotals(items);

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=1920")',
      }}
    >
      <div className="bg-white/95 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <h1 className="text-3xl font-bold">Mon Panier</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.length > 0 ? (
                items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">
                    Votre panier est vide
                  </p>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary totals={totals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};