import { motion } from 'framer-motion';
import { CreditCard, Calendar, DollarSign, Lock, ArrowRight } from 'lucide-react';

const MarketplacePreview = () => {
  // Sample tradeline data for preview
  const sampleTradelines = [
    {
      bank: "Chase",
      limit: "$25,000",
      age: "8 years",
      utilization: "3%",
      price: "$1,499"
    },
    {
      bank: "Bank of America",
      limit: "$15,000",
      age: "5 years",
      utilization: "5%",
      price: "$899"
    },
    {
      bank: "Discover",
      limit: "$8,000",
      age: "3 years",
      utilization: "2%",
      price: "$549"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-obsidian relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://i.pinimg.com/1200x/e1/50/f5/e150f59dcd31ad2a91d8c73057ef5c3b.jpg')` 
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-obsidian/85" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-sm font-medium mb-4">
            Member-Only Access
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-gold-400">Marketplace</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium tradelines from verified sellers. Join to unlock full access.
          </p>
        </motion.div>

        {/* Preview Cards with Blur Overlay */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTradelines.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-midnight-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gold-400" />
                    </div>
                    <span className="font-semibold text-white">{item.bank}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credit Limit</span>
                    <span className="text-white font-medium">{item.limit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Card Age</span>
                    <span className="text-white font-medium">{item.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Utilization</span>
                    <span className="text-green-400 font-medium">{item.utilization}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-2xl font-bold text-gold-400">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Blur Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent"></div>
          
          {/* Unlock CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <button className="group flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-midnight-900 font-bold py-4 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(201,162,39,0.5)] hover:shadow-[0_0_60px_-10px_rgba(201,162,39,0.7)] transition-all duration-300 hover:scale-105">
              <Lock className="h-5 w-5" />
              <span>Unlock Full Marketplace</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-gray-400 text-sm mt-3">
              Membership required to view all listings
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
