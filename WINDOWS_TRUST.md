# Få checker.exe att uppfattas som trygg

Det viktigaste steget för att undvika varningar från Windows Defender och SmartScreen är att **digitalt signera** den färdiga .exe-filen.

## Steg-för-steg

1. **Skaffa ett kodcertifikat**
   - För högsta trovärdighet bör du använda ett EV Code Signing-certifikat.
   - Vanliga leverantörer är DigiCert, Sectigo, GlobalSign m.fl.

2. **Bygg programmet**
   ```powershell
   cd checker
   build.bat
   ```
   Detta skapar `dist/checker.exe`.

3. **Signera filen**
   ```powershell
   signtool sign /fd sha256 /a /tr http://timestamp.digicert.com dist/checker.exe
   ```

4. **Verifiera signaturen**
   ```powershell
   signtool verify /pa /v dist/checker.exe
   ```

5. **Testa med Windows Defender**
   - Högerklicka på filen och välj "Skanna med Microsoft Defender".
   - Ingen varning bör visas om signeringen är korrekt och koden inte är skadlig.

## Tips
- Distribuera filen via HTTPS från en betrodd domän.
- Håll källkoden offentlig så att användare kan granska den.
- Undvik onödiga nätverksanrop eller obfuskering som kan trigga heuristiska avvikelser.
