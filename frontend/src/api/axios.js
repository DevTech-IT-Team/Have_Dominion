import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE_URL || "https://have-dominion.onrender.com";

const api = axios.create({
  baseURL: `${apiBase}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token and debugging
api.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage or sessionStorage
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log error details for debugging
    if (error.response) {
      console.error(`API Error: ${error.response.status} ${error.config?.url}`);
    } else if (error.request) {
      console.error('API Request Error: No response received');
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
