import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleLogout = () => {
    logout()
    navigate('/')
    scrollToTop()
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-transparent transition-all duration-300 ${
      isScrolled ? 'py-2 backdrop-blur-md bg-white/30' : 'py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-4 group">
            <div className="flex-shrink-0 h-24 w-24 flex items-center justify-center rounded-xl p-1.5">
              <img 
                src={logo} 
                alt="HAVE DOMINION Logo" 
                className="h-20 w-20 object-contain drop-shadow-lg"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent tracking-tight">
                HAVE DOMINION
              </span>
              <span className="text-xs text-amber-600/70 tracking-wider">EXCELLENCE & DOMINION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={scrollToTop}
                className="relative text-amber-800/90 hover:text-orange-600 transition-all duration-300 font-semibold tracking-wide group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-200/50"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center group relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-400 text-white font-bold flex items-center justify-center mr-3 border-2 border-amber-300 shadow-lg group-hover:border-amber-400 group-hover:shadow-amber-300/30 transition-all duration-300">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-amber-900">
                    {user.name || user.email}
                  </span>
                  <span className="text-xs text-amber-600/70">Welcome back!</span>
                </div>
                <div className="absolute top-full right-0 mt-3 w-48 bg-gradient-to-b from-white to-amber-50 backdrop-blur-lg rounded-xl shadow-2xl py-2 hidden group-hover:block border border-amber-200/50 shadow-amber-100/30">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-amber-800 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-700 flex items-center transition-colors duration-200 rounded-lg mx-1"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                onClick={scrollToTop}
                className="px-5 py-2 text-sm font-semibold text-amber-700 bg-gradient-to-r from-amber-100 to-orange-50 hover:from-amber-200 hover:to-orange-100 rounded-xl transition-all duration-300 shadow-md hover:shadow-amber-300/30 hover:scale-105 border border-amber-200"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                onClick={scrollToTop}
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 hover:from-amber-600 hover:via-orange-500 hover:to-yellow-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-400/30 hover:scale-105 border border-amber-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2.5 rounded-xl text-amber-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-50 transition-all duration-300 border border-amber-200 shadow-md"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-white to-amber-50 backdrop-blur-lg overflow-hidden border-t border-amber-200/50"
          >
            <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
              
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => {
                    scrollToTop()
                    setIsOpen(false)
                  }}
                  className="block px-4 py-3.5 rounded-lg text-base font-semibold text-amber-800 hover:text-orange-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 mx-1 border border-amber-100 hover:border-amber-300"
                >
                  <span className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </span>
                </Link>
              ))}
              
              {user ? (
                <div className="pt-3 border-t border-amber-200/50 mt-2">
                  <div className="flex items-center px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl mx-1 border border-amber-100">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-400 text-white flex items-center justify-center font-bold border-2 border-amber-300 shadow-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-bold text-amber-900">{user.name || 'User'}</div>
                      <div className="text-sm text-amber-700/80">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                        scrollToTop()
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 hover:from-amber-600 hover:via-orange-500 hover:to-yellow-500 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-400/30"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-amber-200/50 mt-2">
                  <div className="space-y-3 px-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        scrollToTop()
                        setIsOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-center text-sm font-semibold text-amber-700 bg-gradient-to-r from-amber-100 to-orange-50 hover:from-amber-200 hover:to-orange-100 rounded-lg transition-all duration-300 shadow-md border border-amber-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => {
                        scrollToTop()
                        setIsOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 hover:from-amber-600 hover:via-orange-500 hover:to-yellow-500 rounded-lg transition-all duration-300 shadow-lg border border-amber-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}