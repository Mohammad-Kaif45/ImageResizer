import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, FileDigit, X } from 'lucide-react';

const FileSizeResizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState<number>(500);
  const [sizeUnit, setSizeUnit] = useState<'KB' | 'MB'>('KB');
  const [quality, setQuality] = useState<number>(90);
  const [originalSize, setOriginalSize] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessedUrl(null);
      setOriginalSize(formatFileSize(file.size));
      setNewSize('');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessedUrl(null);
      setOriginalSize(formatFileSize(file.size));
      setNewSize('');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateTargetSizeInBytes = (): number => {
    return sizeUnit === 'KB' ? targetSize * 1024 : targetSize * 1024 * 1024;
  };

  const processImage = async () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsProcessing(true);
    
    try {
      const targetSizeInBytes = calculateTargetSizeInBytes();
      let currentQuality = quality / 100;
      let resultBlob: Blob | null = null;
      let resultSize = 0;
      
      // Load the image
      const img = new Image();
      img.src = previewUrl;
      
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      
      // Create canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set initial dimensions
      let width = img.width;
      let height = img.height;
      
      // Binary search for the right quality and dimensions
      let minQuality = 0.1;
      let maxQuality = 1.0;
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        attempts++;
        
        // Adjust dimensions if needed (after first attempt)
        if (attempts > 1 && resultSize > targetSizeInBytes) {
          const scaleFactor = Math.sqrt(targetSizeInBytes / resultSize);
          width = Math.floor(width * scaleFactor);
          height = Math.floor(height * scaleFactor);
        }
        
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        // Clear canvas and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with current quality
        resultBlob = await new Promise<Blob | null>(resolve => {
          canvas.toBlob(
            blob => resolve(blob),
            selectedFile.type,
            currentQuality
          );
        });
        
        if (!resultBlob) break;
        
        resultSize = resultBlob.size;
        
        // Check if we're close enough to target size
        const sizeDifference = Math.abs(resultSize - targetSizeInBytes);
        if (sizeDifference / targetSizeInBytes < 0.1) {
          // Within 10% of target, good enough
          break;
        }
        
        // Binary search for quality
        if (resultSize > targetSizeInBytes) {
          maxQuality = currentQuality;
          currentQuality = (minQuality + currentQuality) / 2;
        } else {
          minQuality = currentQuality;
          currentQuality = (currentQuality + maxQuality) / 2;
        }
      }
      
      if (resultBlob) {
        const url = URL.createObjectURL(resultBlob);
        setProcessedUrl(url);
        setNewSize(formatFileSize(resultBlob.size));
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setOriginalSize('');
    setNewSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;
    
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = `resized-${selectedFile?.name || 'image'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Clean up URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [previewUrl, processedUrl]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
          <FileDigit className="h-6 w-6" />
        </div>
        <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">File Size Resizer</h2>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Upload an image and resize it to your desired file size in KB or MB. Our algorithm will automatically adjust the quality and dimensions to match your target size.
        </p>
      </div>

      {!selectedFile ? (
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Drag and drop an image here, or click to select
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Original Image</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{originalSize}</span>
                </div>
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Original" 
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Resized Image</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{newSize || '-'}</span>
                </div>
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                  {processedUrl ? (
                    <img 
                      src={processedUrl} 
                      alt="Resized" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {isProcessing ? 'Processing...' : 'Adjust settings and click "Resize" to see result'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resize Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Size
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="1"
                    max={sizeUnit === 'MB' ? 10 : 10000}
                    value={targetSize}
                    onChange={(e) => setTargetSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 rounded-l-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  <select
                    value={sizeUnit}
                    onChange={(e) => setSizeUnit(e.target.value as 'KB' | 'MB')}
                    className="rounded-r-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quality (JPEG only)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 w-8">{quality}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Resize Image'}
              </button>
              
              {processedUrl && (
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </button>
              )}
              
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FileSizeResizer; 