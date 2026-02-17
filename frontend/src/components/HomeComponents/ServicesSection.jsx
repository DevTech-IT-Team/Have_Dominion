import { Link } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import { services } from './constants.jsx';

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#0A1F44]/10 rounded-full mb-4">
            <Shield className="h-6 w-6 text-[#0A1F44]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">
            <span className="bg-gradient-to-r from-[#0A1F44] to-[#020816] bg-clip-text text-transparent">
              Professional & Financial Services
            </span>
          </h2>
          <p className="text-lg text-[#0A1F44]/70 max-w-3xl mx-auto">
            Comprehensive tools and training for your professional and financial growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className={`rounded-2xl p-6 border-2 ${service.borderColor} ${service.bgColor} transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-md hover:shadow-xl hover:shadow-[#0A1F44]/10`}>
              <div className={`inline-flex p-3 rounded-xl mb-4 ${service.iconBg}`}>
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#0A1F44] mb-3">{service.title}</h3>
              <p className="text-[#0A1F44]/60 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
              <div className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2 text-sm text-[#0A1F44]/70">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#C9A227]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                state={{ service: service.serviceName }}
                className="w-full bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
