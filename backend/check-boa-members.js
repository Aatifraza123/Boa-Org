const { promisePool } = require('./config/database');

async function checkBOAMembers() {
  try {
    const [users] = await promisePool.query(`
      SELECT id, first_name, surname, email, membership_no, is_boa_member, is_active 
      FROM users 
      WHERE membership_no IS NOT NULL AND membership_no != ''
      ORDER BY id
    `);
    
    console.log('\n=== BOA Members in Database ===\n');
    users.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.first_name} ${user.surname}`);
      console.log(`Email: ${user.email}`);
      console.log(`Membership No: ${user.membership_no}`);
      console.log(`is_boa_member: ${user.is_boa_member ? 'TRUE' : 'FALSE'}`);
      console.log(`is_active: ${user.is_active ? 'TRUE' : 'FALSE'}`);
      console.log('---');
    });
    
    console.log(`\nTotal: ${users.length} users with membership numbers\n`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit();
  }
}

checkBOAMembers();
