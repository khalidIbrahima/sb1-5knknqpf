import React from 'react';
import { useParams } from 'react-router-dom';
import { CampaignOverview } from '../components/campaign/CampaignOverview';
import { CampaignStats } from '../components/campaign/CampaignStats';
import { CampaignProducts } from '../components/campaign/CampaignProducts';
import { CampaignOrders } from '../components/campaign/CampaignOrders';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCampaignDetails } from '../hooks/useCampaignDetails';

export const CampaignDetails = () => {
  const { id } = useParams();
  const { campaign, stats, loading, error } = useCampaignDetails(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Une erreur est survenue lors du chargement de la campagne
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center text-gray-600 py-8">
        Campagne non trouvée
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CampaignOverview campaign={campaign} />
      <CampaignStats stats={stats} />
      
      <div className="grid lg:grid-cols-2 gap-8">
        <CampaignProducts campaign={campaign} />
        <CampaignOrders campaign={campaign} />
      </div>
    </div>
  );
};