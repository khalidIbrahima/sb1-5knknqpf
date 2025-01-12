import { create } from 'zustand';
import { metricsService } from '../services/metricsService';

export const useMetricsStore = create((set) => ({
  metrics: null,
  loading: false,
  error: null,
  selectedCampaign: null,

  fetchMetrics: async (campaignId = null) => {
    set({ loading: true, error: null });
    try {
      const data = await metricsService.getMetrics(campaignId);
      set({ 
        metrics: data, 
        loading: false,
        selectedCampaign: campaignId
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedCampaign: (campaignId) => {
    set({ selectedCampaign: campaignId });
  }
}));