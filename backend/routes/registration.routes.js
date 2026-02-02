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

<<<<<<< HEAD
// Create registration
router.post('/', auth, registrationController.createRegistration);
=======
// Simple test POST endpoint
router.post('/test-post', (req, res) => {
  res.json({ success: true, message: 'POST test working', user_id: req.user?.id });
});

// Create registration (no auth required)
router.post('/', registrationController.createRegistration);
>>>>>>> 7d69e0ff69e911a8ae88233782760e7a9073016c

// Get user registrations (no auth required)
router.get('/my-registrations', registrationController.getUserRegistrations);

// Update payment status (no auth required)
router.put('/:id/payment', registrationController.updatePaymentStatus);

module.exports = router;
