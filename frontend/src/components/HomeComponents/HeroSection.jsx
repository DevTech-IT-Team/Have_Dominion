import { Link } from 'react-router-dom';
import { GraduationCap, Phone, ShieldCheck, Award, Lock } from 'lucide-react';
import { PHONE_NUMBER } from './constants.jsx';

const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-white via-gray-50 to-white pt-16 lg:pt-24 pb-24 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/5 via-transparent to-[#020816]/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-[#C9A227]/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-[#E0B84C]/5 via-transparent to-transparent"></div>
        </div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#C9A227] rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-[#E0B84C] rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#0A1F44]">
              Your Next Step
              <span className="block">
                <span className="bg-gradient-to-r from-[#C9A227] via-[#E0B84C] to-[#F5D36B] bg-clip-text text-transparent">Defines Your Path.</span>
              </span>
            </h1>
            <p className="text-lg text-[#0A1F44]/80 leading-relaxed">
              Take a look at your options, and decide what&apos;s right for you.
              We&apos;re here to help you along the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/about"
                className="relative overflow-hidden group bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white text-sm font-medium py-2.5 px-6 rounded-full shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Know More About Us</span>
              </Link>
              <Link
                to={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                className="relative overflow-hidden group border-2 border-[#C9A227] text-[#C9A227] text-sm font-medium py-2.5 px-6 rounded-full transition-all duration-300 hover:bg-[#C9A227]/10 hover:border-[#E0B84C] hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call {PHONE_NUMBER}</span>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-[#0A1F44]">
                <ShieldCheck className="h-4 w-4" />
                <span>Privacy Focused</span>
              </div>
              <div className="flex items-center space-x-2 text-[#C9A227]">
                <Award className="h-4 w-4" />
                <span>Professional Training</span>
              </div>
              <div className="flex items-center space-x-2 text-[#0A1F44]">
                <Lock className="h-4 w-4" />
                <span>Secure Services</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#0A1F44]/10">
              <div className="overflow-hidden rounded-2xl w-full h-80 bg-gradient-to-br from-[#0A1F44]/10 to-[#C9A227]/10 relative shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Building a secure future"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white text-left">
                    <div className="text-2xl font-bold mb-2 text-[#F5D36B]">Build Your Private Future</div>
                    <div className="text-sm text-white/90">Professional Mastery & Financial Independence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
