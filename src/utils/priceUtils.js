/**
 * Calculate total price including shipping
 */
export const calculateTotalPrice = (price, shippingCost) => {
  const safePrice = Number(price) || 0;
  const safeShippingCost = Number(shippingCost) || 0;
  return safePrice + safeShippingCost;
};

/**
 * Calculate savings compared to market price
 */
export const calculateSavings = (price, shippingCost, marketPrice) => {
  const total = calculateTotalPrice(price, shippingCost);
  const safeMarketPrice = Number(marketPrice) || 0;
  return safeMarketPrice > total ? safeMarketPrice - total : 0;
};

/**
 * Calculate savings percentage
 */
export const calculateSavingsPercentage = (savings, marketPrice) => {
  const safeMarketPrice = Number(marketPrice) || 0;
  return savings > 0 && safeMarketPrice > 0 
    ? Math.round((savings / safeMarketPrice) * 100) 
    : 0;
};