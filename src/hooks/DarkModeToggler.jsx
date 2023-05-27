import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode) {
      setDarkMode(JSON.parse(isDarkMode));
    } else {
      // Enable dark mode based on user's preference (e.g., prefers-color-scheme)
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="bg-gray-200 dark:bg-gray-800 rounded-full w-12 h-6 flex items-center justify-between p-1
      border border-gray-500 dark:border-slate-100 "
      onClick={toggleDarkMode}
    >
      <div
              className={`bg-white  dark:bg-gray-500 rounded-full w-4 h-4 
        transition-transform duration-200 ease-in-out transform ${
          darkMode ? 'translate-x-6' : 'translate-x-1'
        }`}
      ></div>
    </button>
  );
};

export default DarkModeToggle;
