import React, { useState, useEffect } from 'react';
import EmailForm from '../components/EmailForm';
import InfoModal from '../components/InfoModal';
import SideInfoBox from '../components/SideInfoBox';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInfoButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-bg) 0%, rgba(30, 41, 59, 0.8) 100%)',
        perspective: '1000px'
      }}>
      
      {/* Background geometric elements - these create subtle modern background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Hide background elements on smaller screens (xs, sm) */}
        <div className="hidden sm:block absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-primary-500/10 to-primary-600/20 rounded-full blur-2xl" />
        <div className="hidden sm:block absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-secondary/10 to-primary/10 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute -bottom-40 left-1/4 w-72 h-72 bg-gradient-to-tr from-primary-500/10 to-secondary/10 rounded-full blur-2xl" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      {/* Main container with animation */}
      <div 
        className={`relative z-10 w-full max-w-4xl mx-auto px-4 py-8 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Main content box with glass morphism effect */}
        <div 
          className="relative rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-lg overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(var(--color-secondary-bg-rgb), 0.2)',
            border: '1px solid rgba(var(--color-border-rgb), 0.2)',
          }}
        >
          {/* Content container */}
          <div className="relative z-10 text-center">
            {/* Accent top line */}
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
            
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text dark:text-[var(--color-text)] mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-text)] to-[var(--color-text-secondary)]">
                Är din dator redo för Windows 11?
              </h1>
              <p className="text-base sm:text-lg text-secondary-text dark:text-[var(--color-secondary-text)] mb-3 max-w-2xl mx-auto">
                Fyll i din e-postadress så får du direkt ladda ned vårt testprogram.
              </p>
              <p className="text-base sm:text-lg text-secondary-text dark:text-[var(--color-secondary-text)] max-w-2xl mx-auto">
                Fungerar på både Windows 10 och Windows 11!
              </p>
            </div>
            
            {/* Email form with improved styling */}
            <div className="max-w-md mx-auto">
              <EmailForm onInfoButtonClick={handleInfoButtonClick} />
            </div>
            
            <InfoModal show={isModalOpen} onClose={handleCloseModal} />
          </div>
          
          {/* Decorative elements inside the main container */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-secondary/10 rounded-full blur-2xl z-0"></div>
        </div>
        
        {/* Container for SideInfoBoxes on sides with varied sizes and positions */}
        <div className="mt-8 md:mt-0 w-full md:w-auto">
          {/* Left Side Boxes */}
          
          {/* Left Side Box 1 - Varför testa? - Smaller box at top */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[10%] md:left-5 md:w-44 transform transition-all duration-500 hover:md:scale-105 z-10">
            <SideInfoBox
              position="left"
              title="Varför testa?"
              summary="Snabb koll på systemet."
              hoverInfo="Kontrollen visar om din dator klarar Windows 11."
              details={<p>Att testa i förväg hjälper dig planera för uppgraderingen och undvika överraskningar.</p>}
            />
          </div>

          {/* Left Side Box 2 - Systemkrav - Medium box in middle */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[43%] md:left-0 md:w-52 transform transition-all duration-500 hover:md:scale-105 z-20">
            <SideInfoBox
              position="left"
              title="Systemkrav"
              summary="Hårdvarukrav för Windows 11."
              hoverInfo="Klicka för att se kompletta systemkrav."
              details={<>
                <p>För att köra Windows 11 krävs:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Modern processor (2 GHz+)</li>
                  <li>4 GB RAM</li>
                  <li>64 GB lagring</li>
                  <li>TPM 2.0</li>
                  <li>UEFI med Secure Boot</li>
                </ul>
              </>}
            />
          </div>

          {/* Left Side Box 3 - Dataskydd - Wide box at bottom */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[78%] md:left-8 md:w-64 transform transition-all duration-500 hover:md:scale-105 z-10">
            <SideInfoBox
              position="left"
              title="Dataskydd"
              summary="Din integritet är viktig."
              hoverInfo="Vi skyddar din personliga information."
              details={<p>Vi samlar bara in information som behövs för kompatibilitetstestet. Dina uppgifter delas aldrig med tredje part och lagras säkert.</p>}
            />
          </div>

          {/* Right Side Boxes */}
          
          {/* Right Side Box 1 - Om verktyget - Wide box at top */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[8%] md:right-4 md:w-56 transform transition-all duration-500 hover:md:scale-105 z-10">
            <SideInfoBox
              position="right"
              title="Om verktyget"
              summary="Så fungerar programmet."
              hoverInfo="Håll musen här för mer info."
              details={<p>Programmet läser av grundläggande hårdvaruinformation och sparar endast det allra nödvändigaste.</p>}
            />
          </div>

          {/* Right Side Box 2 - Windows 11 fördelar - Small tall box in middle */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[38%] md:right-10 md:w-40 transform transition-all duration-500 hover:md:scale-105 z-20">
            <SideInfoBox
              position="right"
              title="Windows 11 fördelar"
              summary="Nya funktioner och förbättringar."
              hoverInfo="Utforska fördelarna med uppgradering."
              details={<>
                <p>Windows 11 erbjuder många förbättringar:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Modernt gränssnitt</li>
                  <li>Förbättrad prestanda</li>
                  <li>Android-appstöd</li>
                  <li>Bättre säkerhet</li>
                  <li>Förbättrade widgets</li>
                </ul>
              </>}
            />
          </div>

          {/* Right Side Box 3 - Hjälp & Support - Medium box at bottom */}
          <div className="w-full max-w-md md:max-w-none md:absolute md:top-[73%] md:right-0 md:w-48 transform transition-all duration-500 hover:md:scale-105 z-10">
            <SideInfoBox
              position="right"
              title="Hjälp & Support"
              summary="Behöver du mer hjälp?"
              hoverInfo="Kontakta oss för support."
              details={<p>Har du frågor om testet eller behöver hjälp? Kontakta vår support på <a href="mailto:support@helkom.se" className="text-primary hover:underline">support@helkom.se</a>.</p>}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
