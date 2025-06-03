# Projektplan: Windows 11 Kompatibilitetskontroll

Denna plan beskriver **alla steg** för att bygga en komplett lösning som låter kunder kontrollera om deras Windows 10-datorer är klara för Windows 11. Planen täcker front-end (hemsida), det portabla testprogrammet, samt distribution och uppföljning.

---
## 1. Översikt

| Del | Teknik | Syfte |
|-----|--------|-------|
| **Webbsida** | HTML + CSS + Vanilla JS | Samlar e-post + informerar + tillhandahåller nedladdningslänk |
| **Testprogram (exe)** | Python 3 + PyInstaller | Samlar hårdvaruinfo, utvärderar kompatibilitet, visar resultat, skickar summerad data |
| **Server-API (senare)** | valfritt (Node/Python) | Tar emot JSON-payload för uppföljning |

---
## 2. Projektstruktur

```
Windows_11_Checker/
├── PLAN.md               ← denna plan
├── README.md             ← bygga & köra-instruktioner
├── website/              ← statisk klient
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── checker/              ← Python-källkod
    ├── checker.py
    ├── requirements.txt
    └── build.bat         ← enklicks-kompilering med PyInstaller
```

---
## 3. Steg-för-steg

### Steg 1 – Miljö & repo
1. Skapa mapp enligt projektstrukturen ovan.
2. Initiera t.ex. **git** (valfritt).
3. Lägg in denna `PLAN.md` så allt är tydligt.

### Steg 2 – Webbsida
1. **index.html** – formulär (e-post), info-knapp, nedladdningsknapp.
2. **styles.css** – modern, responsiv design, mörk / ljus mode.
3. **script.js**
   * Hantera info-modal (öppna/stäng).
   * POST:a e-post till API.
   * Starta filnedladdning.
4. Testa lokalt via valfri live-server.

### Steg 3 – Testprogram (Python)
1. `checker.py`
   * Hämta:
     * Windows-version med `platform.win32_ver()`.
     * CPU-info med `platform.processor()`.
     * RAM med `psutil.virtual_memory()`.
     * TPM-status via PowerShell-cmdlet `Get-Tpm`.
   * Utvärdera mot Microsoft-kraven och generera läsbar rapport.
   * Visa resultat i konsol **och** valfritt GUI-ruta (tkinter messagebox).
   * Skicka JSON (endast OS, CPU, RAM, TPM, e-post) med **HTTPS** till backend.
2. `requirements.txt` – `psutil`, `requests`.
3. `build.bat` – `pyinstaller --onefile --noconsole checker.py`.
4. Testkör på ren Windows 10.

### Steg 4 – Digital signering
1. Skaffa kod-certifikat (t.ex. EV Code Signing).
2. Signera `dist/checker.exe` via `signtool`.
3. Verifiera signaturen.

### Steg 5 – Distribution
1. Lägg `checker.exe` i `website/downloads/` eller CDN.
2. Publicera webbsidan (GitHub Pages / Netlify etc.).
3. Testa hel flöde – formulär → nedladdning → kör exe → rapport skickas.

### Steg 6 – Uppföljning & support
1. Server lägger inkommande JSON i CRM/databas.
2. Automatiserad/Manuell e-post med råd.

---
## 4. Tidslinje (förslag)

| Dag | Aktivitet |
|-----|-----------|
| 1 | Repo + webbsida-skelett |
| 2 | Färdigställa webbsidan |
| 3 | Implementera `checker.py` |
| 4 | Bygga & testa exe |
| 5 | Signera & publicera |
| 6 | Sätta upp API & automatiserad e-post |

---
## 5. Säkerhet & Integritet
* SSL/TLS på all trafik.
* Öppen källkod – transparens.
* Minimerad datapublikation.
* Lokalt testprogram kör endast läs-operationer.

---
## 6. Nästa steg
> ✔️ **Vi går nu vidare och börjar bygga den första versionen av webbsidan och testprogrammet enligt planen.**
