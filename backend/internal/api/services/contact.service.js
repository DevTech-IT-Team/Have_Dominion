const Contact = require('../../database/models/Contact');
const { logger } = require('../../common/logger');

class ContactService {
  async createContact(contactData) {
    try {
      const contact = new Contact(contactData);
      await contact.save();
      
      return contact;
    } catch (error) {
      throw error;
    }
  }

  async getAllContacts({ page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' }) {
    try {
      const query = {};
      
      if (status) {
        query.status = status;
      }

      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const contacts = await Contact.find(query)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Contact.countDocuments(query);

      return {
        contacts,
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

  async getContactById(contactId) {
    try {
      const contact = await Contact.findById(contactId);
      if (!contact) {
        throw new Error('Contact not found');
      }
      return contact;
    } catch (error) {
      throw error;
    }
  }

  async updateContactStatus(contactId, status) {
    try {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        { 
          status,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!contact) {
        throw new Error('Contact not found');
      }

      return contact;
    } catch (error) {
      throw error;
    }
  }

  async deleteContact(contactId) {
    try {
      const contact = await Contact.findByIdAndDelete(contactId);
      
      if (!contact) {
        throw new Error('Contact not found');
      }

      return { message: 'Contact deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getContactsByEmail(email) {
    try {
      const contacts = await Contact.find({ email: email.toLowerCase() })
        .sort({ createdAt: -1 })
        .exec();

      logger.info('User contacts fetched', { email, count: contacts.length });
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  async getContactStatistics() {
    try {
      const stats = await Contact.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const totalContacts = await Contact.countDocuments();
      const recentContacts = await Contact.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      });

      const statistics = {
        total: totalContacts,
        recent: recentContacts,
        pending: 0,
        read: 0,
        responded: 0,
        accepted: 0,
        rejected: 0
      };

      stats.forEach(stat => {
        statistics[stat._id] = stat.count;
      });

      return statistics;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ContactService();
