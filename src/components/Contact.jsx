import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const links = [
    { name: 'Email', url: 'mailto:praveen@example.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Resume', url: '#' },
  ];

  return (
    <section id="contact" className="w-full px-6 md:px-12 py-32 md:pt-48 md:pb-20 bg-[var(--color-dark)] flex flex-col justify-between min-h-[90vh]">
      <div className="max-w-[1400px] mx-auto w-full flex-grow flex flex-col justify-center">
        <motion.h2 
          className="font-sans font-medium text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter uppercase mb-16 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-gray-500">LET'S BUILD</span>
          <span className="block">SOMETHING</span>
          <span className="block text-gray-500 italic font-light tracking-normal pr-4">INTERESTING.</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-20">
          <motion.div 
            className="flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                className="group flex items-center gap-2 font-mono text-sm md:text-base tracking-widest uppercase hover-target hover:text-gray-400 transition-colors"
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
              >
                {link.name}
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            ))}
          </motion.div>
          
          <motion.div 
            className="font-mono text-xs tracking-widest text-gray-600 uppercase text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            © {new Date().getFullYear()} M. Praveen <br />
            All Rights Reserved
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
