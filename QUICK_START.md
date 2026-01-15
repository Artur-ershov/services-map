# Быстрый старт: автоматизация синхронизации

## Подготовка

1. **Скопируйте CSV файл в рабочую директорию:**
   ```
   E:\Cpde\srv\service-table.csv
   ```
   
   Или используйте полный путь к файлу.

## Запуск синхронизации

### Вариант 1: Python (рекомендуется)

```bash
python scripts/sync-csv-to-data.py "путь\к\csv\файлу.csv"
```

**Пример:**
```bash
python scripts/sync-csv-to-data.py "service-table.csv"
```

### Вариант 2: Node.js (если установлен)

```bash
node scripts/sync-csv-to-data.js "путь\к\csv\файлу.csv"
```

## Результат

После запуска будут созданы:

1. **`data-generated.js`** - обновленная версия data.js
   - Все сервисы из CSV
   - Нормализованные данные
   - Автоматически сгенерированные areaId

2. **`figma-mapping.csv`** - маппинг для Figma
   - Рекомендуемые ID слоев
   - Структура папок
   - Связь между CSV и Figma

3. **`figma-mapping.json`** - JSON версия маппинга

## Следующие шаги

1. **Проверьте `data-generated.js`**
   - Убедитесь, что все сервисы корректны
   - Проверьте areaId

2. **Сделайте бэкап текущего `data.js`**
   ```bash
   copy data.js data-backup.js
   ```

3. **Замените data.js (если всё ОК)**
   ```bash
   copy data-generated.js data.js
   ```

4. **Используйте `figma-mapping.csv` для работы с Figma**
   - Откройте в Excel/Google Sheets
   - Используйте как руководство для переименования слоев
   - Или разработайте Figma Plugin для автоматизации

## Примечания

- Скрипт НЕ перезаписывает `data.js` автоматически
- Создается `data-generated.js` для проверки
- Всегда делайте бэкап перед заменой `data.js`





