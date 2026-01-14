import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    setIsLoading(true);
    const result = await login(email, password, 'admin');

    if (result.success) {
      handleSuccess('Admin login successful');
      // Keep loading until redirect happens (handled by AuthContext)
    } else {
      setIsLoading(false);
      handleError(result.error || 'Admin login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-950 focus:border-blue-950 outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-4 py-2 pr-12 border rounded-md focus:ring-2 focus:ring-blue-950 focus:border-blue-950 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-950 text-white py-2 rounded-md hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging In...</span>
              </>
            ) : (
              <span>Login as Admin</span>
            )}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
