// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Client from './components/Clients.js';
import Product from './components/Products.js';
import Order from './components/Orders.js';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-6 border-b pb-2">
          <Link to="/" className="text-blue-600 hover:underline">Clients</Link>
          <Link to="/products" className="text-blue-600 hover:underline">Products</Link>
          <Link to="/orders" className="text-blue-600 hover:underline">Orders</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/products" element={<Product />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;