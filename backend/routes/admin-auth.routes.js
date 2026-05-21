const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/admin-auth.controller');
const adminAuth = require('../middleware/admin-auth.middleware');
const upload = require('../middleware/upload.middleware');

// Admin login
router.post('/login', (req, res, next) => {
  next();
}, adminAuthController.adminLogin);

// Admin profile (protected)
router.get('/profile', adminAuth, adminAuthController.getAdminProfile);
router.put('/profile', adminAuth, adminAuthController.updateAdminProfile);

// Admin logout (protected)
router.post('/logout', adminAuth, adminAuthController.adminLogout);

// Image upload (protected) - for backward compatibility
router.post('/certification/upload-image', adminAuth, upload.single('image'), adminAuthController.uploadImage);

module.exports = router;

