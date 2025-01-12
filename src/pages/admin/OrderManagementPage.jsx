import React, { useState } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { AdminOrderList } from '../../components/admin/orders/AdminOrderList';
import { OrderFilters } from '../../components/admin/orders/OrderFilters';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useOrderFilters } from '../../hooks/useOrderFilters';

export const OrderManagementPage = () => {
  const { orders, loading, error } = useOrderStore();
  const [view, setView] = useState('list'); // 'list' or 'grid'
  
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    selectedStatus,
    setSelectedStatus,
    paginatedOrders,
    totalPages,
    totalOrders
  } = useOrderFilters(orders);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
          <p className="text-sm text-gray-600 mt-1">
            {totalOrders} commande{totalOrders !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <OrderFilters
        view={view}
        onViewChange={setView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <AdminOrderList
        orders={paginatedOrders}
        view={view}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};