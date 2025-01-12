import { useProductStore } from '../store/productStore';
import { useCampaignStore } from '../store/campaignStore';

export const useAdminProducts = () => {
  const { products } = useProductStore();
  const { activeCampaign } = useCampaignStore();

  return {
    products,
    activeCampaign
  };
};