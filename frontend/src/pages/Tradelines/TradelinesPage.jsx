import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Shield,
  CheckCircle,
  Star,
  ShoppingBag,
  User,
  Clock,
  TrendingUp,
} from 'lucide-react';

const TradelinesPage = () => {
  const [selectedTradeline, setSelectedTradeline] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const tradelines = [
    {
      id: 'chase',
      name: 'Chase',
      logo: '🏦',
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
      logo: '💳',
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
      logo: '🏛️',
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
      logo: '🎯',
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
      logo: '⭐',
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
      logo: '🔍',
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
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6">
            Premium Credit Tradelines
          </h1>

          <p className="text-xl text-blue-900/80 max-w-3xl mx-auto mb-8">
            Boost your credit score with authorized user tradelines from trusted financial institutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4" />
              Secure & Verified
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4" />
              Fast Processing
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
              <TrendingUp className="h-4 w-4" />
              Proven Results
            </div>
          </div>
        </div>
      </div>

      {/* LIST VIEW */}
      <div className="pb-20">
        <div className="max-w-6xl mx-auto px-4 space-y-6">

          {tradelines.map((tradeline, index) => (
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
                  <div className="text-4xl">{tradeline.logo}</div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-blue-950">
                        {tradeline.name}
                      </h3>

                      <span className="flex items-center text-yellow-500 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                        {tradeline.rating}
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
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
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
                    <ShoppingBag className="h-5 w-5" />
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
                    <User className="h-8 w-8 text-blue-600" />
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
    </div>
  );
};

export default TradelinesPage;
