require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkStatus() {
  try {
    // Check status column options
    const [columns] = await promisePool.query('DESCRIBE registrations');
    const statusColumn = columns.find(c => c.Field === 'status');
    console.log('Status column type:', statusColumn.Type);
    
    // Check recent registrations
    const [regs] = await promisePool.query(
      'SELECT id, registration_no, status, created_at FROM registrations ORDER BY created_at DESC LIMIT 5'
    );
    
    console.log('\nRecent registrations:');
    regs.forEach(r => {
      console.log(`ID: ${r.id}, Status: ${r.status}, Created: ${r.created_at}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkStatus();