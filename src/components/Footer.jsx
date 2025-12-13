import React from 'react'
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-blue-50 text-gray-800 pt-16 pb-8 relative overflow-hidden border-t border-blue-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50/50 rounded-full filter blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-50/50 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-950 via-blue-800 to-blue-700">
              Have Dominion
            </h3>
            <p className="text-blue-700/80 leading-relaxed">
              Empowering individuals through comprehensive education and professional development services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-950 mb-5 pb-2 border-b border-blue-200">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Services
              </a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold text-blue-950 mb-5 pb-2 border-b border-blue-200">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-950">Email</h5>
                    <a href="mailto:lthd@letthemhavedominion.org" className="text-blue-700/80 hover:text-blue-600 transition-colors text-sm">
                      lthd@letthemhavedominion.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Phone size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-950">Phone</h5>
                    <a href="tel:1-888-997-3744" className="text-blue-700/80 hover:text-blue-600 transition-colors text-sm">
                      1-888-997-3744
                    </a>
                    <p className="text-blue-600/60 text-xs mt-1">Fax: 1-888-971-3681</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <h5 className="font-medium text-blue-950">Location</h5>
                  <address className="text-blue-700/80 not-italic text-sm">
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

        <div className="pt-8 border-t border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-600/70 text-sm">
              &copy; {currentYear} Have Dominion. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-blue-600/70 hover:text-blue-600 text-sm transition-colors hover:underline">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-blue-600/70 hover:text-blue-600 text-sm transition-colors hover:underline">Terms of Service</Link>
              <a href="#" className="text-blue-600/70 hover:text-blue-600 text-sm transition-colors hover:underline">Sitemap</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-4 border-t border-blue-100">
            <p className="text-blue-600 text-xs">
              Empowering excellence and dominion through education and professional development
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}