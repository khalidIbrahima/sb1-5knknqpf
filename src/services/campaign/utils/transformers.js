export const transformCampaignData = (campaign) => ({
  ...campaign,
  products: campaign.products?.map(p => p.product) || []
});