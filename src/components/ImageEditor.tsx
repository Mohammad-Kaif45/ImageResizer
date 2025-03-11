import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Contrast, 
  Sun, 
  Droplets, 
  Palette, 
  Download, 
  RefreshCw,
  Sliders,
  Check,
  X
} from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onReset: () => void;
}

// Filter presets
const filters = [
  { name: "Normal", class: "", style: {} },
  { name: "Grayscale", class: "", style: { filter: "grayscale(100%)" } },
  { name: "Sepia", class: "", style: { filter: "sepia(100%)" } },
  { name: "Vintage", class: "", style: { filter: "sepia(50%) contrast(110%) brightness(110%) saturate(120%)" } },
  { name: "Cool", class: "", style: { filter: "saturate(80%) hue-rotate(20deg)" } },
  { name: "Warm", class: "", style: { filter: "saturate(120%) hue-rotate(-10deg) brightness(110%)" } },
  { name: "High Contrast", class: "", style: { filter: "contrast(150%)" } },
  { name: "Faded", class: "", style: { filter: "contrast(90%) brightness(110%) saturate(80%)" } }
];

export default function ImageEditor({ imageUrl, onReset }: ImageEditorProps) {
  const [editedImageUrl, setEditedImageUrl] = useState<string>(imageUrl);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [showAdjustments, setShowAdjustments] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Apply edits when any parameter changes
  useEffect(() => {
    applyEdits();
  }, [rotationAngle, flipHorizontal, flipVertical, brightness, contrast, saturation, selectedFilter]);

  // Initialize when image URL changes
  useEffect(() => {
    setEditedImageUrl(imageUrl);
    resetEdits();
  }, [imageUrl]);

  const resetEdits = () => {
    setRotationAngle(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setSelectedFilter(0);
    setShowAdjustments(false);
  };

  const applyEdits = () => {
    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    
    img.onload = () => {
      // Determine canvas size based on rotation
      const usePortrait = (rotationAngle === 90 || rotationAngle === 270);
      const canvasWidth = usePortrait ? img.height : img.width;
      const canvasHeight = usePortrait ? img.width : img.height;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move to center of canvas
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Apply rotation
      ctx.rotate((rotationAngle * Math.PI) / 180);
      
      // Apply flips
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      
      // Draw image centered
      ctx.drawImage(
        img, 
        -img.width / 2, 
        -img.height / 2, 
        img.width, 
        img.height
      );
      
      ctx.restore();
      
      // Apply filters using CSS filters
      const filterStyle = filters[selectedFilter].style;
      if (Object.keys(filterStyle).length > 0) {
        // Get image data to apply CSS-like filters
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Create a temporary image with the canvas content
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.putImageData(imageData, 0, 0);
          
          // Create an image with the filter applied
          const filteredImg = new Image();
          const tempImg = document.createElement('img');
          tempImg.width = canvas.width;
          tempImg.height = canvas.height;
          
          // Apply CSS filters
          let filterString = '';
          if ('filter' in filterStyle) {
            filterString = filterStyle.filter as string;
          }
          
          // Add adjustments to filter string
          filterString += ` brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
          tempImg.style.filter = filterString;
          
          // Draw the filtered image back to the main canvas
          tempImg.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
            
            // Update the edited image URL
            setEditedImageUrl(canvas.toDataURL('image/png'));
            setIsProcessing(false);
          };
          
          tempImg.src = tempCanvas.toDataURL('image/png');
        }
      } else {
        // Just apply adjustments directly
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Create a temporary image with the canvas content
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.putImageData(imageData, 0, 0);
          
          // Create an image with the adjustments applied
          const tempImg = document.createElement('img');
          tempImg.width = canvas.width;
          tempImg.height = canvas.height;
          
          // Apply adjustments
          tempImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
          
          // Draw the adjusted image back to the main canvas
          tempImg.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
            
            // Update the edited image URL
            setEditedImageUrl(canvas.toDataURL('image/png'));
            setIsProcessing(false);
          };
          
          tempImg.src = tempCanvas.toDataURL('image/png');
        }
      }
    };
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `edited-image.png`;
    link.href = editedImageUrl;
    link.click();
  };

  const rotateClockwise = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotationAngle((prev) => (prev - 90 + 360) % 360);
  };

  const toggleHorizontalFlip = () => {
    setFlipHorizontal((prev) => !prev);
  };

  const toggleVerticalFlip = () => {
    setFlipVertical((prev) => !prev);
  };

  const toggleAdjustments = () => {
    setShowAdjustments((prev) => !prev);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Left Column - Controls */}
        <div className="md:w-1/3 space-y-6 mb-6 md:mb-0">
          {/* Transform Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transform</h3>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={rotateCounterClockwise}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Rotate counter-clockwise"
              >
                <RotateCcw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Rotate</span>
              </button>
              <button
                onClick={rotateClockwise}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Rotate clockwise"
              >
                <RotateCw className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Rotate</span>
              </button>
              <button
                onClick={toggleHorizontalFlip}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  flipHorizontal 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-label="Flip horizontally"
              >
                <FlipHorizontal className={`h-5 w-5 ${
                  flipHorizontal 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`} />
                <span className={`text-xs mt-1 ${
                  flipHorizontal 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>Flip H</span>
              </button>
              <button
                onClick={toggleVerticalFlip}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  flipVertical 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-label="Flip vertically"
              >
                <FlipVertical className={`h-5 w-5 ${
                  flipVertical 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`} />
                <span className={`text-xs mt-1 ${
                  flipVertical 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>Flip V</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
            <div className="grid grid-cols-4 gap-2">
              {filters.map((filter, index) => (
                <button
                  key={filter.name}
                  onClick={() => setSelectedFilter(index)}
                  className={`flex flex-col items-center p-2 rounded-lg border ${
                    selectedFilter === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-md overflow-hidden mb-1 bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                    style={filter.style}
                  >
                    <Palette className={`h-6 w-6 ${
                      selectedFilter === index
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`} />
                  </div>
                  <span className={`text-xs ${
                    selectedFilter === index
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {filter.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Adjustments */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adjustments</h3>
              <button
                onClick={toggleAdjustments}
                className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
              >
                {showAdjustments ? <X className="h-5 w-5" /> : <Sliders className="h-5 w-5" />}
              </button>
            </div>
            
            {showAdjustments && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Brightness
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{brightness}%</span>
                  </div>
                  <div className="flex items-center">
                    <Sun className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contrast
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{contrast}%</span>
                  </div>
                  <div className="flex items-center">
                    <Contrast className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Saturation
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{saturation}%</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reset and Apply */}
          <div className="flex space-x-2">
            <button
              onClick={resetEdits}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Reset Edits
            </button>
            <button
              onClick={applyEdits}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Apply Changes
            </button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
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
            <div className="flex items-center justify-center p-4">
              <div className="relative">
                <img
                  ref={imageRef}
                  src={editedImageUrl}
                  alt="Edited image"
                  className="max-w-full h-auto rounded shadow-sm"
                  style={{
                    maxHeight: '60vh',
                    objectFit: 'contain',
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Image Editor</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Apply filters, adjust brightness/contrast, rotate, and flip your image. 
              All edits are non-destructive and can be reset at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 