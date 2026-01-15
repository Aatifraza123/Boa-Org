const express = require('express');
const router = express.Router();
const seminarController = require('../controllers/seminar.controller');

// Get all active seminars
router.get('/', seminarController.getAllSeminars);

// Get seminar by ID with fee structure
router.get('/:id', seminarController.getSeminarById);

// Get active seminar
router.get('/active/current', seminarController.getActiveSeminar);

module.exports = router;
