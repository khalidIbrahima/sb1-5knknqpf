import React from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { TimelineItem } from './TimelineItem';

export const OrderTimeline = ({ history = [] }) => {
  if (!history.length) return null;

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="min-w-max">
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
          <ul className="relative flex items-start gap-4 px-4">
            {history.map((entry, idx) => (
              <TimelineItem
                key={entry.id}
                status={entry.status}
                date={formatDate(entry.created_at)}
                notes={entry.notes}
                isLast={idx === history.length - 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};