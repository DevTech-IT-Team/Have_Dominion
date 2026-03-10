import { motion } from 'framer-motion';
import { ShoppingCart, Store, TrendingUp, DollarSign, Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const BuyerSellerCards = () => {
  return (
    <section className="py-20 md:py-28 bg-midnight-900 relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-4">
            Two Ways to Win
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            For <span className="text-gold-400">Buyers</span> & <span className="text-electric">Sellers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Whether you're building credit or earning passive income, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Buyer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                <ShoppingCart className="h-7 w-7 text-gold-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">For Buyers</h3>
                <p className="text-gray-400 text-sm">Build your credit score fast</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">5% Platform Fee at Checkout</p>
                  <p className="text-gray-400 text-sm">Just like concert tickets — expected and transparent.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Escrow Protection</p>
                  <p className="text-gray-400 text-sm">Your money is held safely until posting is confirmed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">30-45 Day Results</p>
                  <p className="text-gray-400 text-sm">See your score move in as little as one billing cycle.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full group flex items-center justify-center gap-2 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-400 font-semibold py-3 rounded-xl transition-all duration-300">
              <span>Browse Tradelines</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Seller Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-sm rounded-3xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center">
                <Store className="h-7 w-7 text-electric" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">For Sellers</h3>
                <p className="text-gray-400 text-sm">Earn passive income monthly</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">15% Commission Per Sale</p>
                  <p className="text-gray-400 text-sm">Industry standard. You do minimal work — just add the user.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Automatic Payments</p>
                  <p className="text-gray-400 text-sm">Get paid as soon as posting is confirmed. No chasing buyers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">$5,000+ Potential</p>
                  <p className="text-gray-400 text-sm">Top sellers earn thousands monthly with established tradelines.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full group flex items-center justify-center gap-2 bg-electric/10 hover:bg-electric/20 border border-electric/30 text-electric font-semibold py-3 rounded-xl transition-all duration-300">
              <span>Start Selling</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuyerSellerCards;
