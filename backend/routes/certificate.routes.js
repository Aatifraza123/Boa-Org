const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');
const auth = require('../middleware/auth.middleware');
const adminAuth = require('../middleware/admin-auth.middleware');
const upload = require('../middleware/upload.middleware');

// User routes (protected)
router.get('/my-certificates', auth, certificateController.getUserCertificates);

// Admin routes (protected)
router.post('/add', adminAuth, upload.single('certificate'), certificateController.addCertificate);
router.post('/upload', adminAuth, upload.single('certificate'), certificateController.uploadMemberCertificate);
router.get('/user/:userId', adminAuth, certificateController.getUserCertificatesAdmin);
router.delete('/:id', adminAuth, certificateController.deleteCertificate);

module.exports = router;
