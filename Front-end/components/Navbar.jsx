import React from 'react'

function Navbar() {
    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 sm:px-8 sm:py-4 sm:gap-6">
                <a href="#Home" className="hover:bg-black-700 underline">Home</a>
                 <a href="#About" className="hover:bg-black-700 underline">About</a>
                 <a href="#Projects" className="hover:bg-black-700 underline">Projects</a>
                 <a href="#Skills" className="hover:bg-black-700 underline">Skills</a>
                 <a href="#Contact" className="hover:bg-black-700 underline">Contact</a>
            </div>
        </nav>

    );

}

export default Navbar;