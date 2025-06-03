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
    <form id="emailForm" onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        placeholder="namn@exempel.se"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="primary">Ladda ned testprogram</button>
      <button
        id="infoBtn"
        type="button"
        className="secondary"
        onClick={onInfoButtonClick}
      >
        Läs mer om programmet
      </button>
    </form>
  );
}

export default EmailForm;
