# Password Reset Feature

## Overview
This feature allows users to securely reset their password via email if they forget it.

## Flow
1. User clicks "Forgot Password?" on the login page
2. User enters their registered email on the Forgot Password page
3. System sends a password reset link to the email (valid for 1 hour)
4. User clicks the link in the email and is taken to the Reset Password page
5. User sets a new password
6. User is redirected to login with a success message

## Backend Changes

### Files Modified/Created:
1. **`backend/internal/database/models/User.js`**
   - Added `resetPasswordToken` field (hashed token)
   - Added `resetPasswordExpires` field (expiry timestamp)
   - Added `generatePasswordResetToken()` method
   - Added `verifyPasswordResetToken()` method
   - Added `clearPasswordResetToken()` method

2. **`backend/internal/common/validation.js`**
   - Added `forgotPassword` schema (email validation)
   - Added `resetPassword` schema (token and password validation)

3. **`backend/internal/api/services/auth.service.js`**
   - Added `forgotPassword(email)` method
   - Added `resetPassword(token, newPassword)` method
   - Integrated with email service for sending reset emails

4. **`backend/internal/api/routes/auth.routes.js`**
   - Added `POST /auth/forgot-password` route
   - Added `POST /auth/reset-password` route

5. **`backend/internal/common/email.service.js`** (NEW)
   - Created email service using nodemailer
   - Added `sendPasswordResetEmail()` method
   - Configurable via environment variables

6. **`backend/package.json`**
   - Added `nodemailer` dependency

## Frontend Changes

### Files Modified/Created:
1. **`frontend/src/pages/Auth/Login.jsx`**
   - Added "Forgot Password?" link below the sign-in button

2. **`frontend/src/pages/Auth/ForgotPassword.jsx`** (NEW)
   - Created forgot password page component
   - Email input form with validation
   - Success state showing confirmation message
   - Link back to login

3. **`frontend/src/pages/Auth/ResetPassword.jsx`** (NEW)
   - Created reset password page component
   - Reads reset token from URL query params
   - New password and confirm password fields
   - Validation and error handling
   - Redirects to login on success

4. **`frontend/src/routes/AppRoutes.jsx`**
   - Added `/forgot-password` route
   - Added `/reset-password` route
   - Both are public routes (no authentication required)

## Environment Variables Required

Add these to your `.env` file for email functionality:

```env
# SMTP Configuration (required for sending password reset emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com

# Frontend URL (used in reset email links)
FRONTEND_URL=http://localhost:5173
```

**Note:** If SMTP is not configured, the system will still return a success response to prevent email enumeration attacks, but no email will be sent. Check server logs for details.

## Security Features

1. **Token Security:**
   - Reset tokens are hashed using SHA-256 before storage
   - Tokens expire after 1 hour
   - Tokens are single-use (cleared after password reset)

2. **Email Enumeration Prevention:**
   - API returns the same success message whether email exists or not
   - Prevents attackers from discovering valid email addresses

3. **Password Requirements:**
   - Minimum 6 characters (matching existing signup requirements)
   - Maximum 100 characters

## API Endpoints

### POST /api/v1/auth/forgot-password
Request body:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset link has been sent."
}
```

### POST /api/v1/auth/reset-password
Request body:
```json
{
  "token": "plain-text-reset-token-from-email",
  "password": "newPassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password has been reset successfully. Please log in with your new password."
}
```

## Testing the Feature

1. Start the backend server with `npm run dev` (install nodemailer first with `npm install`)
2. Start the frontend with `npm run dev`
3. Go to Login page and click "Forgot Password?"
4. Enter an existing user's email
5. Check server logs for the reset link (if SMTP not configured)
6. Navigate to the reset link or copy the token
7. Set a new password
8. Login with the new password

## Notes

- The password reset feature works for both user and admin accounts
- Existing users in the database will automatically get the new fields (resetPasswordToken and resetPasswordExpires) when they request a password reset
- No database migration is needed as the new fields have default values
