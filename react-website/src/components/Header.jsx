import React from 'react';
import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <header className="text-center py-6 bg-blue-900 text-white dark:bg-gray-800 relative">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-bold mb-3">Är din dator redo för Windows&nbsp;11?</h1>
      <p className="text-lg mb-2">Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.</p>
      <p className="note italic text-blue-300">Fungerar på både Windows 10 och Windows 11!</p>
    </header>
  );
}

export default Header;
