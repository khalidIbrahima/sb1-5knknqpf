import { useMemo } from 'react';
import { useProductStore } from '../store/productStore';

export const useCampaignProducts = (campaign) => {
  const { products } = useProductStore();

  const campaignProducts = useMemo(() => {
    if (!campaign) return [];
    
    return products.map(product => {
      const campaignProduct = product.campaign_products?.find(
        cp => cp.campaign_id === campaign.id
      );
      return {
        ...product,
        isActive: campaignProduct?.is_active ?? false,
        campaignProductId: campaignProduct?.id
      };
    });
  }, [products, campaign]);

  return campaignProducts;
};