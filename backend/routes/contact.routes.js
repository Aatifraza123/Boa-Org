const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Send contact form
router.post('/send', contactController.sendContactForm);

module.exports = router;
