require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkNotifications() {
  try {
    console.log('Checking notifications table...');
    
    // Check if notifications table exists
    const [tables] = await promisePool.query("SHOW TABLES LIKE 'notifications'");
    console.log('Notifications table exists:', tables.length > 0);
    
    if (tables.length > 0) {
      // Check table structure
      const [columns] = await promisePool.query('DESCRIBE notifications');
      console.log('Notifications table columns:', columns.map(c => c.Field));
      
      // Check current notifications
      const [notifications] = await promisePool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5');
      console.log('\nCurrent notifications:', notifications.length);
      notifications.forEach(n => {
        console.log(`- ID: ${n.id}, Title: ${n.title}, Active: ${n.is_active}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkNotifications();