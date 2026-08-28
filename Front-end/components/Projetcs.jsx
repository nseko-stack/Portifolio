import project1Image from '../src/assets/ehahiro.png';
import project2Image from '../src/assets/phin-forge.png';


function Projects() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8" id="Projects">
            <div className="rounded-3xl bg-white p-8 shadow-[0_0_40px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200 sm:p-12">
                <h2 className="text-3xl font-bold text-zinc-950">My Projects</h2>
                <p className="mt-2 text-sm text-zinc-600">A selection of work blending modern design with practical solutions.</p>
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <h1 className="text-lg font-semibold text-zinc-950">eHAHIRO</h1>
                        <img src={project1Image} alt="eHAHIRO" className="mt-3 h-48 w-full rounded-xl object-cover" />
                        <p className="mt-3 text-sm leading-6 text-zinc-600">The system that's going to show the price of Crops in real time</p>
                        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:gap-3">
                            <a href="https://github.com/eHAHIRO" className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 hover:text-zinc-950">
                                View Project
                            </a>
                            <a href="https://e-hahiro-frontend-uetq.vercel.app/" className="inline-flex items-center justify-center rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white">
                                View Live Demo
                            </a>
                            
                        </div>
                    </div>
                    {/*<div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <h3 className="text-lg font-semibold text-zinc-950">Website</h3>
                        <img src={project2Image} alt="phin-forge" className="mt-3 h-48 w-full rounded-xl object-cover" />
                        <p className="mt-3 text-sm leading-6 text-zinc-600">A static website for the PHIN FORGE Company Ltd</p>
                        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:gap-3">
                            <a href="https://github.com/phin-forge" className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 hover:text-zinc-950">
                                View Project
                            </a>
                            <a href="https://phin-forge.netlify.app/" className="inline-flex items-center justify-center rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white">
                                View Live Demo
                            </a>
                        </div>
                    </div>*/}
                     
                </div>
            </div>
        </section>
    );
}

export default Projects;