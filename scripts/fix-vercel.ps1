# Скрипт для исправления проблемы с vercel в PowerShell
# Запустите от имени администратора: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "Исправление проблемы с vercel..." -ForegroundColor Yellow

# Вариант 1: Использовать npx (рекомендуется)
Write-Host "`n✅ РЕШЕНИЕ 1 (Рекомендуется): Используйте npx" -ForegroundColor Green
Write-Host "   npx vercel login" -ForegroundColor Cyan
Write-Host "   npx vercel --yes" -ForegroundColor Cyan

# Вариант 2: Изменить политику выполнения (требует прав администратора)
Write-Host "`n✅ РЕШЕНИЕ 2: Изменить политику выполнения" -ForegroundColor Green
Write-Host "   Запустите PowerShell от имени администратора и выполните:" -ForegroundColor Yellow
Write-Host "   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Cyan

# Вариант 3: Использовать cmd вместо PowerShell
Write-Host "`n✅ РЕШЕНИЕ 3: Использовать CMD" -ForegroundColor Green
Write-Host "   Откройте CMD (не PowerShell) и выполните:" -ForegroundColor Yellow
Write-Host "   vercel login" -ForegroundColor Cyan

Write-Host "`nРекомендуется использовать РЕШЕНИЕ 1 (npx)" -ForegroundColor Green
