# Быстрый старт: Модуль карты сервисов для Tilda

## Шаг 1: Настройка GitHub Pages

1. Создайте репозиторий на GitHub (например, `croc-services-map`)
2. Загрузите все файлы в репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/croc-services-map.git
   git push -u origin main
   ```
3. Включите GitHub Pages:
   - Settings → Pages
   - Source: `main` / `/ (root)`
   - Save

## Шаг 2: Встраивание в Tilda

1. Откройте файл `tilda-full-embed.html`
2. Замените:
   - `YOUR_USERNAME` → ваш GitHub username
   - `REPO_NAME` → название репозитория
3. Скопируйте весь код
4. В Tilda: добавьте блок "HTML" и вставьте код

## Готово! 

Модуль будет автоматически загружаться с GitHub Pages. При обновлении `data.js` изменения появятся на сайте через 1-5 минут.

## Файлы для справки

- `TILDA_SETUP.md` - подробная инструкция
- `README_GITHUB_PAGES.md` - настройка GitHub Pages
- `tilda-full-embed.html` - готовый код для Tilda

