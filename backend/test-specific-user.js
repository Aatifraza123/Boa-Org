const { promisePool } = require('./config/database');

async function testSpecificUser() {
  try {
    console.log('=== TESTING SPECIFIC USER MEMBERSHIP ===');
    
    // Test the specific query used in the admin controller
    const [members] = await promisePool.query(`
      SELECT u.*, 
             mr.membership_type, mr.status, mr.valid_from, mr.valid_until, mr.notes,
             mr.created_at as membership_created_at
      FROM users u
      LEFT JOIN membership_registrations mr ON u.email = mr.email
      WHERE u.membership_no = 'BOA/LM/0002/2023'
    `);
    
    if (members.length > 0) {
      const member = members[0];
      console.log('\nMember found:');
      console.log(`  Name: ${member.first_name} ${member.surname}`);
      console.log(`  Email: ${member.email}`);
      console.log(`  Membership No: ${member.membership_no}`);
      console.log(`  Membership Type: ${member.membership_type || 'N/A'}`);
      console.log(`  Status: ${member.status || 'N/A'}`);
      console.log(`  Valid From: ${member.valid_from || 'N/A'}`);
      console.log(`  Valid Until: ${member.valid_until || 'N/A'}`);
      console.log(`  Notes: ${member.notes || 'N/A'}`);
    } else {
      console.log('❌ No member found');
    }
    
    // Also test the user API query
    console.log('\n=== TESTING USER API QUERY ===');
    const [userMembership] = await promisePool.query(`
      SELECT u.*, 
             mr.membership_type, mr.status, mr.valid_from, mr.valid_until, mr.notes,
             mr.created_at as membership_created_at
      FROM users u
      LEFT JOIN membership_registrations mr ON u.email = mr.email
      WHERE u.id = 10
    `);
    
    if (userMembership.length > 0) {
      const user = userMembership[0];
      console.log('\nUser membership data:');
      console.log(`  Name: ${user.first_name} ${user.surname}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Membership No: ${user.membership_no}`);
      console.log(`  Membership Type: ${user.membership_type || 'N/A'}`);
      console.log(`  Status: ${user.status || 'N/A'}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

testSpecificUser();