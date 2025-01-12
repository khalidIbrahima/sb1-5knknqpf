import React from 'react';
import { ProductManagement } from '../../components/admin/ProductManagement';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export const ProductManagementPage = () => {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Produits</h1>
        </div>
        <ProductManagement />
      </div>
    </ProtectedRoute>
  );
};