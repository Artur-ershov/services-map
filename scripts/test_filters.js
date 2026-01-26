// Скрипт для тестирования фильтров переговорных
// Запуск: node test_filters.js

const fs = require('fs');

// Читаем data.js
const dataContent = fs.readFileSync('data.js', 'utf8');

// Извлекаем allServices используя eval (так как это JS файл)
let allServices;
try {
    // Выполняем data.js в изолированном контексте
    const vm = require('vm');
    const context = { module: {}, exports: {}, require: require, console: console };
    vm.createContext(context);
    vm.runInContext(dataContent, context);
    // Пытаемся получить allServices из контекста
    eval(dataContent);
    if (typeof allServices === 'undefined') {
        // Пробуем другой способ - через регулярное выражение
        const match = dataContent.match(/const allServices = (\[[\s\S]*?\]);/);
        if (match) {
            allServices = eval('(' + match[1] + ')');
        } else {
            throw new Error('Не удалось найти allServices');
        }
    }
} catch (e) {
    console.error('Ошибка при загрузке данных:', e.message);
    // Альтернативный способ - через регулярное выражение и безопасный парсинг
    const match = dataContent.match(/const allServices = (\[[\s\S]*?\]);/);
    if (match) {
        try {
            allServices = eval('(' + match[1] + ')');
        } catch (e2) {
            console.error('Не удалось распарсить allServices');
            process.exit(1);
        }
    } else {
        console.error('Не удалось найти allServices');
        process.exit(1);
    }
}

// Фильтруем переговорные
const meetingServices = allServices.filter(s => s.category === 'meeting');

console.log('=== АНАЛИЗ ДАННЫХ ДЛЯ ПЕРЕГОВОРНЫХ ===\n');
console.log(`Всего переговорных: ${meetingServices.length}\n`);

// Проверяем атрибуты
const withCapacity = meetingServices.filter(s => s.attributes && s.attributes.capacity);
const withEquipment = meetingServices.filter(s => s.attributes && s.attributes.equipment);
const withLocation = meetingServices.filter(s => s.attributes && s.attributes.location);

console.log('Атрибуты:');
console.log(`  - capacity: ${withCapacity.length} записей`);
if (withCapacity.length > 0) {
    const capacities = [...new Set(withCapacity.map(s => s.attributes.capacity))];
    console.log(`    Примеры: ${capacities.slice(0, 10).join(', ')}`);
}

console.log(`  - equipment: ${withEquipment.length} записей`);
if (withEquipment.length > 0) {
    const equipments = [...new Set(withEquipment.map(s => s.attributes.equipment))];
    console.log(`    Примеры: ${equipments.slice(0, 10).join(', ')}`);
}

console.log(`  - location: ${withLocation.length} записей`);
if (withLocation.length > 0) {
    const locations = [...new Set(withLocation.map(s => s.attributes.location))];
    console.log(`    Примеры: ${locations.slice(0, 20).join(', ')}`);
}

console.log('\n=== СИМУЛЯЦИЯ renderSubfilters ===\n');

const subfilterDefinitions = {
    'meeting': ['capacity', 'equipment']
};

const subfilterLabels = {
    'capacity': 'Вместимость',
    'equipment': 'Оборудование',
    'location': 'Номер помещения'
};

function simulateRenderSubfilters(category) {
    const definition = subfilterDefinitions[category];
    if (!definition) {
        console.log('  Нет определения для категории');
        return [];
    }
    
    const results = [];
    definition.forEach(attrKey => {
        const allValues = meetingServices
            .filter(s => s.category === category && s.attributes && s.attributes[attrKey])
            .map(s => s.attributes[attrKey]);
        const uniqueValues = [...new Set(allValues)].sort();
        
        results.push({
            key: attrKey,
            label: subfilterLabels[attrKey] || attrKey,
            uniqueValues: uniqueValues,
            count: uniqueValues.length
        });
    });
    
    return results;
}

const simulated = simulateRenderSubfilters('meeting');

if (simulated.length === 0) {
    console.log('✗ Не будет отображено ни одного подфильтра');
} else {
    simulated.forEach(result => {
        if (result.count > 0) {
            console.log(`✓ ${result.label}: ${result.count} уникальных значений`);
            console.log(`  Значения: ${result.uniqueValues.slice(0, 15).join(', ')}${result.uniqueValues.length > 15 ? '...' : ''}`);
        } else {
            console.log(`✗ ${result.label}: нет данных, подфильтр НЕ будет отображен`);
        }
    });
}

console.log('\n=== РЕКОМЕНДАЦИИ ===\n');

if (withCapacity.length === 0 && withEquipment.length === 0) {
    console.log('ПРОБЛЕМА: В данных нет capacity и equipment для переговорных');
    console.log('\nРЕШЕНИЯ:');
    console.log('1. Временно изменить фильтры на location для тестирования функциональности');
    console.log('2. Добавить данные capacity и equipment в data.js');
    console.log('3. Оставить как есть - подфильтры просто не будут отображаться (текущее поведение)');
} else {
    console.log('✓ Данные есть, фильтры должны работать');
}

console.log('\n=== ТЕКУЩЕЕ ПОВЕДЕНИЕ ===');
console.log('При выборе категории "Переговорные":');
console.log('  - renderSubfilters вызывается');
console.log('  - Проверяются capacity и equipment');
console.log('  - Если данных нет - подфильтры не создаются (строка 1430-1433 в app.js)');
console.log('  - subfilterControls остается пустым или скрытым');

