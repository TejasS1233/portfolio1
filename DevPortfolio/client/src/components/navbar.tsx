import React from 'react';
import { Moon, Sun, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-heading font-bold cursor-pointer" 
          data-testid="logo-text"
        >
          TS
        </motion.div>
        <div className="flex items-center space-x-6">
          <motion.a 
            href="mailto:tejas.sidhwani@gmail.com" 
            className="hover:text-muted-foreground transition-colors"
            data-testid="link-email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
