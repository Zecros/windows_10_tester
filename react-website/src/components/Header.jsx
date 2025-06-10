import React from 'react';
import ThemeToggle from './ThemeToggle';
import helkomLogo from '../assets/helkom-logo.png';

function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-4 sm:px-6 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center">
        <img src={helkomLogo} alt="HELkom Logo" className="h-10" />
        <h1 className="ml-2 text-xl font-bold text-[#0c4c84] dark:text-[#198563]">HELkom</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
