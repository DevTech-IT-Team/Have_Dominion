import { motion } from 'framer-motion';
import { Users, CreditCard, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Join",
      description: "Become a member for $49.99/month. Get instant access to the marketplace and all our tools.",
      icon: <Users className="h-8 w-8" />,
    },
    {
      step: "2",
      title: "Choose",
      description: "Browse verified tradelines. Filter by credit limit, age, and price. Pick what fits your goals.",
      icon: <CreditCard className="h-8 w-8" />,
    },
    {
      step: "3",
      title: "Watch Your Score Move",
      description: "Get added as an authorized user. See results in 30-45 days. Simple as that.",
      icon: <TrendingUp className="h-8 w-8" />,
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-midnight-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1738664926458-d8ca7f56549f?q=80&w=1365&auto=format&fit=crop')` 
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-midnight-900/85" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It <span className="text-gold-400">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three steps. No jargon. No waiting forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gold-500/30 to-transparent"></div>
              )}
              
              <div className="text-center">
                {/* Step Circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/30 mb-6">
                  <div className="text-gold-400">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-500 text-midnight-900 font-bold text-sm flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
