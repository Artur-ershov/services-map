/**
 * Создает маппинг между сервисами из data.js и рекомендуемой структурой Figma
 * Помогает связать таблицу сервисов со слоями в Figma
 */

const fs = require('fs');
const path = require('path');

// Загружаем данные (в реальном сценарии нужен парсер для data.js)
// Пока используем структуру вручную
function loadServicesData() {
    // В реальности нужно парсить data.js
    // Для примера используем структуру
    return [
        // B1-F3
        { id: 401, name: 'Переговорка «Альфа»', building: 'B1', floor: 3, areaId: 'area_10' },
        { id: 402, name: 'Переговорка «Север»', building: 'B1', floor: 3, areaId: 'area_4' },
        { id: 403, name: 'Переговорка «Бета»', building: 'B1', floor: 3, areaId: 'area_3' },
        { id: 404, name: 'Переговорка «Бета-4»', building: 'B1', floor: 3, areaId: 'area_2' },
        { id: 405, name: 'Переговорка «Бета-5»', building: 'B1', floor: 3, areaId: 'area_8' },
        { id: 406, name: 'Переговорка «Бета-6»', building: 'B1', floor: 3, areaId: 'area_9' },
        { id: 407, name: 'Переговорка «Бета-7»', building: 'B1', floor: 3, areaId: 'area_5' },
        { id: 408, name: 'Переговорка «Бета-3»', building: 'B1', floor: 3, areaId: 'area_6' },
        { id: 409, name: 'Переговорка «Бета-2»', building: 'B1', floor: 3, areaId: 'area_7' },
        { id: 410, name: 'Столовая «Север»', building: 'B1', floor: 3, areaId: 'area' },
        { id: 411, name: 'Буфет «Снэк»', building: 'B1', floor: 3, areaId: 'area_11' },
        
        // B3-F1
        { id: 501, name: 'Кофе-точка', building: 'B3', floor: 1, areaId: 'Group 1201' },
        { id: 502, name: 'Вендинг', building: 'B3', floor: 1, areaId: 'Group 1202' },
        { id: 503, name: 'Гардероб', building: 'B3', floor: 1, areaId: 'Group 1200' },
        { id: 504, name: 'Входная группа', building: 'B3', floor: 1, areaId: 'Group 1203' }
    ];
}

/**
 * Преобразует название сервиса в ID для слоя
 */
function serviceNameToId(id, name) {
    // Убираем кавычки, заменяем пробелы на дефисы
    const cleanName = name
        .replace(/«/g, '')
        .replace(/»/g, '')
        .replace(/\s+/g, '-')
        .trim();
    
    return `service_${id}_${cleanName}`;
}

/**
 * Создает маппинг сервисов
 */
function createServiceMapping() {
    const services = loadServicesData();
    
    const mapping = {
        services: services.map(service => ({
            // Данные из data.js
            id: service.id,
            name: service.name,
            building: service.building,
            floor: service.floor,
            currentAreaId: service.areaId,
            
            // Рекомендуемые значения для Figma
            recommendedLayerId: serviceNameToId(service.id, service.name),
            recommendedLayerName: service.name,
            recommendedPath: `Building_${service.building}/Floor_${service.floor}/Services`,
            
            // Фрейм этажа
            floorFrame: `${service.building}-F${service.floor}`
        })),
        
        summary: {
            total: services.length,
            byBuilding: {},
            byFloor: {}
        }
    };
    
    // Статистика
    services.forEach(service => {
        const bKey = service.building;
        const fKey = `${service.building}-F${service.floor}`;
        
        mapping.summary.byBuilding[bKey] = (mapping.summary.byBuilding[bKey] || 0) + 1;
        mapping.summary.byFloor[fKey] = (mapping.summary.byFloor[fKey] || 0) + 1;
    });
    
    return mapping;
}

/**
 * Генерирует CSV для таблицы (Google Sheets, Excel)
 */
function generateCSV() {
    const mapping = createServiceMapping();
    
    const headers = [
        'ID',
        'Название',
        'Корпус',
        'Этаж',
        'Текущий areaId',
        'Рекомендуемый ID слоя',
        'Путь в Figma',
        'Фрейм этажа'
    ];
    
    const rows = mapping.services.map(s => [
        s.id,
        s.name,
        s.building,
        s.floor,
        s.currentAreaId,
        s.recommendedLayerId,
        s.recommendedPath,
        s.floorFrame
    ]);
    
    const csvLines = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ];
    
    return csvLines.join('\n');
}

/**
 * Сохраняет маппинг в JSON
 */
function saveMappingJSON() {
    const mapping = createServiceMapping();
    const outputPath = path.join(__dirname, '..', 'service-mapping.json');
    fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2), 'utf8');
    console.log(`✅ JSON маппинг сохранен: ${outputPath}`);
    return outputPath;
}

/**
 * Сохраняет маппинг в CSV
 */
function saveMappingCSV() {
    const csv = generateCSV();
    const outputPath = path.join(__dirname, '..', 'service-mapping.csv');
    fs.writeFileSync(outputPath, csv, 'utf8');
    console.log(`✅ CSV маппинг сохранен: ${outputPath}`);
    return outputPath;
}

/**
 * Выводит отчет
 */
function printReport() {
    const mapping = createServiceMapping();
    
    console.log('\n📊 МАППИНГ СЕРВИСОВ: data.js ↔ Figma\n');
    console.log('═'.repeat(80));
    
    console.log('\n📈 СТАТИСТИКА:\n');
    console.log(`Всего сервисов: ${mapping.summary.total}`);
    console.log('\nПо корпусам:');
    Object.entries(mapping.summary.byBuilding).forEach(([building, count]) => {
        console.log(`  ${building}: ${count} сервисов`);
    });
    
    console.log('\nПо этажам:');
    Object.entries(mapping.summary.byFloor).forEach(([floor, count]) => {
        console.log(`  ${floor}: ${count} сервисов`);
    });
    
    console.log('\n═'.repeat(80));
    console.log('\n📋 ПРИМЕРЫ МАППИНГА (первые 5):\n');
    
    mapping.services.slice(0, 5).forEach(service => {
        console.log(`\nID: ${service.id} - ${service.name}`);
        console.log(`  Корпус/Этаж: ${service.building} / ${service.floor}`);
        console.log(`  Текущий areaId: ${service.currentAreaId}`);
        console.log(`  Рекомендуемый ID слоя: ${service.recommendedLayerId}`);
        console.log(`  Путь в Figma: ${service.recommendedPath}`);
    });
    
    console.log('\n═'.repeat(80));
    console.log('\n💡 Для сохранения маппинга используйте:');
    console.log('   node scripts/create-service-mapping.js --json');
    console.log('   node scripts/create-service-mapping.js --csv');
    console.log('   node scripts/create-service-mapping.js --all\n');
}

// Главная функция
function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--json')) {
        saveMappingJSON();
    } else if (args.includes('--csv')) {
        saveMappingCSV();
    } else if (args.includes('--all')) {
        saveMappingJSON();
        saveMappingCSV();
        printReport();
    } else {
        printReport();
        console.log('\n💡 Используйте --json, --csv или --all для сохранения файлов\n');
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    createServiceMapping,
    generateCSV,
    saveMappingJSON,
    saveMappingCSV
};





