const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../auth/middleware');
const adminService = require('../services/admin.service');

// Get all users (admin only)
router.get('/users', authMiddleware(true), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const isActive = req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined;

    const result = await adminService.getAllUsers({
      page,
      limit,
      isActive,
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID (admin only)
router.get('/users/:userId', authMiddleware(true), async (req, res, next) => {
  try {
    const user = await adminService.getUserById(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update user (admin only)
router.put('/users/:userId', authMiddleware(true), async (req, res, next) => {
  try {
    const user = await adminService.updateUser(req.params.userId, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/users/:userId', authMiddleware(true), async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.params.userId);

    res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Deactivate user (admin only)
router.patch('/users/:userId/deactivate', authMiddleware(true), async (req, res, next) => {
  try {
    const user = await adminService.deactivateUser(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Activate user (admin only)
router.patch('/users/:userId/activate', authMiddleware(true), async (req, res, next) => {
  try {
    const user = await adminService.activateUser(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'User activated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Get statistics (admin only)
router.get('/statistics', authMiddleware(true), async (req, res, next) => {
  try {
    const stats = await adminService.getStatistics();

    res.status(200).json({
      success: true,
      message: 'Statistics fetched successfully',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

// Get all users for dropdown (admin only)
router.get('/users-dropdown', authMiddleware(true), async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers({ page: 1, limit: 1000, isActive: true });
    
    // Format for dropdown
    const dropdownUsers = users.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
    
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: dropdownUsers
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;