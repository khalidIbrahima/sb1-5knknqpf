import React, { useState } from 'react';
import { ProductHoverCard } from './ProductHoverCard';

export const ProductTag = ({ product }) => {
  const [showHover, setShowHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + (rect.width / 2),
      y: rect.bottom
    });
    setShowHover(true);
  };

  return (
    <div className="relative inline-block">
      <span
        className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowHover(false)}
      >
        {product.name}
      </span>
      {showHover && (
        <div style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 100 }}>
          <ProductHoverCard product={product} />
        </div>
      )}
    </div>
  );
};