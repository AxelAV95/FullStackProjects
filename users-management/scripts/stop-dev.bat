@echo off
title Detener Servicios - Mi Sistema
echo ================================
echo   DETENIENDO SERVICIOS
echo ================================
echo.

echo Deteniendo procesos de Node.js...
taskkill /f /im node.exe 2>nul
if %errorlevel% == 0 (
    echo ✓ Servicios detenidos correctamente
) else (
    echo ℹ No se encontraron procesos de Node.js ejecutándose
)

echo.
echo Limpiando puertos (opcional)...
netstat -ano | findstr :3000
netstat -ano | findstr :3001

echo.
pause