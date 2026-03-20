import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Lock, Star, TrendingUp, Shield, ArrowRight, Info, ChevronRight, Search } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

const TradelinesPage = () => {
  const navigate = useNavigate();
  const { profile, firstName, lastName, email, phone, dob, address, city, state, zipCode, isComplete } = useProfile();
  
  const [step, setStep] = useState('selection');
  const [selectedTradeline, setSelectedTradeline] = useState(null);
  const [filters, setFilters] = useState({
    bankName: '',
    minCreditLimit: '',
    maxCreditLimit: '',
    availability: ''
  });
  const [userDetails, setUserDetails] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phone: phone || '',
    ssn: '',
    dob: dob || '',
    address: address || '',
    city: city || '',
    state: state || '',
    zipCode: zipCode || '',
    transactionType: ''
  });

  const tradelines = [
    {
      id: 'chase-1',
      bank: 'Chase',
      cardName: 'Chase Sapphire Reserve',
      cardId: '11959',
      creditLimit: 15000,
      dateOpened: '2020 Sep',
      purchaseDeadline: 'Feb 19th',
      reportingPeriod: 'Mar 2nd - Mar 9th',
      availability: 1,
      price: 450,
      rating: 4.9,
      age: '4+ years',
      perks: ['Travel Rewards', 'Airport Lounge Access']
    },
    {
      id: 'amex-1',
      bank: 'American Express',
      cardName: 'Amex Platinum',
      cardId: '12478',
      creditLimit: 25000,
      dateOpened: '2018 Nov',
      purchaseDeadline: 'Feb 20th',
      reportingPeriod: 'Mar 3rd - Mar 10th',
      availability: 2,
      price: 650,
      rating: 4.8,
      age: '6+ years',
      perks: ['Premium Travel', 'Hotel Status']
    },
    {
      id: 'citi-1',
      bank: 'Citi',
      cardName: 'Citi Double Cash',
      cardId: '13156',
      creditLimit: 10000,
      dateOpened: '2019 Jun',
      purchaseDeadline: 'Feb 21st',
      reportingPeriod: 'Mar 4th - Mar 11th',
      availability: 1,
      price: 380,
      rating: 4.7,
      age: '5+ years',
      perks: ['2% Cash Back', 'No Annual Fee']
    },
    {
      id: 'discover-1',
      bank: 'Discover',
      cardName: 'Discover It',
      cardId: '14289',
      creditLimit: 8500,
      dateOpened: '2021 Mar',
      purchaseDeadline: 'Feb 22nd',
      reportingPeriod: 'Mar 5th - Mar 12th',
      availability: 3,
      price: 295,
      rating: 4.6,
      age: '3+ years',
      perks: ['Cash Back Match', 'FICO Score Free']
    },
    {
      id: 'boa-1',
      bank: 'Bank of America',
      cardName: 'BofA Premium Rewards',
      cardId: '15847',
      creditLimit: 12000,
      dateOpened: '2019 Jan',
      purchaseDeadline: 'Feb 23rd',
      reportingPeriod: 'Mar 6th - Mar 13th',
      availability: 2,
      price: 420,
      rating: 4.7,
      age: '5+ years',
      perks: ['2x Points', 'Travel Credits']
    },
    {
      id: 'capone-1',
      bank: 'Capital One',
      cardName: 'Venture X',
      cardId: '16325',
      creditLimit: 20000,
      dateOpened: '2020 Aug',
      purchaseDeadline: 'Feb 24th',
      reportingPeriod: 'Mar 7th - Mar 14th',
      availability: 1,
      price: 580,
      rating: 4.8,
      age: '4+ years',
      perks: ['2x Miles', 'Airport Lounges']
    }
  ];

  const handleSelectTradeline = (tradeline) => {
    setSelectedTradeline(tradeline);
    setStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredTradelines = tradelines.filter(tradeline => {
    const matchesBank = filters.bankName === '' || tradeline.bank.toLowerCase().includes(filters.bankName.toLowerCase());
    const matchesMinLimit = filters.minCreditLimit === '' || tradeline.creditLimit >= parseInt(filters.minCreditLimit);
    const matchesMaxLimit = filters.maxCreditLimit === '' || tradeline.creditLimit <= parseInt(filters.maxCreditLimit);
    const matchesAvailability = filters.availability === '' || tradeline.availability >= parseInt(filters.availability);
    
    return matchesBank && matchesMinLimit && matchesMaxLimit && matchesAvailability;
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('selection');
      setSelectedTradeline(null);
    } else if (step === 'confirmation') {
      setStep('details');
    }
  };

  // Sync form with profile data when it loads
  useEffect(() => {
    if (profile) {
      setUserDetails(prev => ({
        ...prev,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
        email: email || prev.email,
        phone: phone || prev.phone,
        dob: dob || prev.dob,
        address: address || prev.address,
        city: city || prev.city,
        state: state || prev.state,
        zipCode: zipCode || prev.zipCode
      }));
    }
  }, [profile, firstName, lastName, email, phone, dob, address, city, state, zipCode]);

  const SelectionView = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Select Your Tradeline</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose from our verified premium tradelines. Each tradeline is hand-picked to maximize your credit building potential.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-midnight-800/50 backdrop-blur-sm rounded-2xl border border-electric/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-electric" />
          Filter Tradelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={filters.bankName}
              onChange={handleFilterChange}
              placeholder="Search banks..."
              className="w-full px-4 py-2 bg-midnight-900 border border-electric/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Min Credit Limit</label>
            <input
              type="number"
              name="minCreditLimit"
              value={filters.minCreditLimit}
              onChange={handleFilterChange}
              placeholder="$0"
              className="w-full px-4 py-2 bg-midnight-900 border border-electric/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Max Credit Limit</label>
            <input
              type="number"
              name="maxCreditLimit"
              value={filters.maxCreditLimit}
              onChange={handleFilterChange}
              placeholder="$50000"
              className="w-full px-4 py-2 bg-midnight-900 border border-electric/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Min Availability</label>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 bg-midnight-900 border border-electric/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
            >
              <option value="">Any</option>
              <option value="1">1+ slots</option>
              <option value="2">2+ slots</option>
              <option value="3">3+ slots</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-midnight-800/50 backdrop-blur-sm rounded-2xl border border-electric/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-midnight-900/50 border-b border-electric/20">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bank Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Card ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Credit Limit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date Opened</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Purchase Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Reporting Period</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Availability</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTradelines.map((tradeline, index) => (
                <motion.tr
                  key={tradeline.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-electric/10 hover:bg-midnight-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-white">{tradeline.bank}</div>
                      <div className="text-sm text-gray-400">{tradeline.cardName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{tradeline.cardId}</td>
                  <td className="px-6 py-4 text-white">${tradeline.creditLimit.toLocaleString()}</td>
                  <td className="px-6 py-4 text-white">{tradeline.dateOpened}</td>
                  <td className="px-6 py-4 text-white">{tradeline.purchaseDeadline}</td>
                  <td className="px-6 py-4 text-white text-sm">{tradeline.reportingPeriod}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      tradeline.availability === 1 ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {tradeline.availability} slot{tradeline.availability > 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-white">${tradeline.price}</span>
                      <span className="text-xs text-gray-400">one-time</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSelectTradeline(tradeline)}
                      className="bg-electric hover:bg-electric-dark text-obsidian font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-electric/20 text-sm"
                    >
                      Add to cart
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTradelines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tradelines found matching your criteria.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="flex items-center gap-4 bg-midnight-800/50 backdrop-blur-sm rounded-xl p-6 border border-electric/10">
          <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-electric" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Secure & Verified</h4>
            <p className="text-sm text-gray-400">All tradelines verified</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-midnight-800/50 backdrop-blur-sm rounded-xl p-6 border border-electric/10">
          <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-electric" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Fast Results</h4>
            <p className="text-sm text-gray-400">Report in 7-14 days</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-midnight-800/50 backdrop-blur-sm rounded-xl p-6 border border-electric/10">
          <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
            <Lock className="h-6 w-6 text-electric" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Privacy Protected</h4>
            <p className="text-sm text-gray-400">256-bit encryption</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DetailsView = () => (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 text-gray-600 hover:text-midnight-900 flex items-center gap-2 transition-colors"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
        Back to Tradelines
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-royal-900 to-midnight-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{selectedTradeline.bank}</h3>
                <p className="text-electric-light">{selectedTradeline.cardName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{selectedTradeline.price}</p>
              <p className="text-sm text-gray-400">one-time fee</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <span className="text-gray-300">Limit: <span className="text-white">{selectedTradeline.creditLimit}</span></span>
            <span className="text-gray-300">Age: <span className="text-white">{selectedTradeline.age}</span></span>
            <span className="text-gray-300">Reports: <span className="text-white">{selectedTradeline.reportingPeriod}</span></span>
          </div>
        </div>

        <div className="p-8">
          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">Information pre-filled from your profile</p>
                <p className="text-xs text-green-600">Please verify these details are correct</p>
              </div>
            </div>
          )}
          <h3 className="text-xl font-bold text-midnight-900 mb-2">Complete Your Information</h3>
          <p className="text-gray-600 mb-6">
            Please provide your details exactly as they appear on your credit report.
            This information is required to add you as an authorized user.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name (as appears on ID)</label>
                <input
                  type="text"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name (as appears on ID)</label>
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={userDetails.dob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSN (Last 4 digits)</label>
                <input
                  type="text"
                  name="ssn"
                  value={userDetails.ssn}
                  onChange={handleInputChange}
                  required
                  maxLength="4"
                  pattern="\d{4}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="••••1234"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                placeholder="123 Main Street, Apt 4B"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={userDetails.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  name="state"
                  value={userDetails.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                >
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={userDetails.zipCode}
                  onChange={handleInputChange}
                  required
                  pattern="\d{5}(-\d{4})?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric transition-colors"
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="bg-soft-gray/50 rounded-xl p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Your information is securely encrypted and will only be used to add you as an authorized user. We never store your full SSN.
              </p>
            </div>

            <div className="bg-soft-gray/50 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-midnight-900 mb-4">Select Transaction Type <span className="text-red-500">*</span></h4>
              <p className="text-sm text-gray-500 mb-4">Please select one option (required)</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <label 
                  className={`flex items-center gap-3 bg-white border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                    userDetails.transactionType === 'buy' 
                      ? 'border-electric bg-electric/5' 
                      : 'border-gray-200 hover:border-electric'
                  }`}
                >
                  <input
                    type="radio"
                    name="transactionType"
                    value="buy"
                    checked={userDetails.transactionType === 'buy'}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 text-electric border-gray-300 focus:ring-electric"
                  />
                  <div>
                    <span className="font-semibold text-midnight-900">Buy Tradeline</span>
                    <p className="text-sm text-gray-500">Purchase an authorized user slot</p>
                  </div>
                </label>
                <label 
                  className={`flex items-center gap-3 bg-white border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                    userDetails.transactionType === 'sell' 
                      ? 'border-amber-400 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="transactionType"
                    value="sell"
                    checked={userDetails.transactionType === 'sell'}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 text-amber-500 border-gray-300 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-midnight-900">Sell Tradeline</span>
                    <p className="text-sm text-gray-500">Add someone to your credit card</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-electric hover:bg-electric-dark text-obsidian font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const ConfirmationView = () => (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl border border-gray-200 p-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-midnight-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your application. We&apos;ve received your information for the{' '}
          <span className="font-semibold text-midnight-900">{selectedTradeline.bank} {selectedTradeline.cardName}</span>.
          Our team will review and contact you within 24 hours to complete the process.
        </p>
        <div className="bg-soft-gray/50 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Application ID</p>
          <p className="text-lg font-mono font-semibold text-midnight-900">
            TL-{Date.now().toString(36).toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/tradelines"
            onClick={() => setStep('selection')}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors"
          >
            Browse More Tradelines
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 py-3 bg-electric hover:bg-electric-dark text-obsidian font-bold rounded-xl transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian via-midnight-900 to-obsidian pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {step === 'selection' && 'Premium Credit Tradelines'}
            {step === 'details' && 'Complete Your Application'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {step === 'selection' && 'Boost your credit score with authorized user tradelines from trusted financial institutions.'}
            {step === 'details' && 'Choose to buy or sell tradelines.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step === 'selection' ? 'text-electric' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === 'selection' ? 'bg-electric text-obsidian' : 'bg-midnight-800 text-gray-400 border border-electric/20'
            }`}>1</div>
            <span className="text-sm font-medium hidden sm:block text-white">Select</span>
          </div>
          <div className="w-12 h-0.5 bg-midnight-800">
            <div className={`h-full bg-electric transition-all duration-500 ${
              step === 'details' ? 'w-full' : 'w-0'
            }`}></div>
          </div>
          <div className={`flex items-center gap-2 ${step === 'details' ? 'text-electric' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === 'details' ? 'bg-electric text-obsidian' : 'bg-midnight-800 text-gray-400 border border-electric/20'
            }`}>2</div>
            <span className="text-sm font-medium hidden sm:block text-white">Details</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'selection' && <SelectionView />}
            {step === 'details' && <DetailsView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TradelinesPage;
