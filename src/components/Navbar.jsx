import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-[var(--color-light)]"
    >
      <div className="font-sans font-bold text-lg tracking-tighter hover:opacity-70 transition-opacity uppercase">
        <a href="#hero">Praveen</a>
      </div>
      
      <div className="flex gap-6 md:gap-10 font-mono text-xs tracking-widest">
        <a href="#work" className="hover:opacity-70 transition-opacity">WORK</a>
        <a href="#about" className="hover:opacity-70 transition-opacity">ABOUT</a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">CONTACT</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
