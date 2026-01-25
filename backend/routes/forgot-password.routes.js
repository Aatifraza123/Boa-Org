const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgot-password.controller');

// Send password reset link to email
router.post('/send-link', forgotPasswordController.sendResetLink);

// Verify reset token
router.post('/verify-token', forgotPasswordController.verifyToken);

// Reset password with token
router.post('/reset', forgotPasswordController.resetPassword);

module.exports = router;
