import { Link } from 'react-router-dom';
import { GraduationCap, CreditCard, ShieldCheck, TrendingUp, Zap, ArrowRight, Play, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1703411493933-59323ee153bc?q=80&w=906&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 lg:pt-24">
        {/* Banner Strip - After Navbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-1"
        >
          {/* Now Accepting New Members */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-electric/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors cursor-pointer group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-electric"></span>
            </span>
            <span className="text-base text-electric font-medium">Now Accepting New Members</span>
            <ArrowRight className="h-4 w-4 text-electric group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Educational Tutorials Banner */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <span className="text-base text-blue-100 font-medium">
              Expert Education Hub — Launching Soon
            </span>
            <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] max-w-4xl mx-auto">
          {/* Left Content - Now Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center"
          >

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-center"
              >
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  Your Credit Score Doesn't Define You.
                </span>
                <br />
                <span className="text-amber-100">
                  Your Next Move Does.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white leading-relaxed max-w-2xl text-center mx-auto"
              >
                Join the elite tradeline marketplace where buyers build credit and sellers earn passive income. Premium education meets real results.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => window.location.href = '/tradelines'}
                className="group relative inline-flex items-center justify-center gap-3 bg-electric hover:bg-electric-light text-obsidian font-bold py-4 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(0,212,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
              >
                <CreditCard className="h-5 w-5" />
                <span>Get Tradelines</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                to="/tradelines"
                className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-electric/50 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <CreditCard className="h-5 w-5" />
                <span>Explore Tradelines</span>
              </Link>
              
              <Link
                to="/lessons"
                className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-electric/50 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
