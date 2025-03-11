import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Upload, Image as ImageIcon } from 'lucide-react';
import ImageResizer from './components/ImageResizer';
import ImageEditor from './components/ImageEditor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Features from './components/Features';
import Settings from './components/Settings';

// Home component to separate the main functionality
const Home: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Store the image URL in localStorage so it can be accessed by the editor
      localStorage.setItem('currentImageUrl', url);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Store the image URL in localStorage
      localStorage.setItem('currentImageUrl', url);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span>Social Media Image Resizer</span>
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Upload an image and resize it for different social media platforms
        </p>
      </div>

      {!previewUrl ? (
        <div
          className="max-w-xl mx-auto mt-4 sm:mt-8 p-6 sm:p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-300" />
            <div className="mt-3 sm:mt-4 flex flex-wrap text-sm text-gray-600 dark:text-gray-300 justify-center items-center gap-1">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      ) : (
        <ImageResizer
          imageUrl={previewUrl}
          onReset={() => {
            setPreviewUrl(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            localStorage.removeItem('currentImageUrl');
          }}
        />
      )}
    </div>
  );
};

// Editor component with file upload handling
const EditorWrapper: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    return localStorage.getItem('currentImageUrl') || '/placeholder-image.jpg';
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      localStorage.setItem('currentImageUrl', url);
    }
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <ImageEditor 
        imageUrl={imageUrl || '/placeholder-image.jpg'} 
        onReset={handleReset} 
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/editor" element={<EditorWrapper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;