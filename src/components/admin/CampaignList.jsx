import React from 'react';
import { Power } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { CampaignStatus } from './campaign/CampaignStatus';
import { CAMPAIGN_STATUS, getCampaignStatus } from '../../constants/campaignStatus';

export const CampaignList = ({ campaigns, onEndCampaign, onSelectCampaign }) => {
  const activeCampaigns = campaigns.filter(c => 
    getCampaignStatus(c) !== CAMPAIGN_STATUS.ENDED
  );
  const endedCampaigns = campaigns.filter(c => 
    getCampaignStatus(c) === CAMPAIGN_STATUS.ENDED
  );

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-medium mb-4">Campagnes en cours</h3>
        <div className="space-y-4">
          {activeCampaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEndCampaign={onEndCampaign}
              onSelect={onSelectCampaign}
            />
          ))}
          {activeCampaigns.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Aucune campagne active
            </p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4">Campagnes terminées</h3>
        <div className="space-y-4">
          {endedCampaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onSelect={onSelectCampaign}
            />
          ))}
          {endedCampaigns.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Aucune campagne terminée
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const CampaignCard = ({ campaign, onEndCampaign, onSelect }) => {
  const status = getCampaignStatus(campaign);
  const canEnd = status === CAMPAIGN_STATUS.ACTIVE;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium">{campaign.name}</h4>
          <CampaignStatus campaign={campaign} />
        </div>
        <p className="text-sm text-gray-600">
          Du {formatDate(campaign.start_date)} au {formatDate(campaign.end_date)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {campaign.products?.length || 0} produits
        </p>
      </div>
      <div className="flex items-center gap-4">
        {canEnd && onEndCampaign && (
          <button
            onClick={() => onEndCampaign(campaign)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            title="Clôturer la campagne"
          >
            <Power size={20} />
          </button>
        )}
        <button
          onClick={() => onSelect(campaign)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};