import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Retry configuration
const RETRY_COUNT = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 10000; // 10 seconds
const JITTER_MAX = 200; // Maximum random delay to add

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Add random jitter to prevent thundering herd
const addJitter = (baseDelay) => {
  return baseDelay + Math.random() * JITTER_MAX;
};

// Exponential backoff with jitter
const getRetryDelay = (attempt) => {
  const baseDelay = Math.min(
    INITIAL_RETRY_DELAY * Math.pow(2, attempt),
    MAX_RETRY_DELAY
  );
  return addJitter(baseDelay);
};

// Enhanced retry wrapper with exponential backoff
export const withRetry = async (operation, retries = RETRY_COUNT) => {
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Only retry on network errors, rate limits, or timeouts
      if (!error.message?.includes('Failed to fetch') && 
          error.status !== 429 && 
          error.code !== 'ECONNABORTED' &&
          error.code !== 'ETIMEDOUT') {
        throw error;
      }

      if (attempt === retries - 1) {
        throw error;
      }

      const retryDelay = getRetryDelay(attempt);
      console.warn(`Retry attempt ${attempt + 1}/${retries} after ${retryDelay}ms`, error);
      await delay(retryDelay);
    }
  }

  throw lastError;
};

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'x-client-info': 'groupage-app'
    },
    // Enhanced fetch with timeout and retry
    fetch: async (...args) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      try {
        const response = await withRetry(async () => {
          const res = await fetch(...args, { 
            signal: controller.signal,
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          return res;
        });

        return response;
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }
});

// Enhanced error handler
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  
  // Network errors
  if (error.message?.includes('Failed to fetch') || 
      error.code === 'ECONNABORTED' || 
      error.code === 'ETIMEDOUT') {
    throw new Error('La connexion au serveur a échoué. Veuillez vérifier votre connexion internet et réessayer.');
  }
  
  // Authentication errors
  if (error.code?.startsWith('auth/')) {
    throw new Error('Erreur d\'authentification. Veuillez vous reconnecter.');
  }
  
  // Permission errors
  if (error.code === '42501' || error.code === 'PGRST301') {
    throw new Error('Vous n\'avez pas les permissions nécessaires pour effectuer cette action.');
  }
  
  // Rate limiting
  if (error.status === 429 || error.code === '429') {
    throw new Error('Trop de requêtes. Veuillez patienter quelques instants avant de réessayer.');
  }
  
  // Database constraint violations
  if (error.code === '23505') {
    throw new Error('Cette donnée existe déjà.');
  }
  
  // Database errors
  if (error.code?.startsWith('23')) {
    throw new Error('Les données fournies sont invalides. Veuillez vérifier vos informations.');
  }
  
  // Default error
  throw new Error('Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.');
};