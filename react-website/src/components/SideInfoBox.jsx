import React, { useState } from 'react';
import Overlay from './Overlay';

function SideInfoBox({ position = 'left', title, summary, hoverInfo, details }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      <div
        className={
          `group relative w-full p-5 backdrop-blur-sm cursor-pointer transform transition-all duration-500
           rounded-xl overflow-hidden ${isHovered ? 'shadow-lg scale-[1.03]' : 'shadow-md'}`
        }
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? 'rgba(var(--color-secondary-bg-rgb), 0.3)' 
            : 'rgba(var(--color-secondary-bg-rgb), 0.15)',
          border: '1px solid rgba(var(--color-border-rgb), 0.2)',
          textAlign: position === 'left' ? 'left' : 'right'
        }}
      >
        {/* Decorative elements */}
        <div 
          className={`absolute ${position === 'left' ? '-left-10 -top-10' : '-right-10 -top-10'} w-20 h-20 rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-60' : 'opacity-20'}`}
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Accent line */}
          <div 
            className={`h-0.5 w-10 mb-4 transition-all duration-500 ${isHovered ? 'w-16' : 'w-10'} rounded-full ${position === 'left' ? 'ml-0 mr-auto' : 'mr-0 ml-auto'}`}
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
          />

          {/* Title with text color transition */}
          <h3 className="text-lg font-semibold mb-2 transition-colors duration-300"
              style={{ color: 'var(--color-text)' }}>
            {title}
          </h3>
          
          {/* Summary text */}
          <p className="text-sm transition-colors duration-300 mb-2"
             style={{ color: 'var(--color-text-secondary)' }}>
            {summary}
          </p>
          
          {/* Hover info with animated reveal */}
          {hoverInfo && (
            <div 
              className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-xs italic" style={{ color: 'var(--color-text-secondary)' }}>
                {hoverInfo}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {open && (
        <Overlay title={title} onClose={() => setOpen(false)}>
          {details}
        </Overlay>
      )}
    </>
  );
}

export default SideInfoBox;
