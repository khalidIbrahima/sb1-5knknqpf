import React from 'react';
import { History } from 'lucide-react';
import { formatDate } from '../../../utils/dateUtils';

export const OrderHistory = ({ history = [] }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium flex items-center gap-2">
        <History size={16} className="text-gray-500" />
        Historique
      </h4>
      <div className="space-y-2">
        {history.map(entry => (
          <div 
            key={entry.id}
            className="text-sm border-l-2 border-gray-200 pl-4 py-2"
          >
            <p className="font-medium">
              {entry.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
            {entry.notes && (
              <p className="text-gray-600">{entry.notes}</p>
            )}
            <p className="text-gray-500 text-xs">
              {formatDate(entry.created_at)}
            </p>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-sm text-gray-500">
            Aucun historique disponible
          </p>
        )}
      </div>
    </div>
  );
};