require('dotenv').config();
const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login-membership', {
      membership_no: 'BOA/LM/0002/2023',
      password: 'User@123'
    });
    
    console.log('Login successful!');
    console.log('Response:', response.data);
    
    // Test if token works for registration endpoint
    const token = response.data.token;
    console.log('\nTesting registration endpoint with token...');
    
    try {
      const regResponse = await axios.post('http://localhost:5000/api/registrations', {
        seminar_id: 1,
        category_id: 1,
        slab_id: 1,
        delegate_type: 'BOA Member',
        amount: 1000
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Registration test successful:', regResponse.data);
    } catch (regError) {
      console.log('Registration test failed:', regError.response?.data || regError.message);
    }
    
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
}

testLogin();