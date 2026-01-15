const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/admin-auth.middleware');
const upload = require('../middleware/upload.middleware');

// Seminars CRUD
router.get('/seminars', adminAuth, adminController.getAllSeminarsAdmin);
router.post('/seminars', adminAuth, adminController.createSeminar);
router.put('/seminars/:id', adminAuth, adminController.updateSeminar);
router.delete('/seminars/:id', adminAuth, adminController.deleteSeminar);

// Users CRUD
router.get('/users', adminAuth, adminController.getAllUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);

// Registrations CRUD
router.get('/registrations', adminAuth, adminController.getAllRegistrations);
router.put('/registrations/:id/status', adminAuth, adminController.updateRegistrationStatus);
router.delete('/registrations/:id', adminAuth, adminController.deleteRegistration);

// Notifications CRUD
router.post('/notifications', adminAuth, adminController.createNotification);
router.put('/notifications/:id', adminAuth, adminController.updateNotification);
router.delete('/notifications/:id', adminAuth, adminController.deleteNotification);

// Fee Structure CRUD
router.get('/fee-structure/:seminar_id', adminAuth, adminController.getFeeStructure);
router.post('/fee-categories', adminAuth, adminController.createFeeCategory);
router.put('/fee-categories/:id', adminAuth, adminController.updateFeeCategory);
router.delete('/fee-categories/:id', adminAuth, adminController.deleteFeeCategory);
router.post('/fee-slabs', adminAuth, adminController.createFeeSlab);
router.put('/fee-slabs/:id', adminAuth, adminController.updateFeeSlab);
router.delete('/fee-slabs/:id', adminAuth, adminController.deleteFeeSlab);
router.post('/fee-amount', adminAuth, adminController.updateFeeAmount);

// Export registrations to Excel
router.get('/export-registrations', adminAuth, adminController.exportRegistrations);

// Get statistics
router.get('/statistics', adminAuth, adminController.getStatistics);

// Import offline user
router.post('/import-offline-user', adminAuth, adminController.importOfflineUser);

// Committee Members CRUD
router.get('/committee-members', adminAuth, adminController.getAllCommitteeMembers);
router.post('/committee-members', adminAuth, adminController.createCommitteeMember);
router.put('/committee-members/:id', adminAuth, adminController.updateCommitteeMember);
router.delete('/committee-members/:id', adminAuth, adminController.deleteCommitteeMember);

// Delegate Categories CRUD
router.get('/delegate-categories/:seminar_id', adminAuth, adminController.getDelegateCategories);
router.post('/delegate-categories', adminAuth, adminController.createDelegateCategory);
router.put('/delegate-categories/:id', adminAuth, adminController.updateDelegateCategory);
router.delete('/delegate-categories/:id', adminAuth, adminController.deleteDelegateCategory);

// Certification CRUD
router.get('/certification', adminAuth, adminController.getCertification);
router.put('/certification', adminAuth, adminController.updateCertification);
router.post('/certification/upload-image', adminAuth, upload.single('image'), adminController.uploadCertificateImage);

// Upcoming Events CRUD
router.get('/upcoming-events', adminAuth, adminController.getAllUpcomingEvents);
router.post('/upcoming-events', adminAuth, adminController.createUpcomingEvent);
router.put('/upcoming-events/:id', adminAuth, adminController.updateUpcomingEvent);
router.delete('/upcoming-events/:id', adminAuth, adminController.deleteUpcomingEvent);

// Contact Info CRUD
router.get('/contact-info', adminAuth, adminController.getContactInfo);
router.put('/contact-info', adminAuth, adminController.updateContactInfo);

module.exports = router;
