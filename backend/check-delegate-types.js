require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkDelegateTypes() {
  try {
    const [regs] = await promisePool.query(
      'SELECT id, registration_no, delegate_type FROM registrations ORDER BY created_at DESC LIMIT 5'
    );
    
    console.log('Recent registrations delegate_type:');
    regs.forEach(r => {
      console.log(`ID: ${r.id}, Reg: ${r.registration_no}, Delegate Type: "${r.delegate_type}"`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDelegateTypes();