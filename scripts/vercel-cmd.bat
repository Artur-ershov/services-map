@echo off
REM Обходной путь для запуска vercel через cmd
REM Используйте: scripts\vercel-cmd.bat

node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" vercel %*
