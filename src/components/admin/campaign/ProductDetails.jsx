import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import { ProductAttributes } from './ProductAttributes';

export const ProductDetails = ({ product }) => (
  <div className="space-y-2">
    <h4 className="font-medium text-gray-900">{product.name}</h4>
    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
    
    <div className="flex justify-between items-end border-t border-gray-100 pt-2">
      <div>
        <p className="text-lg font-semibold text-blue-600">
          {formatPrice(product.price)}
        </p>
        <p className="text-sm text-gray-500">
          +{formatPrice(product.shipping_cost)} (port)
        </p>
      </div>
      {product.category && (
        <p className="text-xs text-gray-500">
          Catégorie: {product.category}
        </p>
      )}
    </div>

    <ProductAttributes product={product} />
  </div>
);