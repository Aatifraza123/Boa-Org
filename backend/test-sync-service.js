const { promisePool } = require('./config/database');

async function testSync() {
  try {
    console.log('Testing BOA Member Sync...\n');
    
    // Show current state
    const [before] = await promisePool.query(`
      SELECT id, first_name, surname, membership_no, is_boa_member 
      FROM users 
      ORDER BY id DESC
      LIMIT 10
    `);
    
    console.log('=== BEFORE SYNC ===');
    before.forEach(u => {
      console.log(`${u.id}. ${u.first_name} ${u.surname} - MemberNo: ${u.membership_no || 'NULL'} - BOA: ${u.is_boa_member ? 'TRUE' : 'FALSE'}`);
    });
    
    // Activate users with membership_no
    const [activate] = await promisePool.query(`
      UPDATE users 
      SET is_boa_member = TRUE 
      WHERE membership_no IS NOT NULL 
      AND membership_no != '' 
      AND is_boa_member = FALSE
    `);
    
    console.log(`\n✓ Activated ${activate.affectedRows} users`);
    
    // Deactivate users without membership_no
    const [deactivate] = await promisePool.query(`
      UPDATE users 
      SET is_boa_member = FALSE 
      WHERE (membership_no IS NULL OR membership_no = '') 
      AND is_boa_member = TRUE
    `);
    
    console.log(`✓ Deactivated ${deactivate.affectedRows} users`);
    
    // Show after state
    const [after] = await promisePool.query(`
      SELECT id, first_name, surname, membership_no, is_boa_member 
      FROM users 
      ORDER BY id DESC
      LIMIT 10
    `);
    
    console.log('\n=== AFTER SYNC ===');
    after.forEach(u => {
      console.log(`${u.id}. ${u.first_name} ${u.surname} - MemberNo: ${u.membership_no || 'NULL'} - BOA: ${u.is_boa_member ? 'TRUE' : 'FALSE'}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit();
  }
}

testSync();
