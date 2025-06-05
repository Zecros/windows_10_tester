"""Windows 11 Compatibility Checker

Körs som portabelt verktyg för att läsa av hårdvaruinformation och avgöra
om datorn uppfyller Microsofts minimikrav för Windows 11.
Skickar minimal sammanfattad data tillbaka till ett API.
"""
from __future__ import annotations

import argparse
import json
import os
import platform
import subprocess
import sys
import time
import tkinter as tk
import webbrowser
import urllib.parse
from dataclasses import dataclass
from tkinter import messagebox, ttk
from typing import Optional

import psutil
import requests

# Standardadresser (kan skrivas över med miljövariabler eller CLI-flaggor)
DEFAULT_API_URL = "https://example.com/api/compat-result"
DEFAULT_BASE_URL = "http://localhost:8000"

# Aktiva adresser som används av programmet
API_URL = DEFAULT_API_URL
BASE_URL = DEFAULT_BASE_URL

# Läs in miljövariabler och CLI-flaggor
def _configure_urls() -> None:
    """Sätt API_URL och BASE_URL från miljövariabler eller argument."""
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--api-url", dest="api_url")
    parser.add_argument("--base-url", dest="base_url")
    args, _ = parser.parse_known_args()

    global API_URL, BASE_URL
    API_URL = args.api_url or os.getenv("API_URL", DEFAULT_API_URL)
    BASE_URL = args.base_url or os.getenv("BASE_URL", DEFAULT_BASE_URL)

# Windows 11 minimikrav (förenklat)
MIN_WIN11_RAM_GB = 4
SUPPORTED_CPU_GEN = 8  # Intel 8th gen motsv.


@dataclass
class Result:
    os_name: str
    os_version: str
    processor: str
    ram_gb: int
    tpm_enabled: bool
    is_compatible: bool
    is_windows_11: bool = False
    needs_action: Optional[str] = None

    def to_json(self, email: str) -> str:
        """Konvertera till JSON för API-anrop"""
        data = {
            "email": email,
            "os": self.os_name,
            "os_version": self.os_version,
            "processor": self.processor,
            "ram_gb": self.ram_gb,
            "tpm_enabled": self.tpm_enabled,
            "is_compatible": self.is_compatible,
            "is_windows_11": self.is_windows_11,
        }
        return json.dumps(data)
        
    def to_url_params(self) -> str:
        """Konvertera resultat till URL-parametrar"""
        params = {
            "os": self.os_name,
            "osVersion": self.os_version,
            "processor": self.processor,
            "ramGb": str(self.ram_gb),
            "tpmEnabled": "true" if self.tpm_enabled else "false",
            "isCompatible": "true" if self.is_compatible else "false",
            "isWindows11": "true" if self.is_windows_11 else "false",
        }
        return urllib.parse.urlencode(params)

    def pretty(self) -> str:
        lines = [
            "Windows 11 – kompatibilitetsresultat:",
            f"Operativsystem: {self.os_version}",
            f"Processor:      {self.processor}",
            f"RAM:            {self.ram_gb} GB",
            f"TPM 2.0:        {'Aktiverad' if self.tpm_enabled else 'Ej aktiverad'}",
            "",
            "Bedömning:"
        ]
        
        if self.is_windows_11:
            lines.append("[OK] Du har redan Windows 11 installerat!")
        elif self.is_compatible:
            lines.append("[OK] Din dator uppfyller kraven för Windows 11!")
        else:
            lines.append("[X] Datorn uppfyller inte kraven.")
            if self.needs_action:
                lines.append(f"   - {self.needs_action}")
        return "\n".join(lines)


def get_tpm_status() -> bool:
    """Returnerar True om TPM är aktiverat och version >= 2.0"""
    try:
        output = subprocess.check_output(
            [
                "powershell",
                "-Command",
                "(Get-Tpm).TpmPresent, (Get-Tpm).TpmReady"
            ],
            text=True,
            stderr=subprocess.DEVNULL,
        )
        present, ready = output.strip().split()
        return present.lower() == "true" and ready.lower() == "true"
    except Exception:
        return False


def detect() -> Result:
    os_name = platform.system()
    os_version = " ".join(platform.win32_ver())
    processor = platform.processor()

    ram_gb = int(psutil.virtual_memory().total / (1024 ** 3))

    tpm_enabled = get_tpm_status()
    
    # Kontrollera om det redan är Windows 11
    is_windows_11 = False
    try:
        if 'windows' in os_name.lower():
            win_ver = platform.win32_ver()[0]
            is_windows_11 = win_ver.startswith('11') or float(win_ver) >= 11.0
    except (ValueError, IndexError):
        pass

    # Enkel CPU-generation check (fungerar främst för Intel):
    cpu_gen = 0
    try:
        import re
        m = re.search(r"\b(\d{4,5})U?\b", processor)
        if m:
            model_num = int(m.group(1))
            cpu_gen = int(str(model_num)[0])  # första siffran
    except Exception:
        pass

    is_compatible = all([
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
        needs_action = "; ".join(issues)

    return Result(
        os_name=os_name, 
        os_version=os_version, 
        processor=processor, 
        ram_gb=ram_gb, 
        tpm_enabled=tpm_enabled, 
        is_compatible=is_compatible, 
        is_windows_11=is_windows_11, 
        needs_action=needs_action
    )


def main():
    # Läs in användarspecificerade URL:er
    _configure_urls()

    # Skapa GUI-fönster
    root = tk.Tk()
    root.title("Windows 11 Kompatibilitetskontroll")
    root.geometry("500x400")
    root.resizable(False, False)
    
    # Centrera fönstret på skärmen
    window_width = 500
    window_height = 400
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = int((screen_width / 2) - (window_width / 2))
    y = int((screen_height / 2) - (window_height / 2))
    root.geometry(f"{window_width}x{window_height}+{x}+{y}")
    
    # Gör en fin bakgrund och stil
    style = ttk.Style()
    style.configure('TFrame', background='#f5f7fa')
    style.configure('TLabel', background='#f5f7fa', font=('Segoe UI', 10))
    style.configure('TButton', font=('Segoe UI', 10))
    style.configure('Header.TLabel', font=('Segoe UI', 16, 'bold'))
    
    # Huvudframe
    main_frame = ttk.Frame(root, style='TFrame', padding=20)
    main_frame.pack(fill=tk.BOTH, expand=True)
    
    # Rubrik
    header_label = ttk.Label(
        main_frame, 
        text="Windows 11 Kompatibilitetskontroll",
        style='Header.TLabel'
    )
    header_label.pack(pady=(0, 20))
    
    # Resultatframe
    result_frame = ttk.Frame(main_frame, style='TFrame')
    result_frame.pack(fill=tk.BOTH, expand=True, pady=10)
    
    # Statussida som visar under kontrollen
    status_label = ttk.Label(
        result_frame,
        text="Kontrollerar ditt system...",
        font=('Segoe UI', 11)
    )
    status_label.pack(pady=10)
    
    # Progressbar för visuell feedback
    progress = ttk.Progressbar(
        result_frame, 
        orient="horizontal", 
        length=300, 
        mode="indeterminate"
    )
    progress.pack(pady=10)
    progress.start(10)
    
    # Resultattext (visas efter kontrollen)
    result_text = tk.Text(result_frame, height=10, width=50, wrap=tk.WORD)
    result_text.pack(fill=tk.BOTH, expand=True)
    result_text.config(state=tk.DISABLED)  # Gör read-only
    
    # Anonym e-postadress för rapportering
    email = f"anonymuser_{int(time.time())}@example.com"
    
    def run_check_and_redirect():
        # Kör kontrollen
        res = detect()
        
        # Skapa URL med resultatparametrar
        result_url = f"{BASE_URL}/results.html?{res.to_url_params()}"
        
        # Öppna webbsidan med resultaten
        webbrowser.open(result_url)
        
        # Skicka även data till API (om det behövs i framtiden)
        try:
            headers = {"Content-Type": "application/json"}
            requests.post(API_URL,
                         data=res.to_json(email),
                         headers=headers,
                         timeout=10)
        except Exception:
            pass  # Tyst felhantering
            
        # Stäng programmet
        root.destroy()
    
    # Kör kontrollen efter en kort fördröjning (så att GUI hinner visa sig)
    root.after(1000, run_check_and_redirect)
    
    # Starta applikationen
    root.mainloop()


if __name__ == "__main__":
    main()
