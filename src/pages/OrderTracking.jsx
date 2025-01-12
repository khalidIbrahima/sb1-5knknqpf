import React, { useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import { OrderList } from '../components/orders/OrderList';
import { SearchInput } from '../components/filters/SearchInput';
import { ORDER_STATUSES } from '../constants/orderStatus';

export const OrderTracking = () => {
  const orders = useOrderStore(state => state.orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&q=80&w=1920")',
      }}
    >
      <div className="bg-white/95 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Suivi des Commandes</h1>
            <div className="text-sm text-gray-600">
              {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Rechercher une commande..."
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              {Object.entries(ORDER_STATUSES).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <OrderList orders={filteredOrders} />
        </div>
      </div>
    </div>
  );
};