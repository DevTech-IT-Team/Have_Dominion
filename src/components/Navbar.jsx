import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
            Universal-Helper
          </Link>

          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link>
            {/*<Link to="/lessons" className="text-gray-300 hover:text-white transition">Lessons</Link>*/}
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
          </div>

          <button className="hidden md:block btn-login">Login</button>

          <button onClick={toggleMenu} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link to="/" className="block text-gray-300 hover:text-white py-2 transition">Home</Link>
            <Link to="/services" className="block text-gray-300 hover:text-white py-2 transition">Services</Link>
            <Link to="/lessons" className="block text-gray-300 hover:text-white py-2 transition">Lessons</Link>
            <Link to="/about" className="block text-gray-300 hover:text-white py-2 transition">About</Link>
            <Link to="/contact" className="block text-gray-300 hover:text-white py-2 transition">Contact</Link>
            <button className="w-full btn-login mt-2">Login</button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
