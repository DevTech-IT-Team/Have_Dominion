const http = require('http');

function makeRequest(method, path, data, token) {
  return new Promise((resolve) => {
    const options = { 
      hostname: 'localhost', 
      port: 8080, 
      path: path, 
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (token) options.headers['Authorization'] = 'Bearer ' + token;
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => { 
        try { 
          resolve({ status: res.statusCode, data: JSON.parse(body) }); 
        } catch { 
          resolve({ status: res.statusCode, data: body }); 
        } 
      });
    });
    req.on('error', (e) => resolve({ status: 0, error: e.message }));
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testChangePassword() {
  console.log('=== Testing Change Password API ===\n');

  // Step 1: Login as user
  console.log('Step 1: Logging in as user...');
  const login = await makeRequest('POST', '/api/v1/auth/user/login', { 
    email: 'user@test.com', 
    password: 'user123' 
  });
  
  if (login.status !== 200 || !login.data?.success) {
    console.log('❌ Login failed:', login.data?.message || login.error);
    return;
  }
  console.log('✅ User logged in');
  const token = login.data.data.token;
  console.log('Token received:', token.substring(0, 30) + '...\n');

  // Step 2: Test change password with wrong current password
  console.log('Step 2: Testing with wrong current password...');
  const wrongPass = await makeRequest('POST', '/api/v1/users/change-password', {
    currentPassword: 'wrongpassword',
    newPassword: 'newpassword123'
  }, token);
  console.log('Status:', wrongPass.status);
  console.log('Response:', wrongPass.data?.message || wrongPass.data);
  console.log(wrongPass.status === 400 ? '✅ Correctly rejected wrong password\n' : '❌ Should have rejected wrong password\n');

  // Step 3: Test change password with correct current password
  console.log('Step 3: Testing with correct current password...');
  const correctPass = await makeRequest('POST', '/api/v1/users/change-password', {
    currentPassword: 'user123',
    newPassword: 'newpassword123'
  }, token);
  console.log('Status:', correctPass.status);
  console.log('Response:', correctPass.data?.message || correctPass.data);
  
  if (correctPass.status === 200 && correctPass.data?.success) {
    console.log('✅ Password changed successfully\n');
    
    // Step 4: Verify by logging in with new password
    console.log('Step 4: Verifying with new password...');
    const newLogin = await makeRequest('POST', '/api/v1/auth/user/login', { 
      email: 'user@test.com', 
      password: 'newpassword123' 
    });
    
    if (newLogin.status === 200 && newLogin.data?.success) {
      console.log('✅ Successfully logged in with new password!\n');
      console.log('🎉 ALL TESTS PASSED!');
      
      // Reset password back for future tests
      console.log('\nResetting password back to original...');
      const resetToken = newLogin.data.data.token;
      const reset = await makeRequest('POST', '/api/v1/users/change-password', {
        currentPassword: 'newpassword123',
        newPassword: 'user123'
      }, resetToken);
      console.log(reset.status === 200 ? '✅ Password reset back to original' : '⚠️ Could not reset password');
    } else {
      console.log('❌ Could not login with new password');
    }
  } else {
    console.log('❌ Password change failed');
  }
}

testChangePassword().catch(console.error);
