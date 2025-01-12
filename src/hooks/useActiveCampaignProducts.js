import { useMemo } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { useProductStore } from '../store/productStore';

export const useActiveCampaignProducts = () => {
  const { activeCampaign } = useCampaignStore();
  const { products } = useProductStore();

  const activeProducts = useMemo(() => {
    if (!activeCampaign) return [];

    return products.filter(product => {
      const campaignProduct = product.campaign_products?.find(
        cp => cp.campaign_id === activeCampaign.id
      );
      return campaignProduct?.is_active;
    });
  }, [products, activeCampaign]);

  return {
    products: activeProducts,
    activeCampaign
  };
};