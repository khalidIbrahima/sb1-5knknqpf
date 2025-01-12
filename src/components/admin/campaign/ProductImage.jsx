import React from 'react';

export const ProductImage = ({ image, name }) => (
  <div className="aspect-square w-full mb-3 overflow-hidden rounded-md">
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
    />
  </div>
);