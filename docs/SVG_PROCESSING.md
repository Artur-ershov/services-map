# Правила обработки SVG

## Основная проблема: "черные квадраты"

### Причина
Элементы SVG без атрибута `fill` рендерятся черными при клонировании через `cloneNode()`.

### Решение
Рекурсивно устанавливать `fill="none"` для всех элементов без `fill` (но сохранять `fill="white"` элементы с `stroke` - это фон карты).

## Логика обработки SVG

### В функции `parseSvgAndPrepareCache()`:

```javascript
function setFillNoneRecursive(elem) {
    // Если элемент не имеет fill - устанавливаем fill="none"
    if (!elem.hasAttribute('fill')) {
        elem.setAttribute('fill', 'none');
    }
    // Рекурсивно обрабатываем дочерние элементы
    Array.from(elem.children).forEach(child => {
        setFillNoneRecursive(child);
    });
}
```

### Правила:
1. **Элементы без `fill`** → `fill="none"` (предотвращает черные квадраты)
2. **Элементы с `fill="white"` и `stroke`** → сохраняем (это фон/стены карты)
3. **Элементы с `fill="white"` без `stroke`** → `fill="none"` (скрываем)

## Структура SVG

SVG файлы содержат:
- Группы с `id`, совпадающие с `areaId` из CSV: `<g id="b1f1-coffee">`
- Элементы фона с `fill="white"` и `stroke`
- Интерактивные зоны без `fill` или с прозрачным `fill`

## Связь CSV ↔ SVG

**Критически важно:** ID в CSV колонке `id` должны точно совпадать с `id` групп в SVG:

```
CSV:              SVG:                    data.js:              app.js:
────────────────  ─────────────────────  ──────────────────   ────────────────
id: b1f1-coffee   <g id="b1f1-coffee">   areaId: "b1f1-coffee" querySelector('[id="b1f1-coffee"]')
```

## Процесс работы

1. **Загрузка SVG**: `fetch()` → `parseSvgAndPrepareCache()` → кэш в `floorDomCache`
2. **Вставка**: `injectCachedFloor()` → клонирование из кэша → вставка в DOM
3. **Интерактивность**: `renderMapAreas()` → поиск по `areaId` → добавление событий

## Важно

- **НЕ изменять** `fill="white"` у элементов с `stroke` (фон карты)
- **НЕ устанавливать** `fill` на корневом SVG (вызывает наследование проблем)
- **Кэшировать** распарсенный DOM (не текст SVG) для производительности

## Отладка

Если видите черные квадраты:
1. Проверьте, что `setFillNoneRecursive` вызывается для всех элементов
2. Убедитесь, что элементы без `fill` получают `fill="none"`
3. Проверьте, что элементы с `fill="white"` и `stroke` не изменяются

