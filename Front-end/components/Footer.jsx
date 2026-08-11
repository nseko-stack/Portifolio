function Footer() {
    const socialLinks = [
    
        {
            href: "https://wa.me/250782543693",
            label: "WhatsApp",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.005 5.219 5.321 0 11.834 0c3.153.001 6.119 1.23 8.351 3.463 2.231 2.233 3.458 5.201 3.457 8.357-.005 6.615-5.322 11.835-11.836 11.835-2.01 0-3.98-.511-5.73-1.483L0 24zm6.49-3.445l.394.234c1.51.896 3.243 1.369 5.013 1.37h.007c5.446 0 9.877-4.28 9.882-9.542.002-2.548-.981-4.945-2.771-6.737C17.222 4.088 14.832 3.1 11.835 3.1c-5.449 0-9.88 4.281-9.885 9.543-.001 1.831.474 3.623 1.378 5.185l.256.444-1.01 3.687 3.773-.974zm11.196-4.636c-.302-.152-1.791-.884-2.068-.985-.278-.101-.48-.152-.681.152-.202.303-.781.985-.957 1.187-.176.202-.353.227-.655.076-1.219-.61-2.399-1.547-3.322-2.477-.923-.93-1.432-2.065-1.921-3.213-.176-.303-.019-.467.132-.618.136-.136.303-.354.454-.531.151-.177.202-.303.303-.505.101-.202.051-.379-.025-.531-.076-.152-.681-1.643-.933-2.25-.246-.59-.516-.51-.681-.519-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.807.379-.277.303-1.059 1.036-1.059 2.527 0 1.491 1.084 2.932 1.235 3.134.151.202 2.133 3.256 5.166 4.564.721.311 1.284.497 1.722.636.724.23 1.383.197 1.904.12.58-.087 1.791-.733 2.043-1.44.252-.707.252-1.314.176-1.44-.075-.126-.277-.202-.579-.354z"/>
                </svg>

            ),
        },
        {
            href: "https://www.instagram.com/nseko_hugue_gain?igsh=cTAzeHFhMnQwcW9t",
            label: "Instagram",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.2-3.5a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center text-sm text-slate-500 sm:px-8">
                <h5 className="font-semibold text-slate-950">NSEKO GAIN Hugue</h5>
                <p className="max-w-2xl text-slate-600">
                    Frontend, Backend & IT Student passionate about building secure and scalable web applications.
                </p>

                <h3 className="font-semibold text-slate-950">Quick Links</h3>

                <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    <a href="#Home" className="text-slate-600 transition hover:text-slate-900">Home |</a>
                    <a href="#About" className="text-slate-600 transition hover:text-slate-900">About |</a>
                    <a href="#Projects" className="text-slate-600 transition hover:text-slate-900">Projects |</a>
                    <a href="#Skills" className="text-slate-600 transition hover:text-slate-900">Skills |</a>
                    <a href="#Contact" className="text-slate-600 transition hover:text-slate-900">Contact |</a>
                    
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <a href="https://github.com/nseko-stack" target="_blank" rel="noopener noreferrer" className="text-slate-600 transition hover:text-slate-900">GitHub</a>

                    </div>
                </nav>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
                <p>Kigali-Nyarugenge-Rwanda</p>
                <a href="mailto:nsekohygue@gmail.com" className="text-slate-600 hover:text-slate-900">
                    nsekohygue@gmail.com
                </a>
                <p className="text-slate-500">&copy; 2026 NSEKO GAIN Hugue. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;