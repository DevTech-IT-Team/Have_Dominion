import { CreditCard, Shield, GraduationCap } from 'lucide-react';

const ThreeCorePillars = () => {
  const pillars = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Dominion Exchange",
      description: "Access powerful financial tools and tradelines to build your credit profile and expand your financial opportunities.",
      iconBg: "bg-[#0A1F44]/10 text-[#0A1F44]",
      borderColor: "border-[#0A1F44]/20"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Dominion Restoration",
      description: "Restore your financial standing with expert guidance, credit repair services, and personalized recovery strategies.",
      iconBg: "bg-[#C9A227]/10 text-[#C9A227]",
      borderColor: "border-[#C9A227]/20"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Dominion Academy",
      description: "Learn from industry experts with comprehensive training programs designed for financial mastery and professional growth.",
      iconBg: "bg-[#0A1F44]/10 text-[#0A1F44]",
      borderColor: "border-[#0A1F44]/20"
    }
  ];

  return (
    <section id="pillars" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
            Our Three Core Pillars
          </h2>
          <p className="text-lg text-[#0A1F44]/70 max-w-3xl mx-auto">
            Building your future through exchange, restoration, and education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 border-2 ${pillar.borderColor} bg-white transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl text-center`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${pillar.iconBg}`}>
                {pillar.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1F44] mb-3">{pillar.title}</h3>
              <p className="text-sm md:text-base text-[#0A1F44]/60 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeCorePillars;
