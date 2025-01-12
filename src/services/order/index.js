import { getOrders } from './queries/getOrders';
import { createOrder } from './mutations/createOrder';
import { updateOrderStatus } from './mutations/updateOrderStatus';
import { updatePaymentStatus } from './mutations/updatePaymentStatus';
import { updateTrackingInfo } from './mutations/updateTrackingInfo';

export const orderService = {
  getOrders,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updateTrackingInfo
};