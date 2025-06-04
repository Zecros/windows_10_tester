import React from 'react';

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
        
        <div className='code-container'>
          <div className='code-unified-block'>
            <div className='marker marker-1'>1</div>
            <div className='marker marker-2'>2</div>
            <div className='marker marker-3'>3</div>
            <div className='marker marker-4'>4</div>
            <div className='marker marker-5'>5</div>
            <pre><code className='python-code'>
<span className='py-comment'># Windows 11 Compatibility Checker</span>
<span className='py-keyword'>import</span> <span className='py-builtin'>platform</span>, <span className='py-builtin'>psutil</span>, <span className='py-builtin'>webbrowser</span>, <span className='py-builtin'>re</span>

<span className='py-comment'># Konstanter för Windows 11 minimikrav</span>
<span className='py-variable'>MIN_WIN11_RAM_GB</span> = <span className='py-number'>4</span>
<span className='py-variable'>SUPPORTED_CPU_GEN</span> = <span className='py-number'>8</span>
<span className='py-variable'>BASE_URL</span> = <span className='py-string'>"https://windows11check.example.com"</span>

<span className='py-keyword'>def</span> <span className='py-function'>detect</span>() -{'>'} <span className='py-class'>Result</span>:
    <span className='py-variable'>os_name</span> = <span className='py-builtin'>platform</span>.system()
    <span className='py-variable'>os_version</span> = <span className='py-string'>" "</span>.join(<span className='py-builtin'>platform</span>.win32_ver())
    <span className='py-variable'>processor</span> = <span className='py-builtin'>platform</span>.processor()

    <span className='py-variable'>ram_gb</span> = <span className='py-builtin'>int</span>(<span className='py-builtin'>psutil</span>.virtual_memory().total / (<span className='py-number'>1024</span> ** <span className='py-number'>3</span>))

    <span className='py-variable'>tpm_enabled</span> = get_tpm_status()

    <span className='py-comment'># Kontrollera om det redan är Windows 11</span>
    <span className='py-variable'>is_windows_11</span> = <span className='py-keyword'>False</span>
    <span className='py-keyword'>try</span>:
        <span className='py-keyword'>if</span> <span className='py-string'>'windows'</span> <span className='py-keyword'>in</span> <span className='py-variable'>os_name</span>.lower():
            <span className='py-variable'>win_ver</span> = <span className='py-builtin'>platform</span>.win32_ver()[<span className='py-number'>0</span>]
            <span className='py-variable'>is_windows_11</span> = <span className='py-variable'>win_ver</span>.startswith(<span className='py-string'>'11'</span>) <span className='py-keyword'>or</span> <span className='py-builtin'>float</span>(<span className='py-variable'>win_ver</span>) {'>='} <span className='py-number'>11.0</span>
    <span className='py-keyword'>except</span> (<span className='py-class'>ValueError</span>, <span className='py-class'>IndexError</span>):
        <span className='py-keyword'>pass</span>

    <span className='py-comment'># Enkel CPU-generation check (fungerar främst för Intel):</span>
    <span className='py-variable'>cpu_gen</span> = <span className='py-number'>0</span>
    <span className='py-keyword'>try</span>:
        <span className='py-variable'>m</span> = <span className='py-builtin'>re</span>.search(<span className='py-string'>r"\b(\d{'{'}4,5{'}'})U?\b"</span>, <span className='py-variable'>processor</span>)
        <span className='py-keyword'>if</span> <span className='py-variable'>m</span>:
            <span className='py-variable'>model_num</span> = <span className='py-builtin'>int</span>(<span className='py-variable'>m</span>.group(<span className='py-number'>1</span>))
            <span className='py-variable'>cpu_gen</span> = <span className='py-builtin'>int</span>(<span className='py-builtin'>str</span>(<span className='py-variable'>model_num</span>)[<span className='py-number'>0</span>])  <span className='py-comment'># första siffran</span>
    <span className='py-keyword'>except</span> <span className='py-class'>Exception</span>:
        <span className='py-keyword'>pass</span>

    <span className='py-variable'>is_compatible</span> = <span className='py-builtin'>all</span>([
        <span className='py-variable'>ram_gb</span> {'>='} <span className='py-variable'>MIN_WIN11_RAM_GB</span>,
        <span className='py-variable'>tpm_enabled</span>,
        <span className='py-variable'>cpu_gen</span> {'>='} <span className='py-variable'>SUPPORTED_CPU_GEN</span>,
    ])

    <span className='py-variable'>needs_action</span> = <span className='py-keyword'>None</span>
    <span className='py-keyword'>if</span> <span className='py-keyword'>not</span> <span className='py-variable'>is_compatible</span> <span className='py-keyword'>and</span> <span className='py-keyword'>not</span> <span className='py-variable'>is_windows_11</span>:
        <span className='py-variable'>issues</span> = []
        <span className='py-keyword'>if</span> <span className='py-variable'>ram_gb</span> {'<'} <span className='py-variable'>MIN_WIN11_RAM_GB</span>:
            <span className='py-variable'>issues</span>.append(<span className='py-string'>"RAM under 4 GB"</span>)
        <span className='py-keyword'>if</span> <span className='py-keyword'>not</span> <span className='py-variable'>tpm_enabled</span>:
            <span className='py-variable'>issues</span>.append(<span className='py-string'>"Aktivera TPM 2.0 i BIOS"</span>)
        <span className='py-keyword'>if</span> <span className='py-variable'>cpu_gen</span> {'<'} <span className='py-variable'>SUPPORTED_CPU_GEN</span>:
            <span className='py-variable'>issues</span>.append(<span className='py-string'>"Processor behöver vara minst 8-e generationen eller nyare"</span>)
        <span className='py-variable'>needs_action</span> = <span className='py-string'>"; "</span>.join(<span className='py-variable'>issues</span>)

    <span className='py-keyword'>return</span> <span className='py-class'>Result</span>(
        <span className='py-variable'>os_name</span>, <span className='py-variable'>os_version</span>, <span className='py-variable'>processor</span>, <span className='py-variable'>ram_gb</span>, 
        <span className='py-variable'>tpm_enabled</span>, <span className='py-variable'>is_compatible</span>, <span className='py-variable'>is_windows_11</span>, <span className='py-variable'>needs_action</span>
    )

<span className='py-keyword'>def</span> <span className='py-function'>run_check_and_redirect</span>():
    <span className='py-comment'># Kör kontrollen</span>
    <span className='py-variable'>res</span> = detect()

    <span className='py-comment'># Skapa URL med resultatparametrar</span>
    <span className='py-variable'>result_url</span> = <span className='py-string'>f"{'{'}BASE_URL{'}'}/results.html?{'{'}res.to_url_params{'}'}"</span>

    <span className='py-comment'># Öppna webbsidan med resultaten</span>
    <span className='py-builtin'>webbrowser</span>.open(<span className='py-variable'>result_url</span>)
            </code></pre>
          </div>

          <div className='explanation-container'>
            <div className='explanation-block' id='explain-1'>
              <h4>1. Systemdetektering</h4>
              <p>Denna kod samlar in grundläggande information om din dator, inklusive:</p>
              <ul>
                <li>Operativsystemets namn och version</li>
                <li>Processormodell</li>
                <li>Mängden RAM-minne</li>
                <li>Om TPM 2.0 är aktiverat</li>
              </ul>
            </div>
            
            <div className='explanation-block' id='explain-2'>
              <h4>2. Windows 11-kontroll</h4>
              <p>Denna del kontrollerar om du redan kör Windows 11. Detta görs genom att titta på versionsnumret och se om det börjar med "11" eller om det är minst version 11.0.</p>
            </div>
            
            <div className='explanation-block' id='explain-3'>
              <h4>3. Processorgeneration</h4>
              <p>Denna del använder en smart metod för att avgöra processorns generation, vilket är viktigt eftersom Windows 11 kräver minst 8:e generationens Intel-processorer (eller motsvarande).</p>
              <p>Koden letar efter ett 4-5 siffrigt nummer i processornamnet (t.ex. i "Intel Core i5-8400" är 8400 modellnumret). Första siffran (8) indikerar generationen.</p>
            </div>
            
            <div className='explanation-block' id='explain-4'>
              <h4>4. Minimikrav och åtgärder</h4>
              <p>Här kontrolleras om din dator uppfyller minimikraven för Windows 11:</p>
              <ul>
                <li>Minst 4 GB RAM</li>
                <li>TPM 2.0 aktiverat</li>
                <li>Minst 8:e generationens processor</li>
              </ul>
              <p>Om något krav inte uppfylls, genereras en lista med åtgärder som du behöver vidta för att göra din dator kompatibel med Windows 11.</p>
            </div>
            
            <div className='explanation-block' id='explain-5'>
              <h4>5. Återkoppling till webbsidan</h4>
              <p>När programmet är färdigt med kontrollen, öppnas en webbsida automatiskt som visar resultaten på ett snyggt och tydligt sätt.</p>
              <p>Alla systemparametrar (OS, processor, RAM, TPM) skickas till webbsidan så att du kan se detaljerad information om din dator och om den är redo för Windows 11.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default InfoModal;
