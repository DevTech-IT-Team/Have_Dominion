import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, Star } from 'lucide-react';

const TrustBar = () => {
  const stats = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: "50+",
      label: "Point Average Boost"
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: "2,000+",
      label: "Active Members"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      value: "100%",
      label: "Posting Guarantee"
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: "4.9/5",
      label: "Member Rating"
    }
  ];

  return (
    <section className="py-8 bg-midnight-900 border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="text-gold-400">
                {stat.icon}
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
