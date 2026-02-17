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
    priceSort: ''
  });

  const tradelines = [
    {
      id: 'chase',
      name: 'Chase',
      cardId: '11959',
      creditLimit: '$5,000.00',
      dateOpened: '2020 Sep',
      purchaseDeadline: 'Feb 19th',
      reportingPeriod: 'Mar 2nd - Mar 9th',
      availability: '1 in stock',
      price: '$336.00'
    },
    {
      id: 'capital-one',
      name: 'Capital One',
      cardId: '12478',
      creditLimit: '$7,500.00',
      dateOpened: '2019 Nov',
      purchaseDeadline: 'Feb 20th',
      reportingPeriod: 'Mar 3rd - Mar 10th',
      availability: '2 in stock',
      price: '$425.00'
    },
    {
      id: 'bank-of-america',
      name: 'Bank of America',
      cardId: '13156',
      creditLimit: '$10,000.00',
      dateOpened: '2018 Jun',
      purchaseDeadline: 'Feb 21st',
      reportingPeriod: 'Mar 4th - Mar 11th',
      availability: '1 in stock',
      price: '$580.00'
    },
    {
      id: 'barclays',
      name: 'Barclays',
      cardId: '14289',
      creditLimit: '$6,000.00',
      dateOpened: '2020 Mar',
      purchaseDeadline: 'Feb 22nd',
      reportingPeriod: 'Mar 5th - Mar 12th',
      availability: '3 in stock',
      price: '$395.00'
    },
    {
      id: 'elan',
      name: 'Elan',
      cardId: '15847',
      creditLimit: '$4,500.00',
      dateOpened: '2021 Jan',
      purchaseDeadline: 'Feb 23rd',
      reportingPeriod: 'Mar 6th - Mar 13th',
      availability: '2 in stock',
      price: '$285.00'
    },
    {
      id: 'discover',
      name: 'Discover',
      cardId: '16325',
      creditLimit: '$8,000.00',
      dateOpened: '2019 Aug',
      purchaseDeadline: 'Feb 24th',
      reportingPeriod: 'Mar 7th - Mar 14th',
      availability: '1 in stock',
      price: '$475.00'
    }
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
        '5000': 5000,
        '10000': 10000
      };
      const minLimit = limitMap[filters.creditLimit];
      filtered = filtered.filter(t => {
        const limit = parseInt(t.creditLimit.replace(/[^0-9]/g, '') || '0');
        return limit >= minLimit;
      });
    }

    // Filter by availability
    if (filters.availability) {
      filtered = filtered.filter(t => 
        t.availability.toLowerCase().includes('in stock') && filters.availability === 'in-stock' ||
        t.availability.toLowerCase().includes('limited') && filters.availability === 'limited'
      );
    }

    // Sort by price
    if (filters.priceSort === 'price-low-high') {
      filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (filters.priceSort === 'price-high-low') {
      filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
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
      priceSort: ''
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

      {/* HEADER */}
      <div className="pt-20 pb-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-6">
            Premium Credit Tradelines
          </h1>

          <p className="text-xl text-[#0A1F44]/70 max-w-3xl mx-auto mb-8">
            Boost your credit score with authorized user tradelines from trusted financial institutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full border border-[#C9A227]/20">
              Secure & Verified
            </div>
            <div className="flex items-center gap-2 bg-[#0A1F44]/5 text-[#0A1F44] px-4 py-2 rounded-full border border-[#0A1F44]/10">
              Fast Processing
            </div>
            <div className="flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full border border-[#C9A227]/20">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20 focus:border-[#0A1F44]/30"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20 focus:border-[#0A1F44]/30"
                  value={filters.creditLimit}
                  onChange={(e) => handleFilterChange('creditLimit', e.target.value)}
                >
                  <option value="">All Limits</option>
                  <option value="5000">$5,000+</option>
                  <option value="10000">$10,000+</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20 focus:border-[#0A1F44]/30"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20 focus:border-[#0A1F44]/30"
                  value={filters.priceSort}
                  onChange={(e) => handleFilterChange('priceSort', e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 text-[#0A1F44] hover:text-[#C9A227] font-medium"
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Table Header */}
          <div className="bg-gray-50 border border-gray-200 rounded-t-lg p-4">
            <div className="grid grid-cols-9 gap-4 text-sm font-semibold text-gray-700">
              <div>Bank Name</div>
              <div>Card ID</div>
              <div>Credit Limit</div>
              <div>Date Opened</div>
              <div>Purchase Deadline</div>
              <div>Reporting Period</div>
              <div>Availability</div>
              <div>Price</div>
              <div>Action</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="bg-white border border-gray-200 border-t-0">
            {filteredTradelines.map((tradeline, index) => (
              <motion.div
                key={tradeline.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                <div className="grid grid-cols-9 gap-4 p-4 items-center">
                  <div className="font-medium text-[#0A1F44]">{tradeline.name}</div>
                  <div className="text-sm text-gray-600">{tradeline.cardId}</div>
                  <div className="text-sm text-gray-600">{tradeline.creditLimit}</div>
                  <div className="text-sm text-gray-600">{tradeline.dateOpened}</div>
                  <div className="text-sm text-gray-600">{tradeline.purchaseDeadline}</div>
                  <div className="text-sm text-gray-600">{tradeline.reportingPeriod}</div>
                  <div className="text-sm text-gray-600">{tradeline.availability}</div>
                  <div className="font-semibold text-[#C9A227]">{tradeline.price}</div>
                  <div>
                    <button
                      onClick={() => handleBuyClick(tradeline)}
                      className="bg-[#0A1F44] hover:bg-[#020816] text-white text-sm font-medium py-2 px-4 rounded-md transition hover:scale-105"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                  <div className="w-16 h-16 bg-[#0A1F44] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-2">
                    Sign Up Required
                  </h3>
                  <p className="text-[#0A1F44]/60">
                    Create an account to purchase {selectedTradeline?.name}
                  </p>
                </div>

                <button
                  onClick={handleSignupRedirect}
                  className="w-full bg-gradient-to-r from-[#0A1F44] to-[#020816] hover:from-[#020816] hover:to-[#0A1F44] text-white font-semibold py-3 rounded-xl transition"
                >
                  Sign Up Now
                </button>

                <button
                  onClick={() => setShowSignupModal(false)}
                  className="w-full mt-3 bg-[#0A1F44]/5 hover:bg-[#0A1F44]/10 text-[#0A1F44] font-semibold py-3 rounded-xl transition border border-[#0A1F44]/10"
                >
                  Cancel
                </button>

                <div className="mt-6 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#C9A227] font-medium hover:underline">
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
          className="bg-gradient-to-r from-[#C9A227] to-[#E0B84C] hover:from-[#E0B84C] hover:to-[#F5D36B] text-[#020816] font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          Selling Tradelines
        </Link>
      </div>
    </div>
  );
};

export default TradelinesPage;
