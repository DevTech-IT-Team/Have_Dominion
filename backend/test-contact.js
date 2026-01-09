require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing Contact submission...');
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
  
  // Test creating a contact
  const Contact = require('./internal/database/models/Contact');
  console.log('Contact model loaded:', typeof Contact);
  
  const testContact = new Contact({
    name: 'Test Contact',
    email: 'testcontact@example.com',
    service: 'General Inquiry',
    message: 'This is a test contact submission',
    status: 'pending'
  });
  
  return testContact.save();
})
.then(contact => {
  console.log('✅ Test contact created successfully:', contact.email);
  console.log('✅ Contact ID:', contact._id);
  console.log('✅ Contact Status:', contact.status);
  
  // Check all contacts
  const Contact = require('./internal/database/models/Contact');
  return Contact.find({});
})
.then(contacts => {
  console.log('✅ Total contacts in database:', contacts.length);
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.status} - ${contact.createdAt}`);
  });
  
  // Clean up test contact
  const Contact = require('./internal/database/models/Contact');
  return Contact.deleteOne({ email: 'testcontact@example.com' });
})
.then(() => {
  console.log('✅ Test contact cleaned up');
  console.log('✅ Contact collection is working correctly!');
  process.exit(0);
})
.catch(error => {
  console.error('❌ Contact test error:', error.message);
  console.error('❌ Full error:', error);
  process.exit(1);
});
