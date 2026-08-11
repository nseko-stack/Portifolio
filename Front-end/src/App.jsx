import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Projects from '../components/Projetcs.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
//import Admin from './Admin.jsx'

function App() {
  return (
    <main className="space-y-24 bg-slate-50 text-slate-950">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      {/* <Admin /> */}
    </main>
  )
}

export default App;
