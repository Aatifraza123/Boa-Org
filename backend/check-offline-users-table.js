const { promisePool } = require('./config/database');

async function checkOfflineUsersTable() {
  try {
    console.log('=== CHECKING OFFLINE USERS TABLE STRUCTURE ===');
    
    // Check if offline_users table exists
    const [tables] = await promisePool.query(`
      SHOW TABLES LIKE '%offline%'
    `);
    
    console.log('Tables with "offline" in name:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });
    
    // Check all tables to find where offline users might be stored
    const [allTables] = await promisePool.query('SHOW TABLES');
    console.log('\nAll tables in database:');
    allTables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });
    
    // Check users table for any offline-related columns
    const [userColumns] = await promisePool.query('SHOW COLUMNS FROM users');
    console.log('\nUsers table columns:');
    userColumns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });
    
    // Check for membership numbers in users table
    const [membershipNumbers] = await promisePool.query(`
      SELECT membership_no, COUNT(*) as count 
      FROM users 
      WHERE membership_no IS NOT NULL 
      GROUP BY membership_no 
      ORDER BY membership_no
    `);
    
    console.log('\nExisting membership numbers in users table:');
    membershipNumbers.forEach(row => {
      console.log(`  - ${row.membership_no} (${row.count} occurrence${row.count > 1 ? 's' : ''})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkOfflineUsersTable();