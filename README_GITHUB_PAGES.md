# Настройка GitHub Pages для модуля карты сервисов

## Быстрый старт

1. **Создайте репозиторий на GitHub**
   - Название: например `croc-services-map`
   - Публичный или приватный (для приватного нужен GitHub Pro)

2. **Загрузите файлы в репозиторий**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/croc-services-map.git
   git push -u origin main
   ```

3. **Включите GitHub Pages**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `/ (root)`
   - Save

4. **Проверьте доступность**
   - Через несколько минут файлы будут доступны по адресу:
   - `https://YOUR_USERNAME.github.io/croc-services-map/`

## Структура файлов

Убедитесь, что все необходимые файлы загружены:
- `style.css` - стили модуля
- `app.js` - JavaScript модуля
- `data.js` - данные сервисов
- `map/` - папка с SVG картами
- `images/` - папка с изображениями
- `assets/` - дополнительные ресурсы (шрифты и т.д.)

## Использование в Tilda

После настройки GitHub Pages используйте файл `tilda-full-embed.html`:

1. Откройте `tilda-full-embed.html`
2. Замените `YOUR_USERNAME` и `REPO_NAME` на ваши значения
3. Скопируйте весь код
4. Вставьте в блок "HTML" в Tilda

## Обновление данных

Для обновления данных:
1. Отредактируйте `data.js`
2. Закоммитьте и запушьте изменения
3. GitHub Pages автоматически обновится (1-5 минут)

## Автоматический деплой

В репозитории уже настроен GitHub Actions workflow (`.github/workflows/pages.yml`), который автоматически деплоит при каждом push в ветку `main`.


