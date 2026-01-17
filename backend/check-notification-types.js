require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkNotificationTypes() {
  try {
    const [notifications] = await promisePool.query(
      'SELECT id, title, type, is_active FROM notifications ORDER BY created_at DESC LIMIT 10'
    );
    
    console.log('Notifications with types:');
    notifications.forEach(n => {
      console.log(`ID: ${n.id}, Type: ${n.type}, Title: ${n.title}, Active: ${n.is_active}`);
    });
    
    // Check distinct types
    const [types] = await promisePool.query('SELECT DISTINCT type FROM notifications');
    console.log('\nDistinct notification types:');
    types.forEach(t => console.log(`- ${t.type}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkNotificationTypes();