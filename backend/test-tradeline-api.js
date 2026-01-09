const testTradelineAPI = async () => {
  try {
    console.log('Testing Tradeline API...');
    
    // First login as admin
    console.log('\n1. Admin login...');
    const loginResponse = await fetch('http://localhost:8080/api/v1/auth/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'admin123'
      }),
    });

    const loginResult = await loginResponse.json();
    console.log('Login status:', loginResponse.status);
    
    if (!loginResult.success) {
      console.log('❌ Login failed:', loginResult.message);
      return;
    }
    
    const adminToken = loginResult.data.token;
    console.log('✅ Admin login successful');

    // Test creating a tradeline
    console.log('\n2. Creating a test tradeline...');
    const createResponse = await fetch('http://localhost:8080/api/v1/tradeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        bankName: 'Chase Sapphire',
        accountNumber: '****4821',
        creditLimit: 15000,
        currentBalance: 750,
        paymentHistory: 100,
        accountAge: 6,
        accountType: 'Revolving',
        status: 'Active',
        notes: 'Premium credit card with excellent payment history'
      }),
    });

    const createResult = await createResponse.json();
    console.log('Create tradeline status:', createResponse.status);
    console.log('Create tradeline result:', createResult);
    
    if (createResult.success) {
      console.log('✅ Tradeline created successfully');
      console.log('Tradeline ID:', createResult.data._id);
    } else {
      console.log('❌ Create tradeline failed:', createResult.message);
      return;
    }

    // Test fetching all tradelines
    console.log('\n3. Fetching all tradelines...');
    const fetchResponse = await fetch('http://localhost:8080/api/v1/tradeline', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    const fetchResult = await fetchResponse.json();
    console.log('Fetch tradelines status:', fetchResponse.status);
    
    if (fetchResult.success) {
      console.log('✅ Tradelines fetched successfully');
      console.log('Total tradelines:', fetchResult.data.tradelines.length);
      fetchResult.data.tradelines.forEach((tradeline, i) => {
        console.log(`${i+1}. ${tradeline.bankName} - ${tradeline.accountNumber} - ${tradeline.status}`);
      });
    } else {
      console.log('❌ Fetch tradelines failed:', fetchResult.message);
    }

    // Test user endpoint (no auth required)
    console.log('\n4. Testing user tradelines endpoint...');
    const userResponse = await fetch('http://localhost:8080/api/v1/tradeline/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userResult = await userResponse.json();
    console.log('User tradelines status:', userResponse.status);
    
    if (userResult.success) {
      console.log('✅ User tradelines fetched successfully');
      console.log('Total user tradelines:', userResult.data.length);
      userResult.data.forEach((tradeline, i) => {
        console.log(`${i+1}. ${tradeline.bankName} - ${tradeline.accountNumber} - Util: ${tradeline.utilization.toFixed(1)}%`);
      });
    } else {
      console.log('❌ User tradelines failed:', userResult.message);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
};

testTradelineAPI();
