# Repository Guidelines for Codex

This project contains:

- `react-website/` – React/Vite web app.
- `checker/` – Python-based Windows 11 checker.
- `git_helper.py` – Tkinter GUI for git push/pull.
- `test_checker.py` – minimal script that runs `checker.py`.

## Quick start

### Python checker
1. Install dependencies:
   ```bash
   pip install -r checker/requirements.txt
   ```
2. Run the tool:
   ```bash
   python checker/checker.py
   ```
   (or run `python test_checker.py` for a basic console run.)
3. On Windows you can build a standalone exe via `checker/build.bat`.

### Web app
1. In `react-website/` install packages:
   ```bash
   npm install
   ```
2. Start the dev server with `npm run dev`.
3. Lint the project with `npm run lint`.

## Instructions for Codex
- Preserve Swedish variable names and comments when editing.
- After modifying Python code, run:
  ```bash
  python -m py_compile checker/checker.py
  ```
- After modifying the React project, run `npm run lint` in `react-website`.
- There is no automated test suite beyond these checks.
