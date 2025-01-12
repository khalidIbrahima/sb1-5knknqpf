import { create } from 'zustand';
import { orderService } from '../services/order';

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  getOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await orderService.getOrders();
      set({ orders, loading: false });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ 
        error: error.message || 'Error fetching orders',
        loading: false,
        orders: []
      });
    }
  },

  createOrder: async (orderData) => {
    set({ error: null });
    try {
      const order = await orderService.createOrder(orderData);
      set((state) => ({
        orders: [order, ...state.orders]
      }));
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}));