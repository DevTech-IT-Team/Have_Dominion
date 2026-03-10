import { motion } from 'framer-motion';
import { HelpCircle, Clock, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  const painPoints = [
    {
      icon: <HelpCircle className="h-6 w-6" />,
      problem: "I don't know where to start",
      solution: "Clear, step-by-step guidance from day one. No more guessing.",
      color: "gold"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      problem: "It takes too long for results",
      solution: "See credit improvements in 30-45 days, not years.",
      color: "electric"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      problem: "I'm worried about scams",
      solution: "Verified tradelines and escrow protection. If it doesn't post, you don't pay.",
      color: "gold"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      problem: "I can't trust the sellers",
      solution: "Every seller is a vetted member with a verified track record.",
      color: "electric"
    }
  ];

  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1735697536066-d8f73deb5000?q=80&w=686&auto=format&fit=crop')` 
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-obsidian/90" />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 font-mono text-sm tracking-[0.2em] uppercase mb-4 block"
          >
            The Safety Net
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight"
          >
            Your Concerns, <span className="italic font-serif text-gold-400">Solved.</span>
          </motion.h2>
          <div className="h-1 w-20 bg-gold-500/40 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {painPoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }} // Smoother uplift on hover
              className="relative group"
            >
              {/* Golden Outer "Glow" Border (visible on hover) */}
              <div className="absolute -inset-px bg-gradient-to-r from-gold-600/50 to-gold-400/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card Body with Golden Gradient Background */}
              <div className="relative bg-gradient-to-b from-midnight-900/60 to-midnight-800/40 group-hover:from-gold-950/20 group-hover:to-gold-900/10 backdrop-blur-xl border border-white/5 group-hover:border-gold-500/30 p-8 rounded-2xl h-full flex flex-col justify-between overflow-hidden transition-all duration-500">
                
                {/* Internal, Subtle Corner Gradient */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-gradient-to-br from-gold-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div>
                  <div className={`mb-6 inline-flex p-3 rounded-lg border ${item.color === 'gold' ? 'border-gold-500/30 bg-gold-500/10 text-gold-400' : 'border-blue-500/20 bg-blue-500/5 text-blue-400'}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-2">
                    The Problem
                  </h3>
                  <p className="text-xl text-white font-medium mb-6">
                    "{item.problem}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 group-hover:border-gold-500/10 transition-colors duration-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-400 leading-relaxed font-light">
                      <span className="text-white font-normal">Our Solution:</span> {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;