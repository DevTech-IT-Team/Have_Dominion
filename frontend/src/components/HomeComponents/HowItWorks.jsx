import { Users, GraduationCap, Zap, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Assess & Plan",
      description: "Free consultation to understand your goals and create a personalized roadmap.",
      icon: <Users className="h-8 w-8" />,
      theme: "navy"
    },
    {
      step: "02",
      title: "Train & Learn",
      description: "Professional training in your chosen field with expert guidance and resources.",
      icon: <GraduationCap className="h-8 w-8" />,
      theme: "gold"
    },
    {
      step: "03",
      title: "Implement & Grow",
      description: "Apply your knowledge with our support and watch your progress accelerate.",
      icon: <Zap className="h-8 w-8" />,
      theme: "navy"
    },
    {
      step: "04",
      title: "Achieve Dominion",
      description: "Reach financial freedom and career success with our comprehensive pathway.",
      icon: <Award className="h-8 w-8" />,
      theme: "gold"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#0A1F44] to-[#020816] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-[#0A1F44]/70 max-w-3xl mx-auto">
            Four simple steps to transform your life and career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#0A1F44]/30 via-[#C9A227]/30 to-[#0A1F44]/30"></div>

          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className={`absolute inset-0 ${step.theme === 'navy' ? 'bg-[#0A1F44]' : 'bg-[#C9A227]'} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className={`relative bg-white border-2 ${step.theme === 'navy' ? 'border-[#0A1F44]/30' : 'border-[#C9A227]/30'} rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md`}>
                  <div className={`${step.theme === 'navy' ? 'text-[#0A1F44] group-hover:text-[#020816]' : 'text-[#C9A227] group-hover:text-[#E0B84C]'} transition-colors`}>
                    {step.icon}
                  </div>
                </div>
                <div className={`absolute -top-2 -right-2 ${step.theme === 'navy' ? 'bg-[#0A1F44]' : 'bg-[#C9A227]'} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm`}>
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#0A1F44] mb-3">{step.title}</h3>
              <p className={`text-sm ${step.theme === 'navy' ? 'text-[#0A1F44]/70' : 'text-[#C9A227]'}`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
