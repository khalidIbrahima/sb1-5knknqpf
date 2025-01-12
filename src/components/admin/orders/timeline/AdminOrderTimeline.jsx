import React from 'react';
import { formatDate } from '../../../../utils/dateUtils';
import { AdminTimelineItem } from './AdminTimelineItem';

export const AdminOrderTimeline = ({ history = [] }) => {
  if (!history.length) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-4">Historique des statuts</h4>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="relative">
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
            <ul className="relative flex items-start gap-4 px-4">
              {history.map((entry, idx) => (
                <AdminTimelineItem
                  key={entry.id}
                  status={entry.status}
                  date={formatDate(entry.created_at)}
                  notes={entry.notes}
                  updatedBy={entry.updated_by_email}
                  isLast={idx === history.length - 1}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};