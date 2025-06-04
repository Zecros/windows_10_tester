import React from 'react';
import { useTheme } from '../theme/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
    >
      {theme === 'dark' ? 'Ljusa läget' : 'Mörka läget'}
    </button>
  );
}

export default ThemeToggle;
