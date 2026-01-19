const { promisePool } = require('./config/database');
const bcrypt = require('bcryptjs');

async function addTestBOAMember() {
  try {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    await promisePool.query(`
      INSERT INTO users 
      (title, first_name, surname, email, password, mobile, gender, membership_no, is_boa_member, role, is_active) 
      VALUES 
      ('Dr.', 'Rajesh', 'Kumar', 'rajesh.kumar@example.com', ?, '9876543210', 'Male', 'BOA/LM/2024/001', TRUE, 'user', TRUE)
    `, [hashedPassword]);
    
    console.log('✓ Test BOA member added:');
    console.log('  Email: rajesh.kumar@example.com');
    console.log('  Password: test123');
    console.log('  Membership No: BOA/LM/2024/001');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('✓ Test BOA member already exists');
      console.log('  Membership No: BOA/LM/2024/001');
    } else {
      console.error('Error:', error.message);
    }
  } finally {
    process.exit();
  }
}

addTestBOAMember();
