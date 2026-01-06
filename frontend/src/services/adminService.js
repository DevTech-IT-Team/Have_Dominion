import api from '../api/axios';

export const adminService = {
  // Get all users
  async getAllUsers(page = 1, limit = 10, isActive) {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (isActive !== undefined) {
      params.append('isActive', isActive.toString());
    }
    
    const response = await api.get(`/admin/users?${params}`);
    return response.data;
  },

  // Get user by ID
  async getUserById(userId) {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Update user
  async updateUser(userId, userData) {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  async deleteUser(userId) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Deactivate user
  async deactivateUser(userId) {
    const response = await api.patch(`/admin/users/${userId}/deactivate`);
    return response.data;
  },

  // Activate user
  async activateUser(userId) {
    const response = await api.patch(`/admin/users/${userId}/activate`);
    return response.data;
  },

  // Get statistics
  async getStatistics() {
    const response = await api.get('/admin/statistics');
    return response.data;
  }
};
