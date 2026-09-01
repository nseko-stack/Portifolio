import { useState } from 'react';
import certificateImg from '../src/assets/certificate(2).jpg'; // Path to the certificate image

function Certificates() {
    // State to track if the modal is open and which image to show
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="Certificates" className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900">Certifications</h2>
                <p className="mt-4 text-lg text-gray-600">Here are some of the certifications I have earned to enhance my skills and knowledge.</p>
                
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition duration-300 hover:shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900">Software Development</h3>

                        <img src={certificateImg} alt="Software Development Certificate" className="mt-4 w-full rounded-lg" />
                        
                        {/* Click handler added to open the modal */}
                        <button 
                            onClick={() => setIsOpen(true)}
                            className="mt-10 px-5 py-2.5 rounded-md bg-sky-800 text-white font-medium tracking-wide shadow-sm transition-colors duration-200 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer"
                        >
                            View Full Certificate
                        </button>

                        <p className="mt-2 text-gray-600">Earned from DTP ICT CHAMBER, covering front-end and back-end development.</p>
                    </div>                    
                </div>
            </div>

            {/* Interactive Lightbox / Modal overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
                    onClick={() => setIsOpen(false)} // Closes when clicking the background overlay
                >
                    <div className="relative max-w-3xl w-full bg-white rounded-xl p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {/* Close button inside modal */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-12 right-0 text-white text-sm bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-full transition-colors"
                        >
                            ✕ Close
                        </button>
                        
                        {/* Large viewed image */}
                        <img 
                            src={certificateImg} 
                            alt="Software Development Certificate Full View" 
                            className="w-full max-h-[80vh] object-contain rounded-lg" 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Certificates;
