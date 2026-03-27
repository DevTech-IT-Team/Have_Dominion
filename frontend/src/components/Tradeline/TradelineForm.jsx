import React, { useState } from 'react';
import api from '../../api/axios';
import { handleError, handleSuccess } from '../../lib/utils';

const TradelineForm = ({ tradeline = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Tradeline info (pre-filled or from props)
    tradelineName: tradeline?.name || 'Chase Sapphire Reserve',
    price: tradeline?.price || 450,
    feeType: tradeline?.feeType || 'one-time fee',
    creditLimit: tradeline?.creditLimit || '15000',
    age: tradeline?.age || '4+ years',
    reportDates: tradeline?.reportDates || 'Mar 2nd - Mar 9th',
    
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    ssnLast4: '',
    
    // Address
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Transaction
    transactionType: 'Buy Tradeline'
  });

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phoneNumber || !formData.dateOfBirth || !formData.ssnLast4 ||
        !formData.streetAddress || !formData.city || !formData.state || !formData.zipCode) {
      return handleError('Please fill in all required fields');
    }

    // Validate SSN (last 4 digits)
    if (!/^\d{4}$/.test(formData.ssnLast4)) {
      return handleError('Please enter exactly 4 digits for SSN last 4');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return handleError('Please enter a valid email address');
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/tradeline-forms', formData);
      
      if (response.data.success) {
        handleSuccess(response.data.message || 'Application submitted successfully!');
        // Reset form
        setFormData(prev => ({
          ...prev,
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          dateOfBirth: '',
          ssnLast4: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: ''
        }));
      } else {
        handleError(response.data.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      handleError(err.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Tradeline Info Card */}
        <div className="bg-midnight-800 rounded-2xl shadow-2xl border border-electric/30 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-midnight-800 p-6 border-b border-electric/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Chase Sapphire Reserve</h2>
                <p className="text-gray-400 mt-1">Premium Credit Card Tradeline</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-electric">${formData.price}</p>
                <p className="text-sm text-gray-400">{formData.feeType}</p>
              </div>
            </div>
          </div>

          {/* Tradeline Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-midnight-900/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Credit Limit</p>
              <p className="text-xl font-bold text-white">${parseInt(formData.creditLimit).toLocaleString()}</p>
            </div>
            <div className="bg-midnight-900/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Account Age</p>
              <p className="text-xl font-bold text-white">{formData.age}</p>
            </div>
            <div className="bg-midnight-900/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Reports</p>
              <p className="text-xl font-bold text-white">{formData.reportDates}</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-midnight-800 rounded-2xl shadow-2xl border border-electric/30 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">Complete Your Information</h3>
            <p className="text-gray-400 text-sm">
              Please provide your details exactly as they appear on your credit report. 
              This information is required to add you as an authorized user.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name (as appears on ID) *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name (as appears on ID) *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SSN (Last 4 digits) *
                  </label>
                  <input
                    type="password"
                    name="ssnLast4"
                    value={formData.ssnLast4}
                    onChange={handleChange}
                    placeholder="••••1234"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">We only store the last 4 digits for verification</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Address Information
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white"
                      required
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all bg-midnight-900/50 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Type */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select Transaction Type *
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.transactionType === 'Buy Tradeline'
                    ? 'border-electric bg-electric/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="transactionType"
                    value="Buy Tradeline"
                    checked={formData.transactionType === 'Buy Tradeline'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Buy Tradeline</span>
                      <span className="text-electric font-bold">${formData.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Get added as authorized user</p>
                  </div>
                  <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.transactionType === 'Buy Tradeline' ? 'border-electric' : 'border-gray-500'
                  }`}>
                    {formData.transactionType === 'Buy Tradeline' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-electric"></div>
                    )}
                  </div>
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.transactionType === 'Inquiry'
                    ? 'border-gray-400 bg-gray-400/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="transactionType"
                    value="Inquiry"
                    checked={formData.transactionType === 'Inquiry'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Inquiry Only</span>
                      <span className="text-gray-400 font-bold">Free</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Ask questions about this tradeline</p>
                  </div>
                  <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.transactionType === 'Inquiry' ? 'border-gray-400' : 'border-gray-500'
                  }`}>
                    {formData.transactionType === 'Inquiry' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-blue-300 font-medium text-sm">Your information is secure</p>
                  <p className="text-blue-400/80 text-xs mt-1">
                    Your information is securely encrypted and will only be used to add you as an authorized user. 
                    We never store your full SSN.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradelineForm;
