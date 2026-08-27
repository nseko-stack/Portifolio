import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    // State to handle mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
                
                {/* Left side: Hamburger button for mobile, hidden on desktop */}
                <div className="flex items-center md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        type="button" 
                        className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            // Close icon (X) when menu is open
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger menu icon when menu is closed
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Navigation: Visible on md screens and up, hidden on mobile */}
                <div className="hidden md:flex items-center justify-center gap-6">
                    <a href="#Home" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</a>
                    <a href="#About" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</a>
                    <a href="#Projects" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Projects</a>
                    <a href="#Skills" className="text-slate-600 hover:text-slate-900 font-medium transition-colors font-medium">Skills</a>
                    <a href="#Contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</a>
                </div>

                {/* Always visible Login Action Button */}
                <Link 
                    to="/login" 
                    className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                    Login
                </Link>
            </div>

            {/* Mobile Navigation Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-2 space-y-1 shadow-inner">
                    <a href="#Home" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Home</a>
                    <a href="#About" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">About</a>
                    <a href="#Projects" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Projects</a>
                    <a href="#Skills" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Skills</a>
                    <a href="#Contact" onClick={closeMenu} className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">Contact</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
