import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import InfoModal from '../components/InfoModal';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Centrera allt innehåll och lägg till mer vertikal padding
    <main className="container mx-auto px-4 py-12 md:py-16 text-center">
      {/* Textsektion */}
      <div className="mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Är din dator redo för Windows 11?
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-2xl mx-auto">
          Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Fungerar på både Windows 10 och Windows 11!
        </p>
      </div>

      {/* Formulär-kort sektion */}
      {/* Behåll max-w-3xl här för att kortet inte ska bli för brett, men texten ovan kan vara bredare */}
      <div className="max-w-xl mx-auto"> 
        <div className="form-container bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
          <EmailForm onInfoButtonClick={handleInfoButtonClick} />
          <InfoModal show={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
