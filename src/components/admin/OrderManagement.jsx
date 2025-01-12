import React, { useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';
import { AdminOrderCard } from './orders/AdminOrderCard';
import { OrderFilters } from './orders/OrderFilters';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const OrderManagement = () => {
  const { orders, loading, error } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [shippingFilter, setShippingFilter] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Filter orders based on search query and shipping method
  const filteredOrders = orders.filter(order => {
    // Search filter
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      const matches = 
        order.id.toLowerCase().includes(term) ||
        order.shipping_info?.full_name.toLowerCase().includes(term) ||
        order.campaign?.name.toLowerCase().includes(term);
      
      if (!matches) return false;
    }

    // Shipping method filter
    if (shippingFilter) {
      const hasMatchingItems = order.items?.some(item => 
        item.shipping_method === shippingFilter
      );
      if (!hasMatchingItems) return false;
    }

    return true;
  });

  // Group orders by campaign
  const ordersByCampaign = filteredOrders.reduce((acc, order) => {
    const campaignId = order.campaign?.id || 'no-campaign';
    const campaignName = order.campaign?.name || 'Sans campagne';
    
    if (!acc[campaignId]) {
      acc[campaignId] = {
        name: campaignName,
        orders: []
      };
    }
    acc[campaignId].orders.push(order);
    return acc;
  }, {});

  // Sort campaigns by most recent orders
  const sortedCampaigns = Object.entries(ordersByCampaign).sort((a, b) => {
    const latestOrderA = Math.max(...a[1].orders.map(o => new Date(o.created_at)));
    const latestOrderB = Math.max(...b[1].orders.map(o => new Date(o.created_at)));
    return latestOrderB - latestOrderA;
  });

  return (
    <div className="space-y-6">
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        shippingFilter={shippingFilter}
        onShippingFilterChange={setShippingFilter}
      />

      <div className="space-y-4">
        {sortedCampaigns.map(([campaignId, { name, orders }]) => (
          <CollapsibleSection
            key={campaignId}
            title={`${name} (${orders.length} commandes)`}
            defaultOpen={campaignId === sortedCampaigns[0][0]}
          >
            <div className="space-y-4">
              {orders.map(order => (
                <AdminOrderCard key={order.id} order={order} />
              ))}
            </div>
          </CollapsibleSection>
        ))}

        {sortedCampaigns.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery || shippingFilter ? 'Aucune commande trouvée' : 'Aucune commande à afficher'}
          </div>
        )}
      </div>
    </div>
  );
};