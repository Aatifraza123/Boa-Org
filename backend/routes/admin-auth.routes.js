const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/admin-auth.controller');
const adminAuth = require('../middleware/admin-auth.middleware');

// Admin login
router.post('/login', (req, res, next) => {
  next();
}, adminAuthController.adminLogin);

// Admin profile (protected)
router.get('/profile', adminAuth, adminAuthController.getAdminProfile);
router.put('/profile', adminAuth, adminAuthController.updateAdminProfile);

// Admin logout (protected)
router.post('/logout', adminAuth, adminAuthController.adminLogout);

module.exports = router;


// Image upload (protected)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/certification/upload-image', adminAuth, upload.single('image'), adminAuthController.uploadImage);

