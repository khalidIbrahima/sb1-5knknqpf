import { create } from 'zustand';
import { campaignService } from '../services/campaign';

export const useCampaignStore = create((set) => ({
  campaigns: [],
  activeCampaign: null,
  loading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ loading: true, error: null });
    try {
      const data = await campaignService.getCampaigns();
      const activeCampaign = data.find(campaign => 
        campaign.is_active && 
        new Date(campaign.start_date) <= new Date() &&
        new Date(campaign.end_date) >= new Date()
      );

      set({ campaigns: data, activeCampaign, loading: false });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      set({ error: error.message, loading: false });
    }
  },

  endCampaign: async (id) => {
    set({ error: null });
    try {
      await campaignService.endCampaign(id);
      set(state => ({
        campaigns: state.campaigns.map(c => 
          c.id === id ? { ...c, is_active: false } : c
        ),
        activeCampaign: state.activeCampaign?.id === id ? null : state.activeCampaign
      }));
    } catch (error) {
      console.error('Error ending campaign:', error);
      set({ error: error.message });
      throw error;
    }
  }
}));