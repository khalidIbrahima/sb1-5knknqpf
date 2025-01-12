import { getProducts } from './queries/getProducts';
import { createProduct } from './mutations/createProduct';
import { updateProduct } from './mutations/updateProduct';
import { toggleProductStatus } from './mutations/toggleProductStatus';

export const productService = {
  getProducts,
  createProduct,
  updateProduct,
  toggleProductStatus
};