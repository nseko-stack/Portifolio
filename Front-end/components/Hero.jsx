import heroImage from '../src/assets/Image1.png';

function Hero() {
    return (
        <section id="Home" className="bg-slate-50 px-3 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 rounded-[1.5rem] bg-white px-4 py-8 shadow-xl ring-1 ring-slate-200 sm:gap-10 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:py-12">
                
                <div className="w-full max-w-2xl space-y-5 text-center lg:text-left">
                    <p className="text-sm font-semibold tracking-[0.3em] text-slate-500">Hi, I'm</p>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                        NSEKO GAIN Hugue
                    </h1>
                    <h2 className="text-lg font-semibold text-slate-700 sm:text-xl">Frontend, Backend & IT Student</h2>
                    <p className="mx-auto max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
                        I build secure, scalable Web & Mobile Applications.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                        <a href="#Projects" className="inline-flex items-center justify-center rounded-full bg-slate-200 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-500">
                            View my Projects
                        </a>
                        <a href="#Contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                            Contact Me
                        </a>
                    </div>
                </div>

                <div className="flex w-full max-w-md justify-center">
                    <div className="flex aspect-[4/5] w-full max-w-[22rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-2xl ring-1 ring-slate-200 sm:max-w-[24rem] lg:max-w-[28rem]">
                        <img src={heroImage} alt="Hero Image" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;