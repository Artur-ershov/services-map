/**
 * Автоматическая синхронизация CSV таблицы с data.js
 * 
 * Использование:
 *   node scripts/sync-csv-to-data.js [путь-к-csv]
 * 
 * Скрипт:
 * 1. Читает CSV таблицу
 * 2. Нормализует данные (корпуса, категории, локации)
 * 3. Генерирует обновленный data.js
 * 4. Создает маппинг для Figma
 */

const fs = require('fs');
const path = require('path');

// Маппинг корпусов
const BUILDING_MAP = {
    'Альфа': 'B1',
    'Бета': 'B2',
    'Парковка': 'PARKING'
};

// Маппинг категорий
const CATEGORY_MAP = {
    'Переговорные': 'meeting',
    'Питание': 'food',
    'Сервис': 'service',
    'Эко-инициативы': 'eco',
    'Релакс': 'relax',
    'Спорт': 'sport',
    'Здоровье': 'health',
    'Красота': 'beauty',
    'Без категории': 'other'
};

// Простой парсер CSV (обрабатывает кавычки и запятые)
function parseCSV(csvText) {
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length === 0) return { headers: [], rows: [] };
    
    // Простой парсинг первой строки как заголовков
    const headers = [];
    let currentHeader = '';
    let inQuotes = false;
    
    for (let char of lines[0]) {
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            headers.push(currentHeader.trim());
            currentHeader = '';
        } else {
            currentHeader += char;
        }
    }
    headers.push(currentHeader.trim());
    
    // Парсинг строк данных
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let currentValue = '';
        inQuotes = false;
        
        for (let char of lines[i]) {
            if (char === '"') {
                if (inQuotes && lines[i][lines[i].indexOf(char) + 1] === '"') {
                    currentValue += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());
        
        if (values.length > 0) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        }
    }
    
    return { headers, rows };
}

// Нормализация названия для ID
function normalizeName(name) {
    return name
        .replace(/«/g, '')
        .replace(/»/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-а-яё]/gi, '')
        .trim();
}

// Генерация areaId на основе локации и названия
function generateAreaId(location, name, building, floor) {
    if (location && location.trim()) {
        // Если есть локация, используем её
        const cleanLocation = location.trim().replace(/\s+/g, '-');
        return `area_${cleanLocation}`;
    } else {
        // Иначе используем нормализованное название
        const cleanName = normalizeName(name);
        return `service_${cleanName}`;
    }
}

// Преобразование CSV строки в объект сервиса
function csvRowToService(row, index) {
    const building = BUILDING_MAP[row['корпус']] || row['корпус'];
    const floor = parseInt(row['этаж']) || 1;
    const category = CATEGORY_MAP[row[' Категория']] || 'other';
    const location = row['Локация'] || '';
    const name = row['Название'] || '';
    const description = row['Описание'] || '';
    const contacts = row['Контакты'] || '';
    const link = row['Ссылка'] || '#';
    const hours = row['Время работы (где нужно)'] || '';
    const photo = row['Фото'] || '';
    
    // Генерация ID (можно использовать индекс или создать уникальный ID)
    const id = 1000 + index; // Начинаем с 1000, чтобы не конфликтовать с тестовыми данными
    
    // Генерация areaId
    const areaId = generateAreaId(location, name, building, floor);
    
    // Формирование attributes
    const attributes = {};
    if (location) attributes.location = location;
    if (hours) attributes.hours = hours;
    
    // Формирование изображения
    const img = photo || `https://dummyimage.com/600x400/f3f3f3/000.png&text=${encodeURIComponent(name)}`;
    
    return {
        id,
        name: name.trim(),
        category,
        building,
        floor,
        areaId,
        desc: description.trim(),
        contacts: contacts.trim(),
        img,
        link,
        attributes
    };
}

// Генерация data.js
function generateDataJS(services, outputPath) {
    // Группировка по корпусам для buildingFloorStructure
    const buildingFloors = {};
    
    services.forEach(service => {
        if (!buildingFloors[service.building]) {
            buildingFloors[service.building] = new Set();
        }
        buildingFloors[service.building].add(service.floor);
    });
    
    const buildingFloorStructure = {};
    Object.keys(buildingFloors).forEach(building => {
        const floors = Array.from(buildingFloors[building]).sort((a, b) => a - b);
        const label = building === 'B1' ? 'Корпус 1' : building === 'B2' ? 'Корпус 2' : building === 'B3' ? 'Корпус 3' : building;
        buildingFloorStructure[building] = {
            label,
            floors,
            defaultFloor: floors[0] || 1
        };
    });
    
    // Формирование кода
    const code = `// --- ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---
// Автоматически сгенерировано из CSV таблицы
// Дата генерации: ${new Date().toLocaleString('ru-RU')}

const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

const allServices = [
${services.map(s => {
    const attrsStr = Object.entries(s.attributes)
        .map(([k, v]) => `            ${k}: ${JSON.stringify(v)}`)
        .join(',\n');
    
    return `    {
        id: ${s.id},
        name: ${JSON.stringify(s.name)},
        category: ${JSON.stringify(s.category)},
        building: ${JSON.stringify(s.building)},
        floor: ${s.floor},
        areaId: ${JSON.stringify(s.areaId)},
        desc: ${JSON.stringify(s.desc)},
        contacts: ${JSON.stringify(s.contacts)},
        img: ${JSON.stringify(s.img)},
        link: ${JSON.stringify(s.link)},
        attributes: {
${attrsStr}
        }
    }`;
}).join(',\n')}
];

const buildingFloorStructure = ${JSON.stringify(buildingFloorStructure, null, 4)};

// svgFloorPlans нужно обновить вручную на основе актуальных SVG файлов
const svgFloorPlans = {
    // TODO: Заполнить на основе реальных SVG файлов
};
`;

    fs.writeFileSync(outputPath, code, 'utf8');
    console.log(`✅ data.js обновлен: ${outputPath}`);
}

// Генерация маппинга для Figma
function generateFigmaMapping(services, outputPath) {
    const mapping = {
        generated: new Date().toISOString(),
        services: services.map(s => ({
            id: s.id,
            name: s.name,
            building: s.building,
            floor: s.floor,
            areaId: s.areaId,
            recommendedLayerId: s.areaId,
            recommendedLayerName: s.name,
            recommendedPath: `Building_${s.building}/Floor_${s.floor}/Services`
        }))
    };
    
    const jsonPath = outputPath.replace('.csv', '.json');
    fs.writeFileSync(jsonPath, JSON.stringify(mapping, null, 2), 'utf8');
    
    // CSV версия для удобства
    const csvLines = [
        'ID,Название,Корпус,Этаж,areaId,Рекомендуемый ID слоя,Путь в Figma',
        ...mapping.services.map(s => 
            `${s.id},"${s.name}",${s.building},${s.floor},${s.areaId},${s.recommendedLayerId},"${s.recommendedPath}"`
        )
    ];
    
    fs.writeFileSync(outputPath, csvLines.join('\n'), 'utf8');
    console.log(`✅ Маппинг для Figma создан: ${outputPath}`);
    console.log(`   JSON версия: ${jsonPath}`);
}

// Главная функция
function main() {
    const csvPath = process.argv[2] || path.join(__dirname, '..', 'service-table.csv');
    
    if (!fs.existsSync(csvPath)) {
        console.error(`❌ Файл не найден: ${csvPath}`);
        console.log('\nИспользование:');
        console.log('  node scripts/sync-csv-to-data.js [путь-к-csv]');
        console.log('\nПример:');
        console.log('  node scripts/sync-csv-to-data.js "c:\\Users\\Admin\\Downloads\\карта сервисов рабочая таблица.xlsx - Sheet1.csv"');
        process.exit(1);
    }
    
    console.log(`\n📥 Чтение CSV: ${csvPath}\n`);
    
    const csvText = fs.readFileSync(csvPath, 'utf8');
    const { headers, rows } = parseCSV(csvText);
    
    console.log(`📊 Загружено строк: ${rows.length}`);
    console.log(`📋 Колонки: ${headers.length}`);
    
    // Фильтруем только те, что есть в макетах (опционально)
    const servicesInMaps = rows.filter(r => r['Есть в макетах?'] === 'Да');
    const allServices = rows.map((row, index) => csvRowToService(row, index));
    
    console.log(`\n✅ Обработано сервисов: ${allServices.length}`);
    console.log(`   В макетах: ${servicesInMaps.length}`);
    
    // Генерация файлов
    const outputDir = path.join(__dirname, '..');
    const dataJSPath = path.join(outputDir, 'data-generated.js');
    const mappingPath = path.join(outputDir, 'figma-mapping.csv');
    
    console.log('\n📝 Генерация файлов...\n');
    
    generateDataJS(allServices, dataJSPath);
    generateFigmaMapping(allServices, mappingPath);
    
    console.log('\n✅ Синхронизация завершена!\n');
    console.log('📋 Следующие шаги:');
    console.log('   1. Проверьте data-generated.js');
    console.log('   2. Если всё хорошо, переименуйте в data.js (сделайте бэкап!)');
    console.log('   3. Используйте figma-mapping.csv для переименования слоев в Figma');
    console.log('   4. Обновите svgFloorPlans вручную на основе реальных SVG файлов\n');
}

if (require.main === module) {
    main();
}

module.exports = { parseCSV, csvRowToService, generateDataJS, generateFigmaMapping };





