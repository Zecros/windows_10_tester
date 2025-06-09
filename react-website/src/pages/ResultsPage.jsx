import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Styles are now primarily in index.css

function ResultsPage() {
  const [results, setResults] = useState({
    osVersion: 'Okänd',
    processor: 'Okänd',
    ramGb: 'Okänd',
    tpmEnabled: 'false',
    isWindows11: 'false',
    isCompatible: 'false',
    needsAction: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setResults({
      osVersion: params.get('osVersion') || 'Okänd',
      processor: params.get('processor') || 'Okänd',
      ramGb: params.get('ramGb') ? `${params.get('ramGb')} GB` : 'Okänd',
      tpmEnabled: params.get('tpmEnabled') === 'true' ? 'Aktiverad' : 'Ej aktiverad',
      isWindows11: params.get('isWindows11') === 'true' ? 'true' : 'false',
      isCompatible: params.get('isCompatible') === 'true' ? 'true' : 'false',
      needsAction: params.get('needsAction') || '',
    });
  }, []);

  const actions = results.needsAction.split(';').map(action => action.trim()).filter(action => action);

  return (
    <div className='results-container sm:my-8 sm:p-6 md:p-8'> {/* Responsive margin/padding via Tailwind */}
      <header className='results-header'>
        {/* h1 styled by .results-header h1 (base 1.5rem), responsive size via Tailwind */}
        <h1 className="sm:text-2xl md:text-3xl">Windows 11 Kompatibilitetsresultat</h1>
        {/* p styled by .results-header p (base 1rem), responsive size via Tailwind */}
        <p className="sm:text-lg md:text-xl">Här är resultatet av din systemanalys</p>
      </header>

      <main>
        <div className='result-box my-4 sm:my-6 md:my-8'> {/* Responsive margins */}
          {/* Using .results-section-title (base 1.25rem from CSS), responsive size via Tailwind */}
          <h2 className="results-section-title sm:text-xl md:text-2xl">Din dators specifikationer:</h2>
          {/* .result-item is styled in custom.css */}
          <div className='result-item'><span className='result-label'>Operativsystem:</span><span className='result-value text-sm sm:text-base'>{results.osVersion}</span></div>
          <div className='result-item'><span className='result-label'>Processor:</span><span className='result-value text-sm sm:text-base'>{results.processor}</span></div>
          <div className='result-item'><span className='result-label'>RAM-minne:</span><span className='result-value text-sm sm:text-base'>{results.ramGb}</span></div>
          <div className='result-item'><span className='result-label'>TPM 2.0:</span><span className='result-value text-sm sm:text-base'>{results.tpmEnabled}</span></div>
        </div>

        {results.isWindows11 === 'true' && (
          /* .verdict.windows11 styled in custom.css, responsive text via Tailwind */
          <div className='verdict windows11 text-base sm:text-lg'>
            Du kör redan Windows 11! Det finns inget behov av att uppgradera.
          </div>
        )}

        {results.isWindows11 === 'false' && results.isCompatible === 'true' && (
          /* .verdict.compatible styled in custom.css, responsive text via Tailwind */
          <div className='verdict compatible text-base sm:text-lg'>
            Gratulerar! Din dator uppfyller alla krav för Windows 11.
          </div>
        )}

        {results.isWindows11 === 'false' && results.isCompatible === 'false' && (
          <>
            {/* .verdict.not-compatible styled in custom.css, responsive text via Tailwind */}
            <div className='verdict not-compatible text-base sm:text-lg'>
              Din dator uppfyller inte alla krav för Windows 11.
            </div>
            {actions.length > 0 && (
              <div id='action-items' className='action-items-container my-4 sm:my-6 md:my-8'> {/* Responsive margins */}
                {/* Using .results-section-title (base 1.25rem from CSS), responsive size via Tailwind */}
                <h3 className="results-section-title sm:text-xl md:text-2xl">Rekommenderade åtgärder:</h3>
                <div id='action-list'>
                  {/* .action-item styled in custom.css (base text from there), responsive text via Tailwind */}
                  {actions.map((action, index) => (
                    <div key={index} className='action-item text-sm sm:text-base'>{action}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className='results-info-box my-4 sm:my-6 md:my-8'> {/* Responsive margins */}
          {/* Using .results-section-title (base 1.25rem from CSS), responsive size via Tailwind */}
          <h3 className="results-section-title sm:text-xl md:text-2xl">Vad händer nu?</h3>
          {/* Using .results-text (base 0.9rem from CSS), responsive text via Tailwind */}
          <p className="results-text sm:text-base md:text-lg">Tack för att du använde vårt verktyg för att kontrollera Windows 11-kompatibilitet. Vi sparar minimal information om ditt system för att kunna förbättra vår service och hjälpa fler användare.</p>
          <p className="results-text sm:text-base md:text-lg">Om du har frågor eller behöver hjälp med uppgradering till Windows 11, kontakta oss gärna. Vi har experter som kan guida dig genom processen.</p>
          {/* .results-button styled in custom.css (base padding/font), responsive padding/font via Tailwind */}
          <Link to='/' className='results-button sm:px-7 sm:py-2.5 md:px-8 md:py-3 sm:text-base md:text-lg'>Tillbaka till startsidan</Link>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
