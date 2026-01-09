const Tradeline = require('../../database/models/Tradeline');
const { logger } = require('../../common/logger');

class TradelineService {
  async createTradeline(tradelineData, adminId) {
    try {
      const tradeline = new Tradeline({
        ...tradelineData,
        createdBy: adminId,
        lastUpdatedBy: adminId
      });
      
      await tradeline.save();
      
      logger.info('New tradeline created', { 
        tradelineId: tradeline._id, 
        bankName: tradeline.bankName,
        createdBy: adminId 
      });
      
      return tradeline;
    } catch (error) {
      logger.error('Error creating tradeline', { error: error.message, data: tradelineData });
      throw error;
    }
  }

  async getAllTradelines({ page = 1, limit = 10, status, accountType, sortBy = 'reportedDate', sortOrder = 'desc' }) {
    try {
      const query = {};
      
      if (status) {
        query.status = status;
      }
      
      if (accountType) {
        query.accountType = accountType;
      }

      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const tradelines = await Tradeline.find(query)
        .populate('createdBy', 'name email')
        .populate('lastUpdatedBy', 'name email')
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Tradeline.countDocuments(query);

      return {
        tradelines: tradelines.map(t => t.getSummary()),
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      logger.error('Error fetching tradelines', { error: error.message });
      throw error;
    }
  }

  async getTradelineById(tradelineId) {
    try {
      const tradeline = await Tradeline.findById(tradelineId)
        .populate('createdBy', 'name email')
        .populate('lastUpdatedBy', 'name email');
      
      if (!tradeline) {
        throw new Error('Tradeline not found');
      }
      
      return tradeline.getSummary();
    } catch (error) {
      logger.error('Error fetching tradeline by ID', { tradelineId, error: error.message });
      throw error;
    }
  }

  async updateTradeline(tradelineId, updateData, adminId) {
    try {
      const tradeline = await Tradeline.findByIdAndUpdate(
        tradelineId,
        { 
          ...updateData,
          lastUpdatedBy: adminId,
          lastUpdated: new Date()
        },
        { new: true, runValidators: true }
      ).populate('createdBy', 'name email')
       .populate('lastUpdatedBy', 'name email');

      if (!tradeline) {
        throw new Error('Tradeline not found');
      }

      logger.info('Tradeline updated', { tradelineId, updatedBy: adminId });
      return tradeline.getSummary();
    } catch (error) {
      logger.error('Error updating tradeline', { tradelineId, error: error.message });
      throw error;
    }
  }

  async deleteTradeline(tradelineId) {
    try {
      const tradeline = await Tradeline.findByIdAndDelete(tradelineId);
      
      if (!tradeline) {
        throw new Error('Tradeline not found');
      }

      logger.info('Tradeline deleted', { tradelineId });
      return { message: 'Tradeline deleted successfully' };
    } catch (error) {
      logger.error('Error deleting tradeline', { tradelineId, error: error.message });
      throw error;
    }
  }

  async getTradelineStatistics() {
    try {
      const stats = await Tradeline.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalCreditLimit: { $sum: '$creditLimit' },
            totalBalance: { $sum: '$currentBalance' }
          }
        }
      ]);

      const totalTradelines = await Tradeline.countDocuments();
      const recentTradelines = await Tradeline.countDocuments({
        reportedDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      });

      const statistics = {
        total: totalTradelines,
        recent: recentTradelines,
        active: 0,
        inactive: 0,
        closed: 0,
        delinquent: 0,
        totalCreditLimit: 0,
        totalBalance: 0
      };

      stats.forEach(stat => {
        statistics[stat._id.toLowerCase()] = stat.count;
        if (stat._id === 'Active') {
          statistics.totalCreditLimit += stat.totalCreditLimit;
          statistics.totalBalance += stat.totalBalance;
        }
      });

      return statistics;
    } catch (error) {
      logger.error('Error fetching tradeline statistics', { error: error.message });
      throw error;
    }
  }

  async getUserTradelines(userId) {
    try {
      const tradelines = await Tradeline.find({ status: 'Active' })
        .sort({ reportedDate: -1 })
        .exec();

      return tradelines.map(t => t.getSummary());
    } catch (error) {
      logger.error('Error fetching user tradelines', { userId, error: error.message });
      throw error;
    }
  }
}

module.exports = new TradelineService();
