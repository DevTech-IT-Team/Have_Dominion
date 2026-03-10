import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function Contact() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    service: location.state?.service || '',
    message: '',
  });

  useEffect(() => {
    if (location.state?.service) {
      setFormData(prev => ({ ...prev, service: location.state.service }));
    }
  }, [location.state]);

  const services = [
    'Private Membership',
    'Financial Coaching', 
    'Credit Tradelines',
    'Document Management',
    'Security Services',
    'General Inquiry'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
      });

      const result = response.data;
      
      if (result.success) {
        if (user && formData.service) {
          const serviceRequests = JSON.parse(localStorage.getItem(`serviceRequests_${user.email}`) || '[]');
          const newRequest = {
            service: formData.service,
            status: 'pending',
            date: new Date().toISOString()
          };
          
          const existingIndex = serviceRequests.findIndex(r => r.service === formData.service);
          if (existingIndex >= 0) {
            serviceRequests[existingIndex] = newRequest;
          } else {
            serviceRequests.push(newRequest);
          }
          
          localStorage.setItem(`serviceRequests_${user.email}`, JSON.stringify(serviceRequests));
        }
        
        alert('Message sent successfully! Your service request has been recorded.');
        setFormData({ name: user?.name || '', email: user?.email || '', service: '', message: '' });
        
        if (user) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      } else {
        alert(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error sending message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-obsidian via-midnight-900 to-obsidian">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-electric/20"
        >
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-royal-900 to-midnight-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-electric/30"
            >
              <svg 
                className="w-8 h-8 text-electric" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-400 text-lg">
              Have a question or want to work together? Send us a message!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-300 mb-3 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Name</span>
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-midnight-900/50 text-white border border-gray-600 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all duration-300 placeholder:text-gray-500"
                placeholder="Enter your name"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-300 mb-3 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-midnight-900/50 text-white border border-gray-600 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all duration-300 placeholder:text-gray-500"
                placeholder="Enter your email address"
              />
            </motion.div>

            {/* Service Selection Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-gray-300 mb-3 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Service Interest</span>
                </div>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-midnight-900/50 text-white border border-gray-600 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all duration-300"
              >
                <option value="" className="bg-midnight-800">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service} className="bg-midnight-800">
                    {service}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-300 mb-3 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Message</span>
                </div>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-6 py-4 rounded-xl bg-midnight-900/50 text-white border border-gray-600 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all duration-300 placeholder:text-gray-500 resize-none"
                placeholder="Write your message here..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                className="w-full py-4 text-lg font-bold text-obsidian rounded-xl transition-all duration-300 bg-electric hover:bg-electric-dark focus:outline-none focus:ring-4 focus:ring-electric/30 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-electric/25 flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </button>
            </motion.div>
          </form>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            We typically respond within 24 hours
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
