import React from 'react';
// Styles will be imported globally via index.css in App.jsx or main.jsx

function InfoModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <aside className='info-modal' role='dialog' aria-modal='true'>
        <button className='info-modal-close-button' onClick={onClose} aria-label='Stäng'>×</button>
        <h2>Programkod förklarad</h2>

        <div className='code-section'>
          <h3>1. Systemkontroll</h3>
          <div className='code-highlight'>
            <div className='highlight-circle' style={{ top: '15px' }}>1</div> {/* style can be kept for dynamic parts if needed */}
            <pre><code>{`def detect() -> Result:
    os_name = platform.system()
    os_version = " ".join(platform.win32_ver())
    processor = platform.processor()

    ram_gb = int(psutil.virtual_memory().total / (1024 ** 3))

    tpm_enabled = get_tpm_status() `}</code></pre>
          </div>
          <div className='explanation'>
            <h4>Systemdetektering</h4>
            <p>Denna kod samlar in grundläggande information om din dator, inklusive:</p>
            <ul>
              <li>Operativsystemets namn och version</li>
              <li>Processormodell</li>
              <li>Mängden RAM-minne</li>
              <li>Om TPM 2.0 är aktiverat</li>
            </ul>
          </div>
          <div className='code-highlight'>
            <div className='highlight-circle' style={{ top: '15px' }}>2</div>
            <pre><code>{`    # Kontrollera om det redan är Windows 11
    is_windows_11 = False
    try:
        if 'windows' in os_name.lower():
            win_ver = platform.win32_ver()[0]
            is_windows_11 = win_ver.startswith('11') or float(win_ver) >= 11.0
    except (ValueError, IndexError):
        pass `}</code></pre>
          </div>
          <div className='explanation'>
            <h4>Windows 11-kontroll</h4>
            <p>Denna del kontrollerar om du redan kör Windows 11. Detta görs genom att titta på versionsnumret och se om det börjar med "11" eller om det är minst version 11.0.</p>
          </div>
        </div>

        <div className='code-section'>
          <h3>2. Processoranalys</h3>
          <div className='code-highlight'>
            <div className='highlight-circle' style={{ top: '15px' }}>3</div>
            <pre><code>{`    # Enkel CPU-generation check (fungerar främst för Intel):
    cpu_gen = 0
    try:
        import re
        m = re.search(r"\b(\d{4,5})U?\b", processor)
        if m:
            model_num = int(m.group(1))
            cpu_gen = int(str(model_num)[0])  # första siffran
    except Exception:
        pass `}</code></pre>
          </div>
          <div className='explanation'>
            <h4>Processorgeneration</h4>
            <p>Denna del använder en smart metod för att avgöra processorns generation, vilket är viktigt eftersom Windows 11 kräver minst 8:e generationens Intel-processorer (eller motsvarande).</p>
            <p>Koden letar efter ett 4-5 siffrigt nummer i processornamnet (t.ex. i "Intel Core i5-8400" är 8400 modellnumret). Första siffran (8) indikerar generationen.</p>
          </div>
        </div>

        <div className='code-section'>
          <h3>3. Kompatibilitetsbedömning</h3>
          <div className='code-highlight'>
            <div className='highlight-circle' style={{ top: '15px' }}>4</div>
            <pre><code>{`    is_compatible = all([
        ram_gb >= MIN_WIN11_RAM_GB,
        tpm_enabled,
        cpu_gen >= SUPPORTED_CPU_GEN,
    ])

    needs_action = None
    if not is_compatible and not is_windows_11:
        issues = []
        if ram_gb < MIN_WIN11_RAM_GB:
            issues.append("RAM under 4 GB")
        if not tpm_enabled:
            issues.append("Aktivera TPM 2.0 i BIOS")
        if cpu_gen < SUPPORTED_CPU_GEN:
            issues.append("Processor behöver vara minst 8-e generationen eller nyare")
        needs_action = "; ".join(issues) `}</code></pre>
          </div>
          <div className='explanation'>
            <h4>Minimikrav och åtgärder</h4>
            <p>Här kontrolleras om din dator uppfyller minimikraven för Windows 11:</p>
            <ul>
              <li>Minst 4 GB RAM</li>
              <li>TPM 2.0 aktiverat</li>
              <li>Minst 8:e generationens processor</li>
            </ul>
            <p>Om något krav inte uppfylls, genereras en lista med åtgärder som du behöver vidta för att göra din dator kompatibel med Windows 11.</p>
          </div>
        </div>

        <div className='code-section'>
          <h3>4. Resultatvisning</h3>
          <div className='code-highlight'>
            <div className='highlight-circle' style={{ top: '15px' }}>5</div>
            <pre><code>{`def run_check_and_redirect():
    # Kör kontrollen
    res = detect()

    # Skapa URL med resultatparametrar
    result_url = f"{BASE_URL}/results.html?{res.to_url_params()}"

    # Öppna webbsidan med resultaten
    webbrowser.open(result_url) `}</code></pre>
          </div>
          <div className='explanation'>
            <h4>Återkoppling till webbsidan</h4>
            <p>När programmet är färdigt med kontrollen, öppnas en webbsida automatiskt som visar resultaten på ett snyggt och tydligt sätt.</p>
            <p>Alla systemparametrar (OS, processor, RAM, TPM) skickas till webbsidan så att du kan se detaljerad information om din dator och om den är redo för Windows 11.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default InfoModal;
