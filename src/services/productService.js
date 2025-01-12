import { getProducts } from './product/queries/getProducts';
import { createProduct } from './product/mutations/createProduct';
import { updateProduct } from './product/mutations/updateProduct';

export const productService = {
  getProducts,
  createProduct,
  updateProduct
};