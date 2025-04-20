
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import OrdersPage from './OrdersPage';
import CustomersPage from './CustomersPage';
import ProductsPage from './ProductsPage';

const Index = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-gray-950 min-h-screen">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default Index;
