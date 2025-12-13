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
    const blueClasses = {
      bg: 'bg-gradient-to-br from-blue-50 via-blue-100/50 to-white',
      bgDark: 'bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950',
      border: 'border-blue-700 hover:border-blue-800',
      borderDark: 'border-blue-800',
      text: 'text-blue-800',
      textDark: 'text-blue-900',
      button: 'bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800',
      shadow: 'shadow-blue-950/30',
      icon: 'text-blue-700',
      iconDark: 'text-blue-800',
      accent: 'bg-blue-50 border-blue-300',
      accentDark: 'bg-blue-100 border-blue-400'
    };
    
    const goldClasses = {
      bg: 'bg-gradient-to-br from-amber-50 via-yellow-100/50 to-white',
      bgDark: 'bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600',
      border: 'border-amber-300 hover:border-amber-400',
      borderDark: 'border-amber-400',
      text: 'text-amber-600',
      textDark: 'text-amber-700',
      button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500',
      shadow: 'shadow-amber-900/20',
      icon: 'text-amber-500',
      iconDark: 'text-amber-400',
      accent: 'bg-amber-50 border-amber-200',
      accentDark: 'bg-amber-100 border-amber-300'
    };
    
    return theme === 'gold' ? goldClasses[type] : blueClasses[type];
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
        {/* Blue background elements for left sections */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        
        {/* Gold background elements for right sections */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-100/20 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40"></div>
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
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-transparent bg-clip-text">
              Pathway
            </span>{' '}
            to the{' '}
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-transparent bg-clip-text">
              Private
            </span>
          </motion.h1>
          <div className="w-full flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed text-center w-full"
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
            {/* Pathway Section - Blue theme */}
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
                  <h2 className="text-4xl font-bold text-blue-800 mb-4">The Clear Pathway</h2>
                  <p className="text-lg text-blue-700/90 max-w-3xl mx-auto">
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
                          <p className={`${step.theme === 'gold' ? 'text-amber-700/90' : 'text-blue-700/90'} mb-3`}>
                            {step.description}
                          </p>
                          <div className={`rounded-lg p-3 border ${getThemeClasses(step.theme, 'accentDark')}`}>
                            <p className={`${step.theme === 'gold' ? 'text-amber-800' : 'text-blue-800'} text-sm font-medium`}>
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

            {/* How It Works Section - Blue theme */}
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
                  <h2 className="text-4xl font-bold text-blue-800 mb-4">How The System Works</h2>
                  <p className="text-lg text-blue-700/90 max-w-3xl mx-auto">
                    A credit-based ecosystem that rewards contribution with knowledge and private access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white rounded-2xl p-6 border-2 border-blue-300 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-blue-500 mb-4">
                      <i className="fa-solid fa-hammer"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Work & Contribute</h3>
                    <p className="text-blue-700/90">
                      Complete meaningful tasks and projects to build your Private Credits pool
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white rounded-2xl p-6 border-2 border-blue-300 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-blue-500 mb-4">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Earn Training Access</h3>
                    <p className="text-blue-700/90">
                      Use accumulated credits to enroll in Creditor Academy's private programs
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white rounded-2xl p-6 border-2 border-blue-400 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-blue-500 mb-4">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3">Advance Confidently</h3>
                    <p className="text-blue-800 font-medium bg-blue-100/50 p-2 rounded-lg border border-blue-200">
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
                  <h2 className="text-4xl font-bold text-amber-800 mb-4">Training System</h2>
                  <p className="text-lg text-amber-700/90 max-w-3xl mx-auto">
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
                            <li key={idx} className={`${module.theme === 'gold' ? 'text-amber-700/90' : 'text-blue-700/90'} flex items-center space-x-2`}>
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
                          <p className={`${module.theme === 'gold' ? 'text-amber-700/90' : 'text-blue-700/90'}`}>
                            {module.duration}
                          </p>
                        </div>
                        <div className={`rounded-lg p-3 text-center border ${
                          module.theme === 'gold' 
                            ? 'bg-yellow-50 border-yellow-200' 
                            : 'bg-blue-50 border-blue-200'
                        }`}>
                          <p className={`font-semibold ${
                            module.theme === 'gold' ? 'text-yellow-600' : 'text-blue-600'
                          }`}>
                            Credits Required
                          </p>
                          <p className={`${module.theme === 'gold' ? 'text-yellow-700/90' : 'text-blue-700/90'}`}>
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
                  <h2 className="text-4xl font-bold text-amber-800 mb-4">Your Transformation</h2>
                  <p className="text-xl text-amber-700/90 max-w-3xl mx-auto">
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
                      <p className={`${benefit.theme === 'gold' ? 'text-amber-700/90' : 'text-blue-700/90'} text-center leading-relaxed`}>
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
                      <p className={`${outcome.theme === 'gold' ? 'text-amber-700/90' : 'text-blue-700/90'} text-sm`}>
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
                  <h2 className="text-4xl font-bold text-amber-800 mb-4">Private Academy</h2>
                  <p className="text-xl text-amber-700/90 max-w-3xl mx-auto">
                    Your gateway to private domain mastery. Learn the principles, structure, and operational 
                    knowledge required for confident private operations.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 via-yellow-100/50 to-white rounded-3xl p-8 border-2 border-amber-300 mb-8 shadow-md">
                  <h3 className="text-2xl font-bold text-amber-800 text-center mb-6">Academy Mission</h3>
                  <p className="text-amber-700/90 text-lg text-center leading-relaxed">
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
                    className="bg-gradient-to-br from-amber-50 via-yellow-100/50 to-white rounded-2xl p-6 border-2 border-amber-300"
                  >
                    <h4 className="text-xl font-bold text-amber-800 mb-4">What You'll Master</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span className="text-amber-700/90">Private contract principles and execution</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span className="text-amber-700/90">Sovereign operations and structures</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span className="text-amber-700/90">PMA (Private Membership Association) fundamentals</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span className="text-amber-700/90">Trust establishment and management</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span className="text-amber-700/90">Complete private operational systems</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-amber-50 via-yellow-100/50 to-white rounded-2xl p-6 border-2 border-amber-300"
                  >
                    <h4 className="text-xl font-bold text-amber-800 mb-4">The Result</h4>
                    <p className="text-amber-700/90 mb-6 leading-relaxed">
                      Graduates emerge with the confidence, knowledge, and practical skills to operate 
                      successfully in private domains, fully prepared for long-term stability and growth.
                    </p>
                    <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200">
                      <p className="text-amber-800 font-medium text-center italic">
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
              <div className="rounded-3xl p-12 border-2 border-blue-300 relative overflow-hidden">
                {/* Dynamic background based on active section */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  sections.find(s => s.id === activeSection)?.theme === 'gold'
                    ? 'from-amber-50/90 via-white to-yellow-50/90'
                    : 'from-blue-50/90 via-white to-blue-50/90'
                }`}></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Private Journey?</h2>
                  <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
                    Join the pathway to private membership and transform your future through earned knowledge and access.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-900/30"
                    >
                      Start Earning Credits
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/30"
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