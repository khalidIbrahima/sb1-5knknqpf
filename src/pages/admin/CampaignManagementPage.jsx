import React from 'react';
import { CampaignManagement } from '../../components/admin/CampaignManagement';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export const CampaignManagementPage = () => {
  return (
    <ProtectedRoute requireAdmin>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Campagnes</h1>
        </div>
        <CampaignManagement />
      </div>
    </ProtectedRoute>
  );
};