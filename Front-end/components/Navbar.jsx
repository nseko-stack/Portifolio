import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'



function Navbar() {

    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                    <a href="#Home" className="hover:bg-black-700 underline">Home</a>
                    <a href="#About" className="hover:bg-black-700 underline">About</a>
                    <a href="#Projects" className="hover:bg-black-700 underline">Projects</a>
                    <a href="#Skills" className="hover:bg-black-700 underline">Skills</a>
                    <a href="#Contact" className="hover:bg-black-700 underline">Contact</a>
                </div>

                <Link to="/login" className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300">
                    Login
                </Link>
            </div>
        </nav>

    );

}

export default Navbar;