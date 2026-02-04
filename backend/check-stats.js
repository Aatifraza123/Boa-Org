const { promisePool } = require('./config/database');

async function checkStats() {
  try {
    console.log('Checking stats table...\n');
    
    const [stats] = await promisePool.query('SELECT * FROM stats WHERE is_active = TRUE');
    
    console.log('Active stats:');
    stats.forEach(stat => {
      console.log(`- ${stat.stat_key}: ${stat.stat_value} (${stat.stat_label})`);
    });
    
    console.log('\nChecking paid members count...');
    const [count] = await promisePool.query(
      "SELECT COUNT(*) as count FROM membership_registrations WHERE payment_status = 'completed'"
    );
    
    console.log(`Paid members: ${count[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkStats();
