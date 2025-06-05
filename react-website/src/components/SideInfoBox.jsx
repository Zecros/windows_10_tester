import React, { useState } from 'react';
import Overlay from './Overlay';

function SideInfoBox({ position = 'left', title, summary, hoverInfo, details }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={
          // Removed bg-white dark:bg-gray-800 to allow CSS to apply themed background
          `group side-info-box-inner w-60 p-4 shadow-lg rounded-lg cursor-pointer transform transition hover:-translate-y-1` +
          (position === 'left' ? ' text-left' : ' text-right')
        }
        onClick={() => setOpen(true)}
      >
        {/* Title inherits text color from .side-info-box-inner */}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {/* Summary uses themed secondary text color */}
        <p className="text-sm text-secondary-text">{summary}</p>
        {hoverInfo && (
          // HoverInfo also uses themed secondary text color
          <p className="mt-2 text-xs text-secondary-text hidden group-hover:block">
            {hoverInfo}
          </p>
        )}
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
