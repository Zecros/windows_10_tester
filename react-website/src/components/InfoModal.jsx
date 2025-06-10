import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Helper function to render code lines with syntax highlighting
const renderCodeLine = (lineParts) => {
  return lineParts.map((part, index) => {
    if (part.children) {
      return <span key={index} className={part.type ? `py-${part.type}` : ''}>{renderCodeLine(part.children)}</span>;
    }
    return <span key={index} className={part.type ? `py-${part.type}` : ''}>{part.text}</span>;
  });
};

// Data för kodsegment med förklaringar
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

  // Use React Portal to render directly to document.body
  // This prevents parent CSS from constraining the modal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop with blur effect - clearly clickable for closing */}
      <div 
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 cursor-pointer transition-opacity duration-300"
        onClick={onClose}
        aria-label="Stäng genom att klicka bakgrunden"
      />
      
      {/* Modal container with glass morphism - larger and more responsive */}
      <div 
        className="relative z-50 w-[95%] max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 scale-[0.98] hover:scale-100"
        style={{
          background: 'rgba(var(--color-secondary-bg-rgb), 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(var(--color-border-rgb), 0.2)',
        }}
      >
        {/* Top decorative gradient bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" 
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
        />
        
        {/* Inner light effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 right-1/4 h-40 opacity-5 blur-2xl" 
            style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
          />
        </div>
        
        {/* Close button - more prominent and responsive */}
        <button 
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full text-xl sm:text-2xl bg-black/5 transition-all duration-300 hover:bg-black/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 shadow-md"
          onClick={onClose} 
          aria-label="Stäng"
          style={{ color: 'var(--color-text)' }}
        >
          ×
        </button>
        
        {/* Content container */}
        <div className="p-4 sm:p-6 md:p-8 relative z-10 overflow-y-auto max-h-[90vh]">
          {/* Title with gradient underline */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              Programkod förklarad
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-primary to-secondary opacity-60" />
          </div>
          
          {/* Code editor with glass morphism */}
          <div 
            className="code-editor-container font-mono rounded-lg overflow-hidden text-xs sm:text-sm" // Base text size for code
            style={{
              background: 'rgba(var(--color-secondary-bg-rgb), 0.3)',
              border: '1px solid rgba(var(--color-border-rgb), 0.3)',
            }}
          > 
            {/* Editor toolbar */}
            <div 
              className="editor-toolbar flex items-center p-1 sm:p-2 border-b border-opacity-20" // Reduced padding on mobile
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="file-tab active flex items-center px-2 sm:px-3 py-1 rounded-md" style={{ background: 'rgba(var(--color-primary-rgb), 0.2)' }}> {/* Reduced padding on mobile */}
                <span className="file-icon mr-1 sm:mr-2">📄</span>
                <span style={{ color: 'var(--color-text)' }}>checker.py</span>
              </div>
            </div>
            
            {/* Editor content */}
            <div className="editor-content flex">
              {/* Line numbers */}
              <div 
                className="line-numbers py-2 sm:py-3 px-1 sm:px-2 text-right select-none" // Reduced padding on mobile
                style={{ 
                  background: 'rgba(0, 0, 0, 0.2)',
                  color: 'rgba(var(--color-text-secondary), 0.6)',
                  minWidth: '2rem' // Adjusted min-width
                }}
              >
                {allCodeLines.map((_, index) => (
                  <div key={`ln-${index}`} className="line-number text-xs sm:text-xs"> {/* Ensure line numbers are consistently small */}
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code content - wider scrollable area */}
              <div className="code-content relative py-2 sm:py-3 px-2 sm:px-4 overflow-x-auto w-full" style={{ color: 'var(--color-text)', position: 'relative' }}> {/* Ensure position relative for absolute positioning of explanations */}
                {/* Track which segment is being hovered */}
                <div className="relative">
                  {/* Code display with hover detection */}
                  <pre className="whitespace-pre-wrap sm:whitespace-pre relative z-10"><code className="python-code"> {/* Wrap text on very small screens */}
                    {codeExplanationData.map(segment => {
                      // Create local state for tracking hover
                      const [isHovered, setIsHovered] = useState(false);
                      
                      return (
                        <div 
                          key={segment.id} 
                          className={`code-segment ${segment.explanation.highlightTarget ? 'code-highlight-segment' : 'hover:bg-primary/5'} ${segment.explanation.text ? 'has-explanation cursor-help' : ''} relative transition-all duration-300`}
                          onMouseEnter={() => segment.explanation.text && setIsHovered(true)}
                          onMouseLeave={() => segment.explanation.text && setIsHovered(false)}
                        >
                          {/* Show a subtle indicator if this segment has an explanation */}
                          {segment.explanation.text && (
                            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40 opacity-75 pulse-animation"></div>
                          )}
                          
                          {/* Code lines */}
                          {segment.codeLines.map((lineParts, lineIdx) => (
                            <div key={lineIdx} className="code-line">
                              {renderCodeLine(lineParts)}
                            </div>
                          ))}
                          
                          {/* Explanation that appears on hover - with smooth fade in/out */}
                          {segment.explanation.text && (
                            <div
                              key={`exp-${segment.id}`}
                              className={`explanation-item ${segment.explanation.position === 'left' ? 'explanation-left' : 'explanation-right'} p-3 sm:p-4 rounded-lg shadow-lg transition-all duration-300`}
                              style={{ 
                                top: `${(segment.codeLines.length * 10)}px`,
                                background: 'rgba(var(--color-secondary-bg-rgb), 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(var(--color-border-rgb), 0.3)',
                                color: 'var(--color-text-secondary)',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                opacity: isHovered ? 1 : 0,
                                visibility: isHovered ? 'visible' : 'hidden',
                                transform: isHovered ? 'translateY(0) scale(1)' : `translateY(${segment.explanation.position === 'left' ? '-10px' : '10px'}) scale(0.98)`,
                                zIndex: isHovered ? 30 : -1
                              }}
                            >
                              {/* Explanation heading with gradient underline */}
                              <h4 className="font-medium mb-2" style={{ color: 'var(--color-text)' }}>{segment.explanation.title}</h4>
                              <div className="h-px w-12 mb-2 rounded-full bg-gradient-to-r from-primary to-secondary opacity-40" />
                              
                              <p className="text-sm mb-2">{segment.explanation.text}</p>
                              
                              {segment.explanation.points && segment.explanation.points.length > 0 && (
                                <ul className="text-xs list-disc pl-4 space-y-1">
                                  {segment.explanation.points.map((point, idx) => <li key={idx}>{point}</li>)}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}

export default InfoModal;
