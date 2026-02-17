import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8 bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-lg rounded-3xl p-10 lg:p-12 border border-[#F5D36B]/30 shadow-2xl shadow-[#0A1F44]/30 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C9A227]/10 rounded-full mix-blend-overlay"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#C9A227]/5 rounded-full mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#C9A227]/5 opacity-50"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F5D36B] via-white to-[#E0B84C] bg-clip-text text-transparent">
            Ready to Take Dominion?
          </h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            Join our global conglomerate and start building your private future today.
            We provide the pathway to professional mastery and financial independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="relative overflow-hidden group bg-white text-[#0A1F44] font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 hover:shadow-xl">
              <Phone className="h-5 w-5" />
              <span>Call: (888) 343-4106</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#C9A227]/20 to-[#E0B84C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
