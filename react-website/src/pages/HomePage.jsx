import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import InfoModal from '../components/InfoModal';
import SideInfoBox from '../components/SideInfoBox';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="relative container mx-auto px-4 py-12 md:py-16 flex justify-center">
      {/* Main content box itself is the relative anchor for absolute side boxes */}
      {/* Updated dark mode background to use CSS variable for the theme, and text colors to use theme names with explicit dark mode CSS variables */}
      <div className="max-w-xl w-full bg-white dark:bg-[var(--color-secondary-bg)] rounded-lg shadow-xl p-6 sm:p-8 text-center relative">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text dark:text-[var(--color-text)] mb-4">
            Är din dator redo för Windows 11?
          </h1>
          <p className="text-base sm:text-lg text-secondary-text dark:text-[var(--color-secondary-text)] mb-2">
            Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.
          </p>
          <p className="text-base sm:text-lg text-secondary-text dark:text-[var(--color-secondary-text)]">
            Fungerar på både Windows 10 och Windows 11!
          </p>
        </div>
        <EmailForm onInfoButtonClick={handleInfoButtonClick} />
        <InfoModal show={isModalOpen} onClose={handleCloseModal} />

        {/* Left SideInfoBox */}
        {/* Positioned relative to the main content box.
            It's 15rem (w-60) wide. We want a 2rem gap.
            So, its left edge should be 17rem to the left of the main content's left edge.
            Thus, left: -17rem (or -(15rem width + 2rem gap)).
        */}
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2" style={{ left: '-17rem', width: '15rem' }}>
          <SideInfoBox
            position="left"
            title="Varför testa?"
          summary="Snabb koll på systemet."
          hoverInfo="Kontrollen visar om din dator klarar Windows 11."
          details={<p>Att testa i förväg hjälper dig planera för uppgraderingen och undvika överraskningar.</p>}
          />
        </div>

        {/* Right SideInfoBox */}
        {/* Its right edge should be 17rem to the right of the main content's right edge. */}
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2" style={{ right: '-17rem', width: '15rem' }}>
          <SideInfoBox
            position="right"
            title="Om verktyget"
            summary="Så fungerar programmet."
            hoverInfo="Håll musen här för mer info."
            details={<p>Programmet läser av grundläggande hårdvaruinformation och sparar endast det allra nödvändigaste.</p>}
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
