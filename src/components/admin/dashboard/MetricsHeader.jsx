import React from 'react';
import { Package, DollarSign, TrendingUp, Users, XCircle } from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';

export const MetricsHeader = ({ metrics }) => {
  if (!metrics) return null;

  const { totalOrders, totalRevenue, totalCustomers, cancelledOrders } = metrics;
  const averageOrder = metrics.activeOrders > 0 ? totalRevenue / metrics.activeOrders : 0;
  const cancellationRate = metrics.cancellationRate;

  const cards = [
    {
      title: 'Total Commandes',
      value: totalOrders,
      icon: Package,
      color: 'from-blue-400 to-blue-300'
    },
    {
      title: 'Chiffre d\'affaires',
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: 'from-emerald-400 to-emerald-300',
      subtitle: `${metrics.activeOrders} commandes actives`
    },
    {
      title: 'Commandes Annulées',
      value: cancelledOrders,
      icon: XCircle,
      color: 'from-red-400 to-red-300',
      subtitle: `${cancellationRate}% d'annulation`
    },
    {
      title: 'Panier Moyen',
      value: formatPrice(averageOrder),
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-300'
    },
    {
      title: 'Clients',
      value: totalCustomers,
      icon: Users,
      color: 'from-amber-400 to-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map(({ title, value, subtitle, icon: Icon, color }) => (
        <div 
          key={title}
          className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 font-medium">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              {subtitle && (
                <p className="text-sm text-white/70 mt-1">{subtitle}</p>
              )}
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