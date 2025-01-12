import React from 'react';
import { Truck, Package, ShoppingBag, Globe } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen space-y-12 py-8">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            KaliExpress
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Votre partenaire de confiance pour vos achats en Chine
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
            <ShoppingBag className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Large Sélection</h3>
            <p className="text-gray-600">
              Des milliers de produits disponibles à des prix compétitifs
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
            <Package className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Groupage Efficace</h3>
            <p className="text-gray-600">
              Optimisez vos coûts de livraison grâce à notre service de groupage
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
            <Truck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Livraison Fiable</h3>
            <p className="text-gray-600">
              Suivi en temps réel de vos colis de la Chine jusqu'au Sénégal
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
            <Globe className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Service International</h3>
            <p className="text-gray-600">
              Une expertise dans l'import-export entre la Chine et le Sénégal
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                KaliExpress est né de la volonté de simplifier l'accès aux produits chinois pour les consommateurs sénégalais. Notre expertise dans le commerce international et notre connaissance approfondie des marchés chinois et sénégalais nous permettent d'offrir un service unique et fiable.
              </p>
              <p className="text-gray-600">
                Nous nous engageons à fournir non seulement des produits de qualité à des prix compétitifs, mais aussi un service client exceptionnel et un suivi personnalisé de chaque commande.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&q=80&w=1920" 
                alt="Container port" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Nos Coordonnées</h3>
              <div className="space-y-4 text-gray-600">
                <p>Email: contact@kaliexpress.com</p>
                <p>Téléphone: +221 76 180 06 49</p>
                <p>Adresse: Dakar, Sénégal</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Horaires d'Ouverture</h3>
              <div className="space-y-2 text-gray-600">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 9h - 13h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};