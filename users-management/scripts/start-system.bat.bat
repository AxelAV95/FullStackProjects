@echo off
title Mi Sistema - Iniciando...

echo ================================
echo    INICIANDO MI SISTEMA
echo ================================
echo.

cd /d "%~dp0.."

echo Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no está instalado o no está en el PATH
    echo Instala Docker Desktop desde: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker encontrado. Iniciando servicios...
echo.

echo Construyendo y levantando contenedores...
docker-compose up --build -d

if errorlevel 1 (
    echo ERROR: No se pudieron iniciar los contenedores
    pause
    exit /b 1
)

echo.
echo ================================
echo   SISTEMA INICIADO EXITOSAMENTE
echo ================================
echo.
echo Frontend: http://sistema.app
echo Backend API: http://localhost:3001/api
echo.
echo Presiona cualquier tecla para abrir el navegador...
pause >nul

start http://sistema.app

echo.
echo Para detener el sistema, ejecuta: docker-compose down
echo Para ver logs: docker-compose logs -f
echo.
pause