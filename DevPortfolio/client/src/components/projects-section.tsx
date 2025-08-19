import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  technologies: string[];
  githubUrl: string;
  imageAlt: string;
}

const projects: Project[] = [
  {
    id: 'threadify',
    title: 'Threadify',
    description: 'Real-time threaded discussions with replies, image sharing, and user avatars. Built with modern web technologies for seamless communication experiences.',
    category: 'Real-time Chat Application',
    categoryColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    technologies: ['React', 'TailwindCSS', 'Socket.IO', 'Express.js', 'MongoDB', 'Firebase'],
    githubUrl: 'https://github.com/TejasS1233/Threadify',
    imageAlt: 'Threadify chat application interface'
  },
  {
    id: 'papersprint',
    title: 'PaperSprint',
    description: 'A 15-minute document print-and-delivery platform prototype where users can upload, preview, and customize documents with real-time processing.',
    category: 'Hackathon Winner',
    categoryColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/rakheOmar/print-sprint-2.0',
    imageAlt: 'PaperSprint document processing interface'
  },
  {
    id: 'student-dashboard',
    title: 'Student Dashboard',
    description: 'Full-stack dashboard built during MINITHON to manage student tasks, assignments, and schedules. Features user authentication and academic tracking.',
    category: 'Full-Stack Dashboard',
    categoryColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    githubUrl: 'https://github.com/TejasS1233/MINITHON-hackathon-project',
    imageAlt: 'Student dashboard interface'
  },
  {
    id: 'csv-generator',
    title: 'CSV File Generator',
    description: 'Web scraping tool built using BeautifulSoup, Pandas, and Requests, integrated with Streamlit to generate downloadable CSV files from web data.',
    category: 'Web Scraping Tool',
    categoryColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    technologies: ['Python', 'BeautifulSoup', 'Pandas', 'Streamlit'],
    githubUrl: 'https://github.com/TejasS1233/CSV-file-generator-Bs4',
    imageAlt: 'CSV generator tool interface'
  }
];

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isReversed = false }) => {
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center px-6 py-12 scroll-snap-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div 
            className={`${isReversed ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl aspect-video flex items-center justify-center border border-border hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-center" data-testid={`placeholder-${project.id}`}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                </motion.div>
                <p className="text-muted-foreground text-sm">
                  Project Screenshot Placeholder
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  {project.imageAlt}
                </p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className={`${isReversed ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -50 : 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className={`${project.categoryColor} mb-4`} data-testid={`badge-category-${project.id}`}>
                {project.category}
              </Badge>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-5" data-testid={`title-${project.id}`}>
              {project.title}
            </h3>
            <p className="text-lg text-muted-foreground mb-7" data-testid={`description-${project.id}`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="font-mono cursor-pointer"
                    data-testid={`tech-${project.id}-${tech.toLowerCase()}`}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <motion.a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-foreground hover:text-muted-foreground transition-colors"
              data-testid={`link-github-${project.id}`}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects-container">
      <div ref={headerRef} className="text-center py-4 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-heading font-bold mb-8"
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A collection of projects showcasing my expertise in full-stack development, AI, and mobile applications.
        </motion.p>
      </div>

      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          isReversed={index % 2 !== 0}
        />
      ))}
    </section>
  );
};
