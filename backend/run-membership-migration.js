const { promisePool } = require('./config/database');

async function runMembershipMigration() {
  try {
    console.log('=== RUNNING MEMBERSHIP MANAGEMENT MIGRATION ===');
    
    // Add missing columns
    console.log('\n1. Adding status column...');
    await promisePool.query(`
      ALTER TABLE membership_registrations 
      ADD COLUMN status VARCHAR(50) DEFAULT 'active'
    `);
    console.log('✅ Status column added');
    
    console.log('\n2. Adding valid_from column...');
    await promisePool.query(`
      ALTER TABLE membership_registrations 
      ADD COLUMN valid_from DATE NULL
    `);
    console.log('✅ Valid_from column added');
    
    console.log('\n3. Adding valid_until column...');
    await promisePool.query(`
      ALTER TABLE membership_registrations 
      ADD COLUMN valid_until DATE NULL
    `);
    console.log('✅ Valid_until column added');
    
    console.log('\n4. Adding notes column...');
    await promisePool.query(`
      ALTER TABLE membership_registrations 
      ADD COLUMN notes TEXT NULL
    `);
    console.log('✅ Notes column added');
    
    // Update existing records
    console.log('\n5. Updating existing records...');
    await promisePool.query(`
      UPDATE membership_registrations 
      SET status = CASE 
          WHEN payment_status = 'completed' THEN 'active'
          WHEN payment_status = 'pending' THEN 'pending'
          ELSE 'active'
      END
      WHERE status IS NULL OR status = ''
    `);
    console.log('✅ Existing records updated');
    
    // Show updated structure
    console.log('\n6. Verifying table structure...');
    const [columns] = await promisePool.query(`
      SHOW COLUMNS FROM membership_registrations
    `);
    
    const newColumns = columns.filter(col => 
      ['status', 'valid_from', 'valid_until', 'notes'].includes(col.Field)
    );
    
    console.log('New columns added:');
    newColumns.forEach(col => {
      console.log(`  ✅ ${col.Field} (${col.Type})`);
    });
    
    console.log('\n=== MIGRATION COMPLETED SUCCESSFULLY ===');
    
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.log('⚠️ Columns already exist, skipping migration');
    } else {
      console.error('❌ Migration failed:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

runMembershipMigration();