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
      isScrolled ? 'py-2 backdrop-blur-md bg-blue-50/80' : 'py-0'
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
              <span className="text-xl font-bold text-blue-950 tracking-tight">
                HAVE DOMINION
              </span>
              <span className="text-xs text-blue-900/90 tracking-wider">EXCELLENCE & DOMINION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={scrollToTop}
                className="relative text-blue-800/90 hover:text-blue-600 transition-all duration-300 font-semibold tracking-wide group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-200/50"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center hover:bg-blue-50/50 rounded-lg p-2 transition-colors duration-200"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white font-bold flex items-center justify-center mr-3 border-2 border-blue-300 shadow-lg hover:border-blue-400 hover:shadow-blue-300/30 transition-all duration-300">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-blue-900">
                      {user.name || user.email}
                    </span>
                    <span className="text-xs text-blue-600/70">Welcome back!</span>
                  </div>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 w-48 bg-gradient-to-b from-white to-blue-50 backdrop-blur-lg rounded-xl shadow-2xl py-2 border border-blue-200/50 shadow-blue-100/30"
                    >
                      <Link
                        to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsDropdownOpen(false)
                          scrollToTop()
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-blue-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 flex items-center transition-colors duration-200 rounded-lg mx-1"
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
                        className="w-full text-left px-4 py-2.5 text-sm text-blue-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 flex items-center transition-colors duration-200 rounded-lg mx-1"
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
                className="px-5 py-2 text-sm font-semibold text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-300/30 hover:scale-105 border border-blue-200"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                onClick={scrollToTop}
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-900/30 hover:scale-105 border border-blue-700/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2.5 rounded-xl text-blue-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-blue-200 shadow-md"
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
            className="md:hidden bg-gradient-to-b from-white to-blue-50 backdrop-blur-lg overflow-hidden border-t border-blue-200/50"
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
                  className="block px-4 py-3.5 rounded-lg text-base font-semibold text-blue-800 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 mx-1 border border-blue-100 hover:border-blue-300"
                >
                  <span className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </span>
                </Link>
              ))}
              
              {user ? (
                <div className="pt-3 border-t border-blue-200/50 mt-2">
                  <div className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl mx-1 border border-blue-100">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white flex items-center justify-center font-bold border-2 border-blue-300 shadow-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-bold text-blue-900">{user.name || 'User'}</div>
                      <div className="text-sm text-blue-700/80">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-2">
                    <Link
                      to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => {
                        setIsOpen(false)
                        scrollToTop()
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/30 border border-blue-500"
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
                      className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/30 border border-blue-400"
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
                      className="block w-full px-4 py-3 text-center text-sm font-semibold text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-300 shadow-md border border-blue-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => {
                        scrollToTop()
                        setIsOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-300 shadow-lg border border-blue-400 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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