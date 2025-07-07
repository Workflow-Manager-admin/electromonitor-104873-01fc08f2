import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './routes';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 999,
          color: '#c0c0c0',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#001e57',
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Router />
    </div>
  );
}

export default App;
