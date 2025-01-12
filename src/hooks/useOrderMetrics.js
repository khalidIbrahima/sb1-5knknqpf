import { useMemo } from 'react';
import { ORDER_STATUSES } from '../constants/orderStatus';

export const useOrderMetrics = (orders = []) => {
  return useMemo(() => {
    const metrics = orders.reduce((acc, order) => {
      // Track all orders
      acc.totalOrders += 1;

      // Track cancelled orders separately
      if (order.status === ORDER_STATUSES.CANCELLED) {
        acc.cancelledOrders += 1;
      } else {
        // Only count revenue and active orders from non-cancelled orders
        acc.totalRevenue += Number(order.total_amount) || 0;
        acc.activeOrders += 1;
      }
      
      // Track unique customers regardless of order status
      if (!acc.customers.has(order.user_id)) {
        acc.customers.add(order.user_id);
      }

      return acc;
    }, {
      totalRevenue: 0,
      totalOrders: 0,
      activeOrders: 0,
      cancelledOrders: 0,
      customers: new Set()
    });

    return {
      ...metrics,
      totalCustomers: metrics.customers.size,
      cancellationRate: metrics.totalOrders > 0 
        ? Number((metrics.cancelledOrders / metrics.totalOrders * 100).toFixed(1))
        : 0,
      averageOrderValue: metrics.activeOrders > 0
        ? metrics.totalRevenue / metrics.activeOrders
        : 0
    };
  }, [orders]);
};