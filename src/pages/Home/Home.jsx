import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  ChevronUp
} from 'lucide-react'
import ChatWidget from "../../components/Chat/ChatWidget";

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
    <div className="bg-yellow-50 rounded-xl border border-amber-300 overflow-hidden shadow-sm">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between text-gray-900 font-semibold hover:bg-amber-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''} text-amber-600`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})

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

  // Updated Services for Have Dominion
  const services = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Credit Tradelines",
      description: "Boost your credit profile with our authorized user tradelines and credit building strategies.",
      features: ["Authorized User Tradelines", "Credit Score Improvement", "Credit Profile Analysis", "Financial Strategy"],
      color: "from-red-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-red-50 to-amber-50",
      category: "financial",
      cta: "Build Your Credit"
    },
    
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Class A CDL Training",
      description: "Commercial Driver's License training and certification for professional truck driving careers.",
      features: ["CDL Certification", "Road Training", "Job Placement", "Lifetime Support"],
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      category: "cdl",
      cta: "Start CDL Training"
    },
    
    {
      icon: <Radio className="h-8 w-8" />,
      title: "HAM Radio & Communications",
      description: "HAM radio licensing, equipment setup, and secure communication systems for enthusiasts.",
      features: ["HAM Licensing", "Equipment Setup", "Secure Comms", "Emergency Protocols"],
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      category: "radio",
      cta: "Get Licensed"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Home Schooling Programs",
      description: "Comprehensive home schooling solutions with customized curriculum and expert guidance.",
      features: ["Custom Curriculum", "Expert Tutors", "Progress Tracking", "College Prep"],
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      category: "education",
      cta: "Explore Programs"
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Home Healthcare Licensing",
      description: "Complete licensing solutions for home healthcare providers and medical professionals.",
      features: ["License Preparation", "Compliance Guidance", "Document Management", "Renewal Support"],
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      category: "healthcare",
      cta: "Get Licensed"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Financial Services & GRC",
      description: "Authorized user accounts, financial planning, and Governance, Risk & Compliance solutions.",
      features: ["Credit Building", "GRC Consulting", "Financial Planning", "Compliance Management"],
      color: "from-red-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-red-50 to-amber-50",
      category: "financial",
      cta: "Secure Your Future"
    },
  ];

  const documentFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Storage",
      description: "Organized, secure storage for all your important documents with instant access"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Compliance Tracking",
      description: "Never fall out of compliance with automated alerts and renewal reminders"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Companion",
      description: "F-Droid & Aurora Store compatible app for document management on the go"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Military-grade encryption ensuring your documents remain confidential"
    }
  ]

  const creditorAcademy = [
    {
      level: "Basic Training",
      description: "Essential knowledge for working in the private sector",
      features: ["Financial Fundamentals", "Legal Framework", "Privacy Protocols", "Basic Compliance"],
      color: "from-yellow-400 to-amber-500"
    },
    {
      level: "Premium Program",
      description: "Advanced training for financial mastery and leadership",
      features: ["Advanced Strategies", "Leadership Development", "Wealth Management", "Executive Placement"],
      color: "from-amber-500 to-red-500"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
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
        @keyframes amber-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.2); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
        .animate-amber-glow { animation: amber-glow 3s ease-in-out infinite; }
        .amber-gradient { background: linear-gradient(135deg, #f59e0b, #d97706, #b45309); }
        .red-amber-gradient { background: linear-gradient(135deg, #dc2626, #f59e0b, #d97706); }
        .yellow-gradient { background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706); }
      `}</style>

      {/* Emergency Banner */}
      <section id="emergency" className="relative bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 animate-pulse" />
              <span className="font-medium">24/7 Compliance & Support Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href="tel:1-888-997-3744" className="bg-white text-amber-700 font-medium py-1.5 px-3 rounded-full hover:bg-amber-50 transition-all duration-300 flex items-center space-x-1.5 text-sm shadow-md">
                <PhoneCall className="h-4 w-4" />
                <span>Call Now: 1-888-997-3744</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-b from-amber-50 to-white pt-12 lg:pt-16 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent"></div>
          </div>
          <div className="absolute top-10 left-10 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                Have
                <span className="block bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 bg-clip-text text-transparent animate-gradient">
                  Dominion
                </span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your pathway to privacy, financial independence, and professional mastery. 
                Join our global conglomerate and build the life you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/creditor-academy" 
                  className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium py-2.5 px-6 rounded-full shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/30 hover:scale-105"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Start at Creditor Academy</span>
                </Link>
                <Link 
                  to="tel:1-888-997-3744"
                  className="relative overflow-hidden group border-2 border-amber-500 text-amber-600 text-sm font-medium py-2.5 px-6 rounded-full transition-all duration-300 hover:bg-amber-50 hover:border-amber-600 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 1-888-997-3744</span>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-amber-700">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Privacy Focused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Professional Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure Services</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="overflow-hidden rounded-2xl w-full h-80 bg-gradient-to-br from-amber-100 to-white relative shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Building a secure future" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-amber-500/10 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white text-left">
                      <div className="text-2xl font-bold mb-2">Build Your Private Future</div>
                      <div className="text-sm opacity-90">From CDL Training to Financial Mastery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      <div className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            Our Core Services
          </h2>
          
          {/* Credit Tradelines Section */}
          <div id="credit-tradelines" className="mb-20 bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-10 w-10 text-amber-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">Credit Tradelines</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">Enhance your credit profile with our authorized user tradelines and expert credit building strategies. Achieve your financial goals faster with our proven credit enhancement solutions.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Authorized User Tradelines
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Credit Score Improvement
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Credit Profile Analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Financial Strategy
                  </li>
                </ul>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center group shadow-md">
                  Build Your Credit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Dark abstract financial technology background" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent md:from-transparent md:to-white/60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-900 text-center md:text-right">
                  <div className="inline-flex items-center px-4 py-2 bg-amber-500/90 rounded-full text-sm font-semibold mb-2 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Credit Building</span>
                  </div>
                  <h4 className="text-xl font-bold">Financial Freedom</h4>
                  <p className="text-sm opacity-90">Build your credit with confidence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class A CDL Training Section */}
          <div id="cdl-training" className="mb-20 bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center mb-6">
                  <Truck className="h-10 w-10 text-amber-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">Class A CDL Training</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">Start your career in trucking with our comprehensive CDL training program. Our expert instructors and hands-on approach ensure you're road-ready in no time.</p>
                <ul className="space-y-3 mb-8">
                  {['CDL Certification', 'Road Training', 'Job Placement', 'Lifetime Support'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center group shadow-md">
                  Start CDL Training
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Professional truck driver with Class A CDL truck" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent md:from-transparent md:to-white/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-900 text-center md:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-amber-500/90 rounded-full text-sm font-semibold mb-2 text-white">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>Class A CDL Program</span>
                  </div>
                  <h4 className="text-xl font-bold">Earn While You Learn</h4>
                  <p className="text-sm opacity-90">Paid on-the-job training available</p>
                </div>
              </div>
            </div>
          </div>

          {/* HAM Radio & Communications Section */}
          <div id="ham-radio" className="bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <Radio className="h-10 w-10 text-amber-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">HAM Radio & Communications</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">Join the world of amateur radio with our comprehensive training and equipment solutions. Stay connected with secure, reliable communication systems.</p>
                <ul className="space-y-3 mb-8">
                  {['HAM Licensing', 'Equipment Setup', 'Secure Comms', 'Emergency Protocols'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center group shadow-md">
                  Get Licensed
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Professional HAM radio equipment with glowing dials and controls" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent md:from-transparent md:to-white/60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-gray-900 text-center md:text-right">
                  <div className="inline-flex items-center px-4 py-2 bg-amber-500/90 rounded-full text-sm font-semibold mb-2 text-white">
                    <Radio className="h-4 w-4 mr-2" />
                    <span>HAM Radio Training</span>
                  </div>
                  <h4 className="text-xl font-bold">Global Connectivity</h4>
                  <p className="text-sm opacity-90">Master communication with our expert training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Journey to Success
            </h2>
            <p className="text-xl text-yellow-700 max-w-3xl mx-auto">
              Simple steps to transform your life and career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
            
            {[
              {
                step: "01",
                title: "Assess & Plan",
                description: "Free consultation to understand your goals",
                icon: <Users className="h-8 w-8" />
              },
              {
                step: "02",
                title: "Train & Learn",
                description: "Professional training in your chosen field",
                icon: <GraduationCap className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Implement & Grow",
                description: "Apply knowledge with our support",
                icon: <Zap className="h-8 w-8" />
              },
              {
                step: "04",
                title: "Achieve Dominion",
                description: "Financial freedom and career success",
                icon: <Award className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white border-2 border-amber-400 rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                    <div className="text-amber-600 group-hover:text-amber-700 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-amber-700 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Available Services
            </h2>
            <p className="text-xl text-yellow-700 max-w-3xl mx-auto">
              Comprehensive solutions for automotive, education, licensing, and financial services. 
              Your privacy and success are our priority.
            </p>
          </div>
          
          {/* First Row of Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {services
              .filter(service => [
                "Credit Tradelines", 
                "Class A CDL Training", 
                "HAM Radio & Communications"
              ].includes(service.title))
              .map((service, index) => (
                <div key={index} className={`rounded-2xl p-6 border bg-white transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-md hover:shadow-xl ${
                  service.category === 'financial' || service.category === 'cdl' || service.category === 'radio' 
                    ? 'border-amber-200 hover:border-amber-300' 
                    : 'border-yellow-200 hover:border-yellow-300'
                }`}>
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    service.category === 'financial' || service.category === 'cdl' || service.category === 'radio' 
                      ? 'bg-amber-100 text-amber-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-amber-800">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-amber-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md ${
                    service.category === 'financial' || service.category === 'cdl' || service.category === 'radio' 
                      ? 'amber-gradient text-white hover:shadow-amber-500/30' 
                      : 'yellow-gradient text-white hover:shadow-yellow-500/30'
                  }`}>
                    {service.cta}
                  </button>
                </div>
              ))}
          </div>

          {/* Second Row of Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services
              .filter(service => [
                "Home Schooling Programs", 
                "Home Healthcare Licensing", 
                "Financial Services & GRC"
              ].includes(service.title))
              .map((service, index) => (
                <div key={index} className={`rounded-2xl p-6 border bg-white transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-md hover:shadow-xl ${
                  service.category === 'education' || service.category === 'healthcare' || service.category === 'financial' 
                    ? 'border-yellow-200 hover:border-yellow-300' 
                    : 'border-amber-200 hover:border-amber-300'
                }`}>
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    service.category === 'education' || service.category === 'healthcare' || service.category === 'financial'
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-amber-100 text-amber-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-amber-800">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-yellow-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 yellow-gradient text-white shadow-md hover:shadow-yellow-500/30">
                    {service.cta}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-yellow-700 max-w-3xl mx-auto">
              Hear from our community members who have transformed their lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Michael R.",
                role: "CDL Graduate",
                content: "From unemployed to earning $85k/year in 6 months. The training changed my life.",
                avatar: "🚚",
                rating: 5
              },
              {
                name: "Sarah K.",
                role: "Creditor Academy",
                content: "The financial strategies helped me clear $30k debt and start building wealth.",
                avatar: "💼",
                rating: 5
              },
              {
                name: "James L.",
                role: "Auto Client",
                content: "Professional audio installation that exceeded all my expectations. Worth every penny.",
                avatar: "🔊",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-yellow-200 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl hover:shadow-yellow-100">
                <div className="flex items-center space-x-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-yellow-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Management Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Smart Document Management
            </h2>
            <p className="text-xl text-yellow-700 max-w-3xl mx-auto">
              Never dread paperwork again. Our secure system organizes, stores, and alerts you to maintain compliance effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {documentFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-yellow-200 text-center transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl hover:shadow-yellow-100">
                <div className="inline-flex p-3 rounded-xl mb-4 bg-yellow-100 text-yellow-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto hover:shadow-yellow-500/40">
              <Smartphone className="h-5 w-5" />
              <span>Download Our App (F-Droid/Aurora)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Creditor Academy Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Creditor Academy
            </h2>
            <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-yellow-700 max-w-3xl mx-auto">
              Your pathway to financial mastery and private sector success. Start with basics, advance to premium with accumulated credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {creditorAcademy.map((level, index) => (
              <div key={index} className={`rounded-2xl p-8 bg-gradient-to-br ${level.color} border border-yellow-300 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-xl`}>
                <h3 className="text-2xl font-bold text-white mb-4">{level.level}</h3>
                <p className="text-white mb-6">{level.description}</p>
                <div className="space-y-3">
                  {level.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 text-white">
                      <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white text-yellow-700 font-semibold py-3 rounded-xl mt-6 transition-all duration-300 hover:scale-105 hover:bg-yellow-50 shadow-md hover:shadow-yellow-200">
                  {index === 0 ? 'Start Basic Training' : 'Enroll in Premium'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Take Dominion?
            </h2>
            <p className="text-xl text-yellow-50 leading-relaxed">
              Join our global conglomerate and start building your private future today. 
              From CDL training to financial mastery, we provide the pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="relative overflow-hidden group bg-white text-yellow-700 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-yellow-200">
                <Phone className="h-5 w-5" />
                <span>Call: 1-888-997-3744</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              </Link>
              <Link to="/creditor-academy" className="relative overflow-hidden group border-2 border-yellow-300 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-700/90 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-yellow-500/20">
                <span>Start Your Journey</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  )
}

export default Home