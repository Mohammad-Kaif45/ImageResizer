import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, ImageIcon, Home, Layers, Info, Edit } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors">
                <ImageIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                DevResizer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive('/') 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-blue-500 dark:text-blue-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/10'
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link 
                to="/features" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive('/features') 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-blue-500 dark:text-blue-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/10'
                }`}
              >
                <Layers className="w-5 h-5 mr-2" />
                Features
              </Link>
              <Link 
                to="/editor" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive('/editor') 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-blue-500 dark:text-blue-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/10'
                }`}
              >
                <Edit className="w-5 h-5 mr-2" />
                Editor
              </Link>
              <Link 
                to="/about" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive('/about') 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-blue-500 dark:text-blue-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/10'
                }`}
              >
                <Info className="w-5 h-5 mr-2" />
                About
              </Link>
            </div>
          </div>

          {/* Settings and Mobile Menu */}
          <div className="flex items-center">
            <Link
              to="/settings"
              className={`p-2 rounded-md text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/10 transition-colors ${
                isActive('/settings') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
              }`}
              aria-label="Settings"
            >
              <Settings className="h-6 w-6" />
            </Link>
            <div className="md:hidden ml-3">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/10 transition-colors"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link 
              to="/features" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/features') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Layers className="w-5 h-5 mr-3" />
              Features
            </Link>
            <Link 
              to="/editor" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/editor') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Edit className="w-5 h-5 mr-3" />
              Editor
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="w-5 h-5 mr-3" />
              About
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/settings') 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 