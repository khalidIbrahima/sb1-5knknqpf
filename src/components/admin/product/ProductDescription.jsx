import React from 'react';

export const ProductDescription = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows={3}
      required
    />
  </div>
);