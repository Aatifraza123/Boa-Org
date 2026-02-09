const express = require('express');
const router = express.Router();
const electionController = require('../controllers/election.controller');
const adminAuth = require('../middleware/admin-auth.middleware');
const auth = require('../middleware/auth.middleware');

// Public routes
router.get('/', electionController.getAllElections);
router.post('/submit', electionController.submitNomination);

// User routes (protected)
router.get('/my-submissions', auth, electionController.getMySubmissions);

// Public PDF generation (no auth required for downloading forms)
// MUST be before /:id route to avoid conflict
router.get('/generate-pdf/:id', electionController.generateElectionPdfPublic);

// This must come after specific routes like /generate-pdf/:id
router.get('/:id', electionController.getElectionById);

// Admin routes
router.post('/', adminAuth, electionController.createElection);
router.put('/:id', adminAuth, electionController.updateElection);
router.delete('/:id', adminAuth, electionController.deleteElection);
router.post('/:id/generate-pdf', adminAuth, electionController.generateElectionPdf);
router.get('/:election_id/submissions', adminAuth, electionController.getElectionSubmissions);
router.put('/submissions/:id/status', adminAuth, electionController.updateSubmissionStatus);
router.put('/submissions/:id', adminAuth, electionController.updateSubmission);
router.delete('/submissions/:id', adminAuth, electionController.deleteSubmission);

module.exports = router;
