import React from 'react';

export const ProductAttributes = ({ product }) => {
  if (!product.sizes?.length && !product.colors?.length) return null;

  return (
    <div className="text-xs space-y-1 border-t border-gray-100 pt-2">
      {product.sizes?.length > 0 && (
        <AttributeList label="Tailles" items={product.sizes} />
      )}
      {product.colors?.length > 0 && (
        <AttributeList label="Couleurs" items={product.colors} />
      )}
    </div>
  );
};

const AttributeList = ({ label, items }) => (
  <div className="flex gap-1 flex-wrap">
    <span className="text-gray-500">{label}:</span>
    {items.map(item => (
      <span key={item} className="px-1.5 py-0.5 bg-gray-100 rounded">
        {item}
      </span>
    ))}
  </div>
);