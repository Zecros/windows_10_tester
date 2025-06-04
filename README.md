# Windows 11 Kompatibilitetskontroll

Detta repo innehåller en komplett lösning för att låta kunder testa om deras Windows 10-datorer uppfyller kraven för Windows 11.

## Innehåll

```
react-website/ → React-baserad webbapp
checker/     → Python-baserat testprogram & byggscript
PLAN.md      → Projektplan och tidslinje
README.md    → Du läser den här
```

## Snabbstart

### 1. Webbsidan

```bash
cd react-website
npm install
npm run dev
```

Webbappen byggs med React och Vite och har stöd för mörkt läge via en temaväxlare.

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
