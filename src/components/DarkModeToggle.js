import { useState, useEffect } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <button 
      className="dark-mode-toggle"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;
