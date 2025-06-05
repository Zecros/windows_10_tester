import React from 'react';
import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <header className="flex justify-end items-center py-4 px-6 bg-white dark:bg-gray-800 shadow-sm">
      <ThemeToggle />
    </header>
  );
}

export default Header;
