const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const auth = require('../middleware/auth.middleware');

// Create registration
router.post('/', auth, registrationController.createRegistration);

// Get user registrations
router.get('/my-registrations', auth, registrationController.getUserRegistrations);

// Update payment status
router.put('/:id/payment', auth, registrationController.updatePaymentStatus);

module.exports = router;
