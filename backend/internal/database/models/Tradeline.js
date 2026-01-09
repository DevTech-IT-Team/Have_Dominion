const mongoose = require('mongoose');

const tradelineSchema = new mongoose.Schema({
  // Basic tradeline information
  bankName: {
    type: String,
    required: [true, 'Bank name is required'],
    trim: true,
    maxlength: [100, 'Bank name cannot exceed 100 characters']
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
    trim: true,
    maxlength: [50, 'Account number cannot exceed 50 characters']
  },
  creditLimit: {
    type: Number,
    required: [true, 'Credit limit is required'],
    min: [0, 'Credit limit must be positive']
  },
  currentBalance: {
    type: Number,
    required: [true, 'Current balance is required'],
    min: [0, 'Current balance must be positive']
  },
  paymentHistory: {
    type: Number,
    default: 100, // Payment history percentage (0-100)
    min: [0, 'Payment history must be between 0-100'],
    max: [100, 'Payment history must be between 0-100']
  },
  accountAge: {
    type: Number,
    required: [true, 'Account age is required'],
    min: [0, 'Account age must be positive']
  },
  accountType: {
    type: String,
    required: [true, 'Account type is required'],
    enum: ['Revolving', 'Installment', 'Mortgage', 'Auto Loan', 'Personal Loan', 'Other'],
    default: 'Revolving'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Closed', 'Delinquent'],
    default: 'Active'
  },
  
  // Additional fields for better tracking
  reportedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  
  // Admin who created/updated this tradeline
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
tradelineSchema.index({ status: 1, reportedDate: -1 });
tradelineSchema.index({ createdBy: 1 });
tradelineSchema.index({ accountType: 1 });

// Method to calculate credit utilization
tradelineSchema.methods.calculateUtilization = function() {
  if (this.creditLimit === 0) return 0;
  return (this.currentBalance / this.creditLimit) * 100;
};

// Method to get tradeline summary
tradelineSchema.methods.getSummary = function() {
  return {
    id: this._id,
    bankName: this.bankName,
    accountNumber: this.accountNumber,
    creditLimit: this.creditLimit,
    currentBalance: this.currentBalance,
    utilization: this.calculateUtilization(),
    paymentHistory: this.paymentHistory,
    accountAge: this.accountAge,
    accountType: this.accountType,
    status: this.status,
    reportedDate: this.reportedDate,
    lastUpdated: this.lastUpdated
  };
};

module.exports = mongoose.model('Tradeline', tradelineSchema);
