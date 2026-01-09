require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set');

if (!process.env.MONGODB_URL) {
  console.error('ERROR: MONGODB_URL is not set in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  
  // Test creating a user
  const User = require('./internal/database/models/User');
  console.log('User model loaded:', typeof User);
  
  const testUser = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    role: 'user'
  });
  
  return testUser.save();
})
.then(user => {
  console.log('✅ Test user created successfully:', user.email);
  console.log('✅ User ID:', user._id);
  
  // Clean up
  return User.deleteOne({ _id: user._id });
})
.then(() => {
  console.log('✅ Test user cleaned up');
  console.log('✅ MongoDB is working correctly!');
  process.exit(0);
})
.catch(error => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});
