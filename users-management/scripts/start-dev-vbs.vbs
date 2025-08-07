Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Obtener la ruta del directorio padre
strCurrentDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Cambiar al directorio del proyecto
objShell.CurrentDirectory = strCurrentDir

' Iniciar backend en modo oculto
objShell.Run "cmd /c ""cd backend && npm run dev""", 0, False

' Esperar 3 segundos
WScript.Sleep 3000

' Iniciar frontend en modo oculto
objShell.Run "cmd /c ""cd frontend && npm run dev""", 0, False

' Mostrar notificación (opcional)
objShell.Popup "Servicios iniciados:" & vbCrLf & "Backend: http://localhost:3001" & vbCrLf & "Frontend: http://localhost:3000", 5, "Mi Sistema - Desarrollo", 64