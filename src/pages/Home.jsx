import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Package } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen space-y-8">
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Achetez en Chine, recevez au Sénégal
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Découvrez notre sélection de produits et profitez de notre service de groupage
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="mr-2" />
            Voir les produits
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
          <ShoppingBag className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Large Sélection</h3>
          <p className="text-gray-600">
            Des vêtements aux chaussures, trouvez tout ce dont vous avez besoin
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
          <Package className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Groupage Efficace</h3>
          <p className="text-gray-600">
            Regroupez vos achats pour optimiser les coûts de livraison
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
          <Truck className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Livraison Suivie</h3>
          <p className="text-gray-600">
            Suivez votre commande de la Chine jusqu'au Sénégal
          </p>
        </div>
      </section>
    </div>
  );
};