import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import InfoModal from '../components/InfoModal'; // Import InfoModal

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <EmailForm onInfoButtonClick={handleInfoButtonClick} />
      <InfoModal show={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

export default HomePage;
