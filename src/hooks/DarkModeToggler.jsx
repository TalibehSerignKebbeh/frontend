import  LightMode from '@mui/icons-material/LightMode';
import  ModeNightOutlined from '@mui/icons-material/ModeNightOutlined';
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



  return (
      <label htmlFor='toggle'
      className={`mx-auto ' w-16 h-fit p-1  
        flex items-center justify-start
    cursor-pointer' border rounded
    ${darkMode ? 'bg-gray-950' : 'bg-gray-700'}
    border-slate-800  
    cursor-pointer`}>
      <input type="checkbox" name="toggle" id="toggle"
        defaultChecked={darkMode}
        value={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
        className='hidden peer '
      />
        <span style={{}} className={`
        w-auto h-auto  transform
        transition-all 
        rounded-[50%] 
        ${darkMode ? 'mr-auto  ml-16' : ' ml-auto mr-0'}
        ${darkMode ? 'bg-slate-500' : 'bg-slate-300'}
        `}>
        {darkMode ?
          <ModeNightOutlined
        className='text-white bg-slate-400 rounded-full'
            sx={{ transform: 'scale(1.3)', p: '2px' }} />
          :
          <LightMode
          className='text-slate-50 bg-slate-700'
          sx={{ transform: 'scale(1.3)', p:'2px' }} />}
       </span>
      </label>
  );
};

export default DarkModeToggle;
