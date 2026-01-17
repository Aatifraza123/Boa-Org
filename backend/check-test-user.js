const { promisePool } = require('./config/database');

async function checkTestUser() {
  try {
    console.log('=== CHECKING TEST USER ===');
    
    // Find the test user
    const [users] = await promisePool.query(`
      SELECT * FROM users WHERE membership_no = 'BOA/LM/0002/2023'
    `);
    
    if (users.length > 0) {
      const user = users[0];
      console.log('\nTest user found:');
      console.log(`  ID: ${user.id}`);
      console.log(`  Name: ${user.title} ${user.first_name} ${user.surname}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Membership No: ${user.membership_no}`);
      
      // Check if they have a membership registration
      const [membership] = await promisePool.query(`
        SELECT * FROM membership_registrations WHERE email = ?
      `, [user.email]);
      
      if (membership.length > 0) {
        console.log('\nMembership registration found:');
        console.log(`  Type: ${membership[0].membership_type}`);
        console.log(`  Status: ${membership[0].status}`);
        console.log(`  Valid From: ${membership[0].valid_from}`);
        console.log(`  Valid Until: ${membership[0].valid_until}`);
      } else {
        console.log('\n❌ No membership registration found for this user');
        
        // Create a basic membership registration for testing
        console.log('\nCreating test membership registration...');
        await promisePool.query(`
          INSERT INTO membership_registrations 
          (email, name, membership_type, status, valid_from, notes, created_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, [
          user.email,
          `${user.title} ${user.first_name} ${user.surname}`,
          'standard',
          'active',
          '2023-01-01',
          'Test membership for system testing'
        ]);
        console.log('✅ Test membership registration created');
      }
    } else {
      console.log('❌ Test user not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkTestUser();