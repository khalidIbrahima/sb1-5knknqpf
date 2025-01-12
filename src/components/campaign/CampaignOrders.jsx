import React, { useState } from 'react';
import { CollapsibleSection } from '../common/CollapsibleSection';
import { OrderCard } from '../orders/OrderCard';
import { SearchInput } from '../admin/SearchInput';
import { ORDER_STATUSES } from '../../constants/orderStatus';

export const CampaignOrders = ({ campaign }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = campaign.orders?.filter(order => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(term) ||
      order.shipping_info?.full_name.toLowerCase().includes(term)
    );
  });

  const ordersByStatus = Object.values(ORDER_STATUSES).reduce((acc, status) => {
    acc[status] = filteredOrders?.filter(order => order.status === status) || [];
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Commandes de la campagne</h2>
      
      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher une commande..."
        />
      </div>

      <div className="space-y-4">
        {Object.entries(ordersByStatus).map(([status, orders]) => (
          <CollapsibleSection 
            key={status}
            title={`${status.replace(/_/g, ' ')} (${orders.length})`}
            defaultOpen={orders.length > 0}
          >
            <div className="space-y-4">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
};