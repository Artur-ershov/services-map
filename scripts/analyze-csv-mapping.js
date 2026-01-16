/**
 * Анализ CSV таблицы и сравнение с data.js
 * Оценка синхронизации с картами (SVG/Figma)
 */

const fs = require('fs');
const path = require('path');

// Парсинг CSV (простая версия)
function parseCSV(csvText) {
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());
        
        if (values.length >= headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        }
    }
    
    return rows;
}

/**
 * Нормализация названия корпуса
 */
function normalizeBuilding(building) {
    const mapping = {
        'Альфа': 'B1',
        'Бета': 'B2',
        'Парковка': 'PARKING'
    };
    return mapping[building] || building;
}

/**
 * Анализ CSV и сравнение с data.js
 */
function analyzeCSVMapping(csvPath) {
    const csvText = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCSV(csvText);
    
    console.log('\n📊 АНАЛИЗ CSV ТАБЛИЦЫ И СИНХРОНИЗАЦИИ С КАРТАМИ\n');
    console.log('═'.repeat(80));
    
    // Базовая статистика
    console.log('\n📈 СТАТИСТИКА CSV:\n');
    console.log(`Всего записей: ${rows.length}`);
    
    const byBuilding = {};
    const byCategory = {};
    const byFloor = {};
    const withLocation = rows.filter(r => r['Локация'] && r['Локация'].trim()).length;
    const inMaps = rows.filter(r => r['Есть в макетах?'] === 'Да').length;
    
    rows.forEach(row => {
        const building = normalizeBuilding(row['корпус'] || '');
        const floor = row['этаж'] || '';
        const category = row[' Категория'] || '';
        
        byBuilding[building] = (byBuilding[building] || 0) + 1;
        byCategory[category] = (byCategory[category] || 0) + 1;
        byFloor[`${building}-${floor}`] = (byFloor[`${building}-${floor}`] || 0) + 1;
    });
    
    console.log(`С указанной локацией: ${withLocation}`);
    console.log(`Есть в макетах: ${inMaps}`);
    
    console.log('\nПо корпусам:');
    Object.entries(byBuilding).sort().forEach(([building, count]) => {
        console.log(`  ${building}: ${count} сервисов`);
    });
    
    console.log('\nПо категориям (топ-10):');
    Object.entries(byCategory)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([category, count]) => {
            console.log(`  ${category}: ${count}`);
        });
    
    // Анализ локаций
    console.log('\n═'.repeat(80));
    console.log('\n🔍 АНАЛИЗ ЛОКАЦИЙ И СВЯЗИ С КАРТАМИ:\n');
    
    const locationTypes = {
        numeric: [],      // "108", "212"
        alphanumeric: [], // "3Б", "402 Б"
        empty: [],
        special: []       // "холл", "Турникет"
    };
    
    rows.forEach((row, index) => {
        const location = (row['Локация'] || '').trim();
        const building = normalizeBuilding(row['корпус'] || '');
        const floor = row['этаж'] || '';
        const name = row['Название'] || '';
        
        if (!location) {
            locationTypes.empty.push({ row: index + 2, building, floor, name });
        } else if (/^\d+$/.test(location)) {
            locationTypes.numeric.push({ location, building, floor, name });
        } else if (/^[\d\w\s]+$/.test(location)) {
            locationTypes.alphanumeric.push({ location, building, floor, name });
        } else {
            locationTypes.special.push({ location, building, floor, name });
        }
    });
    
    console.log(`Числовые локации (например, "108", "212"): ${locationTypes.numeric.length}`);
    console.log(`Буквенно-цифровые (например, "3Б", "402 Б"): ${locationTypes.alphanumeric.length}`);
    console.log(`Специальные (например, "холл", "Турникет"): ${locationTypes.special.length}`);
    console.log(`Без локации: ${locationTypes.empty.length}`);
    
    // Примеры
    console.log('\nПримеры локаций:');
    console.log('\nЧисловые (первые 5):');
    locationTypes.numeric.slice(0, 5).forEach(({ location, building, floor, name }) => {
        console.log(`  ${building}-${floor}: ${location} - ${name}`);
    });
    
    console.log('\nБуквенно-цифровые (первые 5):');
    locationTypes.alphanumeric.slice(0, 5).forEach(({ location, building, floor, name }) => {
        console.log(`  ${building}-${floor}: ${location} - ${name}`);
    });
    
    // Проблемы синхронизации
    console.log('\n═'.repeat(80));
    console.log('\n⚠️  ПРОБЛЕМЫ СИНХРОНИЗАЦИИ:\n');
    
    console.log('1. НЕТ ПРЯМОЙ СВЯЗИ С areaId из SVG:');
    console.log('   - В CSV нет поля для связи с ID слоев в Figma/SVG');
    console.log('   - Локация (например, "108", "3Б") не совпадает с areaId в data.js');
    console.log('   - В data.js используются areaId типа "area_10", "Group 1201"');
    
    console.log('\n2. РАЗНЫЕ ФОРМАТЫ НАЗВАНИЙ КОРПУСОВ:');
    console.log('   - CSV: "Альфа", "Бета"');
    console.log('   - data.js: "B1", "B2", "B3"');
    console.log('   - Нужна нормализация');
    
    console.log('\n3. МНОГО СЕРВИСОВ БЕЗ ЛОКАЦИИ:');
    console.log(`   - ${locationTypes.empty.length} сервисов без указанной локации`);
    console.log('   - Сложно связать с конкретными зонами на карте');
    
    console.log('\n4. РАЗНЫЕ КАТЕГОРИИ:');
    console.log('   - CSV: "Переговорные", "Питание", "Сервис", "Эко-инициативы" и т.д.');
    console.log('   - data.js: "meeting", "food", "service", "sport", "relax"');
    console.log('   - Нужен маппинг категорий');
    
    // Рекомендации
    console.log('\n═'.repeat(80));
    console.log('\n💡 РЕКОМЕНДАЦИИ ДЛЯ СИНХРОНИЗАЦИИ:\n');
    
    console.log('1. ДОБАВИТЬ В CSV КОЛОНКУ "ID слоя в Figma":');
    console.log('   - Создать уникальный ID для каждого сервиса');
    console.log('   - Формат: service_{id}_{name_normalized}');
    console.log('   - Пример: service_401_Переговорка-Альфа');
    
    console.log('\n2. СОЗДАТЬ МАППИНГ ЛОКАЦИЙ → areaId:');
    console.log('   - Локация из CSV (например, "108") → areaId в SVG (например, "area_108")');
    console.log('   - Нужно согласовать с дизайнерами, какие ID используются в Figma');
    
    console.log('\n3. НОРМАЛИЗОВАТЬ НАЗВАНИЯ:');
    console.log('   - Корпуса: Альфа → B1, Бета → B2');
    console.log('   - Категории: Переговорные → meeting, Питание → food');
    
    console.log('\n4. СИНХРОНИЗИРОВАТЬ С data.js:');
    console.log('   - Обновить data.js на основе CSV');
    console.log('   - Использовать ID из CSV как areaId');
    console.log('   - Проверить соответствие с SVG файлами');
    
    console.log('\n5. СТРУКТУРА FIGMA:');
    console.log('   - Переименовать слои в Figma согласно формату service_{id}_{name}');
    console.log('   - Использовать локацию как основу для ID');
    console.log('   - Создать структуру папок: Building_{B1}/Floor_{N}/Services');
    
    console.log('\n═'.repeat(80));
    
    return {
        rows,
        stats: {
            total: rows.length,
            byBuilding,
            byCategory,
            byFloor,
            withLocation,
            inMaps
        },
        locationTypes
    };
}

// Если запущен напрямую
if (require.main === module) {
    const csvPath = process.argv[2] || path.join(__dirname, '..', 'service-table.csv');
    
    if (!fs.existsSync(csvPath)) {
        console.error(`❌ Файл не найден: ${csvPath}`);
        console.log('\nИспользование:');
        console.log('  node scripts/analyze-csv-mapping.js <путь-к-csv>');
        process.exit(1);
    }
    
    analyzeCSVMapping(csvPath);
}

module.exports = { analyzeCSVMapping, parseCSV, normalizeBuilding };






