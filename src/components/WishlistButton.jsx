import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { useAuthModal } from '../hooks/useAuthModal';

export const WishlistButton = ({ productId, className = '' }) => {
  const { user } = useAuthStore();
  const { items, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { openAuthModal } = useAuthModal();
  
  // Only check wishlist status if user is logged in
  const isInWishlist = user ? items.some(item => item.product_id === productId) : false;

  const handleClick = async (e) => {
    e.stopPropagation(); // Prevent event bubbling

    if (!user) {
      openAuthModal();
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error('Error managing wishlist:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isInWishlist
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
      } ${className}`}
      title={isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart
        size={20}
        className={isInWishlist ? 'fill-current' : ''}
      />
    </button>
  );
};