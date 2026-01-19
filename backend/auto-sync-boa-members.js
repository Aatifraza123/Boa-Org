const { promisePool } = require('./config/database');

let intervalId = null;
let isRunning = false;

async function syncBOAMembers() {
  if (isRunning) {
    console.log('⏳ Sync already running, skipping...');
    return;
  }

  isRunning = true;

  try {
    // Check if there are any users with membership_no but is_boa_member = FALSE
    const [usersToUpdate] = await promisePool.query(`
      SELECT id, first_name, surname, membership_no 
      FROM users 
      WHERE membership_no IS NOT NULL 
      AND membership_no != '' 
      AND is_boa_member = FALSE
    `);

    if (usersToUpdate.length === 0) {
      console.log('✓ All users with membership numbers are already BOA members');
      console.log('✓ Auto-sync completed. Stopping...\n');
      
      // Stop the interval
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log('🛑 Auto-sync stopped. All users synced!\n');
        process.exit(0);
      }
      return;
    }

    console.log(`\n🔄 Found ${usersToUpdate.length} users to update:`);
    usersToUpdate.forEach(user => {
      console.log(`   - ${user.first_name} ${user.surname} (${user.membership_no})`);
    });

    // Update users
    const [result] = await promisePool.query(`
      UPDATE users 
      SET is_boa_member = TRUE 
      WHERE membership_no IS NOT NULL 
      AND membership_no != '' 
      AND is_boa_member = FALSE
    `);

    console.log(`✓ Updated ${result.affectedRows} users to is_boa_member = TRUE`);
    console.log(`⏰ Next check in 5 seconds...\n`);

  } catch (error) {
    console.error('❌ Sync error:', error.message);
  } finally {
    isRunning = false;
  }
}

// Start auto-sync
console.log('🚀 Starting BOA Members Auto-Sync...');
console.log('📋 Checking every 5 seconds for users with membership numbers');
console.log('🎯 Will auto-stop when all users are synced\n');

// Run immediately
syncBOAMembers();

// Then run every 5 seconds
intervalId = setInterval(syncBOAMembers, 5000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping auto-sync...');
  if (intervalId) {
    clearInterval(intervalId);
  }
  process.exit(0);
});
