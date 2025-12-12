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
    { id: 'pathway', label: 'The Pathway', icon: 'fa-solid fa-route' },
    { id: 'how-it-works', label: 'How It Works', icon: 'fa-solid fa-gears' },
    { id: 'training', label: 'Training System', icon: 'fa-solid fa-graduation-cap' },
    { id: 'benefits', label: 'Your Benefits', icon: 'fa-solid fa-star' },
    { id: 'academy', label: 'Private Academy', icon: 'fa-solid fa-building-columns' }
  ];

  const pathwaySteps = [
    {
      step: 1,
      title: 'Work & Contribute',
      description: 'Complete tasks and projects within the organization',
      outcome: 'Build Private Credits through meaningful work'
    },
    {
      step: 2,
      title: 'Earn Training Access',
      description: 'Use accumulated credits for Academy enrollment',
      outcome: 'Unlock private domain knowledge and principles'
    },
    {
      step: 3,
      title: 'Foundational Training',
      description: 'Master essential private operations concepts',
      outcome: 'Complete contracts, sovereignty, PMA, and trusts training'
    },
    {
      step: 4,
      title: 'Advance to Premium',
      description: 'Optional progression to mastery courses',
      outcome: 'Continue education without financial burden'
    }
  ];

  const trainingModules = [
    {
      module: 'Foundation',
      courses: ['Private Contracts', 'Sovereign Principles', 'PMA Fundamentals', 'Trust Structures', 'Private Operations'],
      duration: '8-12 weeks',
      credits: 100
    },
    {
      module: 'Premium Mastery',
      courses: ['Advanced Contracts', 'Private Banking', 'Asset Protection', 'International Law', 'Master Operations'],
      duration: '12-16 weeks',
      credits: 200
    }
  ];

  const benefits = [
    {
      title: 'Knowledgeable',
      description: 'Master the principles and structure of private operations'
    },
    {
      title: 'Self-Reliant',
      description: 'Build confidence to operate independently in private domains'
    },
    {
      title: 'Empowered',
      description: 'Gain the tools and knowledge for true personal empowerment'
    },
    {
      title: 'Prepared',
      description: 'Ready to operate fully in private with complete preparation'
    }
  ];

  const outcomes = [
    {
      metric: 'Lifestyle Stability',
      description: 'Build a stable foundation for long-term personal growth',
      icon: 'fa-solid fa-shield-heart'
    },
    {
      metric: 'Financial Confidence',
      description: 'Operate with financial certainty and strategic advantage',
      icon: 'fa-solid fa-chart-line'
    },
    {
      metric: 'Long-term Growth',
      description: 'Sustainable personal and professional development',
      icon: 'fa-solid fa-seedling'
    },
    {
      metric: 'Private Domain Access',
      description: 'Full integration into private systems and operations',
      icon: 'fa-solid fa-key'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-100 pt-20 pb-20 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(218,165,32,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.1)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60"></div>
      </div>

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
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Pathway to the <span className="bg-gradient-to-r from-yellow-400 via-amber-500 text-white text-transparent bg-clip-text font-bold drop-shadow-lg">Private</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed"
          >
            Earn Your Way Into Private Membership & Training. At our Global Conglomerate, we empower individuals 
            to build stable, secure, and private lives through a clear pathway from public systems to private domains.
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-4xl mx-auto">
              {sections.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleSectionClick(tab.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-br from-yellow-600/90 via-amber-700/90 text-white/90 border-2 border-yellow-400 shadow-lg shadow-yellow-900/50'
                      : 'bg-white/80 border-2 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50/90'
                  }`}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className={`text-2xl mb-2 ${
                    activeSection === tab.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    <i className={tab.icon}></i>
                  </div>
                  <span className={`text-sm font-medium text-center ${
                    activeSection === tab.id ? 'text-white font-semibold' : 'text-gray-800'
                  }`}>
                    {tab.label}
                  </span>
                </motion.button>
              ))}
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
            {/* Pathway Section */}
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
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">The Clear Pathway</h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
                      className="bg-white/80 rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 group backdrop-blur-sm shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`text-3xl ${
                          index === 0 ? 'text-yellow-600' : 
                          index === 1 ? 'text-amber-600' : 
                          index === 2 ? 'text-yellow-500' : 'text-olive-600'
                        }`}>
                          <i className={`fa-solid fa-${index === 0 ? 'hammer' : index === 1 ? 'graduation-cap' : index === 2 ? 'book-open' : 'arrow-up'}`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`font-bold text-lg ${
                              index === 0 ? 'text-yellow-600' : 
                              index === 1 ? 'text-amber-600' : 
                              index === 2 ? 'text-yellow-500' : 'text-olive-600'
                            }`}>Step {step.step}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              index === 0 ? 'bg-yellow-600' : 
                              index === 1 ? 'bg-amber-600' : 
                              index === 2 ? 'bg-yellow-500' : 'bg-olive-600'
                            }`}></div>
                            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                          </div>
                          <p className="text-gray-700 mb-3">{step.description}</p>
                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                            <p className="text-gray-800 text-sm font-medium">Outcome: {step.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* How It Works Section */}
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
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">How The System Works</h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    A credit-based ecosystem that rewards contribution with knowledge and private access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-gray-800 mb-4">
                      <i className="fa-solid fa-hammer"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Work & Contribute</h3>
                    <p className="text-gray-700">
                      Complete meaningful tasks and projects to build your Private Credits pool
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-gray-800 mb-4">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Earn Training Access</h3>
                    <p className="text-gray-700">
                      Use accumulated credits to enroll in Creditor Academy's private programs
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 text-center shadow-md hover:shadow-lg"
                  >
                    <div className="text-4xl text-gray-800 mb-4">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 drop-shadow-md">Advance Confidently</h3>
                    <p className="text-gray-700 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      Progress through training without financial burden, fully prepared for private operations
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Training System Section */}
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
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Training System</h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
                      className={`bg-white/90 rounded-2xl p-6 border-2 transition-all duration-300 group ${
                        index === 0 ? 'border-yellow-200' : 'border-amber-200'
                      } shadow-sm hover:shadow-md`}
                    >
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{module.module}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className={`font-semibold mb-2 ${
                          index === 0 ? 'text-gray-800' : 'text-gray-800'
                        }`}>Courses Included:</h4>
                        <ul className="space-y-1">
                          {module.courses.map((course, idx) => (
                            <li key={idx} className="text-gray-700 flex items-center space-x-2">
                              <span className={`${index === 0 ? 'text-gray-800' : 'text-gray-800'}`}>•</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className={`rounded-lg p-3 text-center ${
                          index === 0 
                            ? 'bg-yellow-100 border border-yellow-200' 
                            : 'bg-amber-100 border border-amber-200'
                        }`}>
                          <p className={`font-semibold ${
                            index === 0 ? 'text-gray-800' : 'text-gray-800'
                          }`}>Duration</p>
                          <p className="text-gray-700">{module.duration}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
                          <p className="text-gray-800 font-semibold">Credits Required</p>
                          <p className="text-gray-700">{module.credits}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Benefits Section */}
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
                  <h2 className="text-4xl font-bold text-black mb-4">Your Transformation</h2>
                  <p className="text-xl text-black max-w-3xl mx-auto">
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
                      className="bg-white rounded-2xl p-6 border-2 border-yellow-200 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300 text-black">
                        <i className={`fa-solid fa-${
                          index === 0 ? 'brain' :
                          index === 1 ? 'user-shield' :
                          index === 2 ? 'bolt' :
                          'check-double'
                        }`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-black text-center mb-3">{benefit.title}</h3>
                      <p className="text-black text-center leading-relaxed">{benefit.description}</p>
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
                      className={`bg-gradient-to-b from-yellow-100 to-amber-50 rounded-xl p-4 text-center border-2 ${
                        index === 0 ? 'border-yellow-300' :
                        index === 1 ? 'border-amber-300' :
                        index === 2 ? 'border-olive-300' :
                        'border-yellow-300'
                      }`}
                    >
                      <div className={`text-2xl mb-2 ${
                        index === 0 ? 'text-black' :
                        index === 1 ? 'text-black' :
                        index === 2 ? 'text-black' :
                        'text-black'
                      }`}>
                        <i className={outcome.icon}></i>
                      </div>
                      <h4 className="text-lg font-bold text-black mb-2">{outcome.metric}</h4>
                      <p className="text-black text-sm">{outcome.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Academy Section */}
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
                  <h2 className="text-4xl font-bold text-black mb-4">Private Academy</h2>
                  <p className="text-xl text-black max-w-3xl mx-auto">
                    Your gateway to private domain mastery. Learn the principles, structure, and operational 
                    knowledge required for confident private operations.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 border-2 border-yellow-200 mb-8 shadow-md">
                  <h3 className="text-2xl font-bold text-black text-center mb-6">Academy Mission</h3>
                  <p className="text-gray-800 text-lg text-center leading-relaxed">
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
                    className="bg-white rounded-2xl p-6 border-2 border-yellow-200"
                  >
                    <h4 className="text-xl font-bold text-black mb-4">What You'll Master</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-black mt-1">✓</span>
                        <span className="text-gray-800">Private contract principles and execution</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-black mt-1">✓</span>
                        <span className="text-gray-800">Sovereign operations and structures</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-black mt-1">✓</span>
                        <span className="text-gray-800">PMA (Private Membership Association) fundamentals</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-black mt-1">✓</span>
                        <span className="text-gray-800">Trust establishment and management</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-black mt-1">✓</span>
                        <span className="text-gray-800">Complete private operational systems</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 border-2 border-amber-200"
                  >
                    <h4 className="text-xl font-bold text-black mb-4">The Result</h4>
                    <p className="text-gray-800 mb-6 leading-relaxed">
                      Graduates emerge with the confidence, knowledge, and practical skills to operate 
                      successfully in private domains, fully prepared for long-term stability and growth.
                    </p>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="text-gray-800 font-medium text-center italic">
                        "From public participant to private professional — your journey to empowerment starts here."
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-3xl p-12 border-2 border-yellow-300">
                <h2 className="text-3xl font-bold text-black mb-4">Ready to Begin Your Private Journey?</h2>
                <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
                  Join the pathway to private membership and transform your future through earned knowledge and access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-white rounded-2xl font-bold text-lg hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 transition-all shadow-lg shadow-yellow-900/30"
                  >
                    Start Earning Credits
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-black rounded-2xl font-bold text-lg hover:bg-yellow-50/80 transition-all"
                  >
                    Explore Academy
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}