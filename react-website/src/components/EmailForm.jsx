import React, { useState } from 'react';

function EmailForm({ onInfoButtonClick }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    localStorage.setItem('windows11_checker_email', email);
    console.log('Email saved to localStorage:', email); // For testing

    try {
      // Placeholder for actual API call
      const response = await fetch('https://example.com/api/register-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        console.warn('Backend email registration might have failed, status:', response.status);
      }
      console.log('Email submitted to backend (placeholder).');
    } catch (err) {
      console.warn('Kunde inte skicka e-post till backend, fortsätter ändå...', err);
    }

    // Trigger download
    window.location.href = '/downloads/checker.exe';
  };

  return (
    <form id="emailForm" className="space-y-6" onSubmit={handleSubmit}> {/* Ökad space-y för mer luft */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left"> {/* text-left för etiketten */}
          E-postadress
        </label>
        <input
          type="email"
          id="email"
          // Stil inspirerad av Mountain Expeditions - ren och tydlig
          className="block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 sm:text-sm"
          placeholder="namn@exempel.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* Knappcontainer för bättre responsivitet */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <button 
          type="submit" 
          // Primär knapp - solid, mörkblå (liknande "Read More" i inspirationen)
          className="w-full sm:w-auto flex-grow justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800 transition-colors duration-150"
        >
          Ladda ned testprogram
        </button>
        <button
          id="infoBtn"
          type="button"
          // Sekundär knapp - ljusare, med ram
          className="w-full sm:w-auto flex-grow justify-center px-6 py-3 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          onClick={onInfoButtonClick}
        >
          Läs mer om programmet
        </button>
      </div>
    </form>
  );
}

export default EmailForm;
