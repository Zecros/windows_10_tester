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
    <div className='results-container'>
      <header className='results-header'>
        <h1>Windows 11 Kompatibilitetsresultat</h1>
        <p>Här är resultatet av din systemanalys</p>
      </header>

      <main>
        <div className='result-box'>
          <h2>Din dators specifikationer:</h2>
          <div className='result-item'><span className='result-label'>Operativsystem:</span><span className='result-value'>{results.osVersion}</span></div>
          <div className='result-item'><span className='result-label'>Processor:</span><span className='result-value'>{results.processor}</span></div>
          <div className='result-item'><span className='result-label'>RAM-minne:</span><span className='result-value'>{results.ramGb}</span></div>
          <div className='result-item'><span className='result-label'>TPM 2.0:</span><span className='result-value'>{results.tpmEnabled}</span></div>
        </div>

        {results.isWindows11 === 'true' && (
          <div className='verdict windows11'>
            Du kör redan Windows 11! Det finns inget behov av att uppgradera.
          </div>
        )}

        {results.isWindows11 === 'false' && results.isCompatible === 'true' && (
          <div className='verdict compatible'>
            Gratulerar! Din dator uppfyller alla krav för Windows 11.
          </div>
        )}

        {results.isWindows11 === 'false' && results.isCompatible === 'false' && (
          <>
            <div className='verdict not-compatible'>
              Din dator uppfyller inte alla krav för Windows 11.
            </div>
            {actions.length > 0 && (
              <div id='action-items' className='action-items-container'>
                <h3>Rekommenderade åtgärder:</h3>
                <div id='action-list'>
                  {actions.map((action, index) => (
                    <div key={index} className='action-item'>{action}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className='results-info-box'>
          <h3>Vad händer nu?</h3>
          <p>Tack för att du använde vårt verktyg för att kontrollera Windows 11-kompatibilitet. Vi sparar minimal information om ditt system för att kunna förbättra vår service och hjälpa fler användare.</p>
          <p>Om du har frågor eller behöver hjälp med uppgradering till Windows 11, kontakta oss gärna. Vi har experter som kan guida dig genom processen.</p>
          <Link to='/' className='results-button'>Tillbaka till startsidan</Link>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
