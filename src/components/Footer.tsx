import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Owner information */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DevResizer</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
              © {currentYear} DevResizer Inc. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> by <span className="font-medium">Mohammad Kaif</span>
            </p>
          </div>
          
          {/* Social media links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 text-center md:text-right">
              Connect with us
            </h4>
            <div className="flex space-x-4 justify-center md:justify-end">
              <a 
                href="https://github.com/Mohammad-Kaif45" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://x.com/kaif_m63682" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/ansari-kaif-0540872aa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Additional footer content */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 md:mb-0">
              <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Contact Us</a>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              Resize and edit images with ease
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 