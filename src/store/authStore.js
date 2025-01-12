import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { userService } from '../services/userService';

export const useAuthStore = create((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  
  setUser: async (authUser) => {
    if (!authUser) {
      set({ user: null, isAdmin: false, loading: false });
      return;
    }

    try {
      let userData = await userService.getCurrentUser();
      
      if (!userData) {
        userData = await userService.createUser({
          id: authUser.id,
          email: authUser.email,
          is_admin: false
        });
      }

      set({ 
        user: userData,
        isAdmin: userData?.is_admin || false,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ user: null, isAdmin: false, loading: false });
    }
  },
  
  signInWithEmail: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email ou mot de passe incorrect');
      }
      throw error;
    }
  },

  signUp: async (email, password) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return user;
    } catch (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('Cet email est déjà utilisé');
      }
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user state
      set({ user: null, isAdmin: false });
      
      // Clear any other app state that should be reset on logout
      localStorage.clear();
      sessionStorage.clear();
      
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
}));