import React, { useMemo } from 'react';
import { AdminOrderCard } from './AdminOrderCard';
import { AdminOrderTable } from './AdminOrderTable';
import { Pagination } from '../../Pagination';
import { ORDER_STATUSES } from '../../../constants/orderStatus';

export const AdminOrderList = ({ 
  orders, 
  view,
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Group and memoize orders
  const { activeOrders, cancelledOrders } = useMemo(() => {
    return orders.reduce((acc, order) => {
      if (order.status === ORDER_STATUSES.CANCELLED) {
        acc.cancelledOrders.push(order);
      } else {
        acc.activeOrders.push(order);
      }
      return acc;
    }, { activeOrders: [], cancelledOrders: [] });
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Aucune commande trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Commandes actives ({activeOrders.length})
          </h3>
          {view === 'list' ? (
            <AdminOrderTable orders={activeOrders} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {activeOrders.map(order => (
                <AdminOrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cancelled Orders */}
      {cancelledOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-red-600">
            Commandes annulées ({cancelledOrders.length})
          </h3>
          {view === 'list' ? (
            <AdminOrderTable orders={cancelledOrders} showCancelled />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {cancelledOrders.map(order => (
                <AdminOrderCard key={order.id} order={order} showCancelled />
              ))}
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};