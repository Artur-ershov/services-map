# Скрипт для исправления политики выполнения PowerShell
# Запустите этот скрипт от имени администратора

Write-Host "Исправление политики выполнения PowerShell..." -ForegroundColor Yellow
Write-Host ""

# Проверяем текущую политику
$currentPolicy = Get-ExecutionPolicy -Scope CurrentUser
Write-Host "Текущая политика: $currentPolicy" -ForegroundColor Cyan

# Изменяем политику для текущего пользователя
Write-Host "`nИзменение политики на RemoteSigned..." -ForegroundColor Yellow
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

Write-Host "`n✅ Политика изменена!" -ForegroundColor Green
Write-Host "Теперь можно использовать npx vercel" -ForegroundColor Green

# Проверяем новую политику
$newPolicy = Get-ExecutionPolicy -Scope CurrentUser
Write-Host "`nНовая политика: $newPolicy" -ForegroundColor Cyan
