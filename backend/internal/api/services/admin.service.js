const User = require('../../database/models/User');
const { AppError } = require('../../common/error-handler');

class AdminService {
  async getAllUsers(filters = {}) {
    try {
      const query = { role: 'user' };

      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }

      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const skip = (page - 1) * limit;

      const users = await User.find(query)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(query);

      return {
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new AppError('Failed to fetch users', 500, 'FETCH_ERROR');
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch user', 500, 'FETCH_ERROR');
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select('-password');

      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to update user', 500, 'UPDATE_ERROR');
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return { message: 'User deleted successfully', userId };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete user', 500, 'DELETE_ERROR');
    }
  }

  async deactivateUser(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to deactivate user', 500, 'UPDATE_ERROR');
    }
  }

  async activateUser(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
      ).select('-password');

      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to activate user', 500, 'UPDATE_ERROR');
    }
  }

  async getStatistics() {
    try {
      const totalUsers = await User.countDocuments({ role: 'user' });
      const totalAdmins = await User.countDocuments({ role: 'admin' });
      const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
      const inactiveUsers = await User.countDocuments({ role: 'user', isActive: false });

      const userGrowth = '+12%';
      const sessionGrowth = '+5%';
      const revenue = 12345;
      const revenueGrowth = '-3%';
      const supportTickets = 23;
      const ticketGrowth = '-18%';
      const activeSessions = 89;

      return {
        totalUsers,
        totalAdmins,
        activeUsers,
        inactiveUsers,
        userGrowth,
        sessionGrowth,
        revenue,
        revenueGrowth,
        supportTickets,
        ticketGrowth,
        activeSessions,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new AppError('Failed to fetch statistics', 500, 'FETCH_ERROR');
    }
  }
}

module.exports = new AdminService();