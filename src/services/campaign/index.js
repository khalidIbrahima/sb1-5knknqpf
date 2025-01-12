import { getCampaigns } from './queries/getCampaigns';
import { getCampaignById } from './queries/getCampaignById';
import { createCampaign } from './mutations/createCampaign';
import { updateCampaign } from './mutations/updateCampaign';
import { endCampaign } from './mutations/endCampaign';

export const campaignService = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  endCampaign
};