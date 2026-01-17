require('dotenv').config();
const bcrypt = require('bcryptjs');
const { promisePool } = require('./config/database');

async function createTestUser() {
  try {
    const password = 'User@123';
    const membershipNo = 'BOA/LM/0002/2023';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Creating test user...');
    console.log('Password:', password);
    console.log('Membership No:', membershipNo);
    
    // Check if user already exists
    const [existingUsers] = await promisePool.query(
      'SELECT id FROM users WHERE membership_no = ?',
      [membershipNo]
    );
    
    if (existingUsers.length > 0) {
      console.log('User already exists, updating password...');
      const [result] = await promisePool.query(
        'UPDATE users SET password = ? WHERE membership_no = ?',
        [hashedPassword, membershipNo]
      );
      console.log('Password updated for existing user');
    } else {
      console.log('Creating new user...');
      const [result] = await promisePool.query(
        'INSERT INTO users (title, first_name, surname, email, password, membership_no, mobile, gender, role, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['dr', 'Test', 'User', 'testuser@example.com', hashedPassword, membershipNo, '9876543210', 'male', 'user', 1]
      );
      console.log('New user created with ID:', result.insertId);
    }
    
    // Verify the user exists
    const [users] = await promisePool.query(
      'SELECT id, first_name, surname, membership_no, LENGTH(password) as pwd_len FROM users WHERE membership_no = ?',
      [membershipNo]
    );
    
    console.log('\nUser verification:');
    console.log('User data:', users[0]);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestUser();
