const { promisePool } = require('./config/database');

async function fixBOAMembers() {
  try {
    // Update all users with membership_no to have is_boa_member = TRUE
    const [result] = await promisePool.query(`
      UPDATE users 
      SET is_boa_member = TRUE 
      WHERE membership_no IS NOT NULL 
      AND membership_no != '' 
      AND is_boa_member = FALSE
    `);
    
    console.log(`✓ Updated ${result.affectedRows} users to is_boa_member = TRUE`);
    
    // Show updated users
    const [users] = await promisePool.query(`
      SELECT id, first_name, surname, membership_no, is_boa_member 
      FROM users 
      WHERE membership_no IS NOT NULL AND membership_no != ''
      ORDER BY id
    `);
    
    console.log('\n=== All BOA Members (Updated) ===\n');
    users.forEach(user => {
      console.log(`${user.id}. ${user.first_name} ${user.surname} - ${user.membership_no} - BOA Member: ${user.is_boa_member ? 'YES' : 'NO'}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit();
  }
}

fixBOAMembers();
