const { promisePool } = require('./config/database');

async function fixPageType() {
  try {
    console.log('Adding "seminar" to page_type enum...\n');
    
    await promisePool.query(
      `ALTER TABLE committee_members 
       MODIFY COLUMN page_type ENUM('about', 'home', 'seminar') DEFAULT 'about'`
    );
    
    console.log('✓ Successfully updated page_type enum!');
    console.log('✓ Now supports: about, home, seminar\n');
    
    // Test insert
    console.log('Testing seminar insert...');
    const [result] = await promisePool.query(
      `INSERT INTO committee_members (name, profession, image_url, display_order, page_type, is_active)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      ['Test Seminar Member', 'Test Role', '', 0, 'seminar']
    );
    
    console.log('✓ Test insert successful! ID:', result.insertId);
    
    // Delete test record
    await promisePool.query('DELETE FROM committee_members WHERE id = ?', [result.insertId]);
    console.log('✓ Test record cleaned up');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

fixPageType();
