const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const auth = require('../middleware/auth.middleware');

// Add logging middleware for all registration routes
router.use((req, res, next) => {
  console.log('=== REGISTRATION ROUTE HIT ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('==============================');
  next();
});

// Test endpoint
router.get('/test', (req, res) => {
  console.log('Registration test endpoint hit');
  res.json({ success: true, message: 'Registration routes working' });
});

// Simple test POST endpoint
router.post('/test-post', auth, (req, res) => {
  console.log('Registration POST test endpoint hit');
  console.log('User ID:', req.user?.id);
  console.log('Body:', req.body);
  res.json({ success: true, message: 'POST test working', user_id: req.user?.id });
});

// Create registration
router.post('/', auth, registrationController.createRegistration);

// Get user registrations
router.get('/my-registrations', auth, registrationController.getUserRegistrations);

// Update payment status
router.put('/:id/payment', auth, registrationController.updatePaymentStatus);

module.exports = router;
