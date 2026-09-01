import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: '01',
    title: 'ADEPTICODE',
    description: 'AI-powered adaptive learning platform using BKT, Hybrid-BKT and Gemini AI.',
    tags: ['React', 'Python', 'Gemini AI', 'Tailwind CSS'],
    color: 'bg-zinc-800'
  },
  {
    id: '02',
    title: 'AI VOICE DETECTOR',
    description: 'AI-powered audio diagnostics and voice analysis system.',
    tags: ['Python', 'TensorFlow', 'Librosa', 'Flask'],
    color: 'bg-zinc-900'
  },
  {
    id: '03',
    title: 'MEDICINE REMINDER',
    description: 'Android application for managing medicine reminders and notifications.',
    tags: ['Java', 'Android Studio', 'SQLite', 'Firebase'],
    color: 'bg-zinc-800'
  },
  {
    id: '04',
    title: '3D HOUSE BUILDER',
    description: 'A web application that transforms 2D house blueprints into interactive 3D models.',
    tags: ['Three.js', 'React', 'WebGL', 'Node.js'],
    color: 'bg-zinc-900'
  },
  {
    id: '05',
    title: 'BANK STATEMENT ANALYZER',
    description: 'Application that analyzes financial statements and separates transactions into categories.',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'React'],
    color: 'bg-zinc-800'
  }
];

const ProjectItem = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12 py-20 border-b border-gray-800 group hover-target"
    >
      <div className="w-full md:w-1/2 flex flex-col z-10">
        <motion.span 
          className="font-mono text-2xl md:text-4xl text-gray-500 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {project.id} —
        </motion.span>
        
        <motion.h3 
          className="font-sans font-medium text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase mb-6 leading-[0.9]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="font-sans text-lg md:text-xl text-gray-400 mb-10 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-xs tracking-widest px-4 py-2 border border-gray-700 rounded-full uppercase">
              {tag}
            </span>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center gap-4 text-sm font-mono tracking-widest uppercase hover:text-gray-300 transition-colors">
            View Project
            <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden bg-zinc-900">
        <motion.div 
          style={{ y }}
          className={`absolute inset-0 ${project.color} flex items-center justify-center`}
        >
          {/* Placeholder for project image */}
          <span className="font-mono text-gray-700 tracking-widest uppercase text-sm">Preview</span>
        </motion.div>
        
        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="work" className="w-full px-6 md:px-12 py-32 bg-[var(--color-dark)] relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          className="font-sans font-medium text-3xl md:text-5xl tracking-tighter uppercase mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Selected Work
        </motion.h2>
        
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
