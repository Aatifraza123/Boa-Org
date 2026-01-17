const { promisePool } = require('./config/database');

async function testMembershipSystem() {
  try {
    console.log('=== TESTING MEMBERSHIP MANAGEMENT SYSTEM ===');
    
    // Test 1: Check if users table has membership_no column
    console.log('\n1. Testing users table structure...');
    const [userColumns] = await promisePool.query(`
      SHOW COLUMNS FROM users LIKE 'membership_no'
    `);
    console.log('Users table membership_no column:', userColumns.length > 0 ? '✅ EXISTS' : '❌ MISSING');
    
    // Test 2: Check if membership_registrations table exists
    console.log('\n2. Testing membership_registrations table...');
    const [membershipTables] = await promisePool.query(`
      SHOW TABLES LIKE 'membership_registrations'
    `);
    console.log('Membership registrations table:', membershipTables.length > 0 ? '✅ EXISTS' : '❌ MISSING');
    
    // Test 3: Get sample user data
    console.log('\n3. Testing user data retrieval...');
    const [users] = await promisePool.query(`
      SELECT u.id, u.email, u.first_name, u.surname, u.membership_no,
             mr.membership_type, mr.status, mr.valid_from, mr.valid_until
      FROM users u
      LEFT JOIN membership_registrations mr ON u.email = mr.email
      WHERE u.role = 'user'
      LIMIT 3
    `);
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`  - ${user.first_name} ${user.surname} (${user.email})`);
      console.log(`    Membership No: ${user.membership_no || 'Not Assigned'}`);
      console.log(`    Type: ${user.membership_type || 'N/A'}, Status: ${user.status || 'N/A'}`);
    });
    
    // Test 4: Test membership number generation
    console.log('\n4. Testing membership number generation...');
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const testMembershipNo = `BOA/LM/${randomNum}/${year}`;
    console.log(`Generated test membership number: ${testMembershipNo}`);
    
    console.log('\n=== MEMBERSHIP SYSTEM TEST COMPLETED ===');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testMembershipSystem();