import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceNeighborhood() {
  const [activeBlock, setActiveBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const neighborhoodBlocks = [
    // HAM Radio Licensing Support
    {
      id: 'ham-radio',
      title: 'HAM Radio Licensing',
      color: '#B8860B', // Dark Goldenrod
      icon: '📡',
      description: 'Get licensed and master amateur radio communication',
      buildings: [
        { 
          name: 'Technician License', 
          available: true, 
          time: 'Self-Paced',
          description: 'Entry-level HAM radio licensing course - 35 question exam preparation',
          provider: 'Have Dominion',
          rating: '5.0/5',
          level: 'Beginner',
          features: ['FCC Exam Prep', 'Basic Operations', 'Study Resources', 'Official Certification']
        },
        { 
          name: 'General License', 
          available: true, 
          time: 'Self-Paced',
          description: 'Intermediate HAM radio licensing with extended privileges',
          provider: 'Have Dominion',
          rating: '4.9/5',
          level: 'Intermediate',
          features: ['HF Band Access', 'Advanced Theory', 'Practical Skills', 'Emergency Comms']
        },
        { 
          name: 'Amateur Extra', 
          available: true, 
          time: 'Self-Paced',
          description: 'Advanced HAM radio certification with all frequency privileges',
          provider: 'Have Dominion',
          rating: '5.0/5',
          level: 'Advanced',
          features: ['Expert Level', 'Mentorship', 'All Privileges', 'Leadership Training']
        },
        { 
          name: 'Practical Training', 
          available: true, 
          time: 'Flexible',
          description: 'Hands-on radio operation practice for real-world scenarios',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Equipment Setup', 'Emergency Protocols', 'Field Operations', 'Network Building']
        }
      ]
    },

    // Private Membership & Coaching Center
    {
      id: 'private-membership',
      title: 'Private Membership',
      color: '#B8860B', // Dark Goldenrod
      icon: '🎯',
      description: 'Exclusive coaching and private sector transition support',
      buildings: [
        { 
          name: 'Creditor Academy', 
          available: true, 
          time: '24/7 Access',
          description: 'Structured financial education community with masterclasses',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Masterclass Access', 'Private Group Sessions', 'Step-by-step Pathways', 'Network Building']
        },
        { 
          name: 'Business Structure', 
          available: true, 
          time: 'By Appointment',
          description: 'Private business entity setup and compliance guidance',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Entity Formation', 'Contract Setup', 'Legal Compliance', 'Private Sector Transition']
        },
        { 
          name: 'Credit Building', 
          available: true, 
          time: 'Self-Paced',
          description: 'Advanced credit enhancement and optimization strategies',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Credit Repair', 'Score Optimization', 'Leverage Strategies', 'Monitoring']
        },
        { 
          name: 'Private Contracting', 
          available: true, 
          time: 'Consultation',
          description: 'Complete transition to private sector contracting',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Contract Templates', 'Negotiation Training', 'Private Agreements', 'Client Acquisition']
        }
      ]
    },

    // Financial Homeschooling / Private Coaching
    {
      id: 'financial-coaching',
      title: 'Financial Coaching',
      color: '#BDB76B', // Dark Khaki
      icon: '💰',
      description: 'One-on-one financial education and private banking mastery',
      buildings: [
        { 
          name: 'Credit Mastery', 
          available: true, 
          time: '1-on-1 Sessions',
          description: 'Complete credit building and management system',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Credit Analysis', 'Building Strategies', 'Maintenance Plans', 'Dispute Resolution']
        },
        { 
          name: 'Private Banking', 
          available: true, 
          time: 'Consultation',
          description: 'Access and utilize private banking systems effectively',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Banking Fundamentals', 'Private Lending', 'Asset Protection', 'Wealth Preservation']
        },
        { 
          name: 'Smart Borrowing', 
          available: true, 
          time: 'Strategy Sessions',
          description: 'Intelligent borrowing and strategic repayment systems',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Loan Optimization', 'Debt Management', 'Leverage Strategies', 'Risk Assessment']
        },
        { 
          name: 'Financial Independence', 
          available: true, 
          time: 'Guided Program',
          description: 'Achieve complete financial independence and control',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Wealth Building', 'Passive Income', 'Asset Allocation', 'Legacy Planning']
        }
      ]
    },

    // Authorized User Tradelines
    {
      id: 'tradelines',
      title: 'Credit Tradelines',
      color: '#B8860B', // Dark Goldenrod
      icon: '📈',
      description: 'Boost your credit profile with established credit lines',
      buildings: [
        { 
          name: 'AU Tradeline Setup', 
          available: true, 
          time: '24-48 Hours',
          description: 'Get added to well-established credit accounts instantly',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Quick Processing', 'Quality Accounts', 'Immediate Impact', 'Secure Process']
        },
        { 
          name: 'Credit Profile Review', 
          available: true, 
          time: 'Consultation',
          description: 'Comprehensive credit analysis and custom strategy development',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Full Analysis', 'Custom Strategy', 'Action Plan', 'Progress Tracking']
        },
        { 
          name: 'Score Optimization', 
          available: true, 
          time: 'Ongoing Support',
          description: 'Continuous credit improvement monitoring and adjustment',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Monthly Monitoring', 'Strategy Adjustments', 'Progress Reports', 'Expert Guidance']
        },
        { 
          name: 'Business Credit Building', 
          available: true, 
          time: 'Setup + Coaching',
          description: 'Establish and build strong business credit profiles',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Business Setup', 'Credit Establishment', 'Lending Access', 'Growth Funding']
        }
      ]
    },

    // Document & Compliance Management
    {
      id: 'documents',
      title: 'Document Management',
      color: '#DAA520', // Goldenrod
      icon: '📋',
      description: 'Secure document storage and compliance tracking system',
      buildings: [
        { 
          name: 'Document Vault', 
          available: true, 
          time: '24/7',
          description: 'Secure encrypted cloud storage for all important documents',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Military-grade Encryption', 'Mobile Access', 'Unlimited Uploads', 'Automated Backup']
        },
        { 
          name: 'Compliance Tracker', 
          available: true, 
          time: '24/7',
          description: 'Automated compliance tracking and deadline management',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Deadline Alerts', 'Document Expiry', 'Audit Trails', 'Regulatory Updates']
        }
      ]
    },

    // Security & Protection Services
    {
      id: 'security',
      title: 'Security Services',
      color: '#DAA520', // Goldenrod
      icon: '🛡️',
      description: 'Comprehensive digital and physical security solutions',
      buildings: [
        { 
          name: 'Cybersecurity', 
          available: true, 
          time: '24/7',
          description: 'Complete digital protection and threat prevention',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Threat Monitoring', 'Vulnerability Assessment', 'Incident Response', 'Security Training']
        },
        { 
          name: 'Privacy Consulting', 
          available: true, 
          time: 'Consultation',
          description: 'Personal and business privacy protection strategies',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Data Protection', 'Online Privacy', 'Secure Communications', 'Asset Concealment']
        }
      ]
    }
  ];

  const filteredBlocks = neighborhoodBlocks.filter(block =>
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.buildings.some(building => 
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCategoryClick = (block) => {
    setSelectedCategory(block);
    setActiveBlock(null);
  };

  const closeCategoryPanel = () => {
    setSelectedCategory(null);
  };

  const CategoryDetailPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-gradient-to-br from-yellow-50/95 to-white/95 backdrop-blur-xl border-l border-yellow-200 shadow-2xl z-50 overflow-y-auto"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-yellow-200 bg-white/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
              style={{ 
                backgroundColor: selectedCategory.color + '30',
                color: selectedCategory.color,
                border: `2px solid ${selectedCategory.color}20`
              }}
            >
              {selectedCategory.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedCategory.title}</h2>
              <p className="text-gray-600 text-sm">{selectedCategory.buildings.length} services available</p>
            </div>
          </div>
          <button
            onClick={closeCategoryPanel}
            className="p-2 hover:bg-yellow-50 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 text-sm">{selectedCategory.description}</p>
      </div>

      {/* Services List */}
      <div className="p-6 bg-gradient-to-b from-white to-yellow-50/30">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Services</h3>
        <div className="space-y-3">
          {selectedCategory.buildings.map((building, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/70 rounded-xl border border-yellow-100 hover:border-yellow-300 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
              onClick={() => alert(`Booking ${building.name} - Contact Have Dominion to get started!`)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-800 font-semibold group-hover:text-yellow-700 transition-colors">
                  {building.name}
                </h4>
                <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  {building.rating}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{building.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {building.features.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded border border-yellow-100"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-600">🕒</span> {building.time}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-600">👤</span> {building.provider}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-t border-yellow-200 bg-white/70">
        <div className="space-y-2">
          <button 
            onClick={() => alert('Contact Have Dominion: info@havedominion.com')}
            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
          >
            📞 Contact Have Dominion
          </button>
          <button className="w-full py-3 bg-white hover:bg-yellow-50 text-gray-800 rounded-xl font-medium transition-all duration-300 border-2 border-yellow-200 hover:border-yellow-300">
            💰 Get Pricing Info
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 pt-20 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(218,165,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,128,0,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Category Detail Panel Overlay */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-yellow-900/10 backdrop-blur-sm z-40"
              onClick={closeCategoryPanel}
            />
            <CategoryDetailPanel />
          </>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-yellow-700 via-amber-700 to-yellow-800 bg-clip-text text-transparent"
          >
            Have Dominion Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Master your communication, finances, and future with our comprehensive service ecosystem
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search Have Dominion services... (HAM radio, credit, financial, etc.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/80 border-2 border-yellow-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 backdrop-blur-sm text-lg transition-all duration-300 hover:border-yellow-300 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Neighborhood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {/* Block Card */}
              <motion.div
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-white to-yellow-50/70 backdrop-blur-md border-2 border-yellow-100 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl hover:border-yellow-300 transition-all duration-300"
                onClick={() => handleCategoryClick(block)}
              >
                {/* Block Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ 
                      backgroundColor: block.color + '30',
                      color: block.color,
                      border: `2px solid ${block.color}20`
                    }}
                  >
                    {block.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{block.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {block.buildings.length} specialized services
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {block.description}
                </p>

                {/* Quick Preview */}
                <div className="space-y-3 mb-4">
                  {block.buildings.slice(0, 2).map((building, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/50 border border-yellow-100 hover:bg-yellow-50/50 transition-colors"
                    >
                      <div>
                        <span className="text-gray-800 font-medium">{building.name}</span>
                        <p className="text-gray-600 text-xs">{building.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 text-xs font-medium">{building.time}</div>
                        <div className="text-yellow-600 text-xs flex items-center">
                          <span className="text-yellow-500 mr-1">★</span> {building.rating}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View More Indicator */}
                {block.buildings.length > 2 && (
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-yellow-700 text-sm font-medium bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">
                      +{block.buildings.length - 2} more services →
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlocks.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6 text-yellow-200">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No services found</h3>
            <p className="text-gray-600 text-lg">
              Try searching for "HAM radio", "credit", "financial", "membership", etc.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 text-gray-800 rounded-xl transition-colors font-medium border-2 border-yellow-200"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-2xl p-4 border-2 border-yellow-200 shadow-2xl"
        >
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800 text-white rounded-xl transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-yellow-500/30"
            >
              <span>Join Have Dominion</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white hover:bg-yellow-50 text-gray-800 rounded-xl transition-all font-medium flex items-center space-x-2 border-2 border-yellow-200 hover:border-yellow-300"
            >
              <span>Schedule Consultation</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white hover:bg-yellow-50 text-gray-800 rounded-xl transition-all font-medium flex items-center space-x-2 border-2 border-yellow-200 hover:border-yellow-300"
            >
              <span>Download Resources</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}