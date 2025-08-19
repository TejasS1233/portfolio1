import React, { useEffect, useRef, useState } from 'react';
import { Code, Smartphone, Laptop, Database, Wrench, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  technologies: string[];
  delay?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, technologies, delay = '0s' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: parseFloat(delay || '0'), ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
      data-testid={`card-skill-${title.toLowerCase().replace(' ', '-')}`}
    >
      <motion.div 
        className="text-3xl mb-4"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-heading font-semibold mb-4">{title}</h3>
      <div className="space-y-2 text-muted-foreground">
        {technologies.map((tech, index) => (
          <motion.div 
            key={index} 
            className={index === 0 ? "font-mono text-sm" : "text-sm"}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: parseFloat(delay || '0') + index * 0.1 }}
          >
            {tech}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: <Code className="text-blue-500" />,
      title: "Web Development",
      technologies: [
        "MERN Stack",
        "MongoDB • Express.js • React.js • Node.js",
        "HTML • CSS • Tailwind CSS"
      ]
    },
    {
      icon: <Smartphone className="text-green-500" />,
      title: "Mobile Development",
      technologies: [
        "Flutter",
        "Android Studio",
        "Cross-platform Development"
      ]
    },
    {
      icon: <Laptop className="text-purple-500" />,
      title: "Programming Languages",
      technologies: [
        "C • Java • Python",
        "JavaScript",
        "Object-Oriented Programming"
      ]
    },
    {
      icon: <Database className="text-orange-500" />,
      title: "Database",
      technologies: [
        "MySQL",
        "MongoDB",
        "Database Design & Management"
      ]
    },
    {
      icon: <Wrench className="text-red-500" />,
      title: "Tools & Platforms",
      technologies: [
        "Git • GitHub",
        "Postman • VS Code",
        "Firebase • Cloudinary"
      ]
    },
    {
      icon: <Brain className="text-pink-500" />,
      title: "Core Concepts",
      technologies: [
        "Data Structures & Algorithms",
        "REST APIs",
        "Software Architecture"
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="flex items-center justify-center px-6 py-12 scroll-snap-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-8"
        >
          Technical Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              technologies={skill.technologies}
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
