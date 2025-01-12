import React, { useEffect } from 'react';
import { ProductManagement } from '../components/admin/ProductManagement';
import { OrderManagement } from '../components/admin/OrderManagement';
import { CampaignManagement } from '../components/admin/CampaignManagement';
import { MetricsHeader } from '../components/admin/dashboard/MetricsHeader';
import { OrdersChart } from '../components/admin/dashboard/OrdersChart';
import { CampaignFilter } from '../components/admin/dashboard/CampaignFilter';
import { OrderNotifications } from '../components/admin/dashboard/OrderNotifications';
import { RecentOrders } from '../components/admin/dashboard/RecentOrders';
import { useMetricsStore } from '../store/metricsStore';
import { useCampaignStore } from '../store/campaignStore';
import { useProductStore } from '../store/productStore';
import { useOrderNotifications } from '../hooks/useOrderNotifications';

export const AdminDashboard = () => {
  const { metrics, loading, fetchMetrics } = useMetricsStore();
  const { fetchCampaigns } = useCampaignStore();
  const { fetchProducts } = useProductStore();
  
  // Initialize order notifications
  useOrderNotifications();

  useEffect(() => {
    fetchMetrics();
    fetchCampaigns();
    fetchProducts();
  }, [fetchMetrics, fetchCampaigns, fetchProducts]);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-4 px-4 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard Admin</h1>
          <OrderNotifications />
          <CampaignFilter />
          
          {loading ? (
            <div className="text-center py-8 text-white">Chargement des métriques...</div>
          ) : (
            <MetricsHeader metrics={metrics} />
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 shadow-lg">
          <OrdersChart data={metrics?.dailyOrders} />
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 shadow-lg">
          <RecentOrders />
        </div>
      </div>
      
      <div className="grid gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Gestion des Campagnes</h2>
          </div>
          <div className="p-6">
            <CampaignManagement />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Gestion des Produits</h2>
            </div>
            <div className="p-6">
              <ProductManagement />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Gestion des Commandes</h2>
            </div>
            <div className="p-6">
              <OrderManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};