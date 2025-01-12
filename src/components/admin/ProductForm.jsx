import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCategoryStore } from '../../store/categoryStore';
import { ProductBasicInfo } from './product/ProductBasicInfo';
import { ProductDescription } from './product/ProductDescription';
import { ProductPricing } from './product/ProductPricing';
import { AttributeManager } from './product/AttributeManager';
import { ImageManager } from './product/ImageManager';

export const ProductForm = ({ product, onClose, onSubmit }) => {
  const { categories } = useCategoryStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    sizes: [],
    colors: [],
    sea_shipping_available: true,
    sea_shipping_cost: '',
    air_shipping_available: false,
    air_shipping_cost: '',
    categories: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        images: product.images || [''],
        sizes: product.sizes || [],
        colors: product.colors || [],
        sea_shipping_available: product.sea_shipping_available ?? true,
        sea_shipping_cost: product.sea_shipping_cost || '',
        air_shipping_available: product.air_shipping_available || false,
        air_shipping_cost: product.air_shipping_cost || '',
        categories: flattenCategories(categories)
      });
    } else {
      setFormData(prev => ({
        ...prev,
        categories: flattenCategories(categories)
      }));
    }
  }, [product, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Flatten categories for the select input
  const flattenCategories = (cats, level = 0) => {
    return cats.reduce((acc, cat) => {
      acc.push({
        ...cat,
        level,
        displayName: '  '.repeat(level) + cat.name
      });
      if (cat.children?.length) {
        acc.push(...flattenCategories(cat.children, level + 1));
      }
      return acc;
    }, []);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {product ? 'Modifier le Produit' : 'Nouveau Produit'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProductBasicInfo formData={formData} onChange={updateFormData} />
          <ProductDescription value={formData.description} onChange={(value) => updateFormData({ description: value })} />
          <ProductPricing formData={formData} onChange={updateFormData} />
          <AttributeManager formData={formData} onChange={updateFormData} />
          <ImageManager images={formData.images} onChange={(images) => updateFormData({ images })} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {product ? 'Mettre à jour' : 'Créer le produit'}
          </button>
        </form>
      </div>
    </div>
  );
};