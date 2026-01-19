const axios = require('axios');

async function testVerifyAPI() {
  try {
    console.log('Testing verify-membership API...');
    
    const response = await axios.post('http://localhost:5000/api/users/verify-membership', {
      membershipNo: 'BOA/LM/0005/2026'
    });
    
    console.log('✓ API Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('✗ API Error:', error.response.status, error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('✗ Backend server is not running on port 5000');
      console.log('  Please start the backend: cd Boa-Org/backend && npm start');
    } else {
      console.log('✗ Error:', error.message);
    }
  }
}

testVerifyAPI();
