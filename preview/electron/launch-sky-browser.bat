@echo off
rem Sky Browser - lanceur du prototype (Electron).
rem Premier lancement : installe les composants (2-3 minutes).
rem Ensuite : demarrage instantane.
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js est requis pour lancer ce prototype : https://nodejs.org
  echo Installez la version LTS, puis relancez ce fichier.
  pause
  exit /b 1
)

if not exist "node_modules\electron\dist\electron.exe" (
  echo Premier lancement : installation des composants ^(2-3 minutes^)...
  call npm install --no-fund --no-audit
  if errorlevel 1 (
    echo Echec de l'installation - verifiez votre connexion internet.
    pause
    exit /b 1
  )
)

echo Demarrage de Sky Browser ^(prototype^)...
call npx electron .
endlocal
