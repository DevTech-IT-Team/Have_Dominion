import { Clock, ShieldCheck, CheckCircle } from 'lucide-react';

const ProofWithoutNoise = () => {
  const proofs = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Transparent Timelines",
      description: "No hidden delays, no vague promises. We believe in complete transparency throughout your journey.",
      features: [
        "Real-time progress tracking",
        "Clear milestone notifications",
        "Instant status updates"
      ],
      theme: "navy",
      iconBg: "bg-[#0A1F44]/10 text-[#0A1F44]",
      borderColor: "border-[#0A1F44]/20"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Posting Guarantee",
      description: "We stand behind our work with a comprehensive guarantee that ensures your satisfaction.",
      features: [
        "100% posting assurance",
        "Full refund if not satisfied",
        "Dedicated support until resolved"
      ],
      theme: "gold",
      iconBg: "bg-[#C9A227]/10 text-[#C9A227]",
      borderColor: "border-[#C9A227]/20"
    }
  ];

  return (
    <section id="proof" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
            Proof Without Noise
          </h2>
          <p className="text-lg text-[#0A1F44]/70 max-w-3xl mx-auto">
            Transparent processes you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {proofs.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 border-2 ${item.borderColor} bg-white transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${item.iconBg}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">{item.title}</h3>
              <p className="text-sm text-[#0A1F44]/60 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-[#0A1F44]/70">
                    <CheckCircle className={`h-4 w-4 flex-shrink-0 ${item.theme === 'navy' ? 'text-[#0A1F44]' : 'text-[#C9A227]'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofWithoutNoise;
