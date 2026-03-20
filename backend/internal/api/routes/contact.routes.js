const express = require('express');
const router = express.Router();
const { optionalAuthMiddleware, authMiddleware } = require('../../auth/middleware');
const mongoose = require('mongoose');
const Contact = require('../../database/models/Contact');

// Always use MongoDB service since connection is working
const contactService = require('../services/contact.service');

// Public route - submit contact form
router.post('/', optionalAuthMiddleware(), async (req, res, next) => {
  try {
    const { name, email, service, message } = req.body;

    // Basic validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, service, message'
      });
    }

    const contact = await contactService.createContact({
      name,
      email,
      service,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
});

// Get user's own contacts (authenticated users)
router.get('/my-requests', authMiddleware(false), async (req, res, next) => {
  try {
    const userEmail = req.user?.email;
    
    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'User email not found'
      });
    }

    const contacts = await contactService.getContactsByEmail(userEmail);

    res.status(200).json({
      success: true,
      message: 'User contacts fetched successfully',
      data: contacts
    });
  } catch (error) {
    next(error);
  }
});

// Get all contacts (admin only)
router.get('/', authMiddleware(true), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    const result = await contactService.getAllContacts({
      page,
      limit,
      status,
      sortBy,
      sortOrder
    });

    res.status(200).json({
      success: true,
      message: 'Contacts fetched successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get contact by ID (admin only)
router.get('/:contactId', authMiddleware(true), async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.contactId);

    res.status(200).json({
      success: true,
      message: 'Contact fetched successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
});

// Update contact status (admin only)
router.patch('/:contactId/status', authMiddleware(true), async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['pending', 'read', 'responded', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, read, responded, accepted, rejected'
      });
    }

    const contact = await contactService.updateContactStatus(req.params.contactId, status);

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
});

// Delete contact (admin only)
router.delete('/:contactId', authMiddleware(true), async (req, res, next) => {
  try {
    const result = await contactService.deleteContact(req.params.contactId);

    res.status(200).json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get contact statistics (admin only)
router.get('/statistics/overview', authMiddleware(true), async (req, res, next) => {
  try {
    const stats = await contactService.getContactStatistics();

    res.status(200).json({
      success: true,
      message: 'Contact statistics fetched successfully',
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
