import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Save, RotateCcw, Image as ImageIcon, Sliders } from 'lucide-react';

// Define theme types
type ThemeOption = 'light' | 'dark' | 'system';

// Define settings interface
interface AppSettings {
  theme: ThemeOption;
  defaultBackgroundColor: string;
  preserveExifData: boolean;
  highQualityExport: boolean;
}

const Settings: React.FC = () => {
  // Default settings
  const defaultSettings: AppSettings = {
    theme: 'system',
    defaultBackgroundColor: '#ffffff',
    preserveExifData: true,
    highQualityExport: true
  };

  // Get settings from localStorage or use defaults
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('devresizer-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [isSaved, setIsSaved] = useState(false);

  // Apply theme when settings change
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('devresizer-settings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem('devresizer-settings', JSON.stringify(defaultSettings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Apply theme based on selection
  const applyTheme = (theme: ThemeOption) => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  };

  // Handle theme change
  const handleThemeChange = (theme: ThemeOption) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <Sliders className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your DevResizer experience
          </p>
        </div>

        <div className="space-y-10">
          {/* Theme Settings */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              <Moon className="h-5 w-5 mr-2 text-indigo-500" />
              Theme Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-lg border flex flex-col items-center ${
                  settings.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <Sun className="h-8 w-8 text-yellow-500 mb-2" />
                <span className={`font-medium ${
                  settings.theme === 'light'
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>Light</span>
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-lg border flex flex-col items-center ${
                  settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <Moon className="h-8 w-8 text-indigo-500 mb-2" />
                <span className={`font-medium ${
                  settings.theme === 'dark'
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>Dark</span>
              </button>
              
              <button
                onClick={() => handleThemeChange('system')}
                className={`p-4 rounded-lg border flex flex-col items-center ${
                  settings.theme === 'system'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <Monitor className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                <span className={`font-medium ${
                  settings.theme === 'system'
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>System</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your preferred theme or use your system's default setting.
            </p>
          </section>

          {/* Image Settings */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
              Image Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Background Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={settings.defaultBackgroundColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultBackgroundColor: e.target.value }))}
                    className="h-10 w-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-3 text-gray-600 dark:text-gray-300">
                    {settings.defaultBackgroundColor}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  This color will be used as the default background when resizing images.
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="preserveExifData"
                  checked={settings.preserveExifData}
                  onChange={(e) => setSettings(prev => ({ ...prev, preserveExifData: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="preserveExifData" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Preserve EXIF data when possible
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="highQualityExport"
                  checked={settings.highQualityExport}
                  onChange={(e) => setSettings(prev => ({ ...prev, highQualityExport: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="highQualityExport" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  High quality export (larger file size)
                </label>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={resetSettings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </button>
            <button
              onClick={saveSettings}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 