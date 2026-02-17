import { Smartphone } from 'lucide-react';
import { documentFeatures } from './constants.jsx';

const DocumentManagementSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-6">
            Smart Document Management
          </h2>
          <p className="text-xl text-[#0A1F44]/70 max-w-3xl mx-auto">
            Never dread paperwork again. Our secure system organizes, stores, and alerts you to maintain compliance effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {documentFeatures.map((feature, index) => (
            <div key={index} className={`bg-white rounded-2xl p-6 border-2 ${feature.color === 'navy' ? 'border-[#0A1F44]/20 hover:border-[#0A1F44]/30' : 'border-[#C9A227]/20 hover:border-[#C9A227]/30'} text-center transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl hover:shadow-[#0A1F44]/5`}>
              <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color === 'navy' ? 'bg-[#0A1F44]/10 text-[#0A1F44]' : 'bg-[#C9A227]/10 text-[#C9A227]'}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#0A1F44] mb-3">{feature.title}</h3>
              <p className={`text-sm ${feature.color === 'navy' ? 'text-[#0A1F44]/60' : 'text-[#C9A227]'}`}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-[#0A1F44] to-[#020816] text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto hover:shadow-xl">
            <Smartphone className="h-5 w-5" />
            <span>Download Our App (F-Droid/Aurora)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DocumentManagementSection;
