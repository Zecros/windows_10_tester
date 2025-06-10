import React, { useState, useRef, useEffect } from 'react';
import Overlay from './Overlay';

function SideInfoBox({ position = 'left', title, summary, hoverInfo, details }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const boxRef = useRef(null);
  
  // Add a pulsing effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHovered(true);
      setTimeout(() => setIsHovered(false), 1000);
    }, 500 + Math.random() * 2000); // Random delay for each box to create staggered effect
    
    return () => clearTimeout(timer);
  }, []);
  
  // Dim other boxes when this one is clicked
  useEffect(() => {
    if (open) {
      document.querySelectorAll('.side-info-box').forEach(box => {
        if (box !== boxRef.current) {
          box.classList.add('opacity-30');
        }
      });
    }
    
    return () => {
      document.querySelectorAll('.side-info-box').forEach(box => {
        box.classList.remove('opacity-30');
      });
    };
  }, [open]);
  
  const handleBoxClick = () => {
    // Add a scale animation effect before opening the overlay
    if (boxRef.current) {
      boxRef.current.classList.add('scale-110');
      setTimeout(() => {
        boxRef.current.classList.remove('scale-110');
        setOpen(true);
      }, 200);
    }
  };
  
  return (
    <>
      <div
        ref={boxRef}
        className={
          `side-info-box group relative w-full p-5 backdrop-blur-sm cursor-pointer transform transition-all duration-500
           rounded-xl overflow-hidden ${isHovered ? 'shadow-lg scale-[1.03]' : 'shadow-md'} text-left md:text-${position} hover:z-30` // Default to text-left, then apply position for md+
        }
        onClick={handleBoxClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? 'rgba(var(--color-secondary-bg-rgb), 0.3)' 
            : 'rgba(var(--color-secondary-bg-rgb), 0.15)',
          border: '1px solid rgba(var(--color-border-rgb), 0.2)',
          boxShadow: isHovered ? '0 10px 25px -5px rgba(var(--color-primary-rgb), 0.3)' : '',
        }}
      >
        {/* Decorative elements with animation */}
        <div 
          className={`absolute ${position === 'left' ? 'md:-left-10 -left-5 -top-5 md:-top-10' : 'md:-right-10 -right-5 -top-5 md:-top-10'} w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-700 ${isHovered ? 'opacity-60 scale-110' : 'opacity-20'}`}
          style={{
            background: `radial-gradient(circle, var(--color-${position === 'left' ? 'primary' : 'secondary'}) 0%, transparent 70%)`,
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          }}
        />
        
        {/* Floating particles - only visible on hover */}
        {isHovered && (
          <>
            <div className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float1" 
                style={{ top: '20%', left: position === 'left' ? '10%' : '70%' }} />
            <div className="absolute w-1 h-1 rounded-full bg-secondary/30 animate-float2" 
                style={{ top: '50%', left: position === 'left' ? '20%' : '60%' }} />
          </>
        )}
        
        {/* Content with enhanced animations */}
        <div className="relative z-10">
          {/* Accent line with improved animation */}
          <div 
            className={`h-0.5 mb-4 transition-all duration-500 rounded-full ${isHovered ? 'w-24' : 'w-10'} ${position === 'left' ? 'ml-0 mr-auto md:ml-0 md:mr-auto' : 'ml-0 mr-auto md:mr-0 md:ml-auto'}`}
            style={{ 
              background: `linear-gradient(to right, var(--color-${position === 'left' ? 'primary' : 'secondary'}), var(--color-${position === 'left' ? 'secondary' : 'primary'}))`,
              transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
            }}
          />

          {/* Title with enhanced text color transition */}
          <h3 className={`text-lg font-semibold mb-2 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              style={{ 
                color: isHovered ? `var(--color-${position === 'left' ? 'primary' : 'secondary'})` : 'var(--color-text)',
                textShadow: isHovered ? '0 0 1px rgba(var(--color-primary-rgb), 0.3)' : 'none'
              }}>
            {title}
          </h3>
          
          {/* Summary text with subtle movement */}
          <p className={`text-sm transition-all duration-300 mb-2 ${isHovered ? 'translate-x-1' : ''}`}
             style={{ color: 'var(--color-text-secondary)' }}>
            {summary}
          </p>
          
          {/* Hover info with animated reveal and slide effect */}
          {hoverInfo && (
            <div 
              className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
              style={{ transform: isHovered ? 'translateY(0)' : 'translateY(-10px)' }}
            >
              <p className="text-xs italic" style={{ color: 'var(--color-text-secondary)' }}>
                {hoverInfo}
              </p>
            </div>
          )}

          {/* Animated button indicator that appears on hover */}
          <div 
            className={`flex items-center mt-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-xs font-medium" style={{ color: `var(--color-${position === 'left' ? 'primary' : 'secondary'})` }}>
              Klicka för mer
            </span>
            <svg 
              className={`w-4 h-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ color: `var(--color-${position === 'left' ? 'primary' : 'secondary'})` }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {open && (
        <Overlay 
          title={title} 
          position={position}
          onClose={() => setOpen(false)}
        >
          {details}
        </Overlay>
      )}
    </>
  );
}

export default SideInfoBox;
