import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/api/apiRoutes';
import { useNavigate } from 'react-router-dom';

const RegisterAdminPage = () => {
  const navigate = useNavigate();
  const [factoryName, setFactoryName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(API_ROUTES.registerAdmin, {
        factoryName,
        name,
        email,
        password
      });
      setSuccess('Factory registered and admin created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">Register Factory Admin</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-700 bg-green-100 px-4 py-2 rounded-md text-sm">{success}</div>
          )}

          <div>
            <label className="block text-purple-900 font-medium mb-1">Factory Name</label>
            <input
              type="text"
              value={factoryName}
              onChange={(e) => setFactoryName(e.target.value)}
              placeholder="Enter your factory name"
              required
              className="w-full px-4 py-2 border border-purple-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-purple-900 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-purple-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-purple-900 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-purple-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-purple-900 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-purple-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 cursor-pointer transition"
          >
            Register Factory Admin
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-700 hover:underline font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>

  );
};

export default RegisterAdminPage;
