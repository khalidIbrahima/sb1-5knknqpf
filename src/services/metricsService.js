import { supabase, handleSupabaseError } from '../lib/supabase';
import { ORDER_STATUSES } from '../constants/orderStatus';

export const metricsService = {
  async getMetrics(campaignId = null) {
    try {
      // Base query for orders
      let query = supabase
        .from('orders')
        .select(`
          id,
          status,
          total_amount,
          created_at,
          user_id,
          campaign:campaign_id (
            id,
            name
          )
        `);

      // Add campaign filter if provided
      if (campaignId) {
        query = query.eq('campaign_id', campaignId);
      }

      const { data: orders, error } = await query;
      if (error) throw error;

      // Calculate metrics
      const metrics = orders.reduce((acc, order) => {
        // Track all orders
        acc.totalOrders++;

        // Track cancelled orders separately
        if (order.status === ORDER_STATUSES.CANCELLED) {
          acc.cancelledOrders++;
        } else {
          // Only count revenue from non-cancelled orders
          acc.totalRevenue += Number(order.total_amount) || 0;
          acc.activeOrders++;
        }

        // Track unique customers
        acc.customers.add(order.user_id);

        // Group orders by date for chart
        const date = new Date(order.created_at).toISOString().split('T')[0];
        if (!acc.dailyOrders[date]) {
          acc.dailyOrders[date] = { date, orders: [] };
        }
        acc.dailyOrders[date].orders.push(order);

        return acc;
      }, {
        totalOrders: 0,
        activeOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
        customers: new Set(),
        dailyOrders: {}
      });

      return {
        totalOrders: metrics.totalOrders,
        activeOrders: metrics.activeOrders,
        cancelledOrders: metrics.cancelledOrders,
        totalRevenue: metrics.totalRevenue,
        totalCustomers: metrics.customers.size,
        cancellationRate: metrics.totalOrders > 0 
          ? Number((metrics.cancelledOrders / metrics.totalOrders * 100).toFixed(1))
          : 0,
        dailyOrders: Object.values(metrics.dailyOrders)
          .sort((a, b) => a.date.localeCompare(b.date))
      };
    } catch (error) {
      throw handleSupabaseError(error);
    }
  }
};