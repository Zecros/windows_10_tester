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
    // Assuming checker.exe will be in the public folder of the React app
    window.location.href = '/downloads/checker.exe';
  };

  return (
    <form id="emailForm" className="space-y-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">E-postadress</label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="namn@exempel.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="submit-btn bg-blue-600 hover:bg-blue-700">Ladda ned testprogram</button>
        <button
          id="infoBtn"
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          onClick={onInfoButtonClick}
        >
          Läs mer om programmet
        </button>
      </div>
    </form>
  );
}

export default EmailForm;
