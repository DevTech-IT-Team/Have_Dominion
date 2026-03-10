import React from 'react'
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-navy-900 text-gray-300 pt-16 pb-8 relative overflow-hidden border-t border-gold-500/20">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-navy-700/20 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400">
              Have Dominion
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Empowering individuals through comprehensive education and professional development services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/in/lthd3/" className="text-gray-500 hover:text-gold-400 transition-colors transform hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gold-400 mb-5 pb-2 border-b border-gold-500/20">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Services
              </Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-lg font-semibold text-gold-400 mb-5 pb-2 border-b border-gold-500/20">Institutional</h4>
            <ul className="space-y-3">
              <li><Link to="/legal" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Legal
              </Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link></li>
              <li><Link to="/education" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Education
              </Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Privacy Policy
              </Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-gold-400 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Terms of Service
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold text-gold-400 mb-5 pb-2 border-b border-gold-500/20">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-navy-800/50 rounded-lg shadow-sm border border-gold-500/20">
                    <Mail size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gold-300">Email</h5>
                    <a href="mailto:lthd@letthemhavedominion.org" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                      lthd@letthemhavedominion.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-navy-800/50 rounded-lg shadow-sm border border-gold-500/20">
                    <Phone size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gold-300">Phone</h5>
                    <a href="tel:(888) 343-4106" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">
                      (888) 343-4106
                    </a>
                    <p className="text-gray-500 text-xs mt-1">Fax: ( 888) 338-4166</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-navy-800/50 rounded-lg shadow-sm border border-gold-500/20">
                  <MapPin size={18} className="text-gold-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gold-300">Location</h5>
                  <address className="text-gray-400 not-italic text-sm">
                    <p className="font-medium text-gold-300">Have Dominion</p>
                    <p>1700 Seventh Avenue</p>
                    <p>Suite 2100-2029</p>
                    <p>Seattle, Washington 98101</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gold-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Have Dominion. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gold-400 text-sm transition-colors hover:underline">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-gold-400 text-sm transition-colors hover:underline">Terms of Service</Link>
              <a href="#" className="text-gray-500 hover:text-gold-400 text-sm transition-colors hover:underline">Sitemap</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-4 border-t border-gold-500/5">
            <p className="text-gray-500 text-xs">
              Empowering excellence and dominion through education and professional development
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}