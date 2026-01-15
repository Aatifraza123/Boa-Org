require('dotenv').config();
const { importOfflineUsers } = require('./utils/bulk-user-import');

/**
 * OFFLINE USER IMPORT SCRIPT
 * 
 * How to use:
 * 1. Edit the 'offlineUsers' array below with client data
 * 2. Run: node import-offline-users.js
 * 3. Users will be added to database
 * 4. They can login with membership_no and password
 */

// ADD CLIENT'S OFFLINE USERS HERE
const offlineUsers = [
  {
    membership_no: 'BOA-2024-0001',
    title: 'Dr.',
    first_name: 'Rajesh',
    surname: 'Kumar',
    email: 'rajesh.kumar@example.com',
    mobile: '9876543210',
    gender: 'male',
    password: 'password123', // Default password (user can change later)
    address: {
      city: 'Patna',
      state: 'Bihar',
      pin_code: '800001'
    }
  },
  {
    membership_no: 'BOA-2024-0002',
    title: 'Dr.',
    first_name: 'Priya',
    surname: 'Sharma',
    email: 'priya.sharma@example.com',
    mobile: '9876543211',
    gender: 'female',
    password: 'password123',
    address: {
      city: 'Patna',
      state: 'Bihar',
      pin_code: '800002'
    }
  },
  // Add more users here...
];

// RUN IMPORT
async function runImport() {
  try {
    console.log('Starting offline user import...');
    console.log(`Total users to import: ${offlineUsers.length}\n`);

    const results = await importOfflineUsers(offlineUsers);

    console.log('\n=== IMPORT RESULTS ===');
    console.log(`Total: ${results.total}`);
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ Successfully imported users:');
      results.success.forEach(user => {
        console.log(`  - ${user.membership_no}: ${user.name} (ID: ${user.user_id})`);
      });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Failed imports:');
      results.failed.forEach(fail => {
        console.log(`  - ${fail.membership_no}: ${fail.reason}`);
      });
    }

    console.log('\n✅ Import completed!');
    console.log('\nUsers can now login with:');
    console.log('  - Username: membership_no (e.g., BOA-2024-0001)');
    console.log('  - Password: (as set above)\n');

    process.exit(0);

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

runImport();
