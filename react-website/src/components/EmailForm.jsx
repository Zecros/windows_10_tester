import React, { useState } from 'react';

function EmailForm({ onInfoButtonClick }) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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
    <form 
      id="emailForm" 
      className="space-y-6 relative z-10" 
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <div className="group relative">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium mb-2 transition-all duration-300"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            E-postadress
          </label>
          
          {/* Modern input field with glass effect */}
          <div 
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-md'}`}
            style={{
              background: 'rgba(var(--color-secondary-bg-rgb), 0.2)',
              border: `1px solid ${isFocused ? 'rgba(var(--color-primary-rgb), 0.5)' : 'rgba(var(--color-border-rgb), 0.3)'}`
            }}
          >
            {/* Decorative elements that animate on focus/hover */}
            <div 
              className="absolute inset-0 opacity-10 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at ${isFocused ? '30% 30%' : '70% 70%'}, rgba(var(--color-primary-rgb), 0.8), transparent 70%)`
              }}
            />
            
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-3 bg-transparent backdrop-blur-sm text-base placeholder-opacity-70 focus:outline-none relative z-10"
              style={{
                color: 'var(--color-text)',
                caretColor: 'var(--color-primary)'
              }}
              placeholder="namn@exempel.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
            />
          </div>
        </div>
      </div>
      
      {/* Button container with improved styling */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        {/* Primary download button */}
        <button 
          type="submit"
          className="relative w-full sm:flex-1 px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 transform"
          style={{
            background: isHovering === 'primary' 
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' 
              : 'var(--color-primary)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: isHovering === 'primary' ? '0 10px 20px -10px rgba(var(--color-primary-rgb), 0.5)' : 'none',
            transform: isHovering === 'primary' ? 'translateY(-2px)' : 'none'
          }}
          onMouseEnter={() => setIsHovering('primary')}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Subtle button highlight effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%)',
              borderRadius: '8px 8px 0 0'
            }}
          />
          
          <span className="relative z-10 font-medium">Ladda ned testprogram</span>
        </button>
        
        {/* Secondary info button */}
        <button
          id="infoBtn"
          type="button"
          className="relative w-full sm:flex-1 px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 transform"
          style={{
            background: 'rgba(var(--color-secondary-bg-rgb), 0.3)',
            backdropFilter: 'blur(10px)',
            color: 'var(--color-text)',
            border: '1px solid rgba(var(--color-border-rgb), 0.3)',
            boxShadow: isHovering === 'secondary' ? '0 10px 20px -10px rgba(0, 0, 0, 0.2)' : 'none',
            transform: isHovering === 'secondary' ? 'translateY(-2px)' : 'none'
          }}
          onClick={onInfoButtonClick}
          onMouseEnter={() => setIsHovering('secondary')}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10 font-medium">Läs mer om programmet</span>
        </button>
      </div>
    </form>
  );
}

export default EmailForm;
