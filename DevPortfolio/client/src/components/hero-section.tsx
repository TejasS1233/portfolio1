import React, { useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 scroll-snap-section">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-heading font-bold mb-6"
        >
          Tejas Sidhwani
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-heading font-medium"
        >
          AI & Full Stack Developer
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Passionate about creating intelligent solutions through code. Specializing in AI, full-stack development, and mobile applications.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex justify-center space-x-6 mt-8"
        >
          <motion.a 
            href="https://github.com/TejasS1233" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-muted-foreground transition-colors"
            data-testid="link-github"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github />
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/tejas-sidhwani-89337a32b" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-muted-foreground transition-colors"
            data-testid="link-linkedin"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
