import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Lock,
  User,
  ShoppingBag,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Clock
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
      description: 'Premium Chase tradelines with excellent credit history and high limits',
      features: ['25+ years credit history', '$50,000+ credit limit', 'Perfect payment history', 'Low utilization'],
      price: '$1,500',
      rating: 4.9,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Excellent',
      theme: 'blue'
    },
    {
      id: 'capital-one',
      name: 'Capital One',
      logo: '💳',
      description: 'Strong Capital One accounts with consistent payment records',
      features: ['20+ years credit history', '$30,000+ credit limit', 'No late payments', 'Diverse account types'],
      price: '$1,200',
      rating: 4.8,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Very Good',
      theme: 'blue'
    },
    {
      id: 'bank-of-america',
      name: 'Bank of America',
      logo: '🏛️',
      description: 'Established BofA tradelines with proven credit building results',
      features: ['30+ years credit history', '$40,000+ credit limit', 'Excellent credit mix', 'Stable account'],
      price: '$1,350',
      rating: 4.9,
      availability: 'Limited',
      processingTime: '48-72 hours',
      impact: 'Excellent',
      theme: 'blue'
    },
    {
      id: 'barclays',
      name: 'Barclays',
      logo: '🎯',
      description: 'Premium Barclays tradelines with international credit benefits',
      features: ['15+ years credit history', '$25,000+ credit limit', 'Global acceptance', 'Premium benefits'],
      price: '$1,100',
      rating: 4.7,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Good',
      theme: 'blue'
    },
    {
      id: 'elan',
      name: 'Elan',
      logo: '⭐',
      description: 'Reliable Elan Financial Services tradelines with strong performance',
      features: ['18+ years credit history', '$20,000+ credit limit', 'Consistent payments', 'Multiple account types'],
      price: '$950',
      rating: 4.6,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Good',
      theme: 'blue'
    },
    {
      id: 'discover',
      name: 'Discover',
      logo: '🔍',
      description: 'Popular Discover tradelines with cashback rewards and excellent terms',
      features: ['22+ years credit history', '$35,000+ credit limit', 'No annual fee', 'Cash rewards'],
      price: '$1,050',
      rating: 4.8,
      availability: 'In Stock',
      processingTime: '24-48 hours',
      impact: 'Very Good',
      theme: 'blue'
    }
  ];

  const handleBuyClick = (tradeline) => {
    setSelectedTradeline(tradeline);
    setShowSignupModal(true);
  };

  const handleSignupRedirect = () => {
    setShowSignupModal(false);
    navigate('/signup');
  };

  const getThemeColors = (theme) => {
    return {
      primary: 'from-blue-600 to-blue-700',
      secondary: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-900',
      bg: 'bg-blue-50'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6">
              Premium Credit Tradelines
            </h1>
            <p className="text-xl text-blue-900/90 max-w-3xl mx-auto mb-8">
              Boost your credit score with our authorized user tradelines from trusted financial institutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                <span>Secure & Verified</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tradelines Grid */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradelines.map((tradeline, index) => {
              const theme = getThemeColors(tradeline.theme);
              return (
                <motion.div
                  key={tradeline.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-blue-100 hover:border-blue-200"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${theme.primary} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{tradeline.logo}</div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                          <span className="font-semibold">{tradeline.rating}</span>
                        </div>
                        <div className="text-sm opacity-90">{tradeline.availability}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tradeline.name}</h3>
                    <p className="text-blue-100 text-sm">{tradeline.description}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {tradeline.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className={`p-3 rounded-lg ${theme.bg} border ${theme.border}`}>
                        <div className="text-xs text-gray-600 mb-1">Processing Time</div>
                        <div className="font-semibold text-gray-900">{tradeline.processingTime}</div>
                      </div>
                      <div className={`p-3 rounded-lg ${theme.bg} border ${theme.border}`}>
                        <div className="text-xs text-gray-600 mb-1">Credit Impact</div>
                        <div className="font-semibold text-gray-900">{tradeline.impact}</div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-blue-900">{tradeline.price}</div>
                        <div className="text-sm text-gray-600">One-time fee</div>
                      </div>
                      <button
                        onClick={() => handleBuyClick(tradeline)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/30"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Signup Modal */}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign Up Required</h3>
                  <p className="text-gray-600">
                    Create an account to purchase {selectedTradeline?.name} tradeline
                  </p>
                </div>

                {selectedTradeline && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{selectedTradeline.logo}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{selectedTradeline.name}</h4>
                        <p className="text-sm text-gray-600">{selectedTradeline.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={handleSignupRedirect}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign Up Now</span>
                  </button>
                  <button
                    onClick={() => setShowSignupModal(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Log In
                    </Link>
                  </p>
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
