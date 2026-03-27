const testTradelineFormSubmission = async () => {
  try {
    console.log('🧪 Testing Tradeline Form Submission...\n');

    // Test 1: Submit a tradeline form (public endpoint)
    console.log('1️⃣ Testing form submission...');
    const formData = {
      tradelineName: 'Chase Sapphire Reserve',
      price: 450,
      feeType: 'one-time fee',
      creditLimit: '15000',
      age: '4+ years',
      reportDates: 'Mar 2nd - Mar 9th',
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      phoneNumber: '5551234567',
      dateOfBirth: '1990-01-01',
      ssnLast4: '1234',
      streetAddress: '123 Test Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      transactionType: 'buy'
    };

    const submitResponse = await fetch('http://localhost:8080/api/v1/tradeline-forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const submitResult = await submitResponse.json();
    console.log('   Status:', submitResponse.status);
    console.log('   Response:', JSON.stringify(submitResult, null, 2));

    if (submitResponse.status === 201 && submitResult.success) {
      console.log('   ✅ Form submitted successfully\n');
    } else {
      console.log('   ❌ Form submission failed:', submitResult.message, '\n');
      return;
    }

    // Test 2: Admin login
    console.log('2️⃣ Testing admin login...');
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
    console.log('   Status:', loginResponse.status);

    if (!loginResult.success) {
      console.log('   ❌ Admin login failed:', loginResult.message, '\n');
      return;
    }

    const adminToken = loginResult.data.token;
    console.log('   ✅ Admin login successful\n');

    // Test 3: Fetch tradeline forms (admin endpoint)
    console.log('3️⃣ Testing admin fetch tradeline forms...');
    const fetchResponse = await fetch('http://localhost:8080/api/v1/tradeline-forms?page=1&limit=10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });

    const fetchResult = await fetchResponse.json();
    console.log('   Status:', fetchResponse.status);

    if (fetchResult.success) {
      console.log('   ✅ Forms fetched successfully');
      console.log('   Total forms:', fetchResult.data.pagination.total);
      console.log('   Forms in response:', fetchResult.data.forms.length);

      if (fetchResult.data.forms.length > 0) {
        const latestForm = fetchResult.data.forms[0];
        console.log('\n   📋 Latest submission:');
        console.log('      - Name:', latestForm.firstName, latestForm.lastName);
        console.log('      - Email:', latestForm.email);
        console.log('      - Tradeline:', latestForm.tradelineName);
        console.log('      - Status:', latestForm.status);
        console.log('      - Transaction Type:', latestForm.transactionType);
      }
      console.log('');
    } else {
      console.log('   ❌ Fetch forms failed:', fetchResult.message, '\n');
    }

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.error(error);
  }
};

testTradelineFormSubmission();
