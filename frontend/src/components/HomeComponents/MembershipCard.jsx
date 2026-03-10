import { motion } from 'framer-motion';
import { Crown, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const MembershipCard = () => {
  const features = [
    "Full marketplace access",
    "Verified seller network",
    "Escrow protection on all purchases",
    "Progress tracking dashboard",
    "Member-only pricing",
    "Priority support",
    "Cancel anytime"
  ];

  return (
    <section className="py-20 md:py-28 bg-obsidian relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://i.pinimg.com/1200x/ee/05/cf/ee05cf222eaf436788470575d05ceb30.jpg')` 
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-obsidian/85" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-sm font-medium mb-4">
            <Sparkles className="h-3 w-3 inline mr-1" />
            Premium Access
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Membership <span className="text-gold-400">Plans</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            One plan. Full access. No hidden fees.
          </p>
        </motion.div>

        {/* Membership Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="relative bg-gradient-to-br from-midnight-800/90 to-midnight-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gold-500/30 shadow-[0_0_60px_-20px_rgba(201,162,39,0.3)]">
            {/* Decorative corner */}
            <div className="absolute -top-px -right-px w-24 h-24 overflow-hidden rounded-tr-3xl">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold-500/20 to-transparent"></div>
            </div>
            
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-gold-400" />
              </div>
              <span className="text-gold-400 font-semibold">Premium Membership</span>
            </div>
            
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">$49.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Cancel anytime. No long-term contracts.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <button className="w-full group flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-midnight-900 font-bold py-4 rounded-xl shadow-[0_0_30px_-10px_rgba(201,162,39,0.5)] hover:shadow-[0_0_40px_-10px_rgba(201,162,39,0.7)] transition-all duration-300 hover:scale-105">
              <span>Become a Member</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Terms note */}
            <p className="text-center text-gray-500 text-xs mt-4">
              By joining, you agree to our Terms of Membership
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipCard;
