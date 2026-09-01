import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
      <div className="max-w-[1400px] w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-sm md:text-base tracking-widest text-[var(--color-accent)] mb-4 md:mb-8 uppercase"
        >
          IT Student / Developer
        </motion.div>
        
        <h1 className="font-sans font-medium text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter uppercase mb-8 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            M. Praveen
          </motion.span>
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12"
        >
          <p className="max-w-md font-sans text-xl md:text-2xl leading-tight text-gray-400">
            I build software, AI systems & digital experiences.
          </p>
          
          <a 
            href="#work" 
            className="group relative inline-flex items-center gap-4 text-sm font-mono tracking-widest uppercase pb-2 overflow-hidden hover-target"
          >
            <span className="relative z-10">Explore Projects</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-light)] transform origin-right transition-transform duration-300 group-hover:scale-x-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-light)] transform scale-x-0 origin-left transition-transform duration-300 delay-100 group-hover:scale-x-100"></div>
            <svg 
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gray-700 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-gray-300 absolute top-0"
            animate={{ y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
        <span className="font-mono text-xs tracking-widest text-gray-500 -rotate-90 origin-left translate-y-6 translate-x-2">SCROLL</span>
      </motion.div>
    </section>
  );
};

export default Hero;
