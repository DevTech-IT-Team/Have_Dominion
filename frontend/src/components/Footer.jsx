import React from 'react'
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 relative overflow-hidden border-t border-[#0A1F44]/10">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#C9A227]/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#0A1F44]/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0A1F44] via-[#0A1F44]/80 to-[#020816]">
              Have Dominion
            </h3>
            <p className="text-[#0A1F44]/60 leading-relaxed">
              Empowering individuals through comprehensive education and professional development services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/in/lthd3/" className="text-[#0A1F44]/50 hover:text-[#C9A227] transition-colors transform hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#0A1F44] mb-5 pb-2 border-b border-[#0A1F44]/10">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </Link></li>
              <li><Link to="/services" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Services
              </Link></li>
              <li><Link to="/about" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </Link></li>
              <li><Link to="/contact" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-lg font-semibold text-[#0A1F44] mb-5 pb-2 border-b border-[#0A1F44]/10">Institutional</h4>
            <ul className="space-y-3">
              <li><Link to="/legal" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Legal
              </Link></li>
              <li><Link to="/contact" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link></li>
              <li><Link to="/education" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Education
              </Link></li>
              <li><Link to="/privacy-policy" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Privacy Policy
              </Link></li>
              <li><Link to="/terms-of-service" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Terms of Service
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold text-[#0A1F44] mb-5 pb-2 border-b border-[#0A1F44]/10">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-[#0A1F44]/5 rounded-lg shadow-sm border border-[#0A1F44]/10">
                    <Mail size={18} className="text-[#0A1F44]" />
                  </div>
                  <div>
                    <h5 className="font-medium text-[#0A1F44]">Email</h5>
                    <a href="mailto:lthd@letthemhavedominion.org" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors text-sm">
                      lthd@letthemhavedominion.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-[#0A1F44]/5 rounded-lg shadow-sm border border-[#0A1F44]/10">
                    <Phone size={18} className="text-[#0A1F44]" />
                  </div>
                  <div>
                    <h5 className="font-medium text-[#0A1F44]">Phone</h5>
                    <a href="tel:(888) 343-4106" className="text-[#0A1F44]/60 hover:text-[#C9A227] transition-colors text-sm">
                      (888) 343-4106
                    </a>
                    <p className="text-[#0A1F44]/40 text-xs mt-1">Fax: ( 888) 338-4166</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-[#0A1F44]/5 rounded-lg shadow-sm border border-[#0A1F44]/10">
                  <MapPin size={18} className="text-[#0A1F44]" />
                </div>
                <div>
                  <h5 className="font-medium text-[#0A1F44]">Location</h5>
                  <address className="text-[#0A1F44]/60 not-italic text-sm">
                    <p className="font-medium">Have Dominion</p>
                    <p>1700 Seventh Avenue</p>
                    <p>Suite 2100-2029</p>
                    <p>Seattle, Washington 98101</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#0A1F44]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#0A1F44]/50 text-sm">
              &copy; {currentYear} Have Dominion. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-[#0A1F44]/50 hover:text-[#C9A227] text-sm transition-colors hover:underline">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-[#0A1F44]/50 hover:text-[#C9A227] text-sm transition-colors hover:underline">Terms of Service</Link>
              <a href="#" className="text-[#0A1F44]/50 hover:text-[#C9A227] text-sm transition-colors hover:underline">Sitemap</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-4 border-t border-[#0A1F44]/5">
            <p className="text-[#0A1F44]/40 text-xs">
              Empowering excellence and dominion through education and professional development
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}