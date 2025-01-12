import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Ship, MapPin, Home, User } from 'lucide-react';

const STATUS_ICONS = {
  en_attente: Clock,
  validé: CheckCircle2,
  en_preparation: Package,
  expédié: Ship,
  en_transit: Truck,
  arrivé_senegal: MapPin,
  livré: Home
};

const STATUS_COLORS = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  validé: 'bg-blue-100 text-blue-800',
  en_preparation: 'bg-purple-100 text-purple-800',
  expédié: 'bg-indigo-100 text-indigo-800',
  en_transit: 'bg-cyan-100 text-cyan-800',
  arrivé_senegal: 'bg-green-100 text-green-800',
  livré: 'bg-emerald-100 text-emerald-800'
};

export const AdminTimelineItem = ({ status, date, notes, updatedBy, isLast }) => {
  const Icon = STATUS_ICONS[status] || Clock;
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <li className="flex-shrink-0 w-40">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center z-10 ring-4 ring-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-medium">
            {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
          {notes && (
            <p className="text-xs text-gray-500 mt-1 max-w-[120px] truncate" title={notes}>
              {notes}
            </p>
          )}
          {updatedBy && (
            <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <User size={12} />
              <span className="truncate max-w-[100px]" title={updatedBy}>
                {updatedBy}
              </span>
            </p>
          )}
        </div>
      </div>
    </li>
  );
};