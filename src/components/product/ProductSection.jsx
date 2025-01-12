import React from 'react';
import { ProductCard } from '../ProductCard';

export const ProductSection = ({ title, subtitle, products, onAddToCart, onEdit }) => {
  if (!products?.length) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};