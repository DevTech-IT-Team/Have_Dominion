require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing server connection state...');
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set');

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connected!');
  console.log('Connection state:', mongoose.connection.readyState);
  console.log('1 = connected, 0 = disconnected');
  
  // Test the exact logic from contact.routes.js
  const isMongoConnected = mongoose.connection.readyState === 1;
  console.log('isMongoConnected (server logic):', isMongoConnected);
  
  if (isMongoConnected) {
    console.log('✅ Server would use MongoDB service');
    const contactService = require('./internal/api/services/contact.service');
    console.log('MongoDB service loaded:', typeof contactService);
  } else {
    console.log('❌ Server would use memory service');
    const contactService = require('./internal/api/services/contact-memory.service');
    console.log('Memory service loaded:', typeof contactService);
  }
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1);
});
