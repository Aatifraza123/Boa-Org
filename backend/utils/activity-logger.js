const { promisePool } = require('../config/database');

// Activity types
const ACTIVITY_TYPES = {
  NEW_REGISTRATION: 'new_registration',
  NEW_USER: 'new_user',
  PAYMENT_RECEIVED: 'payment_received',
  REGISTRATION_CANCELLED: 'registration_cancelled'
};

// Create activity notification for admin
async function createActivityNotification(type, data) {
  try {
    let title = '';
    let message = '';
    let seminar_id = data.seminar_id || null;

    switch (type) {
      case ACTIVITY_TYPES.NEW_REGISTRATION:
        title = '🎉 New Registration';
        message = `${data.name} registered for ${data.seminar_name}`;
        break;

      case ACTIVITY_TYPES.NEW_USER:
        title = '👤 New User Signup';
        message = `${data.name} (${data.email}) joined the platform`;
        break;

      case ACTIVITY_TYPES.PAYMENT_RECEIVED:
        title = '💰 Payment Received';
        message = `Payment of Rs ${data.amount} received from ${data.name}`;
        break;

      case ACTIVITY_TYPES.REGISTRATION_CANCELLED:
        title = '❌ Registration Cancelled';
        message = `${data.name}'s registration for ${data.seminar_name} was cancelled`;
        break;

      default:
        return;
    }

    // Insert notification
    await promisePool.query(
      `INSERT INTO notifications (title, message, type, seminar_id, is_active, created_at)
       VALUES (?, ?, 'activity', ?, TRUE, NOW())`,
      [title, message, seminar_id]
    );

    console.log(`Activity notification created: ${title}`);
  } catch (error) {
    console.error('Failed to create activity notification:', error);
    // Don't throw error - activity logging should not break main flow
  }
}

module.exports = {
  ACTIVITY_TYPES,
  createActivityNotification
};
