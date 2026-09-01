import { motion } from 'framer-motion';

const Education = () => {
  return (
    <section className="w-full px-6 md:px-12 py-32 bg-[var(--color-dark)] border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-1/3">
          <motion.h2 
            className="font-sans font-medium text-3xl md:text-5xl tracking-tighter uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Education
          </motion.h2>
        </div>
        
        <div className="w-full md:w-2/3">
          <motion.div 
            className="flex flex-col md:flex-row justify-between md:items-center py-8 border-b border-gray-800 hover-target cursor-none group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-2 mb-4 md:mb-0">
              <span className="font-mono text-sm tracking-widest text-gray-500">2020 — 2024</span>
              <h3 className="font-sans text-2xl md:text-4xl tracking-tight text-[var(--color-light)] group-hover:pl-4 transition-all duration-300">
                B.Tech — Information Technology
              </h3>
            </div>
            
            <div className="font-mono text-sm text-gray-400 text-left md:text-right max-w-[250px]">
              Kamaraj College of Engineering and Technology
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
