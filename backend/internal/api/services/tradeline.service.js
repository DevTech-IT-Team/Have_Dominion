const Tradeline = require('../../database/models/Tradeline');

class TradelineService {
  async createTradeline(tradelineData, adminId) {
    try {
      const tradeline = new Tradeline({
        ...tradelineData,
        createdBy: adminId,
        lastUpdatedBy: adminId
      });
      
      await tradeline.save();
      
      return tradeline;
    } catch (error) {
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
        .populate('assignedUserId', 'name email')
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
      throw error;
    }
  }

  async getTradelineById(tradelineId) {
    try {
      const tradeline = await Tradeline.findById(tradelineId)
        .populate('createdBy', 'name email')
        .populate('lastUpdatedBy', 'name email')
        .populate('assignedUserId', 'name email');
      
      if (!tradeline) {
        throw new Error('Tradeline not found');
      }
      
      return tradeline.getSummary();
    } catch (error) {
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
       .populate('lastUpdatedBy', 'name email')
       .populate('assignedUserId', 'name email');

      if (!tradeline) {
        throw new Error('Tradeline not found');
      }

      return tradeline.getSummary();
    } catch (error) {
      throw error;
    }
  }

  async deleteTradeline(tradelineId) {
    try {
      const tradeline = await Tradeline.findByIdAndDelete(tradelineId);
      
      if (!tradeline) {
        throw new Error('Tradeline not found');
      }

      return { message: 'Tradeline deleted successfully' };
    } catch (error) {
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
      throw error;
    }
  }

  async getTradelinesByUserId(userId, { page = 1, limit = 10 }) {
    try {
      const tradelines = await Tradeline.find({ assignedUserId: userId })
        .populate('createdBy', 'name email')
        .sort({ reportedDate: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Tradeline.countDocuments({ assignedUserId: userId });

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
      throw error;
    }
  }
}

module.exports = new TradelineService();
