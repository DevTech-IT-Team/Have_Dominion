import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What exactly is a tradeline?",
      answer: "A tradeline is a credit account that appears on your credit report. When you become an authorized user on someone else's established credit card, that account's history gets added to your credit report — potentially boosting your score with their positive payment history and low utilization."
    },
    {
      question: "Is this legal?",
      answer: "Yes, authorized user tradelines are completely legal. Credit card companies specifically allow cardholders to add authorized users. It's a common practice used by parents helping children build credit, spouses sharing accounts, and now — through marketplaces like ours — by individuals seeking credit improvement."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most members see their tradeline post within 30-45 days after purchase. Once it posts, you should see the impact on your credit score within one billing cycle. The exact timing depends on when the credit card company reports to the bureaus."
    },
    {
      question: "What if the tradeline doesn't post?",
      answer: "You're protected by our 100% posting guarantee. If your tradeline doesn't post as promised, you get a full refund. No questions, no hassle. We hold your payment in escrow until posting is confirmed, so there's zero risk to you."
    },
    {
      question: "Do I get a physical card?",
      answer: "No, and you don't need one. As an authorized user, the tradeline appears on your credit report — that's what matters for your score. The primary cardholder keeps the physical card; you simply benefit from their good credit history appearing on your report."
    },
    {
      question: "Why do I need to pay for membership?",
      answer: "The $49.99/month membership keeps our community quality high. It filters out non-serious buyers and gives you access to verified, premium tradelines you won't find on public marketplaces. Think of it like a Costco membership — small fee, big savings and better quality inside."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-midnight-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.pinimg.com/1200x/95/71/78/957178246e967ca1db09e5475168523c.jpg')"
        }}
      ></div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-midnight-900/80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-electric/10 border border-electric/20 rounded-full text-electric text-sm font-medium mb-4">
            Common Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-gold-400">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know, explained in plain English.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-midnight-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-gold-400" />
                  </div>
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
