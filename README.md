# Windows 11 Kompatibilitetskontroll

Detta repo innehåller en komplett lösning för att låta kunder testa om deras Windows 10-datorer uppfyller kraven för Windows 11.

## Innehåll

```
website/     → Statisk webbsida (HTML/CSS/JS)
checker/     → Python-baserat testprogram & byggscript
PLAN.md      → Projektplan och tidslinje
README.md    → Du läser den här
```

## Snabbstart

### 1. Webbsidan

```bash
# Kör en enkel webbserver (t.ex. Python 3.x)
python -m http.server --directory website 8000
# Öppna sedan http://localhost:8000 i webbläsaren
```

Webbsidan är helt statisk och kan publiceras på GitHub Pages, Netlify, Vercel m.m.

### 2. Testprogrammet

```bash
cd checker
# Installera beroenden
pip install -r requirements.txt

# Starta programmet i konsoll-läge
python checker.py

# Bygg en portabel exe-fil (kräver Windows & PyInstaller)
build.bat
```

`dist/checker.exe` kan därefter signeras och delas med kunderna.

---
## Säkerhet & integritet

* Programmet **samlar endast minimalt** med data: OS-version, CPU-modell, RAM-mängd, TPM-status samt e-post.
* All kommunikation sker över **HTTPS**.
* Källkoden är öppen för insyn → full transparens.

---
## Support & frågor

Har du frågor eller förbättringsförslag? Skapa gärna ett issue eller kontakta projektansvarig.
