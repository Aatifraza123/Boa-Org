const bcrypt = require('bcryptjs');

// Hash jo aapne diya
const hash = '$2b$10$r1WIWraUoFFZZH9x8E3BEOvLPV7WEOAuvp.P8AWXx2ysJgwgx0AKC';

// Common passwords to test
const passwordsToTest = [
  'admin123',
  'test123',
  'user123',
  'password',
  'password123',
  '123456',
  'admin',
  'test',
  'user',
  'Modassir@9211'
];

console.log('Testing passwords against hash...\n');

passwordsToTest.forEach(password => {
  const isMatch = bcrypt.compareSync(password, hash);
  if (isMatch) {
    console.log(`✅ MATCH FOUND!`);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
  }
});

console.log('Testing complete.');
