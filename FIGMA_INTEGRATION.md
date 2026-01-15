# Интеграция с Figma

Этот проект поддерживает синхронизацию планов этажей из Figma через MCP (Model Context Protocol).

## Структура файлов

- `figma-config.js` - конфигурация для связи этажей с Figma node IDs
- `scripts/figma-sync-helper.js` - вспомогательные функции для работы с Figma
- `scripts/export-floor-from-figma.js` - скрипт для экспорта этажей
- `map/` - папка с SVG файлами планов этажей

## Настройка

### 1. Конфигурация этажей

Откройте `figma-config.js` и настройте маппинг этажей:

```javascript
floorMapping: {
    'B1-F3': {
        nodeId: '72:24', // Node ID из Figma URL
        building: 'B1',
        floor: 3,
        fileName: 'floor-B1-F3.svg'
    },
    // Добавьте другие этажи...
}
```

### 2. Получение Node ID из Figma

1. Откройте нужный этаж в Figma
2. Скопируйте URL (например: `https://www.figma.com/design/MUjKq30tTItxa1RBJYUCYb/...?node-id=72-24`)
3. Извлеките node ID из параметра `node-id` (в примере: `72-24` или `72:24`)

**Важно:** Figma API использует двоеточие (`:`) вместо дефиса (`-`) для node IDs.

## Использование через MCP

Для экспорта SVG из Figma можно использовать MCP инструменты:

### Получение SVG через get_design_context

```javascript
// Пример использования MCP инструмента
const designContext = await mcp_Figma_get_design_context({
    fileKey: 'MUjKq30tTItxa1RBJYUCYb',
    nodeId: '72:24'
});

// Сохранение SVG
const svgCode = designContext.code;
fs.writeFileSync('map/floor-B1-F3.svg', svgCode, 'utf8');
```

### Получение метаданных

```javascript
const metadata = await mcp_Figma_get_metadata({
    fileKey: 'MUjKq30tTItxa1RBJYUCYb',
    nodeId: '72:24'
});
```

## Структура данных

### Связь с data.js

Планы этажей в `data.js` связаны с SVG файлами через `svgFloorPlans`:

```javascript
const svgFloorPlans = {
    'B1-F3': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    }
};
```

### Связь с сервисами

Сервисы в `allServices` связаны с областями на карте через `areaId`:

```javascript
{
    id: 401,
    name: 'Переговорка «Альфа»',
    building: 'B1',
    floor: 3,
    areaId: 'area_10', // ID группы в SVG
    // ...
}
```

## Процесс синхронизации

1. **Экспорт из Figma**: Используйте MCP инструменты для получения SVG
2. **Сохранение**: Сохраните SVG в папку `map/` с правильным именем
3. **Обновление конфигурации**: При необходимости обновите `viewBox` в `data.js`
4. **Проверка связей**: Убедитесь, что `areaId` в сервисах соответствуют ID в SVG

## Примечания

- MCP инструменты должны быть доступны через соответствующий MCP сервер
- Для прямого экспорта SVG можно использовать Figma API или плагины
- Убедитесь, что ID групп в Figma соответствуют `areaId` в `data.js`





