import { Link } from 'react-router-dom';
import { X, CreditCard, ArrowRight } from 'lucide-react';

const TradelinePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-md animate-fade-in">
      <div className="bg-gradient-to-br from-navy-800 via-navy-900 to-basedark rounded-2xl shadow-2xl border border-gold-500/30 p-5 sm:p-6 relative overflow-hidden backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-400/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gold-300/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-navy-700/50 z-20"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-gold-500 to-gold-400 rounded-xl p-2.5 sm:p-3 shadow-lg animate-pulse-slow">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-navy-900" />
            </div>
            <div className="flex-1 pt-0.5">
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-tight">
                We Also Offer Tradeline Services!
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
                Boost your credit profile with our authorized user tradelines and credit building strategies.
              </p>
            </div>
          </div>

          {/* Interactive buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <Link
              to="/services"
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/30 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <span>View Services</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/tradelines"
              onClick={onClose}
              className="flex-1 bg-navy-700/50 border border-gold-500/30 text-gold-400 font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-navy-600/50 hover:border-gold-500/50 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <span>Get Tradelines</span>
              <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Pulsing indicator */}
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-gold-500 rounded-full animate-pulse">
            <div className="absolute inset-0 bg-gold-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradelinePopup;
