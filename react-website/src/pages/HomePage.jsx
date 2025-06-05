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
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Är din dator redo för Windows 11?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2">
            Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Fungerar på både Windows 10 och Windows 11!
          </p>
        </div>
        <EmailForm onInfoButtonClick={handleInfoButtonClick} />
        <InfoModal show={isModalOpen} onClose={handleCloseModal} />
      </div>

      <div className="hidden md:block absolute top-1/4" style={{ left: '-18rem' }}>
        <SideInfoBox
          position="left"
          title="Varför testa?"
          summary="Snabb koll på systemet."
          hoverInfo="Kontrollen visar om din dator klarar Windows 11."
          details={<p>Att testa i förväg hjälper dig planera för uppgraderingen och undvika överraskningar.</p>}
        />
      </div>

      <div className="hidden md:block absolute top-1/4" style={{ right: '-18rem' }}>
        <SideInfoBox
          position="right"
          title="Om verktyget"
          summary="Så fungerar programmet."
          hoverInfo="Håll musen här för mer info."
          details={<p>Programmet läser av grundläggande hårdvaruinformation och sparar endast det allra nödvändigaste.</p>}
        />
      </div>
    </main>
  );
}

export default HomePage;
