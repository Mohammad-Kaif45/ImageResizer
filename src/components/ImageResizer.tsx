import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Instagram, Twitter, Facebook, Linkedin, Youtube, Info, ChevronDown, ChevronUp, Lock, Unlock, Crop } from 'lucide-react';
import { socialMediaSizes, SocialMediaDimensions } from '../types';

interface ImageResizerProps {
  imageUrl: string;
  onReset: () => void;
}

const IconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
};

// Common aspect ratios
const aspectRatios = [
  { name: "1:1", value: 1 },
  { name: "4:3", value: 4/3 },
  { name: "3:2", value: 3/2 },
  { name: "16:9", value: 16/9 },
  { name: "2:1", value: 2 },
  { name: "Custom", value: 0 }
];

export default function ImageResizer({ imageUrl, onReset }: ImageResizerProps) {
  const [selectedSize, setSelectedSize] = useState<SocialMediaDimensions>(socialMediaSizes[0]);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customWidth, setCustomWidth] = useState<number>(1200);
  const [customHeight, setCustomHeight] = useState<number>(630);
  const [aspectLocked, setAspectLocked] = useState<boolean>(true);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(16/9);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorOptions = ['#ffffff', '#000000', '#f3f4f6', '#e5e7eb', '#d1d5db', '#f9fafb'];

  // Load original image dimensions when image URL changes
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setOriginalDimensions({
        width: img.width,
        height: img.height
      });
    };
  }, [imageUrl]);

  // Toggle options panel on small screens
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const filename = customMode 
      ? `resized-custom-${customWidth}x${customHeight}.png`
      : `resized-${selectedSize.name.toLowerCase().replace(' ', '-')}.png`;
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Handle custom width change with aspect ratio lock
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setCustomWidth(newWidth);
    
    if (aspectLocked && selectedAspectRatio > 0) {
      setCustomHeight(Math.round(newWidth / selectedAspectRatio));
    }
  };

  // Handle custom height change with aspect ratio lock
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setCustomHeight(newHeight);
    
    if (aspectLocked && selectedAspectRatio > 0) {
      setCustomWidth(Math.round(newHeight * selectedAspectRatio));
    }
  };

  // Toggle aspect ratio lock
  const toggleAspectLock = () => {
    setAspectLocked(!aspectLocked);
  };

  // Handle aspect ratio selection
  const handleAspectRatioChange = (ratio: number) => {
    setSelectedAspectRatio(ratio);
    
    if (ratio > 0 && aspectLocked) {
      // Maintain current width and adjust height based on new ratio
      setCustomHeight(Math.round(customWidth / ratio));
    }
  };

  // Switch between preset and custom modes
  const toggleCustomMode = (value: boolean) => {
    setCustomMode(value);
    if (value) {
      // Initialize custom dimensions with current selection or default
      if (selectedSize) {
        setCustomWidth(selectedSize.width);
        setCustomHeight(selectedSize.height);
        setSelectedAspectRatio(selectedSize.width / selectedSize.height);
      }
    } else {
      // When switching back to presets, resize to selected preset
      resizeImage(selectedSize);
    }
  };

  const resizeImage = (size: SocialMediaDimensions) => {
    if (customMode) return;
    
    setSelectedSize(size);
    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      // Set canvas dimensions to match the target size
      canvas.width = size.width;
      canvas.height = size.height;

      // Fill the canvas with the background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect ratios
      const imgRatio = img.width / img.height;
      const targetRatio = size.width / size.height;

      // Calculate dimensions to fit the entire image within the canvas
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > targetRatio) {
        // Image is wider than the target area - fit width and center vertically
        drawWidth = size.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (size.height - drawHeight) / 2;
      } else {
        // Image is taller than the target area - fit height and center horizontally
        drawHeight = size.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (size.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Draw the image centered within the canvas
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      setIsProcessing(false);
    };
  };

  // Resize with custom dimensions
  const resizeCustom = () => {
    if (!customMode) return;
    
    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      // Set canvas dimensions to match custom size
      canvas.width = customWidth;
      canvas.height = customHeight;

      // Fill the canvas with the background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect ratios
      const imgRatio = img.width / img.height;
      const targetRatio = customWidth / customHeight;

      // Calculate dimensions to fit the entire image within the canvas
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > targetRatio) {
        // Image is wider than the target area - fit width and center vertically
        drawWidth = customWidth;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (customHeight - drawHeight) / 2;
      } else {
        // Image is taller than the target area - fit height and center horizontally
        drawHeight = customHeight;
        drawWidth = drawHeight * imgRatio;
        offsetX = (customWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Draw the image centered within the canvas
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      setIsProcessing(false);
    };
  };

  // Re-render when background color changes
  useEffect(() => {
    if (customMode) {
      resizeCustom();
    } else if (selectedSize) {
      resizeImage(selectedSize);
    }
  }, [backgroundColor]);

  // Re-render when custom dimensions change
  useEffect(() => {
    if (customMode) {
      resizeCustom();
    }
  }, [customWidth, customHeight, customMode]);

  // Initial resize when image loads
  useEffect(() => {
    if (customMode) {
      resizeCustom();
    } else {
      resizeImage(selectedSize);
    }
  }, [imageUrl]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* Mobile Options Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleOptions}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {showOptions ? 'Hide Options' : 'Show Options'}
          </span>
          {showOptions ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Left Column - Options */}
        <div className={`${showOptions ? 'block' : 'hidden'} md:block md:w-1/3 space-y-6 mb-6 md:mb-0`}>
          {/* Mode Selector */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2 mb-2">
              <button
                onClick={() => toggleCustomMode(false)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                  !customMode 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Presets
              </button>
              <button
                onClick={() => toggleCustomMode(true)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                  customMode 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {!customMode ? (
            // Preset Sizes
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Platform Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
                {socialMediaSizes.map((size) => {
                  const Icon = IconMap[size.icon];
                  return (
                    <button
                      key={size.name}
                      onClick={() => resizeImage(size)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                        selectedSize.name === size.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">{size.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto whitespace-nowrap">
                        {size.width}×{size.height}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Custom Dimensions
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Dimensions</h3>
              
              {/* Aspect Ratio Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.name}
                      onClick={() => handleAspectRatioChange(ratio.value)}
                      className={`py-1.5 px-2 text-sm rounded-md ${
                        selectedAspectRatio === ratio.value
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {ratio.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Width and Height Inputs */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    id="width"
                    min="50"
                    max="4000"
                    value={customWidth}
                    onChange={handleWidthChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <button 
                    onClick={toggleAspectLock}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
                  >
                    {aspectLocked ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <Unlock className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    id="height"
                    min="50"
                    max="4000"
                    value={customHeight}
                    onChange={handleHeightChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <button
                onClick={resizeCustom}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Crop className="w-4 h-4 mr-2" />
                Apply Dimensions
              </button>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Background Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(color => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className={`w-8 h-8 rounded-md border ${
                    color === backgroundColor 
                      ? 'ring-2 ring-blue-500 border-blue-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Set background color to ${color}`}
                />
              ))}
              <div className="flex items-center">
                <input 
                  type="color" 
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-8 h-8 rounded-md cursor-pointer"
                  aria-label="Custom color picker"
                />
              </div>
            </div>
          </div>

          {originalDimensions && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-1 flex-shrink-0" />
                Original Image Info
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dimensions: {originalDimensions.width} × {originalDimensions.height} px
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Aspect Ratio: {(originalDimensions.width / originalDimensions.height).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {customMode 
                ? `Preview (${customWidth}×${customHeight})` 
                : `Preview (${selectedSize.width}×${selectedSize.height})`
              }
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onReset}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Upload New</span>
                <span className="sm:hidden">New</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          </div>

          <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            <div className="flex items-center justify-center p-2">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded shadow-sm"
                style={{
                  maxHeight: '60vh',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">How This Works</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              {customMode 
                ? "Custom mode allows you to specify exact dimensions and aspect ratios. Lock the aspect ratio to maintain proportions when changing width or height. The image will be centered and scaled to fit within your specified dimensions."
                : "Select a platform size to automatically resize your image to the optimal dimensions. The image will be centered and scaled to fit within the target dimensions while preserving its aspect ratio."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}