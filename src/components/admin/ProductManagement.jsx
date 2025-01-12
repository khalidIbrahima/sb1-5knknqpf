import React, { useState, useEffect } from 'react';
import { Plus, Tag } from 'lucide-react';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useCategoryStore } from '../../store/categoryStore';
import { useProductStore } from '../../store/productStore';
import { ProductStatusToggle } from './ProductStatusToggle';
import { ProductForm } from './ProductForm';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { SearchInput } from './SearchInput';

export const ProductManagement = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { products, activeCampaign } = useAdminProducts();
  const { createProduct, updateProduct } = useProductStore();
  const { fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestion des Produits</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Tag size={20} />
              Catégories
            </button>
            <button
              onClick={() => setShowProductForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} />
              Nouveau Produit
            </button>
          </div>
        </div>

        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher un produit..."
          />
        </div>

        {showCategories && (
          <div className="mb-6 border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Catégories</h3>
              <button
                onClick={() => setShowCategoryForm(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Plus size={16} />
                Nouvelle Catégorie
              </button>
            </div>
            <CategoryList />
          </div>
        )}

        <div className="space-y-4">
          {filteredProducts.map(product => (
            <ProductStatusToggle 
              key={product.id} 
              product={product}
              onEdit={handleEdit}
              activeCampaign={activeCampaign}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
            </div>
          )}
        </div>
      </div>

      {(showProductForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          onSubmit={editingProduct ? handleUpdate : createProduct}
        />
      )}

      {showCategoryForm && (
        <CategoryForm onClose={() => setShowCategoryForm(false)} />
      )}
    </div>
  );
};