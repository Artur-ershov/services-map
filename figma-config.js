// Конфигурация для интеграции с Figma
// Маппинг этажей на Figma node IDs

const figmaConfig = {
    // Ключ файла Figma (из URL: https://www.figma.com/design/MUjKq30tTItxa1RBJYUCYb/...)
    fileKey: 'MUjKq30tTItxa1RBJYUCYb',
    
    // Маппинг этажей на Figma node IDs
    // Формат: 'B1-F3' => { nodeId: '72:24', building: 'B1', floor: 3 }
    floorMapping: {
        // Примеры (заполните реальными node IDs из Figma)
        'B1-F3': {
            nodeId: '72:24', // Замените на реальный node ID
            building: 'B1',
            floor: 3,
            fileName: 'floor-B1-F3.svg'
        },
        'B3-F1': {
            nodeId: '', // Заполните реальным node ID
            building: 'B3',
            floor: 1,
            fileName: 'floor-B3-F1.svg'
        }
        // Добавьте другие этажи по мере необходимости
    },
    
    // Папка для сохранения SVG файлов
    outputDir: './map',
    
    // Опции экспорта SVG
    exportOptions: {
        format: 'svg',
        scale: 1
    }
};

module.exports = figmaConfig;





