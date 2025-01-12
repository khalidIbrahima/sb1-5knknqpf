import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ErrorMessage = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-4 text-red-600 ${className}`}>
      <AlertTriangle className="w-5 h-5 mr-2" />
      <span>{message}</span>
    </div>
  );
};