import subprocess
import sys

# Run checker.py and pipe a test email into it
process = subprocess.run(
    [sys.executable, "checker/checker.py"],
    input="test@example.com\n",
    text=True,
    capture_output=True
)

# Print the output
print("EXIT CODE:", process.returncode)
print("\nSTDOUT:")
print(process.stdout)

print("\nSTDERR:")
print(process.stderr)
