import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ship, Plane } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { ProductPrice } from '../components/ProductPrice';
import { WishlistButton } from '../components/WishlistButton';
import { ImageSlider } from '../components/product/ImageSlider';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const addToCart = useCartStore(state => state.addItem);
  const { isAdmin } = useAuthStore();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === id);

  // Set default shipping method based on availability
  const [shippingMethod, setShippingMethod] = useState(
    product?.air_shipping_available ? 'air' : 'sea'
  );

  // Update shipping method when product changes
  useEffect(() => {
    if (product?.air_shipping_available) {
      setShippingMethod('air');
    } else if (product?.sea_shipping_available) {
      setShippingMethod('sea');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">Produit non trouvé</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-primary hover:text-primary-600"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!shippingMethod) return;
    addToCart(product, quantity, selectedColor, selectedSize, shippingMethod);
    navigate('/cart');
  };

  const getShippingCost = () => {
    return shippingMethod === 'air' ? product.air_shipping_cost : product.sea_shipping_cost;
  };

  const isAddToCartDisabled = 
    (product.sizes?.length > 0 && !selectedSize) || 
    (product.colors?.length > 0 && !selectedColor) ||
    !shippingMethod;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="bg-white rounded-lg shadow-sm aspect-square">
          <ImageSlider images={product.images} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            {!isAdmin && (
              <WishlistButton productId={product.id} />
            )}
          </div>

          <div className="prose prose-sm">
            <p>{product.description}</p>
          </div>

          <ProductPrice 
            price={product.price}
            marketPrice={product.market_price}
            shippingCost={getShippingCost()} 
            shippingMethod={shippingMethod}
          />

          {/* Shipping Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mode de livraison
            </label>
            <div className="flex gap-4">
              {product.sea_shipping_available && (
                <button
                  onClick={() => setShippingMethod('sea')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                    shippingMethod === 'sea'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Ship size={20} />
                  Maritime
                </button>
              )}
              {product.air_shipping_available && (
                <button
                  onClick={() => setShippingMethod('air')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                    shippingMethod === 'air'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Plane size={20} />
                  Aérien
                </button>
              )}
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Taille
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">Sélectionner une taille</option>
                {product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Couleur
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">Sélectionner une couleur</option>
                {product.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantité
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
            className={`w-full py-3 rounded-lg text-white text-lg font-medium ${
              isAddToCartDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-600'
            }`}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};