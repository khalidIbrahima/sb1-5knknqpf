export const CAMPAIGN_STATUS = {
  PENDING: 'en_attente',
  ACTIVE: 'en_cours',
  ENDED: 'cloture'
};

export const getCampaignStatus = (campaign) => {
  if (!campaign) return null;
  
  const now = new Date();
  const startDate = new Date(campaign.start_date);
  const endDate = new Date(campaign.end_date);

  if (!campaign.is_active) {
    return CAMPAIGN_STATUS.ENDED;
  }

  if (now < startDate) {
    return CAMPAIGN_STATUS.PENDING;
  }

  if (now >= startDate && now <= endDate) {
    return CAMPAIGN_STATUS.ACTIVE;
  }

  return CAMPAIGN_STATUS.ENDED;
};

export const CAMPAIGN_STATUS_LABELS = {
  [CAMPAIGN_STATUS.PENDING]: 'En attente',
  [CAMPAIGN_STATUS.ACTIVE]: 'En cours',
  [CAMPAIGN_STATUS.ENDED]: 'Clôturé'
};

export const CAMPAIGN_STATUS_COLORS = {
  [CAMPAIGN_STATUS.PENDING]: 'bg-amber-100 text-amber-800',
  [CAMPAIGN_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
  [CAMPAIGN_STATUS.ENDED]: 'bg-gray-100 text-gray-800'
};