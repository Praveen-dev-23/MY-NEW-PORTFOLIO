import { motion } from 'framer-motion';

const skills = [
  "REACT", "JAVASCRIPT", "PYTHON", "NODE.JS", 
  "EXPRESS", "MYSQL", "MONGODB", "GIT", 
  "GEMINI AI", "FLASK", "TAILWIND CSS", "FRAMER MOTION"
];

const Skills = () => {
  return (
    <section className="w-full py-32 bg-[var(--color-dark)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-1/3">
          <motion.h2 
            className="font-sans font-medium text-3xl md:text-5xl tracking-tighter uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h2>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-10">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="hover-target"
              >
                <span className="font-sans text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px var(--color-light)' }}>
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Marquee effect for skills */}
      <div className="w-full mt-32 py-10 border-y border-gray-800 flex overflow-hidden relative">
        <motion.div 
          className="flex whitespace-nowrap gap-12 font-mono text-sm tracking-widest text-gray-500 uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {/* Duplicate skills list to create a seamless loop */}
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
