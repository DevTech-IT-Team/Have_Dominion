import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleLogout = () => {
    logout()
    // logout() already navigates to '/', so we don't need navigate('/') here
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

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isDropdownOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-transparent transition-all duration-300 ${
      isScrolled ? 'py-2 backdrop-blur-md bg-white/80' : 'py-0'
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
              <span className="text-xl font-bold text-[#0A1F44] tracking-tight">
                HAVE DOMINION
              </span>
              <span className="text-xs text-[#0A1F44]/70 tracking-wider">EXCELLENCE & DOMINION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={scrollToTop}
                className="relative text-[#0A1F44]/80 hover:text-[#C9A227] transition-all duration-300 font-semibold tracking-wide group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C9A227] via-[#E0B84C] to-[#F5D36B] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0A1F44]/10"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center hover:bg-[#0A1F44]/5 rounded-lg p-2 transition-colors duration-200"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0A1F44] via-[#0A1F44]/80 to-[#020816] text-white font-bold flex items-center justify-center mr-3 border-2 border-[#C9A227]/50 shadow-lg hover:border-[#C9A227] hover:shadow-[#C9A227]/20 transition-all duration-300">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#0A1F44]">
                      {user.name || user.email}
                    </span>
                    <span className="text-xs text-[#0A1F44]/60">Welcome back!</span>
                  </div>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 w-48 bg-white backdrop-blur-lg rounded-xl shadow-2xl py-2 border border-[#0A1F44]/20 shadow-[#0A1F44]/10"
                    >
                      <Link
                        to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsDropdownOpen(false)
                          scrollToTop()
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#0A1F44] hover:bg-[#0A1F44]/5 hover:text-[#C9A227] flex items-center transition-colors duration-200 rounded-lg mx-1"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLogout()
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#0A1F44] hover:bg-[#0A1F44]/5 hover:text-[#C9A227] flex items-center transition-colors duration-200 rounded-lg mx-1"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                onClick={scrollToTop}
                className="px-5 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 border border-[#0A1F44]/20"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                onClick={scrollToTop}
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#0A1F44] to-[#020816] hover:from-[#020816] hover:to-[#0A1F44] rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 border border-[#C9A227]/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2.5 rounded-xl text-[#0A1F44] hover:text-[#C9A227] hover:bg-[#0A1F44]/5 transition-all duration-300 border border-[#0A1F44]/20 shadow-md"
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
            className="md:hidden bg-white backdrop-blur-lg overflow-hidden border-t border-[#0A1F44]/20"
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
                  className="block px-4 py-3.5 rounded-lg text-base font-semibold text-[#0A1F44] hover:text-[#C9A227] hover:bg-[#0A1F44]/5 transition-all duration-300 mx-1 border border-[#0A1F44]/10 hover:border-[#C9A227]/30"
                >
                  <span className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#E0B84C] mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </span>
                </Link>
              ))}
              
              {user ? (
                <div className="pt-3 border-t border-[#0A1F44]/20 mt-2">
                  <div className="flex items-center px-4 py-3 bg-[#0A1F44]/5 rounded-xl mx-1 border border-[#0A1F44]/10">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0A1F44] via-[#0A1F44]/80 to-[#020816] text-white flex items-center justify-center font-bold border-2 border-[#C9A227]/50 shadow-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-bold text-[#0A1F44]">{user.name || 'User'}</div>
                      <div className="text-sm text-[#0A1F44]/70">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-2">
                    <Link
                      to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => {
                        setIsOpen(false)
                        scrollToTop()
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0A1F44] to-[#020816] hover:from-[#020816] hover:to-[#0A1F44] rounded-lg transition-all duration-300 shadow-md hover:shadow-xl border border-[#C9A227]/50"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                        scrollToTop()
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-[#0A1F44] bg-white hover:bg-[#0A1F44]/5 rounded-lg transition-all duration-300 shadow-md border border-[#0A1F44]/20"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-[#C9A227]/30 mt-2">
                  <div className="space-y-3 px-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        scrollToTop()
                        setIsOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-center text-sm font-semibold text-[#0A1F44] bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 shadow-md border border-[#0A1F44]/20"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => {
                        scrollToTop()
                        setIsOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#0A1F44] to-[#020816] hover:from-[#020816] hover:to-[#0A1F44] rounded-lg transition-all duration-300 shadow-lg border border-[#C9A227]/50 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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