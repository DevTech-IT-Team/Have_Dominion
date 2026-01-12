const http = require('http');

const data = JSON.stringify({
  name: 'New Test User',
  email: 'newtestuser123@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/v1/auth/user/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${body}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
