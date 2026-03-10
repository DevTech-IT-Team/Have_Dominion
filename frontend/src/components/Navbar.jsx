import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun, LayoutDashboard, User, ChevronDown } from 'lucide-react';
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
    { name: 'Get Tradelines', path: '/tradelines' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-3 backdrop-blur-xl bg-obsidian/80 border-b border-white/5' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-electric/20 blur-xl rounded-full"></div>
              <img 
                src={logo} 
                alt="HAVE DOMINION Logo" 
                className="relative h-12 w-12 object-contain drop-shadow-lg"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight group-hover:text-electric transition-colors">
                HAVE DOMINION
              </span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase">Excellence & Dominion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={scrollToTop}
                className="relative px-4 py-2 text-sm text-white transition-all duration-300 font-medium tracking-wide group"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.span 
                  layoutId="navHighlight"
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-royal-500 flex items-center justify-center">
                    <span className="text-obsidian font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white">{user.name || user.email}</span>
                  <ChevronDown className={`h-4 w-4 text-white/50 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-midnight-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          onClick={() => { setIsDropdownOpen(false); scrollToTop(); }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span className="text-sm">Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => { setIsDropdownOpen(false); scrollToTop(); }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <div className="h-px bg-white/10 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="px-5 py-2.5 text-sm text-white/70 hover:text-white font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={scrollToTop}
                  className="px-5 py-2.5 text-sm bg-electric hover:bg-electric-light text-obsidian font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric/20 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
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