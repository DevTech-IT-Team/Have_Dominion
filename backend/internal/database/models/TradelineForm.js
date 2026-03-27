const mongoose = require('mongoose');

const tradelineFormSchema = new mongoose.Schema({
  // Tradeline Information
  tradelineName: {
    type: String,
    required: [true, 'Tradeline name is required'],
    trim: true,
    default: 'Chase Sapphire Reserve'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 450
  },
  feeType: {
    type: String,
    required: true,
    default: 'one-time fee'
  },
  creditLimit: {
    type: String,
    required: true,
    default: '15000'
  },
  age: {
    type: String,
    required: true,
    default: '4+ years'
  },
  reportDates: {
    type: String,
    required: true,
    default: 'Mar 2nd - Mar 9th'
  },

  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [100, 'First name cannot exceed 100 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [100, 'Last name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^(\w+([.-]?\w+)*)@(\w+([.-]?\w+)*)\.(\w{2,3})$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  ssnLast4: {
    type: String,
    required: [true, 'SSN last 4 digits are required'],
    match: [/^\d{4}$/, 'Please enter exactly 4 digits']
  },

  // Address Information
  streetAddress: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'ZIP code is required'],
    trim: true,
    match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code']
  },

  // Transaction Type
  transactionType: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['buy', 'sell'],
    default: 'buy'
  },

  // Status for admin tracking
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },

  // Optional notes from admin
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
tradelineFormSchema.index({ email: 1, createdAt: -1 });
tradelineFormSchema.index({ status: 1 });

const TradelineForm = mongoose.model('TradelineForm', tradelineFormSchema);

module.exports = TradelineForm;
