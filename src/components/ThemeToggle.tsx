import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Revisa el estado guardado en localStorage al montar el componente
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    } else {
      // Si no hay valor en localStorage, usa el modo del sistema
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Cambia el tema y guarda la preferencia en localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark'); // Agrega la clase 'dark' al body
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark'); // Elimina la clase 'dark'
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="bg-gray-800 text-white p-2 rounded-lg"
    >
      {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      
    </button>
    
  );
  
};

export default ThemeToggle;
