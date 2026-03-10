import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from './constants.jsx';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-midnight-900 to-obsidian relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-royal-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional & <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">Financial Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive tools and training for your professional and financial growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl p-6 border border-electric/10 bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-electric/5 overflow-hidden h-full flex flex-col`}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:bg-electric/10 group-hover:border-electric/30 transition-all duration-500">
                  <div className="text-electric">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-electric transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-electric" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/contact"
                  state={{ service: service.serviceName }}
                  className="group/btn w-full bg-electric hover:bg-electric-light text-obsidian font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-electric/25 flex items-center justify-center gap-2"
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
