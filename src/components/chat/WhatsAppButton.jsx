import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useWhatsAppConfig } from '../../hooks/useWhatsAppConfig';

export const WhatsAppButton = () => {
  const { whatsappNumber, loading } = useWhatsAppConfig();

  if (loading) return null;

  const handleClick = () => {
    const message = encodeURIComponent("Bonjour, j'ai une question concernant ma commande.");
    const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};