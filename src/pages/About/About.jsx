import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [activeSection, setActiveSection] = useState('privacy');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const autoRotateRef = useRef(null);
  const sectionRef = useRef(null);

  const sections = [
    { id: 'privacy', label: 'Your Privacy' },
    { id: 'solution', label: 'Your Solution' },
    { id: 'contribution', label: 'Your Contribution' },
    { id: 'accolades', label: 'Your Accolades' }
  ];

  const privacyFeatures = [
    {
      icon: '🚫',
      title: 'No Ads',
      description: 'You won\'t find ads in any of our services, including our free consultations and basic service matching.'
    },
    {
      icon: '🔒',
      title: 'No Tracking',
      description: 'We do not track your activity or movements through our platform. Your privacy is always respected.'
    },
    {
      icon: '🏠',
      title: 'Direct Provider Connection',
      description: 'We connect you directly with service providers without third-party intermediaries or data sharing.'
    }
  ];

  const solutionFeatures = [
    {
      icon: '🌱',
      title: 'Homegrown Platform',
      description: 'We built our entire service matching platform from the ground up, specifically designed for healthcare, education, and home services.'
    },
    {
      icon: '🔗',
      title: 'Integrated Services',
      description: 'Seamlessly switch between healthcare, education, and home services within one unified platform.'
    },
    {
      icon: '⚡',
      title: 'Instant Matching',
      description: 'Our smart algorithm instantly connects you with the most suitable service providers based on your specific needs.'
    },
    {
      icon: '🛡️',
      title: 'Verified & Certified',
      description: 'All service providers are thoroughly verified, certified, and background-checked for your safety and peace of mind.'
    }
  ];

  const contributionFeatures = [
    {
      icon: '🎓',
      title: 'Skill Development Programs',
      description: 'We partner with local communities to provide free skill development programs for aspiring service professionals.'
    },
    {
      icon: '🏘️',
      title: 'Rural Service Initiatives',
      description: 'Extending our healthcare, education, and home services to underserved rural communities across the region.'
    },
    {
      icon: '🌱',
      title: 'Eco-Friendly Operations',
      description: 'Our offices and data centers run on renewable energy, minimizing our environmental footprint.'
    },
    {
      icon: '🇮🇳',
      title: 'Made in India',
      description: 'Proudly developed in India, serving customers worldwide with locally-built technology solutions.'
    }
  ];

  const accolades = [
    { name: 'Best Service Platform 2023', organization: 'Tech Innovation Awards' },
    { name: 'Customer Excellence Award', organization: 'Service Industry Association' },
    { name: 'Top Startup', organization: 'Digital India Initiative' },
    { name: 'Innovation in Healthcare', organization: 'HealthTech Forum' }
  ];

  // Auto-rotation effect - 4 seconds
  useEffect(() => {
    if (!isAutoRotating) return;

    autoRotateRef.current = setInterval(() => {
      setActiveSection(current => {
        const currentIndex = sections.findIndex(section => section.id === current);
        const nextIndex = (currentIndex + 1) % sections.length;
        return sections[nextIndex].id;
      });
    }, 4000); // 4 seconds

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, sections]);

  // Handle tap anywhere in the content section
  const handleContentTap = () => {
    // Double tap logic for pause
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Reset click count after 500ms
    setTimeout(() => {
      setClickCount(0);
    }, 500);

    // Double tap detected (2 clicks) - pause auto-rotation
    if (newClickCount === 2) {
      setIsAutoRotating(false);
      // Clear any existing interval immediately
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }
    
    // Single tap to resume auto-rotation (when paused)
    if (!isAutoRotating) {
      setIsAutoRotating(true);
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === activeSection);
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/736x/a0/99/1e/a0991e4ab70886341d1a4fb8ec53f0a1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Main Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      
      {/* Corner Image Overlay - Top Right */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-80 z-0"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/8c/fc/b4/8cfcb4c32e85f3eee471b67015e20466.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)'
        }}
      ></div>

      {/* Corner Image Overlay - Bottom Left */}
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 opacity-80 z-0"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/8c/fc/b4/8cfcb4c32e85f3eee471b67015e20466.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at bottom left, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 30%, transparent 70%)'
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About Universal-Helper
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Connecting you with trusted healthcare, education, and home service professionals 
            through a platform built on privacy, innovation, and community values.
          </motion.p>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSectionClick(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeSection === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Auto-rotation Status */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex space-x-1">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === getCurrentSectionIndex() 
                        ? 'bg-purple-500' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <span className="text-xs">
                {isAutoRotating ? 'Auto-rotating every 4s' : 'Auto-rotation paused'}
              </span>
              
              <span className="text-xs">
                Double-tap to pause • Single-tap to resume
              </span>
            </div>
          </div>
        </motion.section>

        {/* Main Content Sections - Tap area */}
        <div 
          ref={sectionRef}
          onClick={handleContentTap}
          className="cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <motion.section
                key="privacy"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Your Privacy</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We believe that your trust in us goes beyond service matching and includes respecting 
                    and maintaining your privacy. That's why we are committed to:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {privacyFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-white text-center mb-3">{feature.title}</h3>
                      <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Solution Section */}
            {activeSection === 'solution' && (
              <motion.section
                key="solution"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Your Solution</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We believe that you deserve a unified service platform that meets your unique needs. 
                    That's why our platform is:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {solutionFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-white text-center mb-3">{feature.title}</h3>
                      <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Contribution Section */}
            {activeSection === 'contribution' && (
              <motion.section
                key="contribution"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Your Contribution</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We believe that your success is tied to ours, and at a deeper level, tied to the success 
                    of the global community. That's why we contribute to the broader community:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {contributionFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-white text-center mb-3">{feature.title}</h3>
                      <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Accolades Section */}
            {activeSection === 'accolades' && (
              <motion.section
                key="accolades"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Your Accolades</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    We believe that serving you is our deepest privilege, and we are honored by the 
                    awards and acknowledgement that result from that service:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accolades.map((accolade, index) => (
                    <motion.div
                      key={accolade.name}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-300"
                    >
                      <h3 className="text-lg font-bold text-white text-center mb-2">{accolade.name}</h3>
                      <p className="text-gray-400 text-center">{accolade.organization}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 border border-purple-400">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Better Services?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands who trust us for their healthcare, education, and home service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Find Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}