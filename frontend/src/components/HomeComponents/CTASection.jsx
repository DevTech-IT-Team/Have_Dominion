import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-midnight-900 to-obsidian relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-midnight-800/90 to-midnight-900/90 backdrop-blur-xl rounded-[2.5rem] p-12 lg:p-16 border border-gold-500/20 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-electric/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              {/* Main Headline */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="text-white">Stop Stressing About Your Credit.</span>
                <br />
                <span className="text-gold-400">Start Taking Dominion.</span>
              </motion.h2>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto"
              >
                Your credit score doesn't define you — but your next move does.
              </motion.p>

              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <button className="group relative inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-midnight-900 font-bold py-5 px-10 rounded-full shadow-[0_0_40px_-10px_rgba(201,162,39,0.5)] hover:shadow-[0_0_60px_-10px_rgba(201,162,39,0.7)] transition-all duration-300 hover:scale-105 text-lg">
                  <span>Become a Member — $49.99/mo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-8 flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold-400" />
                  <span className="text-gray-400 text-sm">50+ Point Average Boost</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gold-400" />
                  <span className="text-gray-400 text-sm">100% Posting Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-400" />
                  <span className="text-gray-400 text-sm">30-45 Day Results</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
