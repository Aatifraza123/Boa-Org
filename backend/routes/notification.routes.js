const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth.middleware');

// Get admin activity notifications - must be before '/'
router.get('/admin/activity', notificationController.getAdminActivityNotifications);

// Mark notification as read
router.put('/admin/:id/read', notificationController.markNotificationAsRead);

// Delete notification
router.delete('/admin/:id', notificationController.deleteNotification);

// Get all active notifications (public)
router.get('/', notificationController.getAllNotifications);

module.exports = router;
