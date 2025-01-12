// Generate a unique ID for cart items
export const generateCartItemId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Calculate total price for a cart item
export const calculateItemTotal = (item) => {
  if (!item) return 0;
  const price = Number(item.price) || 0;
  const shippingCost = Number(item.shippingCost) || 0;
  const quantity = Number(item.quantity) || 1;
  return (price + shippingCost) * quantity;
};

// Calculate cart totals
export const calculateCartTotals = (items = []) => {
  return items.reduce((totals, item) => {
    const price = Number(item.price) || 0;
    const shippingCost = Number(item.shippingCost) || 0;
    const quantity = Number(item.quantity) || 1;
    
    return {
      subtotal: totals.subtotal + (price * quantity),
      shippingTotal: totals.shippingTotal + (shippingCost * quantity),
      total: totals.total + calculateItemTotal(item)
    };
  }, { subtotal: 0, shippingTotal: 0, total: 0 });
};