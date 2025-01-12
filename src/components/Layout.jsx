import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut, User, ShoppingCart, Info, Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { AuthModal } from './auth/AuthModal';
import { WhatsAppButton } from './chat/WhatsAppButton';
import { useAuthModal } from '../hooks/useAuthModal';
import { supabase } from '../lib/supabase';

const NavLink = ({ to, children, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-white bg-white/10' 
          : 'text-white/80 hover:text-white hover:bg-white/5'
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export const Layout = ({ children }) => {
  const { isOpen, openAuthModal, closeAuthModal } = useAuthModal();
  const { user, isAdmin, setUser, signOut } = useAuthStore();
  const cartItems = useCartStore(state => state.items);
  const { items: wishlistItems, fetchWishlist } = useWishlistStore();
  const clearCart = useCartStore(state => state.clearCart);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchWishlist();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchWishlist();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchWishlist]);

  const handleSignOut = async () => {
    try {
      await signOut();
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and main nav */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 text-white">
                <img src="/logo.svg" alt="KaliExpress" className="h-8 w-8" />
                <span className="font-bold text-xl">KaliExpress</span>
              </Link>

              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/">
                  <Package size={20} />
                  <span>Produits</span>
                </NavLink>
                <NavLink to="/about">
                  <Info size={20} />
                  <span>À propos</span>
                </NavLink>
              </div>
            </div>

            {/* Right side - Cart and user menu */}
            <div className="flex items-center space-x-4">
              {!isAdmin && user && (
                <NavLink to="/wishlist" className="relative">
                  <Heart size={20} />
                  <span>Favoris</span>
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </NavLink>
              )}

              {!isAdmin && (
                <NavLink to="/cart" className="relative">
                  <ShoppingCart size={20} />
                  <span>Panier</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              )}

              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin ? (
                    <NavLink to="/admin">
                      <Settings size={20} />
                      <span>Admin</span>
                    </NavLink>
                  ) : (
                    <NavLink to="/orders">
                      <Package size={20} />
                      <span>Mes Commandes</span>
                    </NavLink>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <User size={20} />
                  <span>Connexion</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        {children}
      </main>

      <WhatsAppButton />
      <AuthModal isOpen={isOpen} onClose={closeAuthModal} />
    </div>
  );
};