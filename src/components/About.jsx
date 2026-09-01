import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const text = "I'm M. Praveen, an Information Technology student and developer interested in building useful software, AI-powered applications and modern digital experiences.";
  const words = text.split(" ");

  const interests = [
    "Web development",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "Software development"
  ];

  return (
    <section id="about" ref={containerRef} className="w-full px-6 md:px-12 py-32 md:py-48 bg-[var(--color-dark)] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-1/3">
          <motion.h2 
            className="font-sans font-medium text-3xl md:text-5xl tracking-tighter uppercase mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About
          </motion.h2>
          
          <motion.div 
            style={{ y }}
            className="hidden md:block w-full h-[1px] bg-gray-800 mt-20"
          ></motion.div>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="font-sans text-3xl md:text-5xl lg:text-6xl leading-[1.2] md:leading-[1.1] tracking-tight mb-20">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] mb-[0.1em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div>
            <motion.h3 
              className="font-mono text-sm tracking-widest text-gray-500 uppercase mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Areas of Interest
            </motion.h3>
            
            <div className="flex flex-col gap-4">
              {interests.map((interest, i) => (
                <motion.div 
                  key={interest}
                  className="group flex items-center gap-6 border-b border-gray-800 pb-4 hover-target cursor-none"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <span className="font-mono text-xs text-gray-600">0{i + 1}</span>
                  <span className="font-sans text-xl md:text-3xl tracking-tight text-gray-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                    {interest}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
