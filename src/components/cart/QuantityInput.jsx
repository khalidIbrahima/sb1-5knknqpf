import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantityInput = ({ quantity, onUpdate, min = 1, max = 99 }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onUpdate(value);
    }
  };

  const decrease = () => {
    if (quantity > min) {
      onUpdate(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onUpdate(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrease}
        className="p-1 rounded-md hover:bg-gray-100"
        disabled={quantity <= min}
      >
        <Minus size={16} className={quantity <= min ? 'text-gray-300' : 'text-gray-600'} />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-12 text-center rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
      
      <button
        onClick={increase}
        className="p-1 rounded-md hover:bg-gray-100"
        disabled={quantity >= max}
      >
        <Plus size={16} className={quantity >= max ? 'text-gray-300' : 'text-gray-600'} />
      </button>
    </div>
  );
};