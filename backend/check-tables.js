require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkTables() {
  try {
    console.log('Checking database tables...');
    
    // Check if registrations table exists
    const [tables] = await promisePool.query("SHOW TABLES LIKE 'registrations'");
    console.log('Registrations table exists:', tables.length > 0);
    
    if (tables.length > 0) {
      // Check table structure
      const [columns] = await promisePool.query('DESCRIBE registrations');
      console.log('Registrations table columns:', columns.map(c => c.Field));
    }
    
    // Check if seminars table exists and has data
    const [seminars] = await promisePool.query('SELECT id, name FROM seminars LIMIT 5');
    console.log('Seminars found:', seminars.length);
    seminars.forEach(s => console.log(`- ID: ${s.id}, Name: ${s.name}`));
    
    // Check if fee_categories table exists
    const [categories] = await promisePool.query('SELECT id, name FROM fee_categories LIMIT 5');
    console.log('Fee categories found:', categories.length);
    categories.forEach(c => console.log(`- ID: ${c.id}, Name: ${c.name}`));
    
    // Check if fee_slabs table exists
    const [slabs] = await promisePool.query('SELECT id, label FROM fee_slabs LIMIT 5');
    console.log('Fee slabs found:', slabs.length);
    slabs.forEach(s => console.log(`- ID: ${s.id}, Label: ${s.label}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkTables();