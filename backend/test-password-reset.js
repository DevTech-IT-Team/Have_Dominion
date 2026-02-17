/**
 * Password Reset Feature Test Script
 * 
 * Run: node test-password-reset.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:8080/api/v1';
const TEST_EMAIL = 'test@example.com'; // Change to your test email

// Helper function to make HTTP requests
function makeRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/v1${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test 1: Forgot Password
async function testForgotPassword() {
  console.log('\n🧪 TEST 1: Forgot Password');
  console.log('============================');
  
  try {
    const response = await makeRequest('/auth/forgot-password', 'POST', {
      email: TEST_EMAIL
    });
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      console.log('✅ Forgot password endpoint working');
    } else {
      console.log('⚠️ Forgot password returned error (expected for non-existent email)');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Forgot password test failed:', error.message);
    return null;
  }
}

// Test 2: Forgot Password with Invalid Email
async function testForgotPasswordInvalidEmail() {
  console.log('\n🧪 TEST 2: Forgot Password - Invalid Email');
  console.log('==========================================');
  
  try {
    const response = await makeRequest('/auth/forgot-password', 'POST', {
      email: 'invalid-email'
    });
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 400) {
      console.log('✅ Validation working - rejects invalid email');
    } else {
      console.log('⚠️ Unexpected response');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Invalid email test failed:', error.message);
    return null;
  }
}

// Test 3: Rate Limiting
async function testRateLimiting() {
  console.log('\n🧪 TEST 3: Rate Limiting (3 requests allowed per 15 min)');
  console.log('=========================================================');
  
  try {
    // Make 4 rapid requests
    for (let i = 1; i <= 4; i++) {
      const response = await makeRequest('/auth/forgot-password', 'POST', {
        email: `test${i}@example.com`
      });
      
      console.log(`Request ${i}: Status ${response.status}`);
      
      if (i === 4 && response.status === 429) {
        console.log('✅ Rate limiting working - blocked 4th request');
      }
    }
  } catch (error) {
    console.error('❌ Rate limiting test failed:', error.message);
  }
}

// Test 4: Reset Password with Invalid Token
async function testResetPasswordInvalidToken() {
  console.log('\n🧪 TEST 4: Reset Password - Invalid Token');
  console.log('=========================================');
  
  try {
    const response = await makeRequest('/auth/reset-password', 'POST', {
      token: 'invalid-token',
      password: 'newpassword123'
    });
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 400) {
      console.log('✅ Reset password rejects invalid token');
    } else {
      console.log('⚠️ Unexpected response');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Reset password test failed:', error.message);
    return null;
  }
}

// Test 5: Reset Password Validation
async function testResetPasswordValidation() {
  console.log('\n🧪 TEST 5: Reset Password - Validation');
  console.log('======================================');
  
  try {
    // Test missing password
    const response = await makeRequest('/auth/reset-password', 'POST', {
      token: 'some-token'
      // missing password
    });
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 400) {
      console.log('✅ Validation working - requires password');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Validation test failed:', error.message);
    return null;
  }
}

// Main test runner
async function runTests() {
  console.log('🔐 Password Reset Feature Tests');
  console.log('===============================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Test Email: ${TEST_EMAIL}`);
  console.log('\n⚠️  Make sure your backend server is running on port 8080');
  console.log('   Run: npm run dev (in backend folder)');
  console.log('\n📝 Note: SMTP must be configured in .env for actual email sending');
  
  // Wait for user to confirm server is running
  console.log('\n⏳ Starting tests in 3 seconds...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    await testForgotPassword();
    await testForgotPasswordInvalidEmail();
    await testRateLimiting();
    await testResetPasswordInvalidToken();
    await testResetPasswordValidation();
    
    console.log('\n✨ All tests completed!');
    console.log('\n📧 To test actual email sending:');
    console.log('   1. Configure SMTP credentials in .env');
    console.log('   2. Create a user account first');
    console.log('   3. Use that email in forgot-password request');
    console.log('   4. Check your email for the reset link');
    console.log('   5. Extract token from link and test reset-password');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Check if server is running
function checkServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path: '/health',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => resolve(false));
    req.end();
  });
}

// Run if called directly
if (require.main === module) {
  checkServer().then(isRunning => {
    if (!isRunning) {
      console.log('❌ Backend server is not running on port 8080');
      console.log('   Please start it first: npm run dev');
      process.exit(1);
    }
    runTests();
  });
}

module.exports = { runTests, makeRequest };
