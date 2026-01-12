const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/user/signup', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testSignup();
