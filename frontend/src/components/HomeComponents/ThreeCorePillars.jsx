import { CreditCard, Shield, GraduationCap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreeCorePillars = () => {
  const pillars = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Dominion Exchange",
      description: "Access powerful financial tools and tradelines to build your credit profile and expand your financial opportunities.",
      gradient: "from-electric/20 to-electric/5",
      borderColor: "border-electric/20",
      hoverBorder: "hover:border-electric/50",
      number: "01"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Dominion Restoration",
      description: "Restore your financial standing with expert guidance, credit repair services, and personalized recovery strategies.",
      gradient: "from-royal-500/20 to-royal-500/5",
      borderColor: "border-royal-500/20",
      hoverBorder: "hover:border-royal-500/50",
      number: "02"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Dominion Academy",
      description: "Learn from industry experts with comprehensive training programs designed for financial mastery and professional growth.",
      gradient: "from-electric/20 to-electric/5",
      borderColor: "border-electric/20",
      hoverBorder: "hover:border-electric/50",
      number: "03"
    }
  ];

  return (
    <section id="pillars" className="py-20 md:py-28 bg-gradient-to-b from-obsidian to-midnight-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-900/10 rounded-full blur-3xl"></div>
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
            Our Foundation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Three Core <span className="bg-gradient-to-r from-electric to-electric-light bg-clip-text text-transparent">Pillars</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Building your future through exchange, restoration, and education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl p-8 border ${pillar.borderColor} ${pillar.hoverBorder} bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-electric/5 overflow-hidden`}
            >
              {/* Number Badge */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-electric/10 transition-colors duration-500">
                {pillar.number}
              </div>

              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-electric/10 group-hover:border-electric/30 transition-all duration-500">
                  <div className="text-electric group-hover:scale-110 transition-transform duration-500">
                    {pillar.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-electric transition-colors duration-500">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-electric font-medium group/link cursor-pointer">
                  <span className="group-hover/link:underline">Learn more</span>
                  <ArrowUpRight className="h-4 w-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeCorePillars;
