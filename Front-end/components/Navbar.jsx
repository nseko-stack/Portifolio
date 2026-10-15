import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../public/logo.png';

function Navbar() {
  // State to handle mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-4">
        
        {/* Left Container: Hamburger button & Logo */}
        <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
          {/* Hamburger button for mobile, hidden on desktop */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none md:hidden shrink-0"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              // Close icon (X) when menu is open
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger menu icon when menu is closed
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Flexible Logo wrapper that dynamically resizes down on ultra-small screens */}
          <div className="flex items-center min-w-0">
            <img 
              src={logo} 
              alt="logo" 
              className="h-9 w-auto max-w-[100px] sm:h-12 sm:max-w-[140px] md:h-16 md:max-w-[200px] object-contain object-left shrink" 
            />
          </div>
        </div>

        {/* Desktop Navigation Links: Completely hidden below md layout breakpoint */}
        <div className="hidden md:flex items-center justify-center gap-6 shrink-0">
          <a href="#Home" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</a>
          <a href="#About" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</a>
          <a href="#Projects" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Projects</a>
          <a href="#Skills" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Skills</a>
          <a href="#Certificates" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Certificates</a>
          <a href="#Contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</a>
        </div>

        {/* Right Container: Action Buttons optimized to save space on mobile */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
          {/* Download Resume Button */}
          <a 
            href="/documents/NSEKO GAIN Hugue.pdf" 
            download="Resume.pdf" 
            className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-sky-600 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            {/* Text automatically drops on small screens to maintain layout spacing */}
            <span className="hidden xs:inline">Resume</span>
          </a>

          {/* Login Action Button */}
          <Link 
            to="/login" 
            className="rounded-full bg-sky-600 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-2 space-y-1 shadow-inner">
          <a href="#Home" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Home</a>
          <a href="#About" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">About</a>
          <a href="#Projects" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Projects</a>
          <a href="#Skills" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Skills</a>
          <a href="#Certificates" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Certificates</a>
          <a href="#Contact" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
