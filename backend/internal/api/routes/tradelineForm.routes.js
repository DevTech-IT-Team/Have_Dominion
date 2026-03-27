const express = require('express');
const router = express.Router();
const tradelineFormService = require('../services/tradelineForm.service');
const { authMiddleware } = require('../../auth/middleware');

// Create new tradeline form submission (Public)
router.post('/', async (req, res, next) => {
  try {
    const {
      tradelineName,
      price,
      feeType,
      creditLimit,
      age,
      reportDates,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      ssnLast4,
      streetAddress,
      city,
      state,
      zipCode,
      transactionType
    } = req.body;

    // Validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phoneNumber', 'dateOfBirth',
      'ssnLast4', 'streetAddress', 'city', 'state', 'zipCode', 'transactionType'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate SSN format (last 4 digits)
    if (!/^\d{4}$/.test(ssnLast4)) {
      return res.status(400).json({
        success: false,
        message: 'SSN last 4 digits must be exactly 4 numbers'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const formData = {
      tradelineName: tradelineName || 'Chase Sapphire Reserve',
      price: price || 450,
      feeType: feeType || 'one-time fee',
      creditLimit: creditLimit || '15000',
      age: age || '4+ years',
      reportDates: reportDates || 'Mar 2nd - Mar 9th',
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth: new Date(dateOfBirth),
      ssnLast4,
      streetAddress,
      city,
      state,
      zipCode,
      transactionType
    };

    const tradelineForm = await tradelineFormService.createTradelineForm(formData);

    res.status(201).json({
      success: true,
      message: 'Tradeline form submitted successfully. We will review your application and contact you shortly.',
      data: tradelineForm
    });
  } catch (error) {
    next(error);
  }
});

// Get all tradeline forms (Admin only)
router.get('/', authMiddleware(true), async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const filters = { status, page, limit };
    
    const result = await tradelineFormService.getAllTradelineForms(filters);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get user's own tradeline forms (Authenticated users)
router.get('/my-forms', authMiddleware(false), async (req, res, next) => {
  try {
    const { email } = req.user;
    const forms = await tradelineFormService.getTradelineFormsByEmail(email);
    
    res.status(200).json({
      success: true,
      data: { forms }
    });
  } catch (error) {
    next(error);
  }
});

// Get single tradeline form by ID (Admin only)
router.get('/:id', authMiddleware(true), async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await tradelineFormService.getTradelineFormById(id);
    
    res.status(200).json({
      success: true,
      data: { form }
    });
  } catch (error) {
    next(error);
  }
});

// Update tradeline form status (Admin only)
router.patch('/:id/status', authMiddleware(true), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['pending', 'reviewing', 'approved', 'rejected', 'completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const form = await tradelineFormService.updateTradelineFormStatus(id, status, adminNotes);
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: { form }
    });
  } catch (error) {
    next(error);
  }
});

// Delete tradeline form (Admin only)
router.delete('/:id', authMiddleware(true), async (req, res, next) => {
  try {
    const { id } = req.params;
    await tradelineFormService.deleteTradelineForm(id);
    
    res.status(200).json({
      success: true,
      message: 'Tradeline form deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
