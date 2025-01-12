import { useEffect, useState } from 'react';
import { campaignService } from '../services/campaign';

export const useCampaignDetails = (campaignId) => {
  const [campaign, setCampaign] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrder: 0,
    uniqueCustomers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await campaignService.getCampaignDetails(campaignId);
        setCampaign(data.campaign);
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchData();
    }
  }, [campaignId]);

  return { campaign, stats, loading, error };
};