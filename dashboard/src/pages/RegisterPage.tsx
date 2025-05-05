// // src/pages/RegisterPage.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { API_ROUTES } from '@/api/apiRoutes';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await axios.post(API_ROUTES.register, { name, email, password });
//       setSuccess('Registration successful! Please log in.');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
//       <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           {error && (
//             <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
//           )}
//           {success && (
//             <div className="text-green-600 bg-green-100 px-4 py-2 rounded-md text-sm">{success}</div>
//           )}
//           <div>
//             <label className="block text-blue-800 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your Name"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-blue-800 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-blue-800 font-medium mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>
//         <div className="mt-4 text-sm text-center">
//           Already have an account?{' '}
//           <button
//             onClick={() => navigate('/login')}
//             className="text-blue-700 hover:underline font-medium"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/api/apiRoutes';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [factoryId, setFactoryId] = useState('');
  const [factories, setFactories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the list of factories when the page loads
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await axios.get(API_ROUTES.getFactories);  // Ensure API endpoint exists
        setFactories(response.data);  // Assuming the API returns a list of factories
        setFactoryId(response.data[0]?.id || '');  // Default to first factory if available
      } catch (err) {
        console.error('Failed to fetch factories:', err);
        setError('Failed to fetch factories. Please try again.');
      }
    };
    fetchFactories();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(API_ROUTES.register, { name, email, password, factoryId });
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
  <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Register</h2>
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-sm">{error}</div>
      )}
      {success && (
        <div className="text-green-700 bg-green-100 px-4 py-2 rounded-md text-sm">{success}</div>
      )}

      <div>
        <label className="block text-blue-900 font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-blue-300 text-gray-900 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

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

      <div>
        <label className="block text-blue-900 font-medium mb-1">Select Factory</label>
        <select
          value={factoryId}
          onChange={(e) => setFactoryId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-blue-300 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {factories.map((factory: any) => (
            <option key={factory.id} value={factory.id}>
              {factory.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Register
      </button>
    </form>

    <div className="mt-4 text-sm text-center text-gray-700">
      Already have an account?{' '}
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

export default RegisterPage;
