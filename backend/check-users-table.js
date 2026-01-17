require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkUsersTable() {
  try {
    console.log('Checking users table structure...');
    
    const [columns] = await promisePool.query('DESCRIBE users');
    console.log('Users table columns:');
    columns.forEach(col => {
      console.log(`- ${col.Field} (${col.Type})`);
    });
    
    // Check if there's a full_name column or if we need to use first_name + surname
    const hasFullName = columns.some(col => col.Field === 'full_name');
    console.log('\nHas full_name column:', hasFullName);
    
    if (!hasFullName) {
      console.log('Need to use CONCAT(first_name, " ", surname) instead');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsersTable();