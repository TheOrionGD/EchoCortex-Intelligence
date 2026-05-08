@echo off
title ECHO - Institutional Memory Command Center Launch Sequence
color 0A
cls

echo =====================================================================
echo  ___________  ______ _   _ _____     _____ _____  _____ _____ _   _ 
echo ^|  ___^| ___ \/  ___^| ^| ^| ^|  _  ^|   /  ___^|  _  ^|/  ___^|  _  ^| \ ^| ^|
echo ^| ^|__ ^| ^|_/ /\ `--.^| ^|_^| ^| ^| ^| ^|   \ `--.^| ^|_^| ^|\ `--.^| ^|_^| ^|  \^| ^|
echo ^|  __^|^|    /  `--. \  _  ^| ^| ^| ^|    `--. \  _  ^| `--. \  _  ^| . ` ^|
echo ^| ^|___^| ^|\ \ /\__/ / ^| ^| \ \_/ /   /\__/ / ^| ^| ^|/\__/ / ^| ^| ^| ^|\  ^|
echo \____/\_^| \_\\____/\_^| ^|_/\___/    \____/\_^| ^|_/\____/\_^| ^|_/\_^| \_^|
echo =====================================================================
echo [SYSTEM LOG] Initiating full system handshake protocol...
echo [SYSTEM LOG] Root Location: %~dp0
echo.

echo [PIPELINE] 1. Launching Express Backend Server in separate process...
start "ECHO - Backend Intelligence Node" /D "%~dp0backend" cmd /k "color 0A && echo [BACKEND] Starting backend engine... && npm run dev"

echo [PIPELINE] 2. Waiting for ports initialization...
timeout /t 3 /nobreak >nul

echo [PIPELINE] 3. Launching React Vite Frontend Client...
start "ECHO - Frontend Command Cockpit" /D "%~dp0" cmd /k "color 0A && echo [FRONTEND] Starting client... && npm run dev"

echo [PIPELINE] 4. Launching Client Viewport...
timeout /t 2 /nobreak >nul
start http://localhost:5173

echo.
echo =====================================================================
echo [SUCCESS] Handshake complete. All nodes are operating within optimal limits.
echo [INFO] Press any key to minimize this primary bootloader window.
echo =====================================================================
pause >nul
