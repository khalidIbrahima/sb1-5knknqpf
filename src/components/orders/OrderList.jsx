import React from 'react';
import { CollapsibleOrder } from './CollapsibleOrder';

export const OrderList = ({ orders = [] }) => {
  if (!orders.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">Aucune commande trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <CollapsibleOrder key={order.id} order={order} />
      ))}
    </div>
  );
};