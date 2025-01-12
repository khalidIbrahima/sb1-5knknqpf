export const ORDER_STATUSES = {
  PENDING: 'en_attente',
  CANCELLED: 'annulé',
  VALIDATED: 'validé',
  PREPARING: 'en_preparation',
  SHIPPED: 'expédié',
  IN_TRANSIT: 'en_transit',
  ARRIVED: 'arrivé_senegal',
  DELIVERED: 'livré'
};

export const statusSteps = [
  { status: ORDER_STATUSES.PENDING, label: 'En attente', color: 'bg-yellow-500' },
  { status: ORDER_STATUSES.CANCELLED, label: 'Annulé', color: 'bg-red-500' },
  { status: ORDER_STATUSES.VALIDATED, label: 'Validé', color: 'bg-green-500' },
  { status: ORDER_STATUSES.PREPARING, label: 'En préparation', color: 'bg-blue-500' },
  { status: ORDER_STATUSES.SHIPPED, label: 'Expédié', color: 'bg-purple-500' },
  { status: ORDER_STATUSES.IN_TRANSIT, label: 'En transit', color: 'bg-indigo-500' },
  { status: ORDER_STATUSES.ARRIVED, label: 'Arrivé au Sénégal', color: 'bg-teal-500' },
  { status: ORDER_STATUSES.DELIVERED, label: 'Livré', color: 'bg-green-500' }
];

export const canCancelOrder = (status) => {
  return status === ORDER_STATUSES.PENDING;
};