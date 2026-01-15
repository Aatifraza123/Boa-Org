const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// Register
router.post('/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('surname').notEmpty().withMessage('Surname is required'),
  body('mobile').notEmpty().withMessage('Mobile number is required')
], authController.register);

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.login);

// Login with membership
router.post('/login-membership', [
  body('membership_no').notEmpty().withMessage('Membership number is required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.loginWithMembership);

module.exports = router;
