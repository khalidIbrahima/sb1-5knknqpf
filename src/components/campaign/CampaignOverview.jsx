import React from 'react';
import { Calendar, Package } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { CampaignStatus } from '../admin/campaign/CampaignStatus';

export const CampaignOverview = ({ campaign }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <CampaignStatus campaign={campaign} />
            <span className="flex items-center gap-1 text-gray-600">
              <Package size={18} />
              {campaign.products?.length || 0} produits
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>Du {formatDate(campaign.start_date)} au {formatDate(campaign.end_date)}</span>
        </div>
      </div>
    </div>
  );
};