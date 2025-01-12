import React from 'react';
import { Ship, Plane } from 'lucide-react';

export const ProductPricing = ({ formData, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Prix (FCFA)</label>
        <input
          type="number"
          value={formData.price || ''}
          onChange={(e) => onChange({ price: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix du marché (FCFA)</label>
        <input
          type="number"
          value={formData.market_price || ''}
          onChange={(e) => onChange({ market_price: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
        />
        <p className="mt-1 text-sm text-gray-500">Prix habituel sur le marché</p>
      </div>
    </div>

    <div className="border-t pt-4">
      <h4 className="font-medium mb-4">Options de livraison</h4>
      <p className="text-sm text-gray-500 mb-4">Au moins une option de livraison doit être activée</p>
      
      <div className="space-y-4">
        {/* Maritime Shipping */}
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sea_shipping"
              checked={formData.sea_shipping_available || false}
              onChange={(e) => onChange({ sea_shipping_available: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Ship size={20} className="text-gray-600" />
          </div>
          
          <div className="flex-1">
            <label htmlFor="sea_shipping" className="block text-sm font-medium text-gray-700">
              Transport maritime
            </label>
            <input
              type="number"
              value={formData.sea_shipping_cost || ''}
              onChange={(e) => onChange({ sea_shipping_cost: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              placeholder="Frais de port maritime (FCFA)"
              disabled={!formData.sea_shipping_available}
              required={formData.sea_shipping_available}
            />
          </div>
        </div>

        {/* Air Shipping */}
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="air_shipping"
              checked={formData.air_shipping_available || false}
              onChange={(e) => onChange({ air_shipping_available: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Plane size={20} className="text-gray-600" />
          </div>
          
          <div className="flex-1">
            <label htmlFor="air_shipping" className="block text-sm font-medium text-gray-700">
              Transport aérien
            </label>
            <input
              type="number"
              value={formData.air_shipping_cost || ''}
              onChange={(e) => onChange({ air_shipping_cost: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              placeholder="Frais de port aérien (FCFA)"
              disabled={!formData.air_shipping_available}
              required={formData.air_shipping_available}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);