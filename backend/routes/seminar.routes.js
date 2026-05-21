const express = require('express');
const router = express.Router();
const seminarController = require('../controllers/seminar.controller');

// Get all active seminars
router.get('/', seminarController.getAllSeminars);

// Get active seminar (MUST be before /:id route)
router.get('/active/current', seminarController.getActiveSeminar);

// Get seminar by ID with fee structure
router.get('/:id', seminarController.getSeminarById);

module.exports = router;
