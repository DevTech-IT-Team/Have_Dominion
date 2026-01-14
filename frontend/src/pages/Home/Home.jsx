import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Phone, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  ArrowRight,
  Heart,
  Settings,
  GraduationCap,
  MapPin,
  Shield,
  CheckCircle,
  Award,
  ThumbsUp,
  Map,
  FileText,
  MessageCircle,
  Zap,
  BadgeCheck,
  ShieldCheck,
  BookOpen,
  PhoneCall,
  Radio,
  Truck,
  Car,
  Smartphone,
  Lock,
  Building,
  CreditCard,
  FileCheck,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'

// Counter Component
const Counter = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return <span>{count}{suffix}</span>;
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 overflow-hidden shadow-sm">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between text-gray-900 font-semibold hover:bg-blue-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''} text-blue-600`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})
  const [showTradelinePopup, setShowTradelinePopup] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Services categorized by color theme
  const blueServices = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Credit Tradelines",
      description: "Boost your credit profile with our authorized user tradelines and credit building strategies.",
      features: ["Authorized User Tradelines", "Credit Score Improvement", "Credit Profile Analysis", "Financial Strategy"],
      bgColor: "bg-gradient-to-br from-blue-50 to-white",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      cta: "Build Your Credit",
      serviceName: "Credit Tradelines"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Financial Services & GRC",
      description: "Authorized user accounts, financial planning, and Governance, Risk & Compliance solutions.",
      features: ["Credit Building", "GRC Consulting", "Financial Planning", "Compliance Management"],
      bgColor: "bg-gradient-to-br from-blue-50 to-white",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      cta: "Secure Your Future",
      serviceName: "Financial Coaching"
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Home Healthcare Licensing",
      description: "Complete licensing solutions for home healthcare providers and medical professionals.",
      features: ["License Preparation", "Compliance Guidance", "Document Management", "Renewal Support"],
      bgColor: "bg-gradient-to-br from-blue-50 to-white",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      cta: "Get Licensed",
      serviceName: "Document Management"
    }
  ];

  const goldenServices = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Class A CDL Training",
      description: "Commercial Driver's License training and certification for professional truck driving careers.",
      features: ["CDL Certification", "Road Training", "Job Placement", "Lifetime Support"],
      bgColor: "bg-gradient-to-br from-amber-50 to-white",
      borderColor: "border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      cta: "Start CDL Training",
      serviceName: "General Inquiry"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Home Schooling Programs",
      description: "Comprehensive home schooling solutions with customized curriculum and expert guidance.",
      features: ["Custom Curriculum", "Expert Tutors", "Progress Tracking", "College Prep"],
      bgColor: "bg-gradient-to-br from-amber-50 to-white",
      borderColor: "border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      cta: "Explore Programs",
      serviceName: "General Inquiry"
    }
  ];

  const documentFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Storage",
      description: "Organized, secure storage for all your important documents with instant access",
      color: "blue"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Compliance Tracking",
      description: "Never fall out of compliance with automated alerts and renewal reminders",
      color: "blue"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Companion",
      description: "F-Droid & Aurora Store compatible app for document management on the go",
      color: "golden"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Military-grade encryption ensuring your documents remain confidential",
      color: "blue"
    }
  ]

  const creditorAcademy = [
    {
      level: "Basic Training",
      description: "Essential knowledge for working in the private sector",
      features: ["Financial Fundamentals", "Legal Framework", "Privacy Protocols", "Basic Compliance"],
      theme: "blue",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      level: "Premium Program",
      description: "Advanced training for financial mastery and leadership",
      features: ["Advanced Strategies", "Leadership Development", "Wealth Management", "Executive Placement"],
      theme: "golden",
      gradient: "from-amber-500 to-amber-600"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Custom styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blue-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        @keyframes golden-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.5); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
        .animate-blue-glow { animation: blue-glow 3s ease-in-out infinite; }
        .animate-golden-glow { animation: golden-glow 3s ease-in-out infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .blue-gradient { background: linear-gradient(135deg, #083b7c, #0950a0, #0c63e7); }
        .golden-gradient { background: linear-gradient(135deg, #f59e0b, #d97706, #b45309); }
      `}</style>

      {/* Emergency Banner - Blue Theme */}
      <section id="emergency" className="relative bg-gradient-to-r from-[#083b7c] to-[#0950a0] text-white py-2">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 animate-pulse" />
              <span className="font-medium">24/7 Compliance & Support Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href="tel:1-888-997-3744" className="bg-white text-blue-700 font-medium py-1.5 px-3 rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center space-x-1.5 text-sm shadow-md">
                <PhoneCall className="h-4 w-4" />
                <span>Call Now: 1-888-997-3744</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Split Theme */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-50 via-white to-white pt-16 lg:pt-24 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-blue-50/50 to-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>
          </div>
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-blue-950">
                Have
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-800 to-blue-950 bg-clip-text text-transparent">Dominion</span>
                </span>
              </h1>
              <p className="text-lg text-blue-950/90 leading-relaxed">
                Your pathway to privacy, financial independence, and professional mastery. 
                Join our global conglomerate and build the life you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/about" 
                  className="relative overflow-hidden group bg-gradient-to-r from-[#083b7c] to-[#0950a0] text-white text-sm font-medium py-2.5 px-6 rounded-full shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:from-[#0950a0] hover:to-[#0c63e7] hover:shadow-blue-500/30 hover:scale-105 animate-blue-glow"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Know More About Us</span>
                </Link>
                <Link 
                  to="tel:1-888-997-3744"
                  className="relative overflow-hidden group border-2 border-amber-500 text-amber-600 text-sm font-medium py-2.5 px-6 rounded-full transition-all duration-300 hover:bg-amber-50 hover:border-amber-600 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 1-888-997-3744</span>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-blue-700">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Privacy Focused</span>
                </div>
                <div className="flex items-center space-x-2 text-amber-700">
                  <Award className="h-4 w-4" />
                  <span>Professional Training</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <Lock className="h-4 w-4" />
                  <span>Secure Services</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="overflow-hidden rounded-2xl w-full h-80 bg-gradient-to-br from-blue-100 to-amber-50 relative shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Building a secure future" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-blue-500/10 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white text-left">
                      <div className="text-2xl font-bold mb-2 text-blue-50">Build Your Private Future</div>
                      <div className="text-sm opacity-90">From CDL Training to Financial Mastery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Services Section */}
      <section id="blue-services" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                Secure & Financial Services
              </span>
            </h2>
            <p className="text-lg text-blue-900/90 max-w-3xl mx-auto">
              Professional services focused on security, compliance, and financial growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueServices.map((service, index) => (
              <div key={index} className={`rounded-2xl p-6 border-2 ${service.borderColor} ${service.bgColor} transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-md hover:shadow-xl hover:shadow-blue-100`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-950 mb-3">{service.title}</h3>
                <p className="text-blue-900/80 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-blue-800">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  state={{ service: service.serviceName }}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-blue-500/30 flex items-center justify-center"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Services Section */}
      <section id="golden-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              <span className="text-black font-bold">
                Training & Professional Services
              </span>
            </h2>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Hands-on training and professional development services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {goldenServices.map((service, index) => (
              <div key={index} className={`rounded-2xl p-6 border-2 ${service.borderColor} bg-white transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-md hover:shadow-xl hover:shadow-gray-100`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-950 mb-3">{service.title}</h3>
                <p className="text-blue-900/80 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-amber-800">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-amber-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  state={{ service: service.serviceName }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-amber-500/30 flex items-center justify-center"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section - Split Theme */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-amber-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent">
                Your Journey to Success
              </span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent font-medium">
              Simple steps to transform your life and career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-400 via-gray-300 to-amber-400"></div>
            
            {[
              {
                step: "01",
                title: "Assess & Plan",
                description: "Free consultation to understand your goals",
                icon: <Users className="h-8 w-8" />,
                theme: "blue"
              },
              {
                step: "02",
                title: "Train & Learn",
                description: "Professional training in your chosen field",
                icon: <GraduationCap className="h-8 w-8" />,
                theme: "golden"
              },
              {
                step: "03",
                title: "Implement & Grow",
                description: "Apply knowledge with our support",
                icon: <Zap className="h-8 w-8" />,
                theme: "blue"
              },
              {
                step: "04",
                title: "Achieve Dominion",
                description: "Financial freedom and career success",
                icon: <Award className="h-8 w-8" />,
                theme: "golden"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className={`absolute inset-0 ${
                    step.theme === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                  } rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                  <div className={`relative bg-white border-2 ${
                    step.theme === 'blue' ? 'border-blue-400' : 'border-amber-400'
                  } rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md`}>
                    <div className={`${
                      step.theme === 'blue' ? 'text-blue-600 group-hover:text-blue-700' : 'text-amber-600 group-hover:text-amber-700'
                    } transition-colors`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className={`absolute -top-2 -right-2 ${
                    step.theme === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                  } text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm`}>
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className={`text-sm ${
                  step.theme === 'blue' ? 'text-blue-700' : 'text-amber-700'
                }`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Management Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Smart Document Management
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Never dread paperwork again. Our secure system organizes, stores, and alerts you to maintain compliance effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {documentFeatures.map((feature, index) => (
              <div key={index} className={`bg-white rounded-2xl p-6 border-2 ${
                feature.color === 'blue' ? 'border-blue-200 hover:border-blue-300' : 'border-amber-200 hover:border-amber-300'
              } text-center transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl hover:shadow-${
                feature.color === 'blue' ? 'blue' : 'amber'
              }-100`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className={`text-sm ${
                  feature.color === 'blue' ? 'text-blue-800' : 'text-amber-800'
                }`}>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto hover:shadow-blue-500/40">
              <Smartphone className="h-5 w-5" />
              <span>Download Our App (F-Droid/Aurora)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Creditor Academy Section - Split Theme */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Creditor Academy
            </h2>
            <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-blue-500 via-gray-300 to-amber-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Your pathway to financial mastery and private sector success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {creditorAcademy.map((level, index) => (
              <div key={index} className={`rounded-2xl p-8 bg-gradient-to-br ${level.gradient} border-2 ${
                level.theme === 'blue' ? 'border-blue-300' : 'border-amber-300'
              } backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-xl`}>
                <h3 className="text-2xl font-bold text-white mb-4">{level.level}</h3>
                <p className="text-white/90 mb-6">{level.description}</p>
                <div className="space-y-3">
                  {level.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 text-white">
                      <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full bg-white font-semibold py-3 rounded-xl mt-6 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-${
                  level.theme === 'blue' ? 'blue' : 'amber'
                }-200 ${
                  level.theme === 'blue' ? 'text-blue-700 hover:bg-blue-50' : 'text-amber-700 hover:bg-amber-50'
                }`}>
                  {index === 0 ? 'Start Basic Training' : 'Enroll in Premium'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Blue Theme */}
      <section className="py-20 lg:py-28 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-lg rounded-3xl p-10 lg:p-12 border border-white/30 shadow-2xl shadow-blue-900/30 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/5 opacity-50"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-white to-blue-200 bg-clip-text text-transparent">
              Ready to Take Dominion?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join our global conglomerate and start building your private future today. 
              From CDL training to financial mastery, we provide the pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="relative overflow-hidden group bg-white text-blue-700 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-blue-200">
                <Phone className="h-5 w-5" />
                <span>Call: 1-888-997-3744</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              </Link>
              <Link to="/creditor-academy" className="relative overflow-hidden group border-2 border-blue-300 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-blue-800 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/20">
                <span>Start Your Journey</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tradeline Services Popup */}
      {showTradelinePopup && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-md animate-fade-in"
        >
          <div className="bg-gradient-to-br from-sky-50 via-white to-sky-100 rounded-2xl shadow-2xl border-2 border-sky-200 p-5 sm:p-6 relative overflow-hidden backdrop-blur-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/30 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-300/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-sky-100/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            
            {/* Close button */}
            <button
              onClick={() => setShowTradelinePopup(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-sky-600 hover:text-sky-800 transition-colors p-1.5 rounded-full hover:bg-sky-100 z-20"
              aria-label="Close popup"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl p-2.5 sm:p-3 shadow-lg animate-pulse-slow">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-sky-900 mb-1.5 leading-tight">
                    We Also Offer Tradeline Services!
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-700 mb-4 leading-relaxed">
                    Boost your credit profile with our authorized user tradelines and credit building strategies.
                  </p>
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link
                  to="/services"
                  onClick={() => setShowTradelinePopup(false)}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/30 flex items-center justify-center space-x-2 group text-sm sm:text-base"
                >
                  <span>View Services</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  state={{ service: 'Credit Tradelines' }}
                  onClick={() => setShowTradelinePopup(false)}
                  className="flex-1 bg-white border-2 border-sky-400 text-sky-700 font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-sky-50 hover:border-sky-500 flex items-center justify-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Get Tradelines</span>
                  <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                </Link>
              </div>

              {/* Pulsing indicator */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-sky-500 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home