import React from 'react';

function Header() {
  return (
    <header className="text-center py-6 bg-blue-900 text-white">
      <h1 className="text-3xl font-bold mb-3">Är din dator redo för Windows&nbsp;11?</h1>
      <p className="text-lg mb-2">Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.</p>
      <p className="note italic text-blue-300">Fungerar på både Windows 10 och Windows 11!</p>
    </header>
  );
}

export default Header;
