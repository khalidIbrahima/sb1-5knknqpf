import { create } from 'zustand';
import { deliveryService } from '../services/deliveryService';

export const useDeliveryStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,

  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await deliveryService.getAddresses();
      set({ addresses: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addAddress: async (addressData) => {
    set({ error: null });
    try {
      const address = await deliveryService.addAddress(addressData);
      set(state => ({
        addresses: [address, ...state.addresses]
      }));
      return address;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateAddress: async (id, addressData) => {
    set({ error: null });
    try {
      const address = await deliveryService.updateAddress(id, addressData);
      set(state => ({
        addresses: state.addresses.map(a => 
          a.id === id ? address : a
        )
      }));
      return address;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteAddress: async (id) => {
    set({ error: null });
    try {
      await deliveryService.deleteAddress(id);
      set(state => ({
        addresses: state.addresses.filter(a => a.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));