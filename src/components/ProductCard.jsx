import React, { useState, useEffect } from 'react';
import { ShoppingCart, Edit, Ship, Plane, TrendingDown } from 'lucide-react';
import { ProductPrice } from './ProductPrice';
import { ImageSlider } from './product/ImageSlider';
import { WishlistButton } from './WishlistButton';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product, onAddToCart, onEdit }) => {
  const navigate = useNavigate();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  // Set default shipping method based on availability
  const [shippingMethod, setShippingMethod] = useState(
    product.air_shipping_available ? 'air' : 'sea'
  );
  const { isAdmin } = useAuthStore();

  // Update shipping method when availabilities change
  useEffect(() => {
    if (product.air_shipping_available) {
      setShippingMethod('air');
    } else if (product.sea_shipping_available) {
      setShippingMethod('sea');
    }
  }, [product.air_shipping_available, product.sea_shipping_available]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!shippingMethod) return;
    onAddToCart(product, 1, selectedColor, selectedSize, shippingMethod);
    setSelectedSize('');
    setSelectedColor('');
    setShowQuickAdd(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const toggleQuickAdd = (e) => {
    e.stopPropagation();
    setShowQuickAdd(!showQuickAdd);
  };

  const isAddToCartDisabled = 
    (product.sizes?.length > 0 && !selectedSize) || 
    (product.colors?.length > 0 && !selectedColor) ||
    !shippingMethod;

  const getShippingCost = () => {
    return shippingMethod === 'air' ? product.air_shipping_cost : product.sea_shipping_cost;
  };

  const savings = product.market_price ? product.market_price - (product.price + getShippingCost()) : 0;
  const savingsPercentage = product.market_price ? Math.round((savings / product.market_price) * 100) : 0;

  // Ensure at least one shipping method is available
  if (!product.air_shipping_available && !product.sea_shipping_available) {
    return null;
  }

  return (
    <div 
      className="bg-white rounded hover:shadow-hover transition-shadow duration-300 cursor-pointer relative"
      onClick={handleClick}
      onMouseEnter={() => !showQuickAdd && setShowQuickAdd(true)}
      onMouseLeave={() => !showQuickAdd && setShowQuickAdd(false)}
    >
      <div className="relative aspect-square">
        <ImageSlider images={product.images} alt={product.name} />
        {savings > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-sm font-medium z-10">
            -{savingsPercentage}% de réduction
          </div>
        )}
        {!isAdmin && (
          <div className="absolute top-2 right-2 z-10">
            <WishlistButton productId={product.id} />
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="mb-2">
          <h3 className="text-sm text-gray-700 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </div>

        <ProductPrice 
          price={product.price}
          marketPrice={product.market_price}
          shippingCost={getShippingCost()} 
          shippingMethod={shippingMethod}
        />

        {showQuickAdd ? (
          <div className="mt-3 space-y-2" onClick={e => e.stopPropagation()}>
            {/* Shipping options */}
            <div className="flex gap-2">
              {product.sea_shipping_available && (
                <button
                  onClick={() => setShippingMethod('sea')}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs rounded-lg border ${
                    shippingMethod === 'sea'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Ship size={14} />
                  Maritime
                </button>
              )}
              {product.air_shipping_available && (
                <button
                  onClick={() => setShippingMethod('air')}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs rounded-lg border ${
                    shippingMethod === 'air'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Plane size={14} />
                  Aérien
                </button>
              )}
            </div>

            {/* Size selector */}
            {product.sizes?.length > 0 && (
              <div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full rounded-lg border-gray-300 text-sm"
                >
                  <option value="">Sélectionner une taille</option>
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Color selector */}
            {product.colors?.length > 0 && (
              <div>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full rounded-lg border-gray-300 text-sm"
                >
                  <option value="">Sélectionner une couleur</option>
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddToCartDisabled}
              className={`w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white text-sm ${
                isAddToCartDisabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-600'
              }`}
            >
              <ShoppingCart size={16} />
              Ajouter au panier
            </button>
          </div>
        ) : (
          <button
            onClick={toggleQuickAdd}
            className="mt-3 w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 text-sm"
          >
            <ShoppingCart size={16} />
            Achat rapide
          </button>
        )}
      </div>
    </div>
  );
};