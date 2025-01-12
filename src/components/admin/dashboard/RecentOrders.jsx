import React from 'react';
import { useOrderStore } from '../../../store/orderStore';
import { formatDate } from '../../../utils/dateUtils';
import { Package, CreditCard } from 'lucide-react';

export const RecentOrders = () => {
  const { orders } = useOrderStore();
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="text-white">
      <h3 className="text-xl font-semibold mb-4">Commandes Récentes</h3>
      <div className="space-y-4">
        {recentOrders.map(order => (
          <div 
            key={order.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="shrink-0" size={20} />
                <span className="font-medium">Commande #{order.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard size={16} />
                <span>{order.is_paid ? 'Payé' : 'En attente'}</span>
              </div>
            </div>
            <div className="text-sm opacity-80">
              <p>Total: {order.total_amount.toLocaleString()} FCFA</p>
              <p>Date: {formatDate(order.created_at)}</p>
            </div>
          </div>
        ))}
        {recentOrders.length === 0 && (
          <div className="text-center py-4 text-white/80">
            Aucune commande récente
          </div>
        )}
      </div>
    </div>
  );
};