import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import axios from 'axios';
import { API_ROUTES } from '@/api/apiRoutes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(API_ROUTES.login, { email, password });
      localStorage.setItem('token', response.data.token); // Store token for routing
      dispatch(login({ token: response.data.token, user: response.data.user }));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
          )}
          <div>
            <label className="block text-blue-800 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-blue-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-blue-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-blue-800 hover:underline font-medium cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-2 text-sm text-center text-gray-700">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-800 hover:underline font-medium cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
