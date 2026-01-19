const bcrypt = require('bcryptjs');

// Password jo aap set karna chahte hain
const password = process.argv[2] || 'test123';

// Generate hash
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('========================================');
console.log('Password Hash Generator');
console.log('========================================\n');
console.log(`Password: ${password}`);
console.log(`Hash: ${hash}\n`);
console.log('Use this hash in your SQL INSERT statement:');
console.log(`'${hash}'`);
console.log('\n========================================');
