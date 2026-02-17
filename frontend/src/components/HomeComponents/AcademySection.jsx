import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { creditorAcademy } from './constants.jsx';

const AcademySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-6">
            Financial Education & Training Programs
          </h2>

          <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-[#0A1F44] via-[#C9A227] to-[#0A1F44] mx-auto mb-8 rounded-full"></div>

          <p className="text-xl text-[#0A1F44]/70 max-w-3xl mx-auto">
            Your pathway to financial mastery and private sector success.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {creditorAcademy.map((level, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 bg-gradient-to-br ${level.gradient} border-2 ${level.theme === "navy" ? "border-[#0A1F44]/30" : "border-[#C9A227]/30"} backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-xl`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {level.level}
              </h3>

              <p className="text-white/90 mb-6">
                {level.description}
              </p>

              <div className="space-y-3">
                {level.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3 text-white"
                  >
                    <CheckCircle className="h-5 w-5 text-[#F5D36B] flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Navigate to Contact Page */}
              <button
                onClick={() => navigate(`/contact?program=${index === 0 ? "basic" : "premium"}`)}
                className={`w-full bg-white font-semibold py-3 rounded-xl mt-6 transition-all duration-300 hover:scale-105 shadow-md ${level.theme === "navy" ? "text-[#0A1F44] hover:bg-gray-50 hover:shadow-[#0A1F44]/20" : "text-[#C9A227] hover:bg-[#F5D36B]/10 hover:shadow-[#C9A227]/20"}`}
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
