import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Crop, 
  FileDigit, 
  Layers, 
  Smartphone, 
  Download, 
  Zap 
} from 'lucide-react';
import FileSizeResizer from './FileSizeResizer';

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'filesize'>('overview');

  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need for Image Resizing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Our powerful tools make image resizing simple, fast, and effective for all your needs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-12 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Features Overview
            </button>
            <button
              onClick={() => setActiveTab('filesize')}
              className={`${
                activeTab === 'filesize'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileDigit className="mr-2 h-4 w-4" />
              File Size Control
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' ? (
            <div className="space-y-12">
              {/* File Size Control Feature - Highlighted */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-md bg-blue-600 text-white mb-6 md:mb-0">
                    <FileDigit className="h-8 w-8" />
                  </div>
                  <div className="md:ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">File Size Control</h3>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                      Precisely control the output file size of your images in MB or KB
                    </p>
                    <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How it works:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Upload your image</li>
                        <li>Select your target file size (e.g., 500KB, 1MB, etc.)</li>
                        <li>Our algorithm automatically adjusts quality and dimensions</li>
                        <li>Download your optimized image that meets your size requirements</li>
                      </ol>
                      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Pro tip:</span> For web images, aim for file sizes under 200KB for optimal page loading speed.
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => setActiveTab('filesize')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Try it now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Features */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Crop className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Dimension Resizing</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Resize images to exact pixel dimensions while maintaining aspect ratio or custom crop.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Social Media Formats</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Pre-configured sizes for all major social media platforms like Instagram, Facebook, Twitter, and more.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Layers className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Batch Processing</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Resize multiple images at once with the same settings to save time on large projects.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Download className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Multiple Formats</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Convert between image formats including JPG, PNG, WebP, and more while resizing.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Quality Control</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Fine-tune image quality to balance between file size and visual appearance.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">Fast Processing</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-300">
                    Cloud-based processing ensures quick results even for large images and batch operations.
                  </p>
                </div>
              </div>

              {/* Coming Soon Section */}
              <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're constantly improving our platform. Here are some features we're working on:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">AI-powered image enhancement during resizing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Background removal tool</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Advanced compression algorithms for even smaller file sizes</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ← Back to Features
                </button>
              </div>
              <FileSizeResizer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features; 