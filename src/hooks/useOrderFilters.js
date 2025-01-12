import { useState, useEffect, useMemo } from 'react';
import { ORDER_STATUSES } from '../constants/orderStatus';

const ORDERS_PER_PAGE = 20; // Increased from 10 to 20 for better pagination

export const useOrderFilters = (orders = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, dateRange]);

  // Memoized filtered orders with optimized filtering
  const filteredOrders = useMemo(() => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    
    return orders.filter(order => {
      // Status filter
      if (selectedStatus !== 'all' && order.status !== selectedStatus) {
        return false;
      }

      // Date range filter
      if (dateRange.start && new Date(order.created_at) < dateRange.start) {
        return false;
      }
      if (dateRange.end && new Date(order.created_at) > dateRange.end) {
        return false;
      }

      // Search filter - match any term
      if (searchQuery) {
        const searchString = `
          ${order.id}
          ${order.shipping_info?.full_name?.toLowerCase() || ''}
          ${order.shipping_info?.phone || ''}
          ${order.shipping_info?.city?.toLowerCase() || ''}
        `;

        return searchTerms.every(term => searchString.includes(term));
      }

      return true;
    });
  }, [orders, searchQuery, selectedStatus, dateRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Calculate metrics for filtered orders
  const metrics = useMemo(() => {
    return filteredOrders.reduce((acc, order) => {
      if (order.status === ORDER_STATUSES.CANCELLED) {
        acc.cancelledOrders++;
      } else {
        acc.activeOrders++;
        acc.totalRevenue += Number(order.total_amount) || 0;
      }
      return acc;
    }, {
      activeOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0
    });
  }, [filteredOrders]);

  return {
    // Filter state
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    
    // Pagination state
    currentPage,
    setCurrentPage,
    totalPages,
    
    // Results
    filteredOrders,
    paginatedOrders,
    totalOrders: filteredOrders.length,
    metrics
  };
};