import { create } from 'zustand';
import { generateCartItemId } from '../utils/cartUtils';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product, quantity = 1, color, size, shippingMethod = 'sea') => set((state) => {
    // Check if item already exists with same options
    const existingItemIndex = state.items.findIndex(item => 
      item.productId === product.id &&
      item.color === color &&
      item.size === size &&
      item.shippingMethod === shippingMethod
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += quantity;
      return { items: newItems };
    }

    // Add new item with unique ID
    return {
      items: [...state.items, {
        id: generateCartItemId(),
        productId: product.id,
        name: product.name,
        price: product.price,
        shippingCost: shippingMethod === 'air' ? product.air_shipping_cost : product.sea_shipping_cost,
        shippingMethod,
        image: product.images[0],
        quantity,
        color,
        size
      }]
    };
  }),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),
  clearCart: () => set({ items: [] }),
  updateQuantity: (itemId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
  }))
}));