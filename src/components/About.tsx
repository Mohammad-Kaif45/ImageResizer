import React from 'react';
import { Image as ImageIcon, Crop, Share2, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            The Ultimate Image Resizing Tool
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Designed for social media managers, content creators, and digital marketers who need perfectly sized images.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                <Crop className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Precise Resizing</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Our tool provides pixel-perfect resizing for all major social media platforms, ensuring your content looks great everywhere.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Lightning Fast</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Process images in seconds with our optimized algorithms, saving you valuable time in your workflow.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                <Share2 className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Easy Sharing</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Download your resized images instantly or share them directly to your social media accounts.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Quality Preservation</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Our advanced algorithms maintain image quality even after resizing, ensuring your visuals always look professional.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ImageResizer was created by a team of designers and developers who were frustrated with the time-consuming process of resizing images for different platforms.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We built this tool to solve our own problems first, then realized it could help thousands of content creators and marketers save time and produce better content.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, our mission is to provide the most user-friendly and efficient image resizing tool on the web, completely free for everyone to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 