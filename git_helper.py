"""
Git Helper - Enkel GUI för Git Push och Pull

Detta program ger ett enkelt grafiskt gränssnitt för att pusha och pulla 
ändringar till/från GitHub utan att behöva använda kommandoraden.
"""

import tkinter as tk
from tkinter import scrolledtext, messagebox
import subprocess
import os
import sys

class GitHelperApp:
    def __init__(self, root, repo_path):
        self.root = root
        self.repo_path = repo_path
        
        # Fönsterinställningar
        self.root.title("Git Helper")
        self.root.geometry("600x500")
        self.root.resizable(True, True)
        
        # Huvudram
        main_frame = tk.Frame(self.root, padx=20, pady=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Titel
        title_label = tk.Label(
            main_frame,
            text="Git Helper - Windows 11 Kompatibilitetskontroll",
            font=("Segoe UI", 14, "bold")
        )
        title_label.pack(pady=(0, 20))
        
        # Knappram
        button_frame = tk.Frame(main_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        # Push-knapp
        self.push_button = tk.Button(
            button_frame,
            text="Push till GitHub",
            command=self.push_changes,
            bg="#4CAF50",
            fg="white",
            font=("Segoe UI", 10, "bold"),
            padx=20,
            pady=10
        )
        self.push_button.pack(side=tk.LEFT, padx=10)
        
        # Pull-knapp
        self.pull_button = tk.Button(
            button_frame,
            text="Pull från GitHub",
            command=self.pull_changes,
            bg="#2196F3",
            fg="white",
            font=("Segoe UI", 10, "bold"),
            padx=20,
            pady=10
        )
        self.pull_button.pack(side=tk.LEFT, padx=10)
        
        # Status-text
        status_label = tk.Label(
            main_frame,
            text="Git-status:",
            font=("Segoe UI", 10),
            anchor="w"
        )
        status_label.pack(fill=tk.X, pady=(20, 5), anchor="w")
        
        # Textområde för output
        self.output_text = scrolledtext.ScrolledText(
            main_frame,
            height=15,
            font=("Consolas", 10),
            bg="#f5f5f5"
        )
        self.output_text.pack(fill=tk.BOTH, expand=True)
        
        # Repositorysökväg
        path_label = tk.Label(
            main_frame,
            text=f"Repository: {self.repo_path}",
            font=("Segoe UI", 8),
            fg="#555555"
        )
        path_label.pack(pady=(10, 0), anchor="w")
        
        # Inledande kontroll av Git-status
        self.show_status()
    
    def show_status(self):
        """Visar aktuell Git-status"""
        self.output_text.delete(1.0, tk.END)
        
        # Kolla om .git-mappen finns
        if not os.path.exists(os.path.join(self.repo_path, ".git")):
            self.output_text.insert(tk.END, "VARNING: Detta är inte ett Git-repository!\n")
            self.output_text.insert(tk.END, "Kör 'git init' först eller använd ett befintligt Git-projekt.\n")
            return
            
        # Kör git status
        result = self.run_git_command(["status"])
        if result.returncode == 0:
            self.output_text.insert(tk.END, "AKTUELL STATUS:\n\n")
            self.output_text.insert(tk.END, result.stdout)
        else:
            self.output_text.insert(tk.END, "Fel vid hämtning av Git-status:\n")
            self.output_text.insert(tk.END, result.stderr)
    
    def run_git_command(self, command):
        """Kör ett Git-kommando och returnerar resultatet"""
        process = subprocess.run(
            ["git"] + command,
            cwd=self.repo_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            encoding='utf-8'
        )
        return process
    
    def push_changes(self):
        """Pushar ändringar till GitHub"""
        self.output_text.delete(1.0, tk.END)
        self.output_text.insert(tk.END, "Pushar ändringar till GitHub...\n\n")
        self.root.update_idletasks()
        
        # Steg 1: Lägg till alla filer
        self.output_text.insert(tk.END, "Steg 1: Lägger till ändrade filer...\n")
        add_result = self.run_git_command(["add", "."])
        if add_result.returncode != 0:
            self.output_text.insert(tk.END, "Fel vid 'git add':\n")
            self.output_text.insert(tk.END, add_result.stderr)
            return
        self.output_text.insert(tk.END, "Filer tillagda framgångsrikt.\n\n")
        
        # Steg 2: Skapa commit
        self.output_text.insert(tk.END, "Steg 2: Skapar commit...\n")
        # Få aktuellt datum och tid för commit-meddelandet
        from datetime import datetime
        commit_message = f"Uppdatering {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        commit_result = self.run_git_command(["commit", "-m", commit_message])
        
        if "nothing to commit" in commit_result.stdout:
            self.output_text.insert(tk.END, "Inga ändringar att committa.\n\n")
        elif commit_result.returncode != 0:
            self.output_text.insert(tk.END, "Fel vid 'git commit':\n")
            self.output_text.insert(tk.END, commit_result.stderr)
            return
        else:
            self.output_text.insert(tk.END, f"Commit skapad med meddelande: '{commit_message}'\n")
            self.output_text.insert(tk.END, commit_result.stdout + "\n\n")
        
        # Steg 3: Push till GitHub
        self.output_text.insert(tk.END, "Steg 3: Pushar till GitHub...\n")
        push_result = self.run_git_command(["push", "origin", "main"])
        
        if push_result.returncode == 0:
            self.output_text.insert(tk.END, "Push genomförd framgångsrikt!\n")
            self.output_text.insert(tk.END, push_result.stdout)
            messagebox.showinfo("Framgång", "Ändringar pushade till GitHub!")
        else:
            # Om push misslyckas, försök med aktuell branch
            current_branch = self.get_current_branch()
            if current_branch and current_branch != "main":
                self.output_text.insert(tk.END, f"Försöker pusha till branch '{current_branch}' istället...\n")
                push_result = self.run_git_command(["push", "origin", current_branch])
                
                if push_result.returncode == 0:
                    self.output_text.insert(tk.END, "Push genomförd framgångsrikt!\n")
                    self.output_text.insert(tk.END, push_result.stdout)
                    messagebox.showinfo("Framgång", f"Ändringar pushade till branch '{current_branch}'!")
                else:
                    self.output_text.insert(tk.END, "Fel vid 'git push':\n")
                    self.output_text.insert(tk.END, push_result.stderr)
                    messagebox.showerror("Fel", "Kunde inte pusha ändringar. Se logg för detaljer.")
            else:
                self.output_text.insert(tk.END, "Fel vid 'git push':\n")
                self.output_text.insert(tk.END, push_result.stderr)
                messagebox.showerror("Fel", "Kunde inte pusha ändringar. Se logg för detaljer.")
    
    def pull_changes(self):
        """Hämtar ändringar från GitHub"""
        self.output_text.delete(1.0, tk.END)
        self.output_text.insert(tk.END, "Hämtar ändringar från GitHub...\n\n")
        self.root.update_idletasks()
        
        # Kör git pull
        current_branch = self.get_current_branch()
        pull_result = self.run_git_command(["pull", "origin", current_branch or "main"])
        
        if pull_result.returncode == 0:
            self.output_text.insert(tk.END, "Pull genomförd framgångsrikt!\n\n")
            self.output_text.insert(tk.END, pull_result.stdout)
            
            if "Already up to date" in pull_result.stdout:
                messagebox.showinfo("Information", "Redan uppdaterad! Inga nya ändringar.")
            else:
                messagebox.showinfo("Framgång", "Ändringar hämtade från GitHub!")
        else:
            self.output_text.insert(tk.END, "Fel vid 'git pull':\n")
            self.output_text.insert(tk.END, pull_result.stderr)
            messagebox.showerror("Fel", "Kunde inte hämta ändringar. Se logg för detaljer.")
    
    def get_current_branch(self):
        """Hämta aktuell Git-branch"""
        result = self.run_git_command(["branch", "--show-current"])
        if result.returncode == 0:
            return result.stdout.strip()
        return None

def main():
    # Hitta rätt repo-sökväg
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_path = script_dir  # Använd skriptets katalog som standard
    
    # Skapa GUI
    root = tk.Tk()
    app = GitHelperApp(root, repo_path)
    root.mainloop()

if __name__ == "__main__":
    main()
