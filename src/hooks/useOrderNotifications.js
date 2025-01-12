import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { supabase } from '../lib/supabase';

export const useOrderNotifications = () => {
  const { isAdmin } = useAuthStore();
  const { addOrder } = useOrderStore();

  useEffect(() => {
    if (!isAdmin) return;

    // Subscribe to new orders
    const subscription = supabase
      .channel('orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          // Show notification
          const notification = new Notification('Nouvelle commande', {
            body: `Commande #${payload.new.id} reçue`,
            icon: '/vite.svg'
          });

          // Add order to store
          addOrder(payload.new);
        }
      )
      .subscribe();

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin, addOrder]);
};