require('dotenv').config();
const { promisePool } = require('./config/database');

async function checkSchema() {
  try {
    // Check registrations table structure
    const [columns] = await promisePool.query(
      'DESCRIBE registrations'
    );
    
    console.log('Registrations table structure:');
    console.log(JSON.stringify(columns, null, 2));
    
    // Check delegate_type enum values
    const delegateTypeColumn = columns.find(col => col.Field === 'delegate_type');
    if (delegateTypeColumn) {
      console.log('\nDelegate type column:');
      console.log('Type:', delegateTypeColumn.Type);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkSchema();
