import React, { useState } from 'react';
import Overlay from './Overlay';

function SideInfoBox({ position = 'left', title, summary, hoverInfo, details }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={
          `group side-info-box-inner w-60 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer transform transition hover:-translate-y-1` +
          (position === 'left' ? ' text-left' : ' text-right')
        }
        onClick={() => setOpen(true)}
      >
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
        {hoverInfo && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 hidden group-hover:block">
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
