import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { useCampaignStore } from '../store/campaignStore';
import { useCategoryStore } from '../store/categoryStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';

export const useInitialData = () => {
  const { fetchProducts } = useProductStore();
  const { fetchCampaigns } = useCampaignStore();
  const { fetchCategories } = useCategoryStore();
  const { getOrders } = useOrderStore();
  const { user } = useAuthStore();

  // Load public data
  useEffect(() => {
    const loadPublicData = async () => {
      try {
        await Promise.allSettled([
          fetchProducts(),
          fetchCampaigns(),
          fetchCategories()
        ]);
      } catch (error) {
        console.error('Error loading public data:', error);
      }
    };

    loadPublicData();
  }, [fetchProducts, fetchCampaigns, fetchCategories]);

  // Load user-specific data
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        await getOrders();
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user, getOrders]);
};