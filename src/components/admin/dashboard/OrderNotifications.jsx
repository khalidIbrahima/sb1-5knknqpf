import React from 'react';
import { Bell } from 'lucide-react';

export const OrderNotifications = () => {
  const requestPermission = () => {
    Notification.requestPermission();
  };

  if (Notification.permission === 'denied') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-amber-700">
          <Bell className="shrink-0" size={20} />
          <p className="text-sm">
            Les notifications sont bloquées. Veuillez les activer dans les paramètres de votre navigateur pour recevoir les alertes de nouvelles commandes.
          </p>
        </div>
      </div>
    );
  }

  if (Notification.permission === 'default') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700">
            <Bell className="shrink-0" size={20} />
            <p className="text-sm">
              Activez les notifications pour être alerté des nouvelles commandes
            </p>
          </div>
          <button
            onClick={requestPermission}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Activer
          </button>
        </div>
      </div>
    );
  }

  return null;
};