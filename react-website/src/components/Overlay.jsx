import React, { useState, useEffect } from 'react';

function Overlay({ title, onClose, children, position = 'left' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // Small delay to allow for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    // Add event listener for ESC key
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Calculate the accent color based on position
  const accentColor = position === 'left' ? 'primary' : 'secondary';
  const complementColor = position === 'left' ? 'secondary' : 'primary';

  return (
    <>
      {/* Backdrop with blur effect and improved animation */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${isExiting ? 'bg-black/0 backdrop-blur-none' : isVisible ? 'backdrop-blur-sm bg-black/30' : 'bg-black/0'}`}
        onClick={handleClose}
      />
      
      {/* Modal container with enhanced animation */}
      <aside 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl transition-all duration-500 
          ${isExiting ? 'opacity-0 scale-95 translate-y-4' : 
            isVisible ? 'opacity-100 -translate-y-1/2 scale-100' : 
            'opacity-0 -translate-y-[40%] scale-95'}`}
        role="dialog" 
        aria-modal="true"
        style={{
          background: 'rgba(var(--color-secondary-bg-rgb), 0.8)',
          backdropFilter: 'blur(12px)',
          border: `1px solid rgba(var(--color-${accentColor}-rgb), 0.2)`,
          boxShadow: `0 25px 50px -12px rgba(var(--color-${accentColor}-rgb), 0.2)`
        }}
      >
        {/* Top decorative gradient bar with dynamic colors */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" 
          style={{ background: `linear-gradient(to right, var(--color-${accentColor}), var(--color-${complementColor}))` }}
        />
        
        {/* Dynamic corner accent based on position */}
        <div 
          className={`absolute ${position === 'left' ? 'left-0 top-0' : 'right-0 top-0'} w-16 h-16 rounded-${position === 'left' ? 'tr-3xl' : 'tl-3xl'} opacity-10`}
          style={{ background: `radial-gradient(circle at ${position === 'left' ? 'bottom right' : 'bottom left'}, var(--color-${accentColor}), transparent 80%)` }}
        />
        
        {/* Inner light effect with animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div 
            className={`absolute top-0 left-1/4 right-1/4 h-40 opacity-5 blur-2xl transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-50'}`} 
            style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
          />
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {isVisible && (
            <>
              <div className="absolute w-2 h-2 rounded-full bg-primary/20 animate-floatSlow1" 
                  style={{ top: '20%', left: '10%' }} />
              <div className="absolute w-1 h-1 rounded-full bg-secondary/20 animate-floatSlow2" 
                  style={{ top: '70%', right: '15%' }} />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/15 animate-floatSlow3" 
                  style={{ bottom: '10%', left: '30%' }} />
            </>
          )}
        </div>
        
        {/* Content container with enhanced animation */}
        <div className={`p-6 sm:p-8 relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Enhanced close button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-lg transition-all duration-300 hover:bg-black/10 hover:scale-110 hover:rotate-90 active:scale-95"
            onClick={handleClose} 
            aria-label="Stäng"
            style={{ color: `var(--color-${accentColor})` }}
          >
            ×
          </button>
          
          {/* Title with dynamic gradient underline and animation */}
          {title && (
            <div className="mb-6">
              <h2 
                className={`text-xl sm:text-2xl font-semibold mb-2 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{ color: `var(--color-${accentColor})` }}
              >
                {title}
              </h2>
              <div 
                className={`h-px w-16 transition-all duration-700 ease-out ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}
                style={{ background: `linear-gradient(to right, var(--color-${accentColor}), var(--color-${complementColor}))` }} 
              />
            </div>
          )}
          
          {/* Content with staggered animation */}
          <div 
            className={`text-left space-y-4 pr-4 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {children}
          </div>

          {/* Animated close hint at bottom */}
          <div className={`mt-8 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-70' : 'opacity-0'}`}>
            <p className="text-xs italic flex items-center justify-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
              <span>Klicka var som helst utanför för att stänga</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Overlay;
