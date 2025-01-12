import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductList } from './pages/ProductList';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CampaignManagementPage } from './pages/admin/CampaignManagementPage';
import { ProductManagementPage } from './pages/admin/ProductManagementPage';
import { OrderManagementPage } from './pages/admin/OrderManagementPage';
import { CampaignDetails } from './pages/CampaignDetails';
import { ProductDetail } from './pages/ProductDetail';
import { Wishlist } from './pages/Wishlist';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useInitialData } from './hooks/useInitialData';

function App() {
  useInitialData();

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/campaigns" 
              element={<CampaignManagementPage />} 
            />
            <Route 
              path="/admin/campaigns/:id" 
              element={<CampaignDetails />} 
            />
            <Route 
              path="/admin/products" 
              element={<ProductManagementPage />} 
            />
            <Route 
              path="/admin/orders" 
              element={<OrderManagementPage />} 
            />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;