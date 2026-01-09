const testContactSubmission = async () => {
  try {
    console.log('Testing contact form submission...');
    
    const response = await fetch('http://localhost:8080/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        service: 'General Inquiry',
        message: 'This is a test message from the API test script'
      }),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response body:', result);
    
    if (result.success) {
      console.log('✅ Contact form submission successful!');
      console.log('Contact ID:', result.data._id);
      console.log('Email:', result.data.email);
      console.log('Status:', result.data.status);
    } else {
      console.log('❌ Contact form submission failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
};

testContactSubmission();
