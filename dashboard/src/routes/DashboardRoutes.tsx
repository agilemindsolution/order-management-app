
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import OrdersPage from '../pages/OrdersPage';
import CustomersPage from '../pages/CustomersPage';
import ProductsPage from '../pages/ProductsPage';

const Index = () => {
  return (
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
  );
};

export default Index;
