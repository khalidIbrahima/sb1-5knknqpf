import React from 'react';
import { Trash2, Ship, Plane } from 'lucide-react';
import { QuantityInput } from './cart/QuantityInput';
import { useCartStore } from '../store/cartStore';
import { calculateItemTotal } from '../utils/cartUtils';

export const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore();
  const totalPrice = calculateItemTotal(item);
  
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          {item.size && `Taille: ${item.size}`}
          {item.size && item.color && ' | '}
          {item.color && `Couleur: ${item.color}`}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <QuantityInput
            quantity={item.quantity}
            onUpdate={(value) => updateQuantity(item.id, value)}
          />
          <span className="flex items-center gap-1 text-sm text-gray-600">
            {item.shippingMethod === 'air' ? <Plane size={16} /> : <Ship size={16} />}
            Transport {item.shippingMethod === 'air' ? 'aérien' : 'maritime'}
          </span>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">{item.price.toLocaleString()} FCFA</p>
        <p className="text-sm text-gray-600">
          +{item.shippingCost.toLocaleString()} FCFA (port)
        </p>
        <p className="font-semibold text-blue-600 mt-1">
          Total: {totalPrice.toLocaleString()} FCFA
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-700 mt-2"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};