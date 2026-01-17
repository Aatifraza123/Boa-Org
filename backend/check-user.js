require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkUser() {
  try {
    const [users] = await promisePool.query(
      'SELECT id, membership_no, email, password, LENGTH(password) as pwd_len, is_active FROM users WHERE membership_no = ?',
      ['BOA/LM/0002/2023']
    );
    
    console.log('User found:', users.length);
    if (users.length > 0) {
      const user = users[0];
      console.log('User ID:', user.id);
      console.log('Membership:', user.membership_no);
      console.log('Email:', user.email);
      console.log('Password hash length:', user.pwd_len);
      console.log('Is active:', user.is_active);
      console.log('Password hash:', user.password);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUser();
