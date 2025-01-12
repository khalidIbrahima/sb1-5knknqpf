import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Package, ShoppingBag } from 'lucide-react';
import { MetricsHeader } from '../../components/admin/dashboard/MetricsHeader';
import { OrdersChart } from '../../components/admin/dashboard/OrdersChart';
import { CampaignFilter } from '../../components/admin/dashboard/CampaignFilter';
import { OrderNotifications } from '../../components/admin/dashboard/OrderNotifications';
import { RecentOrders } from '../../components/admin/dashboard/RecentOrders';
import { useMetricsStore } from '../../store/metricsStore';
import { useCampaignStore } from '../../store/campaignStore';
import { useProductStore } from '../../store/productStore';
import { useOrderNotifications } from '../../hooks/useOrderNotifications';

const AdminCard = ({ title, icon: Icon, to, description }) => (
  <Link 
    to={to}
    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export const AdminDashboard = () => {
  const { metrics, loading, fetchMetrics } = useMetricsStore();
  const { fetchCampaigns } = useCampaignStore();
  const { fetchProducts } = useProductStore();
  
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Gestion des Campagnes"
          icon={Calendar}
          to="/admin/campaigns"
          description="Gérer les campagnes de vente et leurs produits"
        />
        <AdminCard
          title="Gestion des Produits"
          icon={Package}
          to="/admin/products"
          description="Gérer le catalogue de produits"
        />
        <AdminCard
          title="Gestion des Commandes"
          icon={ShoppingBag}
          to="/admin/orders"
          description="Suivre et gérer les commandes clients"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 shadow-lg">
          <OrdersChart data={metrics?.dailyOrders} />
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 shadow-lg">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};