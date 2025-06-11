import React, { useState, useEffect, useRef } from 'react';
import EmailForm from '../components/EmailForm';
import InfoModal from '../components/InfoModal';
import SideInfoBox from '../components/SideInfoBox';

// Utility function to check for overlap between two rectangles
// Each rect is an object: { x, y, width, height }
const checkOverlap = (rect1, rect2) => {
  // Add a small buffer to prevent cards from touching
  const buffer = 5; // 5px buffer

  return (
    rect1.x < rect2.x + rect2.width + buffer &&
    rect1.x + rect1.width + buffer > rect2.x &&
    rect1.y < rect2.y + rect2.height + buffer &&
    rect1.y + rect1.height + buffer > rect2.y
  );
};

// Helper function to check if a card is in a "shadow zone" (directly above or below main content)
const isCardInShadowZone = (cardRect, mainContentRect) => {
  const horizontalOverlapThreshold = 0.3; // Card needs to overlap at least 30% horizontally with main content's span

  // Check for horizontal alignment/overlap with the main content
  const cardStartX = cardRect.x;
  const cardEndX = cardRect.x + cardRect.width;
  const mainContentStartX = mainContentRect.x;
  const mainContentEndX = mainContentRect.x + mainContentRect.width;

  // Calculate the width of the horizontal overlap
  const overlapX = Math.max(0, Math.min(cardEndX, mainContentEndX) - Math.max(cardStartX, mainContentStartX));

  // Is there significant horizontal overlap?
  if (overlapX >= cardRect.width * horizontalOverlapThreshold) {
    // Card is horizontally aligned with main content. Now check if it's purely above or below.
    const cardFullyAbove = cardRect.y + cardRect.height < mainContentRect.y;
    const cardFullyBelow = cardRect.y > mainContentRect.y + mainContentRect.height;

    if (cardFullyAbove || cardFullyBelow) {
      return true; // Card is in a shadow zone
    }
  }
  return false; // Card is not in a shadow zone
};

const initialCardData = [
  {
    id: 'varfo-testa',
    positionHint: 'left',
    title: "Varför testa?",
    summary: "Snabb koll på systemet.",
    hoverInfo: "Kontrollen visar om din dator klarar Windows 11.",
    details: <p>Att testa i förväg hjälper dig planera för uppgraderingen och undvika överraskningar.</p>
  },
  {
    id: 'systemkrav',
    positionHint: 'left',
    title: "Systemkrav",
    summary: "Hårdvarukrav för Windows 11.",
    hoverInfo: "Klicka för att se kompletta systemkrav.",
    details: <>
      <p>För att köra Windows 11 krävs:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Modern processor (2 GHz+)</li>
        <li>4 GB RAM</li>
        <li>64 GB lagring</li>
        <li>TPM 2.0</li>
        <li>UEFI med Secure Boot</li>
      </ul>
    </>
  },
  {
    id: 'dataskydd',
    positionHint: 'left',
    title: "Dataskydd",
    summary: "Din integritet är viktig.",
    hoverInfo: "Vi skyddar din personliga information.",
    details: <p>Vi samlar bara in information som behövs för kompatibilitetstestet. Dina uppgifter delas aldrig med tredje part och lagras säkert.</p>
  },
  {
    id: 'om-verktyget',
    positionHint: 'right',
    title: "Om verktyget",
    summary: "Så fungerar programmet.",
    hoverInfo: "Håll musen här för mer info.",
    details: <p>Programmet läser av grundläggande hårdvaruinformation och sparar endast det allra nödvändigaste.</p>
  },
  {
    id: 'windows-11-fordelar',
    positionHint: 'right',
    title: "Windows 11 fördelar",
    summary: "Nya funktioner och förbättringar.",
    hoverInfo: "Utforska fördelarna med uppgradering.",
    details: <>
      <p>Windows 11 erbjuder många förbättringar:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Modernt gränssnitt</li>
        <li>Förbättrad prestanda</li>
        <li>Android-appstöd</li>
        <li>Bättre säkerhet</li>
        <li>Förbättrade widgets</li>
      </ul>
    </>
  },
  {
    id: 'hjalp-support',
    positionHint: 'right',
    title: "Hjälp & Support",
    summary: "Behöver du mer hjälp?",
    hoverInfo: "Kontakta oss för support.",
    details: <p>Har du frågor om testet eller behöver hjälp? Kontakta vår support på <a href="mailto:support@helkom.se" className="text-primary hover:underline">support@helkom.se</a>.</p>
  }
];

function HomePage() {
  const cardSizeProfiles = [
    { name: 'small', width: 160, heightRange: [100, 140] },
    { name: 'medium', width: 200, heightRange: [150, 190] },
    { name: 'large', width: 240, heightRange: [130, 170] },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardStyles, setCardStyles] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const mainContentRef = useRef(null);
  const cardsContainerRef = useRef(null);

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

  useEffect(() => {
    const calculatePositions = () => {
      const mobileBreakpoint = 768;
      setIsMobileView(window.innerWidth < mobileBreakpoint);

      if (window.innerWidth < mobileBreakpoint) {
        setCardStyles([]); // Clear styles for smaller screens
        return;
      }

      if (!mainContentRef.current || !cardsContainerRef.current) {
        return; // Refs not ready
      }

      const mainContentRect = mainContentRef.current.getBoundingClientRect();
      const cardsContainerRect = cardsContainerRef.current.getBoundingClientRect();

      const placedCardsRects = [];
      const relativeMainContentRect = {
        x: mainContentRect.left - cardsContainerRect.left,
        y: mainContentRect.top - cardsContainerRect.top,
        width: mainContentRect.width,
        height: mainContentRect.height,
      };

      const newStyles = initialCardData.map((card, index) => {
        let cardPlaced = false;
        let attempts = 0;
        const maxAttempts = 30; // Max attempts to place a card

        // Randomly select a size profile
        const sizeProfile = cardSizeProfiles[Math.floor(Math.random() * cardSizeProfiles.length)];
        const cardWidth = sizeProfile.width;
        // Random height from its range
        const cardHeight = Math.floor(Math.random() * (sizeProfile.heightRange[1] - sizeProfile.heightRange[0] + 1)) + sizeProfile.heightRange[0];

        let currentCardRect = {};

        while (!cardPlaced && attempts < maxAttempts) {
          attempts++; // Moved to the beginning of the loop

          // Determine placement zone using positionHint
          const cardDataForHint = initialCardData[index]; // Get current card data
          const placeOnLeft = cardDataForHint.positionHint === 'left';

          let randomLeft, randomRight;

          // Refined vertical placement logic for randomTop
          let randomTop;
          const verticalBuffer = cardHeight * 0.5; // How much of a card can extend beyond main content vertically
          const mainContentTop = relativeMainContentRect.y;
          const mainContentBottom = relativeMainContentRect.y + relativeMainContentRect.height;

          // Define a preferred vertical zone around the main content
          // Min top position for the card
          let preferredMinY = mainContentTop - verticalBuffer;
          // Max top position for the card
          let preferredMaxY = mainContentBottom + verticalBuffer - cardHeight;

          // Clamp preferredMinY to be at least 5px from the container top
          preferredMinY = Math.max(5, preferredMinY);

          // Clamp preferredMaxY to ensure the card fits within the container and has a 5px bottom buffer
          preferredMaxY = Math.min(cardsContainerRect.height - cardHeight - 5, preferredMaxY);

          if (preferredMaxY > preferredMinY) {
            // If the preferred zone is valid (positive height)
            randomTop = Math.random() * (preferredMaxY - preferredMinY) + preferredMinY;
          } else {
            // Fallback if the preferred zone is invalid or too small
            // Distribute across the full available height, ensuring 5px buffer top/bottom
            let fallbackMinY = 5;
            let fallbackMaxY = cardsContainerRect.height - cardHeight - 5;
            if (fallbackMaxY < fallbackMinY) { // Handle cases where container is too small for card + buffers
                 fallbackMaxY = fallbackMinY; // Place it at min if no room
            }
            randomTop = Math.random() * (fallbackMaxY - fallbackMinY) + fallbackMinY;
          }
          // Ensure randomTop is not NaN if calculation somehow leads to it, though unlikely with checks.
          if (isNaN(randomTop)) randomTop = 5;

          if (placeOnLeft) {
            // Try to place on the left of the main content
            randomLeft = Math.random() * (relativeMainContentRect.x - cardWidth - 10); // 10px buffer from main content
            randomRight = undefined;
          } else {
            // Try to place on the right of the main content
            randomLeft = undefined;
            randomRight = Math.random() * (cardsContainerRect.width - (relativeMainContentRect.x + relativeMainContentRect.width) - cardWidth - 10); // 10px buffer
          }

          // Ensure horizontal positions are not negative (e.g. if main content is too close to edge)
          if (randomLeft !== undefined && randomLeft < 5) randomLeft = 5; // 5px buffer from container edge
          if (randomRight !== undefined && randomRight < 5) randomRight = 5;


          currentCardRect = {
            x: randomLeft !== undefined ? randomLeft : cardsContainerRect.width - randomRight - cardWidth,
            y: randomTop,
            width: cardWidth,
            height: cardHeight,
          };

          // NEW: Shadow Zone Check
          if (isCardInShadowZone(currentCardRect, relativeMainContentRect)) {
            continue; // Invalid position, try a new one for the next attempt
          }

          // EXISTING: Collision check with main content
          let hasOverlap = checkOverlap(currentCardRect, relativeMainContentRect);

          // If no overlap with main content, check other cards
          if (!hasOverlap) {
            for (const placedRect of placedCardsRects) {
              if (checkOverlap(currentCardRect, placedRect)) {
                hasOverlap = true;
                break;
              }
            }
          }

          if (!hasOverlap) {
            cardPlaced = true;
          }
        } // End of while loop

        if (cardPlaced) {
          placedCardsRects.push(currentCardRect);
          return {
            id: card.id,
            style: {
              position: 'absolute',
              width: `${currentCardRect.width}px`,
              height: `${currentCardRect.height}px`,
              top: `${currentCardRect.y}px`,
              left: currentCardRect.x !== undefined && currentCardRect.x < cardsContainerRect.width / 2 ? `${currentCardRect.x}px` : undefined,
              right: currentCardRect.x !== undefined && currentCardRect.x >= cardsContainerRect.width / 2 ? `${cardsContainerRect.width - currentCardRect.x - currentCardRect.width}px` : undefined,
              zIndex: 10, // Default z-index
            },
          };
        } else {
          // Fallback: if card can't be placed, hide it or give it a default position
          console.warn(`Could not place card "${card.title}" after ${maxAttempts} attempts.`);
          return {
            id: card.id,
            style: { display: 'none' }, // Hide if not placeable
          };
        }
      }); // End of initialCardData.map

      setCardStyles(newStyles.filter(s => s.style.display !== 'none')); // Update state with successfully placed cards
    };

    calculatePositions(); // Initial calculation

    // Debounced resize handler
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePositions, 250); // Debounce by 250ms
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array to run on mount and clean up on unmount

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
          ref={mainContentRef}
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
        
        {/* Container for SideInfoBoxes - now dynamically populated */}
        <div ref={cardsContainerRef} className={`mt-8 md:mt-0 w-full md:w-auto ${isMobileView ? '' : 'relative'}`}>
          {isMobileView ? (
            // Mobile view: Stacked cards
            initialCardData.map(cardData => (
              <div key={cardData.id} className="w-full max-w-md mx-auto mb-4 last:mb-0 transform transition-all duration-500"> {/* Added base animation classes */}
                <SideInfoBox
                  position={cardData.positionHint} // Use hint for consistency
                  title={cardData.title}
                  summary={cardData.summary}
                  hoverInfo={cardData.hoverInfo}
                  details={cardData.details}
                />
              </div>
            ))
          ) : (
            // Desktop view: Dynamically positioned cards
            cardStyles.map(item => {
              const cardData = initialCardData.find(cd => cd.id === item.id);
              if (!cardData) return null;
              const boxPositionProp = item.style.left !== undefined ? 'left' : 'right';
              return (
                <div
                  key={cardData.id}
                  style={item.style}
                  className="transform transition-all duration-500 hover:md:scale-105" // Base animation classes
                >
                  <SideInfoBox
                    position={boxPositionProp}
                    title={cardData.title}
                    summary={cardData.summary}
                    hoverInfo={cardData.hoverInfo}
                    details={cardData.details}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
