const User = require('../../database/models/User');
const { generateToken, verifyToken } = require('../../auth/jwt');
const { AppError } = require('../../common/error-handler');
const { logger } = require('../../common/logger');
const emailService = require('../../common/email.service');

class AuthService {
  async signupUser(name, email, password) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AppError('Email already registered', 400, 'EMAIL_EXISTS');
      }

      const user = new User({
        name,
        email,
        password,
        role: 'user',
      });

      await user.save();
      logger.info('User registered', { email, role: 'user' });

      const token = generateToken(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        false
      );

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('User signup error', { error: error.message });
      throw new AppError('Failed to register user', 500, 'SIGNUP_ERROR');
    }
  }

  async signupAdmin(name, email, password, adminSecret) {
    try {
      const expectedSecret = process.env.ADMIN_SECRET || 'admin-secret-key';
      if (adminSecret !== expectedSecret) {
        throw new AppError('Invalid admin secret', 403, 'INVALID_ADMIN_SECRET');
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AppError('Email already registered', 400, 'EMAIL_EXISTS');
      }

      const user = new User({
        name,
        email,
        password,
        role: 'admin',
      });

      await user.save();
      logger.info('Admin registered', { email, role: 'admin' });

      const token = generateToken(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        true
      );

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Admin signup error', { error: error.message });
      throw new AppError('Failed to register admin', 500, 'SIGNUP_ERROR');
    }
  }

  async loginUser(email, password) {
    try {
      // Email is already normalized by validation middleware
      const user = await User.findOne({ email, role: 'user' });
      if (!user) {
        logger.warn('Login attempt failed - user not found', { email });
        throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        logger.warn('Login attempt failed - invalid password', { email });
        throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
      }

      if (!user.isActive) {
        throw new AppError('User account is inactive', 403, 'ACCOUNT_INACTIVE');
      }

      user.lastLogin = new Date();
      user.metadata.loginCount += 1;
      await user.save();

      logger.info('User logged in', { email });

      const token = generateToken(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        false
      );

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('User login error', { error: error.message });
      throw new AppError('Login failed', 500, 'LOGIN_ERROR');
    }
  }

  async loginAdmin(email, password) {
    try {
      // Email is already normalized by validation middleware
      const user = await User.findOne({ email, role: 'admin' });
      if (!user) {
        logger.warn('Admin login attempt failed - user not found', { email });
        throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        logger.warn('Login attempt failed - invalid password', { email });
        throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
      }

      if (!user.isActive) {
        throw new AppError('Admin account is inactive', 403, 'ACCOUNT_INACTIVE');
      }

      user.lastLogin = new Date();
      user.metadata.loginCount += 1;
      await user.save();

      logger.info('Admin logged in', { email });

      const token = generateToken(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        true
      );

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Admin login error', { error: error.message });
      throw new AppError('Login failed', 500, 'LOGIN_ERROR');
    }
  }

  async validateSession(token) {
    try {
      const decoded = verifyToken(token);
      if (!decoded || !decoded.id) {
        throw new AppError('Invalid token', 401, 'INVALID_TOKEN');
      }

      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        throw new AppError('User not found or inactive', 401, 'USER_INACTIVE');
      }

      return user.toJSON();
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Session validation error', { error: error.message });
      throw new AppError('Invalid session', 401, 'INVALID_SESSION');
    }
  }

  async logout(token) {
    try {
      const decoded = verifyToken(token);
      if (decoded && decoded.id) {
        const user = await User.findById(decoded.id);
        if (user) {
          logger.info('User logged out', { email: user.email });
        }
      }
    } catch (error) {
      logger.error('Logout error', { error: error.message });
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email });
      
      // Always return success even if user not found (security best practice)
      if (!user) {
        logger.info('Password reset requested for non-existent email', { email });
        return {
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent.',
        };
      }

      // Generate reset token
      const resetToken = user.generatePasswordResetToken();
      await user.save();

      // Send email
      const emailSent = await emailService.sendPasswordResetEmail(
        email,
        resetToken,
        user.name
      );

      if (!emailSent) {
        logger.warn('Failed to send password reset email', { email });
        // Still return success to prevent email enumeration
      } else {
        logger.info('Password reset email sent', { email });
      }

      return {
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Forgot password error', { error: error.message, email });
      throw new AppError('Failed to process password reset request', 500, 'FORGOT_PASSWORD_ERROR');
    }
  }

  async resetPassword(token, newPassword) {
    try {
      // Find user by token (need to hash token for lookup)
      const crypto = require('crypto');
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new AppError('Invalid or expired reset token', 400, 'INVALID_RESET_TOKEN');
      }

      // Update password
      user.password = newPassword;
      user.clearPasswordResetToken();
      await user.save();

      logger.info('Password reset successful', { email: user.email });

      return {
        success: true,
        message: 'Password has been reset successfully. Please log in with your new password.',
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Reset password error', { error: error.message });
      throw new AppError('Failed to reset password', 500, 'RESET_PASSWORD_ERROR');
    }
  }
}

module.exports = new AuthService();