import { create } from 'zustand';

export const useAuthModal = create((set) => ({
  isOpen: false,
  openAuthModal: () => set({ isOpen: true }),
  closeAuthModal: () => set({ isOpen: false })
}));