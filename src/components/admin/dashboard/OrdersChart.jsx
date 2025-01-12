import React from 'react';
import { ORDER_STATUSES } from '../../../constants/orderStatus';

export const OrdersChart = ({ data = [] }) => {
  if (!data?.length) return null;

  // Process data to separate active and cancelled orders
  const processedData = data.map(day => ({
    date: day.date,
    activeCount: day.orders?.filter(o => o.status !== ORDER_STATUSES.CANCELLED).length || 0,
    cancelledCount: day.orders?.filter(o => o.status === ORDER_STATUSES.CANCELLED).length || 0
  }));

  const maxCount = Math.max(...processedData.map(d => d.activeCount + d.cancelledCount));
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Évolution des commandes</h3>
      <div className="relative h-[200px]">
        <div className="absolute inset-0 flex items-end justify-between">
          {processedData.map(({ date, activeCount, cancelledCount }) => {
            const totalHeight = ((activeCount + cancelledCount) / maxCount) * chartHeight;
            const activeHeight = (activeCount / maxCount) * chartHeight;
            const cancelledHeight = (cancelledCount / maxCount) * chartHeight;

            return (
              <div key={date} className="flex flex-col items-center w-8">
                <div className="relative w-4">
                  {/* Active orders bar */}
                  <div 
                    className="absolute bottom-0 w-full bg-green-500 rounded-t transition-all duration-300"
                    style={{ height: `${activeHeight}px` }}
                  />
                  {/* Cancelled orders bar */}
                  <div 
                    className="absolute w-full bg-red-500 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${cancelledHeight}px`,
                      bottom: `${activeHeight}px`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-top-left">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-sm">Commandes actives</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span className="text-sm">Commandes annulées</span>
        </div>
      </div>
    </div>
  );
};