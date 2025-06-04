import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-600 mt-8 border-t">
      <p>&copy; {new Date().getFullYear()} Windows 11 Kompatibilitetskontroll</p>
    </footer>
  );
}

export default Footer;
