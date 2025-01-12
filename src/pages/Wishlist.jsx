import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { ProductPrice } from '../components/ProductPrice';
import { WishlistButton } from '../components/WishlistButton';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { items, loading } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // Always use air shipping for wishlist products if available
    const shippingMethod = product.air_shipping_available ? 'air' : 'sea';
    addToCart(product, 1, null, null, shippingMethod);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Mes Favoris</h1>
        <span className="text-sm text-gray-500">
          ({items.length} {items.length > 1 ? 'articles' : 'article'})
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Heart size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-4">Votre liste de favoris est vide</p>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-600"
          >
            Découvrir nos produits
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ product }) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-square">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <WishlistButton productId={product.id} />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <ProductPrice 
                  price={product.price}
                  marketPrice={product.market_price}
                  shippingCost={product.air_shipping_available ? product.air_shipping_cost : product.sea_shipping_cost}
                  shippingMethod={product.air_shipping_available ? 'air' : 'sea'}
                />

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <ShoppingCart size={16} />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};