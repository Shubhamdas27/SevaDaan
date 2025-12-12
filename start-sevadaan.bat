@echo off
echo ==========================================
echo    Starting SevaDaan Platform
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
echo.

:: Start Backend Server
echo [2/4] Starting Backend Server...
start "SevaDaan Backend" cmd /k "cd /d %~dp0Backend && npm run dev"
echo Backend server starting on http://localhost:3000
echo.

:: Wait a few seconds for backend to start
timeout /t 5 /nobreak >nul

:: Start Frontend Server
echo [3/4] Starting Frontend Server...
start "SevaDaan Frontend" cmd /k "cd /d %~dp0Frontend && npm run dev"
echo Frontend server starting on http://localhost:5173
echo.

echo [4/4] Opening browser...
timeout /t 8 /nobreak >nul
start http://localhost:5173

echo.
echo ==========================================
echo    SevaDaan Platform Started Successfully!
echo ==========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Demo Login Credentials:
echo   NGO Admin:  ngoadmin@helpindia.org / password123
echo   Volunteer:  volunteer@helpindia.org / password123
echo   Donor:      donor@example.com / password123
echo   Citizen:    citizen@example.com / password123
echo.
echo Press any key to stop all servers...
pause >nul

:: Kill the servers
taskkill /FI "WINDOWTITLE eq SevaDaan Backend*" /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq SevaDaan Frontend*" /F >nul 2>nul

echo Servers stopped.
pause
