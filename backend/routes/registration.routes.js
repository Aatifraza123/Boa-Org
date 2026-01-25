const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const auth = require('../middleware/auth.middleware');

// Add logging middleware for all registration routes
router.use((req, res, next) => {
  next();
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Registration routes working' });
});

// Simple test POST endpoint
router.post('/test-post', auth, (req, res) => {
  res.json({ success: true, message: 'POST test working', user_id: req.user?.id });
});

// Create registration
router.post('/', auth, registrationController.createRegistration);

// Get user registrations
router.get('/my-registrations', auth, registrationController.getUserRegistrations);

// Update payment status
router.put('/:id/payment', auth, registrationController.updatePaymentStatus);

module.exports = router;
