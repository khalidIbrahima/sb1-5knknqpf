import React from 'react';
import { useCampaignStore } from '../../../store/campaignStore';
import { useMetricsStore } from '../../../store/metricsStore';

export const CampaignFilter = () => {
  const { campaigns } = useCampaignStore();
  const { selectedCampaign, fetchMetrics } = useMetricsStore();

  const handleChange = (e) => {
    const campaignId = e.target.value || null;
    fetchMetrics(campaignId);
  };

  return (
    <div className="mb-6">
      <select
        value={selectedCampaign || ''}
        onChange={handleChange}
        className="w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Toutes les campagnes</option>
        {campaigns.map(campaign => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.name}
          </option>
        ))}
      </select>
    </div>
  );
};