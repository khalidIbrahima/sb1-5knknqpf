import React from 'react';
import { TrendingDown } from 'lucide-react';

export const ProductPrice = ({ price = 0, marketPrice = 0, shippingCost = 0, shippingMethod = 'air' }) => {
  const safePrice = Number(price) || 0;
  const safeMarketPrice = Number(marketPrice) || 0;
  const safeShippingCost = Number(shippingCost) || 0;
  const total = safePrice + safeShippingCost;
  
  return (
    <div className="space-y-1">
      {/* Main price */}
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-primary">
          {safePrice.toLocaleString()} FCFA
        </span>
      </div>

      {/* Market price comparison */}
      {safeMarketPrice > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="line-through text-gray-400">
            {safeMarketPrice.toLocaleString()} FCFA
          </span>
        </div>
      )}

      {/* Shipping cost */}
      <div className="text-xs text-gray-500">
        + {safeShippingCost.toLocaleString()} FCFA (port {shippingMethod === 'air' ? 'aérien' : 'maritime'})
      </div>
    </div>
  );
};