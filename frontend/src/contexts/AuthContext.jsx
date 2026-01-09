import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const normalizeUser = (user) => {
    if (!user) return null;
    const role = (user.role || '').toLowerCase();
    const redirectUrl = role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return { ...user, role, redirectUrl };
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for saved user session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to validate current session with server
        const response = await api.get('/auth/validate-session');
        if (response.data.success && response.data.user) {
          setUser(normalizeUser(response.data.user));
        }
      } catch (error) {
        // No valid session, clear any local data
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const callLogin = async (path, email, password) => {
    try {
      const response = await api.post(path, { email, password });
      return { ...response.data, ok: true, status: response.status };
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Login failed';
      return { success: false, message, ok: false, status: err.response?.status };
    }
  };

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try user login first, then fall back to admin login for admin accounts
      let data = await callLogin('auth/user/login', email, password);
      if (!data.success) {
        const adminAttempt = await callLogin('auth/admin/login', email, password);
        data = adminAttempt;
      }

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const { user: userResp, token } = data.data || {};
      if (!userResp || !userResp.role) {
        throw new Error('Invalid response from server');
      }
      const role = (userResp.role || '').toLowerCase();
      const redirectUrl = role === 'admin' ? '/admin/dashboard' : '/dashboard';

      const userData = {
        id: userResp._id || userResp.id,
        email: userResp.email,
        name: userResp.name,
        role,
        token,
        redirectUrl
      };

      // Clear any existing auth data first
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // Set user in state
      setUser(userData);
      
      // Store user data in sessionStorage only (temporary)
      if (!rememberMe) {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Redirect based on role
      navigate(redirectUrl, { replace: true });
      return { success: true, isAdmin: userResp.role === 'admin' };
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call server logout endpoint to clear session
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if server call fails
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
