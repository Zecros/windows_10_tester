import React from 'react';

function Overlay({ title, onClose, children }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <aside className="info-modal" role="dialog" aria-modal="true">
        <button className="info-modal-close-button" onClick={onClose} aria-label="Stäng">×</button>
        {title && <h2>{title}</h2>}
        <div className="overlay-content text-left space-y-4">{children}</div>
      </aside>
    </>
  );
}

export default Overlay;
