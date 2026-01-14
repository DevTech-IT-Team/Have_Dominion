// Use the shared axios instance for consistency
import api from '../api/axios';

// Align base URL with axios client default to avoid mixed-content / wrong host errors
const apiBase = import.meta.env.VITE_API_BASE_URL || "https://have-dominion.onrender.com";
const API_BASE = `${apiBase}/api/v1`;

// Get auth token from localStorage or sessionStorage
const getAuthToken = () => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

// Common headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Handle API responses (for both fetch and axios)
const handleResponse = async (response) => {
  // If it's an axios response (has .data property)
  if (response.data !== undefined) {
    return response.data;
  }
  
  // If it's a fetch Response object (has .json method)
  if (typeof response.json === 'function') {
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || `HTTP error! status: ${response.status}`);
      }
    }
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }
    return data;
  }
  
  return response;
};

export const adminService = {
  // Get all users
  async getAllUsers(page = 1, limit = 10, isActive) {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (isActive !== undefined) {
      params.append('isActive', isActive.toString());
    }
    
    const response = await fetch(`${API_BASE}/admin/users?${params}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get user by ID
  async getUserById(userId) {
    const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Update user
  async updateUser(userId, userData) {
    const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    
    return handleResponse(response);
  },

  // Delete user
  async deleteUser(userId) {
    const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Deactivate user
  async deactivateUser(userId) {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/deactivate`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Activate user
  async activateUser(userId) {
    const response = await fetch(`${API_BASE}/admin/users/${userId}/activate`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get all contacts
  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE}/contact${queryString ? '?' + queryString : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Update contact status
  async updateContactStatus(contactId, status) {
    try {
      // Validate status before sending
      const validStatuses = ['pending', 'read', 'responded', 'accepted', 'rejected'];
      if (!status || !validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
      }
      
      console.log('updateContactStatus called with:', { contactId, status, statusType: typeof status });
      const requestBody = { status: String(status) }; // Ensure it's a string
      console.log('Request body:', requestBody, 'Stringified:', JSON.stringify(requestBody));
      
      const response = await api.patch(`/contact/${contactId}/status`, requestBody);
      console.log('Update response:', response);
      return handleResponse(response);
    } catch (error) {
      console.error('updateContactStatus error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: error.config?.data,
        requestBody: error.config?.data ? JSON.parse(error.config.data) : null,
      });
      // Extract error message from axios error response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to update contact status';
      throw new Error(errorMessage);
    }
  },

  // Delete contact
  async deleteContact(contactId) {
    const response = await fetch(`${API_BASE}/contact/${contactId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get all tradelines
  async getTradelines(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE}/tradeline${queryString ? '?' + queryString : ''}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get tradeline by ID
  async getTradelineById(tradelineId) {
    const response = await fetch(`${API_BASE}/tradeline/${tradelineId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Create tradeline
  async createTradeline(tradelineData) {
    const response = await fetch(`${API_BASE}/tradeline`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tradelineData),
    });
    
    return handleResponse(response);
  },

  // Update tradeline
  async updateTradeline(tradelineId, tradelineData) {
    const response = await fetch(`${API_BASE}/tradeline/${tradelineId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tradelineData),
    });
    
    return handleResponse(response);
  },

  // Delete tradeline
  async deleteTradeline(tradelineId) {
    const response = await fetch(`${API_BASE}/tradeline/${tradelineId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get statistics
  async getStatistics() {
    try {
      const response = await api.get('/admin/statistics');
      return handleResponse(response);
    } catch (error) {
      console.error('Statistics fetch error:', error);
      // Extract error message from axios error response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch statistics';
      throw new Error(errorMessage);
    }
  }
};
