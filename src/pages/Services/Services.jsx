import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceNeighborhood() {
  const [activeBlock, setActiveBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const neighborhoodBlocks = [
    {
      id: 'healthcare',
      title: 'Healthcare District',
      color: '#DC2626',
      icon: '🏥',
      description: 'Professional medical services and healthcare support for all your wellness needs',
      buildings: [
        { 
          name: 'Emergency Care', 
          available: true, 
          time: '24/7',
          description: 'Immediate medical attention for urgent situations',
          provider: 'MediQuick Emergency',
          rating: '4.9/5'
        },
        { 
          name: 'Online Consultation', 
          available: true, 
          time: '6AM-11PM',
          description: 'Virtual doctor consultations from home',
          provider: 'HealthConnect',
          rating: '4.7/5'
        },
        { 
          name: 'Medicine Delivery', 
          available: true, 
          time: '8AM-10PM',
          description: 'Prescription and medicine delivery service',
          provider: 'PharmaExpress',
          rating: '4.8/5'
        },
        { 
          name: 'Wellness Programs', 
          available: true, 
          time: '7AM-9PM',
          description: 'Comprehensive health and wellness programs',
          provider: 'Wellness Center',
          rating: '4.6/5'
        }
      ]
    },
    {
      id: 'education',
      title: 'Learning Campus',
      color: '#2563EB',
      icon: '🎓',
      description: 'Educational services and learning opportunities for all ages',
      buildings: [
        { 
          name: 'Home Tutoring', 
          available: true, 
          time: '7AM-10PM',
          description: 'One-on-one tutoring for all subjects',
          provider: 'EduMentor Pro',
          rating: '4.9/5'
        },
        { 
          name: 'Course Library', 
          available: true, 
          time: '24/7',
          description: 'Access to thousands of online courses',
          provider: 'LearnHub',
          rating: '4.8/5'
        },
        { 
          name: 'Skill Workshops', 
          available: true, 
          time: '9AM-8PM',
          description: 'Hands-on workshops for skill development',
          provider: 'SkillCraft Academy',
          rating: '4.7/5'
        },
        { 
          name: 'Career Counseling', 
          available: true, 
          time: '10AM-6PM',
          description: 'Professional career guidance and planning',
          provider: 'CareerPath Pro',
          rating: '4.9/5'
        }
      ]
    },
    {
      id: 'home',
      title: 'Residential Zone',
      color: '#059669',
      icon: '🏠',
      description: 'Home maintenance and improvement services',
      buildings: [
        { 
          name: 'Appliance Repair', 
          available: true, 
          time: '8AM-8PM',
          description: 'Expert repair for all home appliances',
          provider: 'FixIt Pros',
          rating: '4.6/5'
        },
        { 
          name: 'Cleaning Services', 
          available: true, 
          time: '7AM-9PM',
          description: 'Professional home cleaning services',
          provider: 'CleanTeam',
          rating: '4.8/5'
        },
        { 
          name: 'Plumbing & Electrical', 
          available: true, 
          time: '24/7',
          description: 'Emergency plumbing and electrical services',
          provider: 'HomeCare Experts',
          rating: '4.7/5'
        },
        { 
          name: 'Home Maintenance', 
          available: true, 
          time: '8AM-6PM',
          description: 'Regular home maintenance and checkups',
          provider: 'Maintenance Masters',
          rating: '4.5/5'
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

  const askAIQuestion = () => {
    if (userQuestion.trim()) {
      // Simulate AI response
      const responses = [
        "Based on your question, I recommend checking our Home Tutoring services for personalized learning support.",
        "For that type of service, our Emergency Care or Online Consultation would be most suitable.",
        "I suggest looking at our Skill Workshops for hands-on learning experiences.",
        "Our Cleaning Services team can help with that! They're available 7AM-9PM daily."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setUserQuestion('');
    }
  };

  const CategoryDetailPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 shadow-2xl z-50 overflow-y-auto"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: selectedCategory.color + '20', color: selectedCategory.color }}
            >
              {selectedCategory.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
              <p className="text-gray-400 text-sm">{selectedCategory.buildings.length} services available</p>
            </div>
          </div>
          <button
            onClick={closeCategoryPanel}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-300 text-sm">{selectedCategory.description}</p>
      </div>

      {/* AI Question Section */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">🤖 Need Help Choosing?</h3>
        <div className="space-y-3">
          <textarea
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask me anything about these services... (e.g., Which service is best for quick learning?)"
            className="w-full h-20 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
          />
          <button
            onClick={askAIQuestion}
            disabled={!userQuestion.trim()}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Ask AI Assistant
          </button>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
            >
              <p className="text-blue-300 text-sm">{aiResponse}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Services</h3>
        <div className="space-y-3">
          {selectedCategory.buildings.map((building, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer group"
              onClick={() => alert(`Booking ${building.name}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                  {building.name}
                </h4>
                <span className="text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
                  {building.rating}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{building.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>🕒 {building.time}</span>
                <span>👤 {building.provider}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-t border-gray-700">
        <div className="space-y-2">
          <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
            📞 Contact All Providers
          </button>
          <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-600">
            💰 Compare Prices
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-purple-950 pt-20 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-800/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(128,0,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,128,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Category Detail Panel Overlay */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
            className="text-6xl font-bold text-white mb-6"
          >
            Service Neighborhood
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Explore different districts to find exactly what you need in our vibrant service community
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
                placeholder="🔍 What service are you looking for? (e.g., repair, tutor, doctor...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-black/30 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm text-lg transition-all duration-300 hover:border-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 cursor-pointer shadow-xl hover:border-gray-500 transition-all duration-300"
                onClick={() => handleCategoryClick(block)}
              >
                {/* Block Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gray-800 border border-gray-700"
                    style={{ 
                      backgroundColor: block.color + '15',
                      color: block.color
                    }}
                  >
                    {block.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{block.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {block.buildings.length} services available
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {block.description}
                </p>

                {/* Quick Preview */}
                <div className="space-y-3 mb-4">
                  {block.buildings.slice(0, 2).map((building, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <span className="text-gray-200 font-medium">{building.name}</span>
                        <p className="text-gray-400 text-xs">{building.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-xs font-medium">{building.time}</div>
                        <div className="text-yellow-400 text-xs">⭐ {building.rating}</div>
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
                    <span className="text-purple-400 text-sm font-medium bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
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
            <div className="text-8xl mb-6 text-gray-600">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-3">No services found</h3>
            <p className="text-gray-400 text-lg">
              Try searching for "healthcare", "education", "home services", etc.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium border border-gray-600"
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
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 shadow-xl"
        >
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-medium flex items-center space-x-2"
            >
              
              <span>View All Maps</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all font-medium flex items-center space-x-2 border border-gray-600"
            >
              
              <span>Need Help?</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all font-medium flex items-center space-x-2 border border-gray-600"
            >
              
              <span>Favorites</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}