import { useState, useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { productService } from '../services/productService';

export const useProducts = () => {
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return { products, loading, error };
};