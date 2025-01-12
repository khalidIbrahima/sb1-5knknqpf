import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: CreditCard,
    description: 'Paiement sécurisé par carte bancaire'
  },
  {
    id: 'orange_money',
    name: 'Orange Money',
    icon: Smartphone,
    description: 'Paiement via Orange Money'
  },
  {
    id: 'wave',
    name: 'Wave',
    icon: Smartphone,
    description: 'Paiement via Wave'
  }
];

export const PaymentMethodSelector = ({ selected, onSelect, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Mode de paiement</h2>
      
      <div className="space-y-3">
        {PAYMENT_METHODS.map(method => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selected === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={selected === method.id}
              onChange={(e) => onSelect(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                selected === method.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <method.icon className={`w-6 h-6 ${
                  selected === method.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          Veuillez sélectionner un mode de paiement
        </p>
      )}
    </div>
  );
};