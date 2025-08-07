@echo off
title Mi Sistema - Modo Desarrollo
echo ================================
echo   MODO DESARROLLO - MI SISTEMA
echo ================================
echo.
cd /d "%~dp0.."

echo Iniciando backend en modo desarrollo...
start "Backend" /min cmd /c "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo Iniciando frontend en modo desarrollo...
start "Frontend" /min cmd /c "cd frontend && npm run dev"

echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Ambos servicios se están iniciando...
echo Las ventanas se minimizarán automáticamente.
echo.

REM Esperar unos segundos para que los servicios inicien
timeout /t 5 /nobreak >nul

REM Ocultar ventanas de Backend y Frontend
powershell -WindowStyle Hidden -Command "Get-Process | Where-Object {$_.MainWindowTitle -like '*Backend*' -or $_.MainWindowTitle -like '*Frontend*'} | ForEach-Object { $_.CloseMainWindow() }"

echo Servicios ejecutándose en segundo plano.
echo Para detener los servicios, usa Ctrl+C en esta ventana o cierra desde el Task Manager.
pause