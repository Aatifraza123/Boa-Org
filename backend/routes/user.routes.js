const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', auth, userController.updateProfile);

// Change password
router.put('/change-password', auth, userController.changePassword);

// Get membership details (no auth required)
router.get('/membership', userController.getMembershipDetails);

// Verify BOA membership number (public route - no auth required)
router.post('/verify-membership', userController.verifyMembership);

module.exports = router;
