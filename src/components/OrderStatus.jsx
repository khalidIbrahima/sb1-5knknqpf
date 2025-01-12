import React from 'react';
import { ORDER_STATUSES, canCancelOrder } from '../constants/orderStatus';

const StatusStep = ({ step, isActive, isCompleted }) => (
  <div className="relative flex flex-col items-center">
    <div className={`rounded-full h-12 w-12 flex items-center justify-center ${
      isCompleted ? 'bg-green-600 text-white' :
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-300'
    }`}>
      {step.icon || (isCompleted ? '✓' : step.index)}
    </div>
    <div className="text-xs mt-2">{step.label}</div>
  </div>
);

const StatusLine = ({ isCompleted }) => (
  <div className={`flex-1 h-1 ${
    isCompleted ? 'bg-green-600' : 'bg-gray-300'
  }`} />
);

export const OrderStatus = ({ order }) => {
  if (!order) return null;

  // Define active steps based on order status
  const activeSteps = [
    { status: ORDER_STATUSES.PENDING, label: 'En attente', index: 1 },
    { status: ORDER_STATUSES.VALIDATED, label: 'Validé', index: 2 },
    { status: ORDER_STATUSES.PREPARING, label: 'En préparation', index: 3 },
    { status: ORDER_STATUSES.SHIPPED, label: 'Expédié', index: 4 },
    { status: ORDER_STATUSES.IN_TRANSIT, label: 'En transit', index: 5 },
    { status: ORDER_STATUSES.ARRIVED, label: 'Arrivé au Sénégal', index: 6 },
    { status: ORDER_STATUSES.DELIVERED, label: 'Livré', index: 7 }
  ];

  // Only show cancelled status if the order is actually cancelled
  if (order.status === ORDER_STATUSES.CANCELLED) {
    return (
      <div className="w-full py-6 flex items-center justify-center">
        <div className="text-red-600 font-medium text-lg">
          Commande annulée
        </div>
      </div>
    );
  }

  const currentStepIndex = activeSteps.findIndex(step => step.status === order.status);

  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {activeSteps.map((step, index) => (
          <React.Fragment key={step.status}>
            <StatusStep
              step={step}
              isActive={index === currentStepIndex}
              isCompleted={index < currentStepIndex}
            />
            {index < activeSteps.length - 1 && (
              <StatusLine isCompleted={index < currentStepIndex} />
            )}
          </React.Fragment>
        ))}
      </div>

      {order.tracking_url && (
        <div className="mt-4 text-center">
          <a 
            href={order.tracking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Suivre ma commande
          </a>
        </div>
      )}

      {canCancelOrder(order.status) && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Vous pouvez annuler votre commande tant qu'elle n'a pas été validée
          </p>
        </div>
      )}
    </div>
  );
};