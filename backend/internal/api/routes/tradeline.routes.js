const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../auth/middleware');
const tradelineService = require('../services/tradeline.service');
const { logger } = require('../../common/logger');

// Create new tradeline (admin only)
router.post('/', authMiddleware(true), async (req, res, next) => {
  try {
    const {
      bankName,
      accountNumber,
      creditLimit,
      currentBalance,
      paymentHistory,
      accountAge,
      accountType,
      status,
      notes
    } = req.body;

    // Basic validation
    if (!bankName || !accountNumber || !creditLimit || !currentBalance || !accountAge || !accountType) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: bankName, accountNumber, creditLimit, currentBalance, accountAge, accountType'
      });
    }

    const tradeline = await tradelineService.createTradeline({
      bankName,
      accountNumber,
      creditLimit: Number(creditLimit),
      currentBalance: Number(currentBalance),
      paymentHistory: Number(paymentHistory) || 100,
      accountAge: Number(accountAge),
      accountType,
      status: status || 'Active',
      notes
    }, req.user.id);

    logger.info('Admin created new tradeline', { 
      adminId: req.user.id, 
      tradelineId: tradeline._id,
      bankName: tradeline.bankName 
    });

    res.status(201).json({
      success: true,
      message: 'Tradeline created successfully',
      data: tradeline
    });
  } catch (error) {
    next(error);
  }
});

// Get all tradelines (admin only)
router.get('/', authMiddleware(true), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const accountType = req.query.accountType;
    const sortBy = req.query.sortBy || 'reportedDate';
    const sortOrder = req.query.sortOrder || 'desc';

    const result = await tradelineService.getAllTradelines({
      page,
      limit,
      status,
      accountType,
      sortBy,
      sortOrder
    });

    logger.info('Admin fetched all tradelines', { 
      adminId: req.user?.id, 
      total: result.pagination.total 
    });

    res.status(200).json({
      success: true,
      message: 'Tradelines fetched successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get tradeline by ID (admin only)
router.get('/:tradelineId', authMiddleware(true), async (req, res, next) => {
  try {
    const tradeline = await tradelineService.getTradelineById(req.params.tradelineId);

    logger.info('Admin fetched tradeline', { 
      adminId: req.user?.id, 
      tradelineId: req.params.tradelineId 
    });

    res.status(200).json({
      success: true,
      message: 'Tradeline fetched successfully',
      data: tradeline
    });
  } catch (error) {
    next(error);
  }
});

// Update tradeline (admin only)
router.put('/:tradelineId', authMiddleware(true), async (req, res, next) => {
  try {
    const {
      bankName,
      accountNumber,
      creditLimit,
      currentBalance,
      paymentHistory,
      accountAge,
      accountType,
      status,
      notes
    } = req.body;

    const updateData = {};
    if (bankName !== undefined) updateData.bankName = bankName;
    if (accountNumber !== undefined) updateData.accountNumber = accountNumber;
    if (creditLimit !== undefined) updateData.creditLimit = Number(creditLimit);
    if (currentBalance !== undefined) updateData.currentBalance = Number(currentBalance);
    if (paymentHistory !== undefined) updateData.paymentHistory = Number(paymentHistory);
    if (accountAge !== undefined) updateData.accountAge = Number(accountAge);
    if (accountType !== undefined) updateData.accountType = accountType;
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const tradeline = await tradelineService.updateTradeline(
      req.params.tradelineId, 
      updateData, 
      req.user.id
    );

    logger.info('Admin updated tradeline', { 
      adminId: req.user?.id, 
      tradelineId: req.params.tradelineId 
    });

    res.status(200).json({
      success: true,
      message: 'Tradeline updated successfully',
      data: tradeline
    });
  } catch (error) {
    next(error);
  }
});

// Delete tradeline (admin only)
router.delete('/:tradelineId', authMiddleware(true), async (req, res, next) => {
  try {
    const result = await tradelineService.deleteTradeline(req.params.tradelineId);

    logger.info('Admin deleted tradeline', { 
      adminId: req.user?.id, 
      tradelineId: req.params.tradelineId 
    });

    res.status(200).json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get tradeline statistics (admin only)
router.get('/statistics/overview', authMiddleware(true), async (req, res, next) => {
  try {
    const stats = await tradelineService.getTradelineStatistics();

    logger.info('Admin fetched tradeline statistics', { adminId: req.user?.id });

    res.status(200).json({
      success: true,
      message: 'Tradeline statistics fetched successfully',
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Get user tradelines (public - for user dashboard)
router.get('/user/all', async (req, res, next) => {
  try {
    const tradelines = await tradelineService.getUserTradelines();

    res.status(200).json({
      success: true,
      message: 'User tradelines fetched successfully',
      data: tradelines
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
