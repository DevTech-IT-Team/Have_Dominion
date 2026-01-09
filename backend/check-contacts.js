require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(async () => {
  console.log('Connected to MongoDB');
  
  const Contact = require('./internal/database/models/Contact');
  const contacts = await Contact.find({});
  
  console.log('Total contacts in MongoDB:', contacts.length);
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.status}`);
  });
  
  process.exit(0);
})
.catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
