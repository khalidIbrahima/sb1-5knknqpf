import React from 'react';
import { 
  CAMPAIGN_STATUS_LABELS, 
  CAMPAIGN_STATUS_COLORS,
  getCampaignStatus 
} from '../../../constants/campaignStatus';

export const CampaignStatus = ({ campaign }) => {
  const status = getCampaignStatus(campaign);
  if (!status) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CAMPAIGN_STATUS_COLORS[status]}`}>
      {CAMPAIGN_STATUS_LABELS[status]}
    </span>
  );
};