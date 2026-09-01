import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Projects from './components/Projects';
import PosterGallery from './components/PosterGallery';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  // Ensure smooth scroll is applied
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-[#050505] text-[#f4f4f5] min-h-screen selection:bg-white selection:text-black">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <PosterGallery />
        <About />
        <Skills />
        <Education />
      </main>
      <Contact />
    </div>
  );
}

export default App;
