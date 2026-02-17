const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { validate } = require('../../common/validation');
const authService = require('../services/auth.service');
const { logger } = require('../../common/logger');

// Rate limiter for forgot password - prevent abuse
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests from counting toward the limit
  skipSuccessfulRequests: false,
});

// User Signup
router.post('/user/signup', async (req, res, next) => {
  try {
    const { name, email, password } = validate(req.body, 'userSignup');
    const result = await authService.signupUser(name, email, password);

    logger.info('User signup successful', { email });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// User Login
router.post('/user/login', async (req, res, next) => {
  try {
    logger.info('User login attempt', { email: req.body?.email, hasPassword: !!req.body?.password });
    const { email, password } = validate(req.body, 'userLogin');
    const result = await authService.loginUser(email, password);

    logger.info('User login successful', { email });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    logger.error('User login error in route', { 
      error: error.message, 
      statusCode: error.statusCode,
      email: req.body?.email 
    });
    next(error);
  }
});

// Admin Signup
router.post('/admin/signup', async (req, res, next) => {
  try {
    const { name, email, password, adminSecret } = validate(req.body, 'adminSignup');
    const result = await authService.signupAdmin(name, email, password, adminSecret);

    logger.info('Admin signup successful', { email });
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Admin Login
router.post('/admin/login', async (req, res, next) => {
  try {
    logger.info('Admin login attempt', { email: req.body?.email, hasPassword: !!req.body?.password });
    const { email, password } = validate(req.body, 'adminLogin');
    const result = await authService.loginAdmin(email, password);

    logger.info('Admin login successful', { email });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    logger.error('Admin login error in route', { 
      error: error.message, 
      statusCode: error.statusCode,
      email: req.body?.email 
    });
    next(error);
  }
});

// Validate Session
router.get('/validate-session', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const result = await authService.validateSession(token);
    
    res.status(200).json({
      success: true,
      data: { user: result },
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      await authService.logout(token);
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
});

// Forgot Password - with rate limiting
router.post('/forgot-password', forgotPasswordLimiter, async (req, res, next) => {
  try {
    const { email } = validate(req.body, 'forgotPassword');
    const result = await authService.forgotPassword(email);

    logger.info('Forgot password request processed', { email });
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logger.error('Forgot password error in route', { 
      error: error.message, 
      statusCode: error.statusCode,
      email: req.body?.email 
    });
    next(error);
  }
});

// Reset Password
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, password } = validate(req.body, 'resetPassword');
    const result = await authService.resetPassword(token, password);

    logger.info('Password reset successful');
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logger.error('Reset password error in route', { 
      error: error.message, 
      statusCode: error.statusCode,
    });
    next(error);
  }
});

module.exports = router;