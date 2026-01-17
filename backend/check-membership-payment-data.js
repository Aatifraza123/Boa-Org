const { promisePool } = require('./config/database');

async function checkMembershipPaymentData() {
  try {
    console.log('=== CHECKING MEMBERSHIP PAYMENT DATA ===');
    
    // Check membership_registrations table structure
    const [columns] = await promisePool.query('SHOW COLUMNS FROM membership_registrations');
    console.log('\nMembership registrations table columns:');
    columns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });
    
    // Check sample membership registration data
    const [sampleData] = await promisePool.query(`
      SELECT id, name, membership_type, amount, payment_status, payment_method, 
             transaction_id, razorpay_payment_id, created_at
      FROM membership_registrations 
      LIMIT 3
    `);
    
    console.log('\nSample membership registration data:');
    sampleData.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log(`  Name: ${record.name}`);
      console.log(`  Type: ${record.membership_type}`);
      console.log(`  Amount: ₹${record.amount}`);
      console.log(`  Payment Status: ${record.payment_status}`);
      console.log(`  Payment Method: ${record.payment_method}`);
      console.log(`  Transaction ID: ${record.transaction_id}`);
      console.log(`  Date: ${record.created_at}`);
    });
    
    // Check membership categories for reference
    const [categories] = await promisePool.query('SELECT * FROM membership_categories ORDER BY price');
    console.log('\nAvailable membership categories:');
    categories.forEach(cat => {
      console.log(`  - ${cat.title}: ₹${cat.price} (${cat.description})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkMembershipPaymentData();