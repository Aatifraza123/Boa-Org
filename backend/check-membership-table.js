const { promisePool } = require('./config/database');

async function checkMembershipTable() {
  try {
    console.log('=== CHECKING MEMBERSHIP_REGISTRATIONS TABLE ===');
    
    // Check table structure
    const [columns] = await promisePool.query(`
      SHOW COLUMNS FROM membership_registrations
    `);
    
    console.log('\nTable columns:');
    columns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type}) ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key ? `KEY: ${col.Key}` : ''}`);
    });
    
    // Check sample data
    const [data] = await promisePool.query(`
      SELECT * FROM membership_registrations LIMIT 3
    `);
    
    console.log(`\nSample data (${data.length} records):`);
    data.forEach((row, index) => {
      console.log(`  Record ${index + 1}:`, row);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkMembershipTable();