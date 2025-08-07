@echo off
title Mi Sistema - Deteniendo...

echo ================================
echo   DETENIENDO MI SISTEMA
echo ================================
echo.

cd /d "%~dp0.."

echo Deteniendo contenedores...
docker-compose down

if errorlevel 1 (
    echo ERROR: No se pudieron detener los contenedores
    pause
    exit /b 1
)

echo.
echo Sistema detenido exitosamente.
echo.
pause