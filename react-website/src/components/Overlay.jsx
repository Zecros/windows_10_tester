import React, { useState, useEffect } from 'react';

function Overlay({ title, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay to allow for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${isVisible ? 'backdrop-blur-sm bg-black/30' : 'bg-black/0'}`}
        onClick={onClose}
      />
      
      {/* Modal container with animation */}
      <aside 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl transition-all duration-500 ${isVisible ? 'opacity-100 -translate-y-1/2' : 'opacity-0 -translate-y-[40%]'}`}
        role="dialog" 
        aria-modal="true"
        style={{
          background: 'rgba(var(--color-secondary-bg-rgb), 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(var(--color-border-rgb), 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'  
        }}
      >
        {/* Top decorative gradient bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" 
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
        />
        
        {/* Inner light effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 right-1/4 h-40 opacity-5 blur-2xl" 
            style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
          />
        </div>
        
        {/* Content container */}
        <div className="p-6 sm:p-8 relative z-10">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-lg transition-all duration-300 hover:bg-black/10"
            onClick={onClose} 
            aria-label="Stäng"
            style={{ color: 'var(--color-text)' }}
          >
            ×
          </button>
          
          {/* Title with gradient underline */}
          {title && (
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {title}
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-primary to-secondary opacity-60" />
            </div>
          )}
          
          {/* Content */}
          <div 
            className="text-left space-y-4 pr-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {children}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Overlay;
