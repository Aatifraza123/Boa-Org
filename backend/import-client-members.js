const { importOfflineUsers } = require('./utils/bulk-user-import');

// Client provided member data
const members = [
  {
    membership_no: 'BOA/LM/0001/2023',
    title: 'Dr.',
    first_name: 'Pawan',
    surname: 'Kumar',
    password: 'boa2023',
    role: 'president'
  },
  {
    membership_no: 'BOA/LM/0010/2023',
    title: 'Dr.',
    first_name: 'Ajeet',
    surname: 'Kumar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0003/2023',
    title: 'Dr.',
    first_name: 'Sanjay',
    surname: 'Kumar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0020/2023',
    title: 'Dr.',
    first_name: 'Avinash KR.',
    surname: 'Singh',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0004/2023',
    title: 'Dr.',
    first_name: 'SK',
    surname: 'Sudhakar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0005/2023',
    title: 'Dr.',
    first_name: 'Rupesh',
    surname: 'Kumar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0006/2023',
    title: 'Dr.',
    first_name: 'Naveen',
    surname: 'Kumar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0007/2023',
    title: 'Dr.',
    first_name: 'Prem',
    surname: 'Prakash',
    password: 'boa2023',
    role: 'secretary'
  },
  {
    membership_no: 'BOA/LM/0002/2023',
    title: 'Dr.',
    first_name: 'Krishna',
    surname: 'Narayan',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0008/2023',
    title: 'Dr.',
    first_name: 'Anil',
    surname: 'Kumar',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0009/2023',
    title: 'Mr.',
    first_name: 'J. P',
    surname: 'Roy',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0021/2023',
    title: 'Dr.',
    first_name: 'Sundarkant',
    surname: '',
    password: 'boa2023'
  },
  {
    membership_no: 'BOA/LM/0016/2023',
    title: 'Mr.',
    first_name: 'Raj',
    surname: 'Roushan',
    password: 'boa2023',
    role: 'treasurer'
  },
  {
    membership_no: 'BOA/LM/0011/2023',
    title: 'Mr.',
    first_name: 'Kumar',
    surname: 'Neeraj',
    password: 'boa2023'
  }
];

async function importMembers() {
  try {
    console.log('Starting import of client members...');
    console.log(`Total members to import: ${members.length}`);
    
    const results = await importOfflineUsers(members);
    
    console.log('\n=== IMPORT RESULTS ===');
    console.log(`Total: ${results.total}`);
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}`);
    
    if (results.success.length > 0) {
      console.log('\n✓ Successfully imported:');
      results.success.forEach(user => {
        console.log(`  - ${user.membership_no}: ${user.name}`);
      });
    }
    
    if (results.failed.length > 0) {
      console.log('\n✗ Failed to import:');
      results.failed.forEach(user => {
        console.log(`  - ${user.membership_no}: ${user.reason}`);
      });
    }
    
    console.log('\n=== IMPORT COMPLETE ===');
    console.log('All users can login with:');
    console.log('  Username: Their membership number (e.g., BOA/LM/0001/2023)');
    console.log('  Password: boa2023');
    
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importMembers();
