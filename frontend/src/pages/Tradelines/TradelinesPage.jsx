import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const TradelinesPage = () => {
  const [selectedTradeline, setSelectedTradeline] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    bankName: '',
    creditLimit: '',
    availability: '',
    priceSort: '',
    processingTime: '',
    impact: '',
    ratingSort: ''
  });

  const tradelines = [
    {
      id: 'chase',
      name: 'Chase',
      description:
        'Premium Chase tradelines with excellent credit history and high limits',
      features: [
        '25+ years credit history',
        '$50,000+ credit limit',
        'Perfect payment history',
        'Low utilization',
      ],
      price: '$1,500',
      rating: 4.9,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Excellent',
    },
    {
      id: 'capital-one',
      name: 'Capital One',
      description:
        'Strong Capital One accounts with consistent payment records',
      features: [
        '20+ years credit history',
        '$30,000+ credit limit',
        'No late payments',
        'Diverse account types',
      ],
      price: '$1,200',
      rating: 4.8,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Very Good',
    },
    {
      id: 'bank-of-america',
      name: 'Bank of America',
      description:
        'Established BofA tradelines with proven credit building results',
      features: [
        '30+ years credit history',
        '$40,000+ credit limit',
        'Excellent credit mix',
        'Stable account',
      ],
      price: '$1,350',
      rating: 4.9,
      availability: 'Limited',
      processingTime: '48-72 hours',
      impact: 'Excellent',
    },
    {
      id: 'barclays',
      name: 'Barclays',
      description:
        'Premium Barclays tradelines with international credit benefits',
      features: [
        '15+ years credit history',
        '$25,000+ credit limit',
        'Global acceptance',
        'Premium benefits',
      ],
      price: '$1,100',
      rating: 4.7,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Good',
    },
    {
      id: 'elan',
      name: 'Elan',
      description:
        'Reliable Elan Financial Services tradelines with strong performance',
      features: [
        '18+ years credit history',
        '$20,000+ credit limit',
        'Consistent payments',
        'Multiple account types',
      ],
      price: '$950',
      rating: 4.6,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Good',
    },
    {
      id: 'discover',
      name: 'Discover',
      description:
        'Popular Discover tradelines with cashback rewards and excellent terms',
      features: [
        '22+ years credit history',
        '$35,000+ credit limit',
        'No annual fee',
        'Cash rewards',
      ],
      price: '$1,050',
      rating: 4.8,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Very Good',
    },
  ];

  // Apply filters and sorting to tradelines
  const getFilteredAndSortedTradelines = () => {
    let filtered = [...tradelines];

    // Filter by bank name
    if (filters.bankName) {
      filtered = filtered.filter(t => t.id === filters.bankName);
    }

    // Filter by credit limit
    if (filters.creditLimit) {
      const limitMap = {
        '20000+': 20000,
        '30000+': 30000,
        '40000+': 40000,
        '50000+': 50000
      };
      const minLimit = limitMap[filters.creditLimit];
      filtered = filtered.filter(t => {
        const limit = parseInt(t.features.find(f => f.includes('$'))?.replace(/[^0-9]/g, '') || '0');
        return limit >= minLimit;
      });
    }

    // Filter by availability
    if (filters.availability) {
      filtered = filtered.filter(t => 
        t.availability.toLowerCase().replace(' ', '-') === filters.availability
      );
    }

    // Filter by processing time
    if (filters.processingTime) {
      filtered = filtered.filter(t => t.processingTime === filters.processingTime);
    }

    // Filter by impact
    if (filters.impact) {
      filtered = filtered.filter(t => 
        t.impact.toLowerCase().replace(' ', '-') === filters.impact
      );
    }

    // Sort by price
    if (filters.priceSort === 'price-low-high') {
      filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (filters.priceSort === 'price-high-low') {
      filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    }

    // Sort by rating
    if (filters.ratingSort === 'rating-high-low') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.ratingSort === 'rating-low-high') {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      bankName: '',
      creditLimit: '',
      availability: '',
      priceSort: '',
      processingTime: '',
      impact: '',
      ratingSort: ''
    });
  };

  const filteredTradelines = getFilteredAndSortedTradelines();

  const handleBuyClick = (tradeline) => {
    setSelectedTradeline(tradeline);
    setShowSignupModal(true);
  };

  const handleSignupRedirect = () => {
    setShowSignupModal(false);
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* HEADER */}
      <div className="pt-20 pb-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6">
            Premium Credit Tradelines
          </h1>

          <p className="text-xl text-blue-900/80 max-w-3xl mx-auto mb-8">
            Boost your credit score with authorized user tradelines from trusted financial institutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              Secure & Verified
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              Fast Processing
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
              Proven Results
            </div>
          </div>
        </div>
      </div>

      {/* FILTER/SORT SECTION */}
      <div className="pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Bank Name Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.bankName}
                  onChange={(e) => handleFilterChange('bankName', e.target.value)}
                >
                  <option value="">All Banks</option>
                  <option value="chase">Chase</option>
                  <option value="capital-one">Capital One</option>
                  <option value="bank-of-america">Bank of America</option>
                  <option value="barclays">Barclays</option>
                  <option value="elan">Elan</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              {/* Credit Limit Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Credit Limit</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.creditLimit}
                  onChange={(e) => handleFilterChange('creditLimit', e.target.value)}
                >
                  <option value="">All Limits</option>
                  <option value="20000+">$20,000+</option>
                  <option value="30000+">$30,000+</option>
                  <option value="40000+">$40,000+</option>
                  <option value="50000+">$50,000+</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="limited">Limited</option>
                </select>
              </div>

              {/* Price Sort */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Price</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.priceSort}
                  onChange={(e) => handleFilterChange('priceSort', e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Additional Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Processing Time Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Processing Time</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.processingTime}
                  onChange={(e) => handleFilterChange('processingTime', e.target.value)}
                >
                  <option value="">All Times</option>
                  <option value="24-48 hours">24-48 hours</option>
                  <option value="48-72 hours">48-72 hours</option>
                </select>
              </div>

              {/* Impact Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Impact</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.impact}
                  onChange={(e) => handleFilterChange('impact', e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="good">Good</option>
                  <option value="very-good">Very Good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </div>

              {/* Rating Sort */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.ratingSort}
                  onChange={(e) => handleFilterChange('ratingSort', e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                  <option value="rating-low-high">Rating: Low to High</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset Filters
              </button>
              <div className="text-sm text-gray-600">
                Showing {filteredTradelines.length} of {tradelines.length} tradelines
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIST VIEW */}
      <div className="pb-20">
        <div className="max-w-6xl mx-auto px-4 space-y-6">

          {filteredTradelines.map((tradeline, index) => (
            <motion.div
              key={tradeline.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* LEFT SIDE */}
                <div className="flex gap-5 flex-1">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-blue-950">
                        {tradeline.name}
                      </h3>

                      <span className="flex items-center text-yellow-500 text-sm">
                        ⭐ {tradeline.rating}
                      </span>

                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {tradeline.availability}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">
                      {tradeline.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      {tradeline.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          ✓ {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-6 mt-4 text-sm text-gray-600">
                      <span>
                        <strong>Processing:</strong> {tradeline.processingTime}
                      </span>
                      <span>
                        <strong>Impact:</strong> {tradeline.impact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <div className="text-3xl font-bold text-blue-900">
                    {tradeline.price}
                  </div>
                  <div className="text-sm text-gray-500">One-time fee</div>

                  <button
                    onClick={() => handleBuyClick(tradeline)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition hover:scale-105 flex items-center gap-2"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showSignupModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSignupModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sign Up Required
                  </h3>
                  <p className="text-gray-600">
                    Create an account to purchase {selectedTradeline?.name}
                  </p>
                </div>

                <button
                  onClick={handleSignupRedirect}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Sign Up Now
                </button>

                <button
                  onClick={() => setShowSignupModal(false)}
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
                >
                  Cancel
                </button>

                <div className="mt-6 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-medium">
                    Log In
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed Floating Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link
          to="/contact"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          Selling Tradelines
        </Link>
      </div>
    </div>
  );
};

export default TradelinesPage;
