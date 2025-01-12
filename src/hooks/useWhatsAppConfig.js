import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useWhatsAppConfig = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+221761800649');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_config')
          .select('whatsapp_number')
          .single();

        if (error) throw error;
        if (data?.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { whatsappNumber, loading };
};