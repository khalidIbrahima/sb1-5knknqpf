```jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AdminOrderCard } from './AdminOrderCard';
import { formatDate } from '../../../utils/dateUtils';

export const OrderList = ({ orders }) => {
  const [expandedGroups, setExpandedGroups] = useState(new Set());

  const toggleGroup = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  // Group orders by campaign
  const groupedOrders = orders.reduce((acc, order) => {
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

  return (
    <div className="space-y-6">
      {Object.entries(groupedOrders).map(([campaignId, { name, orders }]) => (
        <div key={campaignId} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => toggleGroup(campaignId)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{orders.length} commandes</p>
            </div>
            {expandedGroups.has(campaignId) ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </button>

          {expandedGroups.has(campaignId) && (
            <div className="border-t divide-y">
              {orders.map(order => (
                <AdminOrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```