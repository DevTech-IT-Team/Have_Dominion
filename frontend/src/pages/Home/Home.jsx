import { useState } from 'react';
import EmergencyBanner from '../../components/HomeComponents/EmergencyBanner.jsx';
import HeroSection from '../../components/HomeComponents/HeroSection.jsx';
import ThreeCorePillars from '../../components/HomeComponents/ThreeCorePillars.jsx';
import HowItWorks from '../../components/HomeComponents/HowItWorks.jsx';
import ProofWithoutNoise from '../../components/HomeComponents/ProofWithoutNoise.jsx';
import ServicesSection from '../../components/HomeComponents/ServicesSection.jsx';
import DocumentManagementSection from '../../components/HomeComponents/DocumentManagementSection.jsx';
import AcademySection from '../../components/HomeComponents/AcademySection.jsx';
import CTASection from '../../components/HomeComponents/CTASection.jsx';
import TradelinePopup from '../../components/HomeComponents/TradelinePopup.jsx';

const Home = () => {
  const [showTradelinePopup, setShowTradelinePopup] = useState(true);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Custom styles */}
      <style>{`
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

      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Three Core Pillars */}
      <ThreeCorePillars />

      {/* How It Works */}
      <HowItWorks />

      {/* Proof Without Noise */}
      <ProofWithoutNoise />

      {/* Services Section */}
      <ServicesSection />

      {/* Document Management Section */}
      <DocumentManagementSection />

      {/* Academy Section */}
      <AcademySection />

      {/* CTA Section */}
      <CTASection />

      {/* Tradeline Popup */}
      <TradelinePopup 
        isOpen={showTradelinePopup} 
        onClose={() => setShowTradelinePopup(false)} 
      />
    </div>
  );
};

export default Home;
