import { Smartphone } from 'lucide-react';
import { documentFeatures } from './constants.jsx';

const DocumentManagementSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-basedark to-navy-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Smart Document Management
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Never dread paperwork again. Our secure system organizes, stores, and alerts you to maintain compliance effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {documentFeatures.map((feature, index) => (
            <div key={index} className={`bg-navy-800/40 backdrop-blur-sm rounded-2xl p-6 border ${feature.color === 'navy' ? 'border-navy-600/50 hover:border-gold-500/30' : 'border-gold-500/20 hover:border-gold-500/40'} text-center transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-gold-500/10`}>
              <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.color === 'navy' ? 'bg-navy-700/50 text-gold-400' : 'bg-gold-500/20 text-gold-400'}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className={`text-sm ${feature.color === 'navy' ? 'text-gray-400' : 'text-gold-400/80'}`}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-navy-700 to-navy-900 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto hover:shadow-xl border border-gold-500/30 hover:border-gold-500/50">
            <Smartphone className="h-5 w-5" />
            <span>Download Our App (F-Droid/Aurora)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DocumentManagementSection;
