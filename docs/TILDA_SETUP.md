# Настройка модуля карты сервисов для Tilda

## Структура для GitHub Pages

Все файлы должны быть размещены в репозитории на GitHub с включенным GitHub Pages для ветки `main`.

### Структура файлов:
```
/
├── index.html          # Демо-страница (опционально)
├── style.css           # Стили модуля
├── app.js              # JavaScript модуля
├── data.js             # Данные сервисов
├── map/                # SVG карты этажей
│   ├── b1f1.svg
│   ├── b1f2.svg
│   └── ...
├── images/             # Изображения сервисов
│   ├── andreymashkin_*.jpg
│   └── ...
└── assets/             # Дополнительные ресурсы
    └── fonts/
        └── CoFoWeather20240219-VF.ttf
```

## Встраивание в Tilda

### 1. HTML блок для Tilda

Используйте готовый файл `tilda-full-embed.html`:

1. Откройте файл `tilda-full-embed.html`
2. Замените `YOUR_USERNAME` на ваш GitHub username
3. Замените `REPO_NAME` на название вашего репозитория
4. Скопируйте весь код
5. Вставьте в блок "HTML" в Tilda

**Пример:**
```html
<div id="krok-services-map-module" style="padding: 40px; border:none!important">
    <!-- Полная структура модуля -->
</div>

<link rel="stylesheet" href="https://YOUR_USERNAME.github.io/REPO_NAME/style.css">
<script>
    window.KSMM_BASE_URL = 'https://YOUR_USERNAME.github.io/REPO_NAME';
</script>
<script src="https://YOUR_USERNAME.github.io/REPO_NAME/data.js"></script>
<script src="https://YOUR_USERNAME.github.io/REPO_NAME/app.js"></script>
```

**Важно:** Переменная `window.KSMM_BASE_URL` необходима для правильной загрузки SVG карт и изображений через GitHub Pages.

### 2. Настройка GitHub Pages

1. Перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `/ (root)`
4. Сохраните

### 3. Проверка

После публикации проверьте доступность файлов:
- `https://YOUR_USERNAME.github.io/REPO_NAME/style.css`
- `https://YOUR_USERNAME.github.io/REPO_NAME/data.js`
- `https://YOUR_USERNAME.github.io/REPO_NAME/app.js`

## Обновление данных

Для обновления данных:
1. Отредактируйте `data.js` в репозитории
2. Закоммитьте и запушьте изменения
3. GitHub Pages автоматически обновится (может занять несколько минут)

## Изоляция стилей

Модуль использует префикс `ksmm-` для всех классов, что минимизирует конфликты со стилями Tilda. Основной контейнер `#krok-services-map-module` также изолирован.

