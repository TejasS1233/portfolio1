import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Award {
  id: string;
  emoji: string;
  title: string;
  achievement: string;
  details: string;
  delay?: string;
}

const awards: Award[] = [
  {
    id: 'innovatex',
    emoji: '🥉',
    title: 'Innovatex Hackathon',
    achievement: '3rd Place',
    details: 'Among 65+ teams • July 2025'
  },
  {
    id: 'minithon',
    emoji: '🏆',
    title: 'MINITHON Hackathon',
    achievement: 'Top 8 Finalist',
    details: 'September 2024'
  }
];

const AwardCard: React.FC<{ award: Award; isVisible: boolean }> = ({ award, isVisible }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
    transition={{ duration: 0.6, delay: parseFloat(award.delay || '0'), ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
    data-testid={`card-award-${award.id}`}
  >
    <motion.div 
      className="text-4xl mb-4"
      whileHover={{ rotate: 15, scale: 1.2 }}
      transition={{ duration: 0.2 }}
    >
      {award.emoji}
    </motion.div>
    <h3 className="text-xl font-heading font-semibold mb-4">{award.title}</h3>
    <motion.p 
      className="text-muted-foreground mb-2"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: parseFloat(award.delay || '0') + 0.2 }}
    >
      {award.achievement}
    </motion.p>
    <motion.p 
      className="text-sm text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: parseFloat(award.delay || '0') + 0.3 }}
    >
      {award.details}
    </motion.p>
  </motion.div>
);

export const AwardsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-8 scroll-snap-section">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-heading font-bold mb-8"
        >
          Awards & Recognition
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <AwardCard
              key={award.id}
              award={{ ...award, delay: `${index * 0.2}s` }}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
