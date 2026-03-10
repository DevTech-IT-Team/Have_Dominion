import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HeroSection from '../../components/HomeComponents/HeroSection.jsx';
import ProblemSolution from '../../components/HomeComponents/ProblemSolution.jsx';
import HowItWorks from '../../components/HomeComponents/HowItWorks.jsx';
import MarketplacePreview from '../../components/HomeComponents/MarketplacePreview.jsx';
import BuyerSellerCards from '../../components/HomeComponents/BuyerSellerCards.jsx';
import MembershipCard from '../../components/HomeComponents/MembershipCard.jsx';
import FAQAccordion from '../../components/HomeComponents/FAQAccordion.jsx';
import CTASection from '../../components/HomeComponents/CTASection.jsx';

const Home = () => {
  const { user } = useAuth();

  // Show full home page for all users
  return (
    <div className="min-h-screen relative overflow-hidden bg-obsidian">
      {/* Custom styles with Obsidian, Midnight Navy & Electric theme */}
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
        @keyframes electric-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.7); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
        .animate-electric-glow { animation: electric-glow 3s ease-in-out infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .midnight-gradient { background: linear-gradient(135deg, #0A1628, #061020, #020816); }
        .electric-gradient { background: linear-gradient(135deg, #00D4FF, #5EE7FF); }
      `}</style>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem/Solution Section */}
      <ProblemSolution />

      {/* How It Works */}
      <HowItWorks />

      {/* Marketplace Preview */}
      <MarketplacePreview />

      {/* Buyer & Seller Cards */}
      <BuyerSellerCards />

      {/* Membership Card */}
      <MembershipCard />

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
};

export default Home;
