import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useCampaignStore } from '../store/campaignStore';

export const CampaignBanner = () => {
  const { isAdmin } = useAuthStore();
  const { activeCampaign } = useCampaignStore();

  // Only show banner to admin users
  if (!isAdmin || !activeCampaign) return null;

  const endDate = new Date(activeCampaign.end_date);
  const formattedEndDate = endDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-blue-50 border-b border-blue-100 p-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <span className="text-sm text-blue-800">
          Campagne en cours : <strong>{activeCampaign.name}</strong>
        </span>
        <span className="text-sm text-blue-600">
          Clôture le {formattedEndDate}
        </span>
      </div>
    </div>
  );
};