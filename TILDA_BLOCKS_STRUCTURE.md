# Структура блоков T123 на странице /eda

## Проблема: Дублирование функционала

На странице `/eda` сейчас есть **дублирование** функционала для буфета:

1. **В `eda.html`** (встроено в страницу):
   - `initBuffetTracking()` - добавляет кнопку "+ В дневник" (зеленая)
   - `addBuffetItemToDiary()` - функция добавления в дневник
   - `getTildaProductData()` - получение данных (парсинг текста, без API)

2. **В `tilda-buffet-calories-block.html`** (вставляется в блок T123):
   - `inject()` - добавляет блок с КБЖУ и кнопку "+ Съел" (черная)
   - `loadTildaProductsAPI()` - загрузка данных из API Tilda Store
   - `getTildaProductData()` - получение данных из кэша API
   - `addBuffetItemToDiary()` - локальная функция, использует глобальную если есть

## Решение: Единый модуль

**В блоке T123 должен быть ТОЛЬКО:**
- `tilda-buffet-calories-block.html` - единый модуль, который:
  - Загружает данные из API Tilda Store
  - Показывает КБЖУ под каждым товаром
  - Добавляет кнопку "+ Съел"
  - Использует глобальные функции из `eda.html` для добавления в дневник

**Из `eda.html` нужно УБРАТЬ:**
- `initBuffetTracking()` - больше не нужна, заменена на `inject()` из модуля
- Вызовы `initBuffetTracking()` в `init()` и других местах
- MutationObserver для отслеживания буфета (есть в модуле)

**Оставить в `eda.html`:**
- `addBuffetItemToDiary()` - используется модулем
- `getTildaProductData()` - может использоваться как fallback
- `updateDiaryUI()`, `saveDiary()`, `loadDiary()` - общие функции

## Структура блока T123

```
Блок T123 (HTML-код):
└── tilda-buffet-calories-block.html
    ├── <div id="eda-buffet-calories-root">
    ├── <style> (стили для КБЖУ и кнопки)
    └── <script>
        ├── loadTildaProductsAPI() - загрузка из API
        ├── getTildaProductData() - получение данных
        ├── addBuffetItemToDiary() - добавление в дневник (использует глобальную)
        ├── inject() - добавление КБЖУ и кнопки на карточки
        └── init() - инициализация
```

## Что делает модуль

1. **Загружает данные из API** при инициализации
2. **Находит карточки товаров** Буфета и Бизнес-завтрака
3. **Добавляет блок с КБЖУ** под каждым товаром
4. **Добавляет кнопку "+ Съел"** которая:
   - Не открывает карточку товара (исправлен баг)
   - Добавляет товар в дневник через глобальную функцию
   - Обновляет счетчики и список блюд

## Интеграция с eda.html

Модуль автоматически:
- Использует `window.addBuffetItemToDiary()` если она есть
- Использует `window.saveDiary()` и `window.updateDiaryUI()` если есть
- Делает кэш API доступным через `window.tildaProductsCache`
- Предоставляет `window.getTildaProductDataFromAPI()` для использования в eda.html

## Рекомендации

1. **Убрать из eda.html:**
   ```javascript
   // Удалить эти строки:
   initBuffetTracking(); // строка 254
   setTimeout(initBuffetTracking, 1000); // строка 669
   setTimeout(initBuffetTracking, 3000); // строка 671
   setTimeout(initBuffetTracking, 5000); // строка 672
   observer.observe(...) // строки 676-691 (если только для буфета)
   ```

2. **Оставить в eda.html:**
   - `addBuffetItemToDiary()` - используется модулем
   - `getTildaProductData()` - можно обновить чтобы использовала API кэш
   - Все остальные функции для столовой

3. **В блоке T123:**
   - Только `tilda-buffet-calories-block.html`
   - Разместить ПОСЛЕ блока с каталогом Tilda Store
