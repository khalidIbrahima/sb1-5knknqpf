import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/filters/SearchBar';
import { QuickFilters } from '../components/filters/QuickFilters';
import { FilterDrawer } from '../components/filters/FilterDrawer';
import { ProductSection } from '../components/product/ProductSection';
import { Pagination } from '../components/Pagination';
import { useCartStore } from '../store/cartStore';
import { useCategoryStore } from '../store/categoryStore';
import { useProductStore } from '../store/productStore';
import { useActiveCampaignProducts } from '../hooks/useActiveCampaignProducts';
import { ProductForm } from '../components/admin/ProductForm';
import { Loader } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export const ProductList = () => {
  const { products, loading, error } = useProductStore();
  const { categories } = useCategoryStore();
  const addItem = useCartStore(state => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [shippingMethods, setShippingMethods] = useState({ air: true, sea: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= Number(priceRange.max));
    }

    // Apply shipping method filter
    filtered = filtered.filter(product => 
      (shippingMethods.air && product.air_shipping_available) ||
      (shippingMethods.sea && product.sea_shipping_available)
    );

    // Apply quick filters
    if (activeQuickFilter) {
      switch (activeQuickFilter) {
        case 'featured':
          filtered = filtered.filter(p => p.is_featured);
          break;
        case 'bestsellers':
          filtered = filtered.filter(p => p.is_bestseller);
          break;
        case 'new':
          filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          filtered = filtered.slice(0, 12);
          break;
        case 'trending':
          filtered = filtered.filter(p => p.is_trending);
          break;
        case 'deals':
          filtered = filtered.filter(p => p.market_price > p.price);
          break;
      }
    }

    // Apply sorting
    switch (selectedSort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, shippingMethods, activeQuickFilter, selectedSort]);

  // Calculate featured products
  const featuredProducts = React.useMemo(() => 
    products.filter(p => p.is_featured).slice(0, 8)
  , [products]);

  // Calculate new arrivals
  const newArrivals = React.useMemo(() => 
    [...products]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 8)
  , [products]);

  // Calculate best sellers
  const bestSellers = React.useMemo(() => 
    products
      .filter(p => p.is_bestseller)
      .slice(0, 8)
  , [products]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, shippingMethods, activeQuickFilter, selectedSort]);

  const handleQuickFilter = (filter) => {
    setActiveQuickFilter(prevFilter => prevFilter === filter ? null : filter);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Search and Filters */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-2 z-20 space-y-4">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterClick={() => setShowFilters(true)}
          showFilters={true}
        />
        <QuickFilters 
          onFilterClick={handleQuickFilter}
          activeFilter={activeQuickFilter}
        />
      </div>

      {/* Featured Sections */}
      {!searchQuery && !activeQuickFilter && currentPage === 1 && (
        <div className="space-y-12">
          <ProductSection
            title="En Vedette"
            subtitle="Nos meilleures offres du moment"
            products={featuredProducts}
            onAddToCart={addItem}
            onEdit={setEditingProduct}
          />

          <ProductSection
            title="Nouveautés"
            subtitle="Découvrez nos derniers articles"
            products={newArrivals}
            onAddToCart={addItem}
            onEdit={setEditingProduct}
          />

          <ProductSection
            title="Meilleures Ventes"
            subtitle="Les produits préférés de nos clients"
            products={bestSellers}
            onAddToCart={addItem}
            onEdit={setEditingProduct}
          />
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        shippingMethods={shippingMethods}
        onShippingMethodChange={setShippingMethods}
        categories={categories}
      />

      {/* Product Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {activeQuickFilter ? (
              <>
                {activeQuickFilter === 'featured' && 'En Vedette'}
                {activeQuickFilter === 'bestsellers' && 'Meilleures Ventes'}
                {activeQuickFilter === 'new' && 'Nouveautés'}
                {activeQuickFilter === 'trending' && 'Tendances'}
                {activeQuickFilter === 'deals' && 'Promotions'}
              </>
            ) : (
              'Tous les Articles'
            )}
          </h2>
          <div className="text-sm text-gray-600">
            {filteredProducts.length} article{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addItem}
                  onEdit={setEditingProduct}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              Aucun produit ne correspond à votre recherche
            </p>
          </div>
        )}
      </div>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={(formData) => updateProduct(editingProduct.id, formData)}
        />
      )}
    </div>
  );
};