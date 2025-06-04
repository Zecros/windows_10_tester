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
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="form-container bg-white rounded-lg shadow-md p-8">
        <EmailForm onInfoButtonClick={handleInfoButtonClick} />
        <InfoModal show={isModalOpen} onClose={handleCloseModal} />
      </div>
    </main>
  );
}

export default HomePage;
