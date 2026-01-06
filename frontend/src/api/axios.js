import axios from "axios";

// Normalize API base to keep /api/v1 prefix when joining relative paths
const apiBase =
  (import.meta.env.VITE_API_BASE_URL || "https://universal-helpers-1.onrender.com/api/v1").replace(
    /\/$/,
    ""
  );

const api = axios.create({
  baseURL: `${apiBase}/`,
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage or sessionStorage
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const token = userData.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
