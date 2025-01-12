import React from 'react';
import { supabase } from '../../lib/supabase';

const socialProviders = [
  {
    id: 'google',
    name: 'Google',
    icon: 'https://www.google.com/favicon.ico'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://www.facebook.com/favicon.ico'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: null,
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
      </svg>
    )
  }
];

export const SocialAuthButtons = ({ onSuccess }) => {
  const handleSocialSignIn = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {socialProviders.map(provider => (
          <button
            key={provider.id}
            onClick={() => handleSocialSignIn(provider.id)}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {provider.icon ? (
              <img src={provider.icon} alt={provider.name} className="w-5 h-5" />
            ) : provider.svgIcon}
            Continuer avec {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};