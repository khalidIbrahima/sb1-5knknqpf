/**
 * Find the target campaign for a new order
 * First tries to find an active campaign, then looks for the nearest future campaign
 * @param {Array} campaigns List of all campaigns
 * @returns {Object|null} Target campaign or null if none found
 */
export const findTargetCampaign = (campaigns) => {
  const now = new Date();
  
  // First try to find active campaign
  const activeCampaign = campaigns.find(campaign => 
    campaign.is_active && 
    new Date(campaign.start_date) <= now &&
    new Date(campaign.end_date) >= now
  );
  
  if (activeCampaign) return activeCampaign;

  // If no active campaign, find nearest future campaign
  const futureCampaigns = campaigns
    .filter(campaign => campaign.is_active && new Date(campaign.start_date) > now)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  return futureCampaigns[0] || null;
};

/**
 * Check if a campaign is currently active
 * @param {Object} campaign Campaign to check
 * @returns {boolean} True if campaign is active
 */
export const isCampaignActive = (campaign) => {
  if (!campaign?.is_active) return false;
  
  const now = new Date();
  const startDate = new Date(campaign.start_date);
  const endDate = new Date(campaign.end_date);
  
  return startDate <= now && now <= endDate;
};