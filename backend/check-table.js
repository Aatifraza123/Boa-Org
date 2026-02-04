const { promisePool } = require('./config/database');

async function checkTable() {
  try {
    console.log('Checking committee_members table structure...\n');
    
    const [columns] = await promisePool.query(
      "SHOW COLUMNS FROM committee_members"
    );
    
    console.log('Table columns:');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
    });
    
    console.log('\nTrying to insert a test seminar page member...');
    
    const [result] = await promisePool.query(
      `INSERT INTO committee_members (name, profession, image_url, display_order, page_type, is_active)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      ['Test Member', 'Test Role', '', 0, 'seminar']
    );
    
    console.log('✓ Insert successful! ID:', result.insertId);
    
    // Delete test record
    await promisePool.query('DELETE FROM committee_members WHERE id = ?', [result.insertId]);
    console.log('✓ Test record deleted');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

checkTable();
