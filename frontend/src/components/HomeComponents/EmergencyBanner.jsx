import { Zap, PhoneCall } from 'lucide-react';
import { PHONE_NUMBER } from './constants.jsx';

const EmergencyBanner = () => {
  return (
    <section id="emergency" className="relative bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white py-2">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 animate-pulse text-[#F5D36B]" />
            <span className="font-medium">24/7 Compliance & Support Services</span>
          </div>
          <div className="flex items-center space-x-2">
            <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="bg-gradient-to-r from-[#C9A227] via-[#E0B84C] to-[#F5D36B] text-[#020816] font-medium py-1.5 px-3 rounded-full hover:opacity-90 transition-all duration-300 flex items-center space-x-1.5 text-sm shadow-md">
              <PhoneCall className="h-4 w-4" />
              <span>Call Now: {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;
