// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/api/apiRoutes';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(API_ROUTES.forgotPassword, { email });
      setSuccess('Password reset link sent! Please check your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Request failed. Please try again.');
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    //   <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
    //     <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Forgot Password</h2>
    //     <form onSubmit={handleForgotPassword} className="space-y-4">
    //       {error && (
    //         <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
    //       )}
    //       {success && (
    //         <div className="text-green-600 bg-green-100 px-4 py-2 rounded-md text-sm">{success}</div>
    //       )}
    //       <div>
    //         <label className="block text-blue-800 font-medium mb-1">Email</label>
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="you@example.com"
    //           required
    //           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    //       >
    //         Send Reset Link
    //       </button>
    //     </form>
    //     <div className="mt-4 text-sm text-center">
    //       Remembered your password?{' '}
    //       <button
    //         onClick={() => navigate('/login')}
    //         className="text-blue-700 hover:underline font-medium"
    //       >
    //         Login
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-700 bg-green-100 px-4 py-2 rounded-md text-sm">{success}</div>
          )}
          <div>
            <label className="block text-blue-900 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-blue-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-700">
          Remembered your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-800 hover:underline font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
