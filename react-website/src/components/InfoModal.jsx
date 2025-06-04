import React from 'react';

// Helper function to render code lines with syntax highlighting
const renderCodeLine = (lineParts) => {
  return lineParts.map((part, index) => {
    if (part.children) {
      return <span key={index} className={part.type ? `py-${part.type}` : ''}>{renderCodeLine(part.children)}</span>;
    }
    return <span key={index} className={part.type ? `py-${part.type}` : ''}>{part.text}</span>;
  });
};

const codeExplanationData = [
  {
    id: 'segment-1',
    codeLines: [
      [{ type: 'comment', text: '# Windows 11 Compatibility Checker' }],
      [
        { type: 'keyword', text: 'import' },
        { text: ' ' },
        { type: 'builtin', text: 'platform' },
        { text: ', ' },
        { type: 'builtin', text: 'psutil' },
        { text: ', ' },
        { type: 'builtin', text: 'webbrowser' },
        { text: ', ' },
        { type: 'builtin', text: 're' },
      ],
      [{text: ' '}], // Empty line
      [{ type: 'comment', text: '# Konstanter för Windows 11 minimikrav' }],
      [
        { type: 'variable', text: 'MIN_WIN11_RAM_GB' },
        { text: ' = ' },
        { type: 'number', text: '4' },
      ],
      [
        { type: 'variable', text: 'SUPPORTED_CPU_GEN' },
        { text: ' = ' },
        { type: 'number', text: '8' },
      ],
      [
        { type: 'variable', text: 'BASE_URL' },
        { text: ' = ' },
        { type: 'string', text: '"https://windows11check.example.com"' },
      ],
    ],
    explanation: {
      title: '1. Initialisering & Konstanter',
      text: 'Importerar nödvändiga bibliotek och definierar grundläggande konstanter för Windows 11-kompatibilitetskontrollen.',
      points: [
        'Standardbibliotek för systeminfo (platform, psutil)',
        'Webbläsarkontroll (webbrowser)',
        'Regular expressions (re) för textmatchning',
        'Minimikrav: 4GB RAM, 8:e gen CPU',
      ],
      position: 'right',
      highlightTarget: true,
    },
    topOffsetPx: 20, // Approximate px from the top of the code-content
  },
  {
    id: 'segment-2',
    codeLines: [
      [{text: ' '}], // Empty line
      [
        { type: 'keyword', text: 'def' },
        { text: ' ' },
        { type: 'function', text: 'detect' },
        { text: '() -> ' },
        { type: 'class', text: 'Result' },
        { text: ':' },
      ],
      [
        { text: '    ' },
        { type: 'variable', text: 'os_name' },
        { text: ' = ' },
        { type: 'builtin', text: 'platform' },
        { text: '.system()' },
      ],
      [
        { text: '    ' },
        { type: 'variable', text: 'os_version' },
        { text: ' = ' },
        { type: 'string', text: '" "' },
        { text: '.join(' },
        { type: 'builtin', text: 'platform' },
        { text: '.win32_ver())' },
      ],
      [
        { text: '    ' },
        { type: 'variable', text: 'processor' },
        { text: ' = ' },
        { type: 'builtin', text: 'platform' },
        { text: '.processor()' },
      ],
      [{text: ' '}], // Empty line
      [
        { text: '    ' },
        { type: 'variable', text: 'ram_gb' },
        { text: ' = ' },
        { type: 'builtin', text: 'int' },
        { text: '(' },
        { type: 'builtin', text: 'psutil' },
        { text: '.virtual_memory().total / (' },
        { type: 'number', text: '1024' },
        { text: ' ** ' },
        { type: 'number', text: '3' },
        { text: '))' },
      ],
    ],
    explanation: {
      title: '2. Systemdetektering',
      text: 'Denna funktion samlar in grundläggande information om din dator.',
      points: [
        'Operativsystemets namn och version',
        'Processormodell',
        'Total mängd RAM-minne (omvandlat till GB)',
      ],
      position: 'left',
      highlightTarget: true,
    },
    topOffsetPx: 150,
  },
  {
    id: 'segment-3',
    codeLines: [
        [{text: ' '}],
        [
            { text: '    ' },
            { type: 'variable', text: 'tpm_enabled' },
            { text: ' = get_tpm_status()' },
        ],
        [{text: ' '}],
        [
            { text: '    ' },
            { type: 'comment', text: '# Kontrollera om det redan är Windows 11' },
        ],
        [
            { text: '    ' },
            { type: 'variable', text: 'is_windows_11' },
            { text: ' = ' },
            { type: 'keyword', text: 'False' },
        ],
        [
            { text: '    ' },
            { type: 'keyword', text: 'try' },
            { text: ':' },
        ],
        [
            { text: '        ' },
            { type: 'keyword', text: 'if' },
            { text: ' ' },
            { type: 'string', text: "'windows'" },
            { text: ' ' },
            { type: 'keyword', text: 'in' },
            { text: ' ' },
            { type: 'variable', text: 'os_name' },
            { text: '.lower():' },
        ],
        [
            { text: '            ' },
            { type: 'variable', text: 'win_ver' },
            { text: ' = ' },
            { type: 'builtin', text: 'platform' },
            { text: '.win32_ver()[' },
            { type: 'number', text: '0' },
            { text: ']' },
        ],
        [
            { text: '            ' },
            { type: 'variable', text: 'is_windows_11' },
            { text: ' = ' },
            { type: 'variable', text: 'win_ver' },
            { text: ".startswith(" },
            { type: 'string', text: "'11'" },
            { text: ') ' },
            { type: 'keyword', text: 'or' },
            { text: ' ' },
            { type: 'builtin', text: 'float' },
            { text: '(' },
            { type: 'variable', text: 'win_ver' },
            { text: ') >= ' },
            { type: 'number', text: '11.0' },
        ],
        [
            { text: '    ' },
            { type: 'keyword', text: 'except' },
            { text: ' (' },
            { type: 'class', text: 'ValueError' },
            { text: ', ' },
            { type: 'class', text: 'IndexError' },
            { text: '):' },
        ],
        [
            { text: '        ' },
            { type: 'keyword', text: 'pass' },
        ],
    ],
    explanation: {
      title: '3. TPM & Windows 11 Status',
      text: 'Kontrollerar om TPM (Trusted Platform Module) är aktivt och om systemet redan kör Windows 11.',
      points: [
        'Anropar `get_tpm_status()` (ej visad här) för TPM-info.',
        'Fångar eventuella fel vid versionskontroll för robusthet.',
      ],
      position: 'right',
      highlightTarget: true,
    },
    topOffsetPx: 300,
  },
  {
    id: 'segment-4',
    codeLines: [
        [{text: ' '}],
        [
            { text: '    ' },
            { type: 'comment', text: '# Enkel CPU-generation check (fungerar främst för Intel):' },
        ],
        [
            { text: '    ' },
            { type: 'variable', text: 'cpu_gen' },
            { text: ' = ' },
            { type: 'number', text: '0' },
        ],
        [
            { text: '    ' },
            { type: 'keyword', text: 'try' },
            { text: ':' },
        ],
        [
            { text: '        ' },
            { type: 'variable', text: 'm' },
            { text: ' = ' },
            { type: 'builtin', text: 're' },
            { text: '.search(' },
            { type: 'string', text: 'r"\\b(\\d{4,5})U?\\b"' },
            { text: ', ' },
            { type: 'variable', text: 'processor' },
            { text: ')' },
        ],
        [
            { text: '        ' },
            { type: 'keyword', text: 'if' },
            { text: ' ' },
            { type: 'variable', text: 'm' },
            { text: ':' },
        ],
        [
            { text: '            ' },
            { type: 'variable', text: 'model_num' },
            { text: ' = ' },
            { type: 'builtin', text: 'int' },
            { text: '(' },
            { type: 'variable', text: 'm' },
            { text: '.group(' },
            { type: 'number', text: '1' },
            { text: '))' },
        ],
        [
            { text: '            ' },
            { type: 'variable', text: 'cpu_gen' },
            { text: ' = ' },
            { type: 'builtin', text: 'int' },
            { text: '(' },
            { type: 'builtin', text: 'str' },
            { text: '(' },
            { type: 'variable', text: 'model_num' },
            { text: ')[0])  ' },
            { type: 'comment', text: '# första siffran' },
        ],
        [
            { text: '    ' },
            { type: 'keyword', text: 'except' },
            { text: ' ' },
            { type: 'class', text: 'Exception' },
            { text: ':' },
        ],
        [
            { text: '        ' },
            { type: 'keyword', text: 'pass' },
        ],
    ],
    explanation: {
      title: '4. Processorgeneration',
      text: 'Försöker avgöra processorgenerationen med ett reguljärt uttryck. Detta är en förenklad metod, primärt för Intel-processorer.',
      points: [
        'Letar efter modellnummer (t.ex. 8400 i i5-8400).',
        'Första siffran i modellnumret antas vara generationen.',
        'Felhantering om mönstret inte matchar.',
      ],
      position: 'left',
      highlightTarget: true,
    },
    topOffsetPx: 500,
  },
  {
    id: 'segment-5',
    codeLines: [
      [{text: ' '}],
      [
        { text: '    ' },
        { type: 'variable', text: 'is_compatible' },
        { text: ' = ' },
        { type: 'builtin', text: 'all' },
        { text: '([' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'ram_gb' },
        { text: ' >= ' },
        { type: 'variable', text: 'MIN_WIN11_RAM_GB' },
        { text: ',' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'tpm_enabled' },
        { text: ',' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'cpu_gen' },
        { text: ' >= ' },
        { type: 'variable', text: 'SUPPORTED_CPU_GEN' },
        { text: ',' },
      ],
      [
        { text: '    ' },
        { text: '])' },
      ],
      [{text: ' '}],
      [
        { text: '    ' },
        { type: 'variable', text: 'needs_action' },
        { text: ' = ' },
        { type: 'keyword', text: 'None' },
      ],
      [
        { text: '    ' },
        { type: 'keyword', text: 'if' },
        { text: ' ' },
        { type: 'keyword', text: 'not' },
        { text: ' ' },
        { type: 'variable', text: 'is_compatible' },
        { text: ' ' },
        { type: 'keyword', text: 'and' },
        { text: ' ' },
        { type: 'keyword', text: 'not' },
        { text: ' ' },
        { type: 'variable', text: 'is_windows_11' },
        { text: ':' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'issues' },
        { text: ' = []' },
      ],
      [
        { text: '        ' },
        { type: 'keyword', text: 'if' },
        { text: ' ' },
        { type: 'variable', text: 'ram_gb' },
        { text: ' < ' },
        { type: 'variable', text: 'MIN_WIN11_RAM_GB' },
        { text: ':' },
      ],
      [
        { text: '            ' },
        { type: 'variable', text: 'issues' },
        { text: '.append(' },
        { type: 'string', text: '"RAM under 4 GB"' },
        { text: ')' },
      ],
      [
        { text: '        ' },
        { type: 'keyword', text: 'if' },
        { text: ' ' },
        { type: 'keyword', text: 'not' },
        { text: ' ' },
        { type: 'variable', text: 'tpm_enabled' },
        { text: ':' },
      ],
      [
        { text: '            ' },
        { type: 'variable', text: 'issues' },
        { text: '.append(' },
        { type: 'string', text: '"Aktivera TPM 2.0 i BIOS"' },
        { text: ')' },
      ],
      [
        { text: '        ' },
        { type: 'keyword', text: 'if' },
        { text: ' ' },
        { type: 'variable', text: 'cpu_gen' },
        { text: ' < ' },
        { type: 'variable', text: 'SUPPORTED_CPU_GEN' },
        { text: ':' },
      ],
      [
        { text: '            ' },
        { type: 'variable', text: 'issues' },
        { text: '.append(' },
        { type: 'string', text: '"Processor behöver vara minst 8-e generationen eller nyare"' },
        { text: ')' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'needs_action' },
        { text: ' = ' },
        { type: 'string', text: '"; "' },
        { text: '.join(' },
        { type: 'variable', text: 'issues' },
        { text: ')' },
      ],
    ],
    explanation: {
      title: '5. Kompatibilitetsanalys',
      text: 'Slår samman all insamlad data för att avgöra om systemet är kompatibelt och listar eventuella problem.',
      points: [
        'Kontrollerar RAM, TPM och CPU-generation mot minimikraven.',
        'Om inkompatibel och inte redan Win11, byggs en lista med problem.',
      ],
      position: 'right',
      highlightTarget: true,
    },
    topOffsetPx: 700,
  },
  {
    id: 'segment-6',
    codeLines: [
      [{text: ' '}],
      [
        { text: '    ' },
        { type: 'keyword', text: 'return' },
        { text: ' ' },
        { type: 'class', text: 'Result' },
        { text: '(' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'os_name' },
        { text: ', ' },
        { type: 'variable', text: 'os_version' },
        { text: ', ' },
        { type: 'variable', text: 'processor' },
        { text: ', ' },
        { type: 'variable', text: 'ram_gb' },
        { text: ', ' },
      ],
      [
        { text: '        ' },
        { type: 'variable', text: 'tpm_enabled' },
        { text: ', ' },
        { type: 'variable', text: 'is_compatible' },
        { text: ', ' },
        { type: 'variable', text: 'is_windows_11' },
        { text: ', ' },
        { type: 'variable', text: 'needs_action' },
      ],
      [
        { text: '    ' },
        { text: ')' },
      ],
    ],
    explanation: {
      title: '6. Resultatobjekt',
      text: 'Returnerar ett `Result`-objekt (definition ej visad) som innehåller all systeminformation och kompatibilitetsstatus.',
      points: [],
      position: 'left',
      highlightTarget: false,
    },
    topOffsetPx: 980,
  },
  {
    id: 'segment-7',
    codeLines: [
      [{text: ' '}],
      [
        { type: 'keyword', text: 'def' },
        { text: ' ' },
        { type: 'function', text: 'run_check_and_redirect' },
        { text: '():' },
      ],
      [
        { text: '    ' },
        { type: 'comment', text: '# Kör kontrollen' },
      ],
      [
        { text: '    ' },
        { type: 'variable', text: 'res' },
        { text: ' = detect()' },
      ],
      [{text: ' '}],
      [
        { text: '    ' },
        { type: 'comment', text: '# Skapa URL med resultatparametrar' },
      ],
      [
        { text: '    ' },
        { type: 'variable', text: 'result_url' },
        { text: ' = ' },
        { type: 'string', text: 'f"{BASE_URL}/results.html?{res.to_url_params}"' },
      ],
      [{text: ' '}],
      [
        { text: '    ' },
        { type: 'comment', text: '# Öppna webbsidan med resultaten' },
      ],
      [
        { text: '    ' },
        { type: 'builtin', text: 'webbrowser' },
        { text: '.open(' },
        { type: 'variable', text: 'result_url' },
        { text: ')' },
      ],
      [{text: ' '}], // Trailing empty line for spacing
    ],
    explanation: {
      title: '7. Kör Kontroll & Visa Resultat',
      text: 'Huvudfunktion som kör kompatibilitetskontrollen och omdirigerar användaren till en webbsida för att visa resultaten.',
      points: [
        'Anropar `detect()` för att få resultat.',
        'Formaterar en URL med resultaten som query-parametrar.',
        'Öppnar URL:en i användarens standardwebbläsare.',
      ],
      position: 'right',
      highlightTarget: true,
    },
    topOffsetPx: 1050,
  },
];


function InfoModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  // Calculate total number of code lines for line numbering
  const allCodeLines = codeExplanationData.reduce((acc, segment) => acc.concat(segment.codeLines), []);

  return (
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <aside className='info-modal' role='dialog' aria-modal='true'>
        <button className='info-modal-close-button' onClick={onClose} aria-label='Stäng'>×</button>
        <h2>Programkod förklarad</h2>
        
        <div className="code-editor-container font-mono"> {/* Ensure mono font stack */}
          <div className="editor-toolbar">
            <div className="file-tab active">
              <span className="file-icon">📄</span> checker.py
            </div>
          </div>
          <div className="editor-content">
            <div className="line-numbers">
              {allCodeLines.map((_, index) => (
                <div key={`ln-${index}`} className="line-number">
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="code-content">
              <pre><code className="python-code">
                {codeExplanationData.map(segment => (
                  <div key={segment.id} className={segment.explanation.highlightTarget ? 'code-highlight-segment' : ''}>
                    {segment.codeLines.map((lineParts, lineIdx) => (
                      <div key={lineIdx} className="code-line">
                        {renderCodeLine(lineParts)}
                      </div>
                    ))}
                  </div>
                ))}
              </code></pre>
              {/* Explanations will be positioned absolutely relative to code-content */}
              {codeExplanationData.map(segment => (
                segment.explanation.text && // Only render if there's an explanation
                <div
                  key={`exp-${segment.id}`}
                  className={`explanation-item ${segment.explanation.position === 'left' ? 'explanation-left' : 'explanation-right'}`}
                  style={{ top: `${segment.topOffsetPx}px` }}
                >
                  <h4>{segment.explanation.title}</h4>
                  <p>{segment.explanation.text}</p>
                  {segment.explanation.points && segment.explanation.points.length > 0 && (
                    <ul>
                      {segment.explanation.points.map((point, idx) => <li key={idx}>{point}</li>)}
                    </ul>
                  )}
                  {/* Arrow will be added via CSS pseudo-elements */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default InfoModal;
