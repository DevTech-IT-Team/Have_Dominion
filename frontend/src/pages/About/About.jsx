import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [activeSection, setActiveSection] = useState('pathway');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoRotateRef = useRef(null);
  const sectionRef = useRef(null);

  const sections = [
    { id: 'pathway', label: 'The Pathway', icon: 'fa-solid fa-route', theme: 'blue' },
    { id: 'how-it-works', label: 'How It Works', icon: 'fa-solid fa-gears', theme: 'blue' },
    { id: 'training', label: 'Training System', icon: 'fa-solid fa-graduation-cap', theme: 'blue' },
    { id: 'benefits', label: 'Your Benefits', icon: 'fa-solid fa-star', theme: 'blue' },
    { id: 'academy', label: 'Private Academy', icon: 'fa-solid fa-building-columns', theme: 'blue' }
  ];

  const pathwaySteps = [
    {
      step: 1,
      title: 'Work & Contribute',
      description: 'Complete tasks and projects within the organization',
      outcome: 'Build Private Credits through meaningful work',
      theme: 'blue'
    },
    {
      step: 2,
      title: 'Earn Training Access',
      description: 'Use accumulated credits for Academy enrollment',
      outcome: 'Unlock private domain knowledge and principles',
      theme: 'gold'
    },
    {
      step: 3,
      title: 'Foundational Training',
      description: 'Master essential private operations concepts',
      outcome: 'Complete contracts, sovereignty, PMA, and trusts training',
      theme: 'blue'
    },
    {
      step: 4,
      title: 'Advance to Premium',
      description: 'Optional progression to mastery courses',
      outcome: 'Continue education without financial burden',
      theme: 'gold'
    }
  ];

  const trainingModules = [
    {
      module: 'Foundation',
      courses: ['Private Contracts', 'Sovereign Principles', 'PMA Fundamentals', 'Trust Structures', 'Private Operations'],
      duration: '8-12 weeks',
      credits: 100,
      theme: 'blue'
    },
    {
      module: 'Premium Mastery',
      courses: ['Advanced Contracts', 'Private Banking', 'Asset Protection', 'International Law', 'Master Operations'],
      duration: '12-16 weeks',
      credits: 200,
      theme: 'gold'
    }
  ];

  const benefits = [
    {
      title: 'Knowledgeable',
      description: 'Master the principles and structure of private operations',
      theme: 'blue'
    },
    {
      title: 'Self-Reliant',
      description: 'Build confidence to operate independently in private domains',
      theme: 'gold'
    },
    {
      title: 'Empowered',
      description: 'Gain the tools and knowledge for true personal empowerment',
      theme: 'blue'
    },
    {
      title: 'Prepared',
      description: 'Ready to operate fully in private with complete preparation',
      theme: 'gold'
    }
  ];

  const outcomes = [
    {
      metric: 'Lifestyle Stability',
      description: 'Build a stable foundation for long-term personal growth',
      icon: 'fa-solid fa-shield-heart',
      theme: 'blue'
    },
    {
      metric: 'Financial Confidence',
      description: 'Operate with financial certainty and strategic advantage',
      icon: 'fa-solid fa-chart-line',
      theme: 'gold'
    },
    {
      metric: 'Long-term Growth',
      description: 'Sustainable personal and professional development',
      icon: 'fa-solid fa-seedling',
      theme: 'blue'
    },
    {
      metric: 'Private Domain Access',
      description: 'Full integration into private systems and operations',
      icon: 'fa-solid fa-key',
      theme: 'gold'
    }
  ];

  // Color theme utilities
  const getThemeClasses = (theme, type = 'bg') => {
    const navyClasses = {
      bg: 'bg-gradient-to-br from-[#0A1F44]/5 via-[#0A1F44]/10 to-white',
      bgDark: 'bg-gradient-to-br from-[#0A1F44] via-[#0A1F44]/90 to-[#020816]',
      border: 'border-[#0A1F44]/20 hover:border-[#0A1F44]/30',
      borderDark: 'border-[#0A1F44]/30',
      text: 'text-[#0A1F44]/70',
      textDark: 'text-[#0A1F44]',
      button: 'bg-gradient-to-r from-[#0A1F44] to-[#020816] hover:from-[#020816] hover:to-[#0A1F44]',
      shadow: 'shadow-[#0A1F44]/20',
      icon: 'text-[#0A1F44]/60',
      iconDark: 'text-[#0A1F44]',
      accent: 'bg-[#0A1F44]/5 border-[#0A1F44]/20',
      accentDark: 'bg-[#0A1F44]/10 border-[#0A1F44]/30'
    };
    
    const goldClasses = {
      bg: 'bg-gradient-to-br from-[#F5D36B]/10 via-[#C9A227]/10 to-white',
      bgDark: 'bg-gradient-to-br from-[#C9A227] via-[#E0B84C] to-[#F5D36B]',
      border: 'border-[#C9A227]/20 hover:border-[#C9A227]/30',
      borderDark: 'border-[#C9A227]/30',
      text: 'text-[#C9A227]',
      textDark: 'text-[#C9A227]',
      button: 'bg-gradient-to-r from-[#C9A227] to-[#E0B84C] hover:from-[#E0B84C] hover:to-[#F5D36B]',
      shadow: 'shadow-[#C9A227]/20',
      icon: 'text-[#C9A227]',
      iconDark: 'text-[#E0B84C]',
      accent: 'bg-[#F5D36B]/10 border-[#C9A227]/20',
      accentDark: 'bg-[#F5D36B]/20 border-[#C9A227]/30'
    };
    
    return theme === 'gold' ? goldClasses[type] : navyClasses[type];
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    autoRotateRef.current = setInterval(() => {
      setActiveSection(current => {
        const currentIndex = sections.findIndex(section => section.id === current);
        const nextIndex = (currentIndex + 1) % sections.length;
        return sections[nextIndex].id;
      });
    }, 3000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, sections]);

  const handleContentTap = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    setTimeout(() => {
      setClickCount(0);
    }, 500);

    if (newClickCount === 2) {
      setIsAutoRotating(false);
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }
    
    if (!isAutoRotating) {
      setIsAutoRotating(true);
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-20 relative">
      {/* Background Elements - Separate sections */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Navy background elements for left sections */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
        
        {/* Gold background elements for right sections */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#F5D36B]/5 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,31,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section - Mixed colors */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-6"
          >
            <span className="bg-gradient-to-r from-[#0A1F44] via-[#0A1F44]/80 to-[#020816] text-transparent bg-clip-text">
              Pathway
            </span>{' '}
            to the{' '}
            <span className="bg-gradient-to-r from-[#C9A227] via-[#E0B84C] to-[#F5D36B] text-transparent bg-clip-text">
              Private
            </span>
          </motion.h1>
          <div className="w-full flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-[#0A1F44]/70 mb-8 max-w-3xl leading-relaxed text-center w-full"
            >
              Earn Your Way Into Private Membership & Training. At our Global Conglomerate, we empower individuals 
              to build stable, secure, and private lives through a clear pathway from public systems to private domains.
            </motion.p>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-4xl mx-auto">
              {sections.map((tab) => {
                const isActive = activeSection === tab.id;
                const theme = tab.theme;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleSectionClick(tab.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `${getThemeClasses(theme, 'bgDark')} text-white border-2 ${getThemeClasses(theme, 'borderDark')} shadow-lg ${getThemeClasses(theme, 'shadow')}`
                        : `${getThemeClasses(theme, 'bg')} border-2 ${getThemeClasses(theme, 'border')} hover:bg-white/90`
                    }`}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className={`text-2xl mb-2 ${
                      isActive ? 'text-white' : getThemeClasses(theme, 'icon')
                    }`}>
                      <i className={tab.icon}></i>
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      isActive ? 'text-white' : getThemeClasses(theme, 'text')
                    }`}>
                      {tab.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Main Content Sections */}
        <div 
          ref={sectionRef}
          onClick={handleContentTap}
          className="cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {/* Pathway Section - Navy theme */}
            {activeSection === 'pathway' && (
              <motion.section
                key="pathway"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#0A1F44] mb-4">The Clear Pathway</h2>
                  <p className="text-lg text-[#0A1F44]/70 max-w-3xl mx-auto">
                    A structured journey from public participation to private mastery, ensuring 
                    confidence and competence at every step.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {pathwaySteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`rounded-2xl p-6 border-2 transition-all duration-300 group backdrop-blur-sm shadow-md hover:shadow-lg ${getThemeClasses(step.theme, 'bg')} ${getThemeClasses(step.theme, 'border')}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`text-3xl ${getThemeClasses(step.theme, 'icon')}`}>
                          <i className={`fa-solid fa-${index === 0 ? 'hammer' : index === 1 ? 'graduation-cap' : index === 2 ? 'book-open' : 'arrow-up'}`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`font-bold text-lg ${getThemeClasses(step.theme, 'text')}`}>
                              Step {step.step}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${getThemeClasses(step.theme, 'icon')}`}></div>
                            <h3 className={`text-xl font-bold ${getThemeClasses(step.theme, 'textDark')}`}>
                              {step.title}
                            </h3>
                          </div>
                          <p className={`${step.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'} mb-3`}>
                            {step.description}
                          </p>
                          <div className={`rounded-lg p-3 border ${getThemeClasses(step.theme, 'accentDark')}`}>
                            <p className={`${step.theme === 'gold' ? 'text-[#C9A227]' : 'text-[#0A1F44]'} text-sm font-medium`}>
                              Outcome: {step.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* How It Works Section - Navy theme */}
            {activeSection === 'how-it-works' && (
              <motion.section
                key="how-it-works"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#0A1F44] mb-4">How The System Works</h2>
                  <p className="text-lg text-[#0A1F44]/70 max-w-3xl mx-auto">
                    A credit-based ecosystem that rewards contribution with knowledge and private access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#0A1F44]/10 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-[#0A1F44]/60 mb-4">
                      <i className="fa-solid fa-hammer"></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Work & Contribute</h3>
                    <p className="text-[#0A1F44]/70">
                      Complete meaningful tasks and projects to build your Private Credits pool
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#0A1F44]/10 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-[#0A1F44]/60 mb-4">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Earn Training Access</h3>
                    <p className="text-[#0A1F44]/70">
                      Use accumulated credits to enroll in Creditor Academy's private programs
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#0A1F44]/10 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-[#0A1F44]/60 mb-4">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Advance Confidently</h3>
                    <p className="text-[#0A1F44] font-medium bg-[#0A1F44]/5 p-2 rounded-lg border border-[#0A1F44]/10">
                      Progress through training without financial burden, fully prepared for private operations
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Training System Section - Gold theme */}
            {activeSection === 'training' && (
              <motion.section
                key="training"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#C9A227] mb-4">Training System</h2>
                  <p className="text-lg text-[#C9A227]/80 max-w-3xl mx-auto">
                    Structured learning paths designed to build competence and confidence in private operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {trainingModules.map((module, index) => (
                    <motion.div
                      key={module.module}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-2xl p-6 border-2 transition-all duration-300 group shadow-sm hover:shadow-md ${getThemeClasses(module.theme, 'bg')} ${getThemeClasses(module.theme, 'border')}`}
                    >
                      <div className="mb-4">
                        <h3 className={`text-2xl font-bold ${getThemeClasses(module.theme, 'textDark')}`}>
                          {module.module}
                        </h3>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className={`font-semibold mb-2 ${getThemeClasses(module.theme, 'text')}`}>
                          Courses Included:
                        </h4>
                        <ul className="space-y-1">
                          {module.courses.map((course, idx) => (
                            <li key={idx} className={`${module.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'} flex items-center space-x-2`}>
                              <span className={getThemeClasses(module.theme, 'icon')}>•</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className={`rounded-lg p-3 text-center border ${getThemeClasses(module.theme, 'accentDark')}`}>
                          <p className={`font-semibold ${getThemeClasses(module.theme, 'text')}`}>
                            Duration
                          </p>
                          <p className={`${module.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'}`}>
                            {module.duration}
                          </p>
                        </div>
                        <div className={`rounded-lg p-3 text-center border ${
                          module.theme === 'gold' 
                            ? 'bg-[#F5D36B]/10 border-[#C9A227]/20' 
                            : 'bg-[#0A1F44]/5 border-[#0A1F44]/10'
                        }`}>
                          <p className={`font-semibold ${
                            module.theme === 'gold' ? 'text-[#C9A227]' : 'text-[#0A1F44]'
                          }`}>
                            Credits Required
                          </p>
                          <p className={`${module.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'}`}>
                            {module.credits}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Benefits Section - Gold theme */}
            {activeSection === 'benefits' && (
              <motion.section
                key="benefits"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#C9A227] mb-4">Your Transformation</h2>
                  <p className="text-xl text-[#C9A227]/80 max-w-3xl mx-auto">
                    The comprehensive benefits of completing your journey through our private pathway system.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`rounded-2xl p-6 border-2 transition-all duration-300 group shadow-md hover:shadow-lg ${getThemeClasses(benefit.theme, 'bg')} ${getThemeClasses(benefit.theme, 'border')}`}
                    >
                      <div className={`text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300 ${getThemeClasses(benefit.theme, 'icon')}`}>
                        <i className={`fa-solid fa-${
                          index === 0 ? 'brain' :
                          index === 1 ? 'user-shield' :
                          index === 2 ? 'bolt' :
                          'check-double'
                        }`}></i>
                      </div>
                      <h3 className={`text-xl font-bold text-center mb-3 ${getThemeClasses(benefit.theme, 'textDark')}`}>
                        {benefit.title}
                      </h3>
                      <p className={`${benefit.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'} text-center leading-relaxed`}>
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {outcomes.map((outcome, index) => (
                    <motion.div
                      key={outcome.metric}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`rounded-xl p-4 text-center border-2 transition-all duration-300 hover:scale-105 ${
                        getThemeClasses(outcome.theme, 'bg')
                      } ${getThemeClasses(outcome.theme, 'border')}`}
                    >
                      <div className={`text-2xl mb-2 ${getThemeClasses(outcome.theme, 'icon')}`}>
                        <i className={outcome.icon}></i>
                      </div>
                      <h4 className={`text-lg font-bold mb-2 ${getThemeClasses(outcome.theme, 'textDark')}`}>
                        {outcome.metric}
                      </h4>
                      <p className={`${outcome.theme === 'gold' ? 'text-[#C9A227]/80' : 'text-[#0A1F44]/70'} text-sm`}>
                        {outcome.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Academy Section - Gold theme */}
            {activeSection === 'academy' && (
              <motion.section
                key="academy"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#C9A227] mb-4">Private Academy</h2>
                  <p className="text-xl text-[#C9A227]/80 max-w-3xl mx-auto">
                    Your gateway to private domain mastery. Learn the principles, structure, and operational 
                    knowledge required for confident private operations.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 border-2 border-[#C9A227]/20 mb-8 shadow-md">
                  <h3 className="text-2xl font-bold text-[#C9A227] text-center mb-6">Academy Mission</h3>
                  <p className="text-[#C9A227]/80 text-lg text-center leading-relaxed">
                    To create a workforce and community of individuals who are knowledgeable, self-reliant, 
                    empowered, and prepared to operate fully in the private domain. This pathway ensures 
                    lifestyle stability, financial confidence, and long-term growth as you transition into 
                    the private domain.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#C9A227]/20"
                  >
                    <h4 className="text-xl font-bold text-[#C9A227] mb-4">What You'll Master</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-[#C9A227] mt-1">✓</span>
                        <span className="text-[#C9A227]/80">Private contract principles and execution</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#C9A227] mt-1">✓</span>
                        <span className="text-[#C9A227]/80">Sovereign operations and structures</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#C9A227] mt-1">✓</span>
                        <span className="text-[#C9A227]/80">PMA (Private Membership Association) fundamentals</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#C9A227] mt-1">✓</span>
                        <span className="text-[#C9A227]/80">Trust establishment and management</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#C9A227] mt-1">✓</span>
                        <span className="text-[#C9A227]/80">Complete private operational systems</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#C9A227]/20"
                  >
                    <h4 className="text-xl font-bold text-[#C9A227] mb-4">The Result</h4>
                    <p className="text-[#C9A227]/80 mb-6 leading-relaxed">
                      Graduates emerge with the confidence, knowledge, and practical skills to operate 
                      successfully in private domains, fully prepared for long-term stability and growth.
                    </p>
                    <div className="bg-[#F5D36B]/10 rounded-lg p-4 border border-[#C9A227]/20">
                      <p className="text-[#C9A227] font-medium text-center italic">
                        "From public participant to private professional — your journey to empowerment starts here."
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* CTA Section - Mixed theme */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="rounded-3xl p-12 border-2 border-[#0A1F44]/10 relative overflow-hidden bg-white">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-[#0A1F44] mb-4">Ready to Begin Your Private Journey?</h2>
                  <p className="text-[#0A1F44]/70 text-lg mb-8 max-w-2xl mx-auto">
                    Join the pathway to private membership and transform your future through earned knowledge and access.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white rounded-2xl font-bold text-lg hover:from-[#020816] hover:to-[#0A1F44] transition-all shadow-lg"
                    >
                      Start Earning Credits
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] text-[#020816] rounded-2xl font-bold text-lg hover:from-[#E0B84C] hover:to-[#F5D36B] transition-all shadow-lg"
                    >
                      Explore Academy
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}