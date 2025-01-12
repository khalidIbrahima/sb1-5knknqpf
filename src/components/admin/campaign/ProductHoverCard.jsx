import React from 'react';
import { ProductImage } from './ProductImage';
import { ProductDetails } from './ProductDetails';

export const ProductHoverCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="fixed transform -translate-x-1/2 mt-2 z-[100] w-72">
      <div className="relative bg-white rounded-lg shadow-xl p-4 border border-gray-200">
        {/* Arrow pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45" />
        
        {/* Content container */}
        <div className="relative bg-white rounded-lg">
          <ProductImage image={product.images[0]} name={product.name} />
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};