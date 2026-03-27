const TradelineForm = require('../../database/models/TradelineForm');
const { logger } = require('../../common/logger');

class TradelineFormService {
  async createTradelineForm(formData) {
    try {
      const tradelineForm = new TradelineForm(formData);
      await tradelineForm.save();
      
      logger.info('Tradeline form submitted', { 
        email: formData.email,
        tradelineName: formData.tradelineName 
      });
      
      return tradelineForm;
    } catch (error) {
      logger.error('Error creating tradeline form:', error);
      throw error;
    }
  }

  async getAllTradelineForms(filters = {}) {
    try {
      const { status, page = 1, limit = 10 } = filters;
      const query = {};
      
      if (status) {
        query.status = status;
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const [forms, total] = await Promise.all([
        TradelineForm.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .exec(),
        TradelineForm.countDocuments(query)
      ]);

      return {
        forms,
        pagination: {
          total,
          pages: Math.ceil(total / parseInt(limit)),
          page: parseInt(page),
          limit: parseInt(limit)
        }
      };
    } catch (error) {
      logger.error('Error fetching tradeline forms:', error);
      throw error;
    }
  }

  async getTradelineFormById(id) {
    try {
      const form = await TradelineForm.findById(id);
      if (!form) {
        throw new Error('Tradeline form not found');
      }
      return form;
    } catch (error) {
      logger.error('Error fetching tradeline form by ID:', error);
      throw error;
    }
  }

  async updateTradelineFormStatus(id, status, adminNotes) {
    try {
      const updateData = { status };
      if (adminNotes !== undefined) {
        updateData.adminNotes = adminNotes;
      }

      const form = await TradelineForm.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!form) {
        throw new Error('Tradeline form not found');
      }

      logger.info('Tradeline form status updated', { 
        id, 
        status,
        adminNotes: adminNotes ? 'provided' : 'not provided'
      });

      return form;
    } catch (error) {
      logger.error('Error updating tradeline form status:', error);
      throw error;
    }
  }

  async deleteTradelineForm(id) {
    try {
      const form = await TradelineForm.findByIdAndDelete(id);
      if (!form) {
        throw new Error('Tradeline form not found');
      }
      
      logger.info('Tradeline form deleted', { id });
      return form;
    } catch (error) {
      logger.error('Error deleting tradeline form:', error);
      throw error;
    }
  }

  async getTradelineFormsByEmail(email) {
    try {
      const forms = await TradelineForm.find({ email: email.toLowerCase() })
        .sort({ createdAt: -1 })
        .exec();
      
      logger.info('User tradeline forms fetched', { email, count: forms.length });
      return forms;
    } catch (error) {
      logger.error('Error fetching user tradeline forms:', error);
      throw error;
    }
  }
}

module.exports = new TradelineFormService();
