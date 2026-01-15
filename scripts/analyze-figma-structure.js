/**
 * Скрипт для анализа структуры Figma и создания отчета
 * Помогает понять текущую структуру слоев и их именование
 */

const figmaConfig = require('../figma-config.js');

/**
 * Предлагаемая структура именования для Figma:
 * 
 * ЭТАЖИ (Frames):
 * - "B1-F3" или "Корпус 1, 3 этаж" - для основного фрейма этажа
 * 
 * СЛОИ/ГРУППЫ СЕРВИСОВ:
 * - Стандарт: "service_{id}_{name}" 
 *   Например: "service_401_Переговорка-Альфа"
 * - Или: "area_{id}" для простых случаев
 *   Например: "area_401"
 * 
 * ПАПКИ/ГРУППЫ:
 * - "Services" - для всех сервисов
 * - "Building_{B1|B2|B3}" - для группировки по корпусам
 * - "Floor_{N}" - для группировки по этажам
 */

const namingConvention = {
    // Формат для фреймов этажей
    floorFrame: {
        format: '{building}-F{floor}',
        examples: ['B1-F3', 'B3-F1'],
        alternative: 'Корпус {buildingNum}, {floor} этаж'
    },
    
    // Формат для слоев сервисов
    serviceLayer: {
        format: 'service_{id}_{name}',
        examples: ['service_401_Переговорка-Альфа', 'service_402_Переговорка-Север'],
        alternative: 'area_{id}'
    },
    
    // Структура папок
    folderStructure: {
        root: [
            'Services',        // Все сервисы
            'Building_B1',     // Корпус 1
            'Building_B2',     // Корпус 2
            'Building_B3'      // Корпус 3
        ],
        building: [
            'Floor_1',
            'Floor_2',
            'Floor_3',
            // ...
        ],
        floor: [
            'Services'         // Сервисы на этаже
        ]
    }
};

/**
 * Генерирует рекомендуемую структуру для этажа
 */
function generateRecommendedStructure(building, floor) {
    return {
        frameName: `${building}-F${floor}`,
        folders: [
            `Building_${building}`,
            `Floor_${floor}`,
            'Services'
        ],
        layers: [] // Заполнится из data.js
    };
}

/**
 * Создает маппинг текущих areaId на рекомендуемые имена
 */
function createAreaIdMapping() {
    // В реальном сценарии это должно загружаться из data.js
    const mapping = {
        // B1-F3
        'area_10': 'service_401_Переговорка-Альфа',
        'area_4': 'service_402_Переговорка-Север',
        'area_3': 'service_403_Переговорка-Бета',
        'area_2': 'service_404_Переговорка-Бета-4',
        'area_8': 'service_405_Переговорка-Бета-5',
        'area_9': 'service_406_Переговорка-Бета-6',
        'area_5': 'service_407_Переговорка-Бета-7',
        'area_6': 'service_408_Переговорка-Бета-3',
        'area_7': 'service_409_Переговорка-Бета-2',
        'area': 'service_410_Столовая-Север',
        'area_11': 'service_411_Буфет-Снэк',
        
        // B3-F1
        'Group 1201': 'service_501_Кофе-точка',
        'Group 1202': 'service_502_Вендинг',
        'Group 1200': 'service_503_Гардероб',
        'Group 1203': 'service_504_Входная-группа'
    };
    
    return mapping;
}

/**
 * Генерирует отчет с рекомендациями
 */
function generateReport() {
    console.log('\n📋 ОТЧЕТ: Рекомендации по структуре Figma\n');
    console.log('═'.repeat(60));
    
    console.log('\n1. СТРУКТУРА ИМЕНОВАНИЯ\n');
    console.log('Фреймы этажей:');
    console.log(`  Формат: ${namingConvention.floorFrame.format}`);
    console.log(`  Примеры: ${namingConvention.floorFrame.examples.join(', ')}`);
    
    console.log('\nСлои сервисов:');
    console.log(`  Формат: ${namingConvention.serviceLayer.format}`);
    console.log(`  Примеры: ${namingConvention.serviceLayer.examples.slice(0, 2).join(', ')}`);
    
    console.log('\n2. СТРУКТУРА ПАПОК\n');
    console.log('Корневой уровень:');
    namingConvention.folderStructure.root.forEach(folder => {
        console.log(`  📁 ${folder}`);
    });
    
    console.log('\n3. МАППИНГ ТЕКУЩИХ ID НА РЕКОМЕНДУЕМЫЕ\n');
    const mapping = createAreaIdMapping();
    const entries = Object.entries(mapping).slice(0, 5);
    entries.forEach(([oldId, newName]) => {
        console.log(`  ${oldId.padEnd(15)} → ${newName}`);
    });
    console.log(`  ... и еще ${Object.keys(mapping).length - 5} записей`);
    
    console.log('\n═'.repeat(60));
    console.log('\n💡 РЕКОМЕНДАЦИИ:\n');
    console.log('1. Используйте единый формат именования для всех слоев');
    console.log('2. Группируйте слои по корпусам и этажам');
    console.log('3. Используйте ID сервиса в названии для связи с данными');
    console.log('4. Сохраняйте соответствие между areaId в data.js и ID слоев');
    
    return {
        namingConvention,
        mapping
    };
}

// Если запущен напрямую
if (require.main === module) {
    generateReport();
}

module.exports = {
    namingConvention,
    generateRecommendedStructure,
    createAreaIdMapping,
    generateReport
};





