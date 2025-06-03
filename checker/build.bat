@echo off
REM Bygger portabel exe med PyInstaller
py -3 -m pip install --upgrade pyinstaller > nul 2>&1
py -3 -m PyInstaller --onefile --noconsole checker.py
pause
