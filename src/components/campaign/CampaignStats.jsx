import React from 'react';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

export const CampaignStats = ({ stats }) => {
  const cards = [
    {
      title: 'Total Commandes',
      value: stats.totalOrders,
      icon: Package,
      color: 'from-blue-400 to-blue-300'
    },
    {
      title: 'Chiffre d\'affaires',
      value: `${stats.totalRevenue.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'from-emerald-400 to-emerald-300'
    },
    {
      title: 'Panier Moyen',
      value: `${Math.round(stats.averageOrder).toLocaleString()} FCFA`,
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-300'
    },
    {
      title: 'Clients',
      value: stats.uniqueCustomers,
      icon: Users,
      color: 'from-amber-400 to-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ title, value, icon: Icon, color }) => (
        <div 
          key={title}
          className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 font-medium">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};