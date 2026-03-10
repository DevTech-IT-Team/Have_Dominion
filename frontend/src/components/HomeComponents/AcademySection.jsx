import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { creditorAcademy } from './constants.jsx';

const AcademySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-navy-900 to-basedark relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Financial Education & Training Programs
          </h2>

          <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-navy-700 via-gold-500 to-navy-700 mx-auto mb-8 rounded-full"></div>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your pathway to financial mastery and private sector success.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {creditorAcademy.map((level, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 bg-gradient-to-br ${level.gradient} border ${level.theme === "navy" ? "border-navy-600/50" : "border-gold-500/30"} backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-gold-500/10 hover:border-gold-500/40`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {level.level}
              </h3>

              <p className="text-gray-300 mb-6">
                {level.description}
              </p>

              <div className="space-y-3">
                {level.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3 text-gray-200"
                  >
                    <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Navigate to Contact Page */}
              <button
                onClick={() => navigate(`/contact?program=${index === 0 ? "basic" : "premium"}`)}
                className={`w-full bg-white font-semibold py-3 rounded-xl mt-6 transition-all duration-300 hover:scale-105 shadow-md ${level.theme === "navy" ? "text-navy-900 hover:bg-gray-100 hover:shadow-navy-700/30" : "text-navy-900 hover:bg-gold-50 hover:shadow-gold-500/30"}`}
              >
                {index === 0 ? "Start Basic Training" : "Enroll in Premium"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
