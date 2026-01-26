#!/usr/bin/env node
/**
 * Скрипт для подготовки CSV с КБЖУ для импорта в Tilda Store
 * 
 * Использование:
 *   node scripts/prepare-buffet-nutrition-csv.js
 * 
 * Входные файлы:
 *   - C:\Users\Admin\Downloads\store-6919916-202601231348.csv (экспорт из Tilda)
 *   - C:\Users\Admin\Downloads\Telegram Desktop\Меню бизнес- завтрака.pdf (прочитан вручную)
 *   - C:\Users\Admin\Downloads\Telegram Desktop\Меню Буфета.pdf (прочитан вручную)
 */

const fs = require('fs');
const path = require('path');

// Простой парсер CSV
function parseCSV(content, delimiter = ';') {
    const lines = content.split('\n').filter(l => l.trim());
    if (lines.length === 0) return { headers: [], data: [] };
    
    const headers = lines[0].split(delimiter).map(h => h.replace(/^"|"$/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current);
        
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((h, idx) => {
                row[h] = values[idx] || '';
            });
            data.push(row);
        }
    }
    
    return { headers, data };
}

// Простой генератор CSV
function generateCSV(data, headers, delimiter = ';') {
    const escapeValue = (val) => {
        const str = String(val || '');
        if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };
    
    const headerLine = headers.map(escapeValue).join(delimiter);
    const dataLines = data.map(row => 
        headers.map(h => escapeValue(row[h] || '')).join(delimiter)
    );
    
    return [headerLine, ...dataLines].join('\n');
}

// Данные КБЖУ из PDF файлов (распарсены вручную)
const nutritionData = {
    // Бизнес-завтрак
    "Каша из киноа на кокосовом молоке с сахаром, фруктами и орехами": { kcal: 199, prot: 5, fat: 12, carb: 17 },
    "Блинчики с мясом": { kcal: 192, prot: 11, fat: 6, carb: 23 },
    "Блинчики с творогом": { kcal: 197, prot: 10, fat: 8, carb: 21 },
    "Блинчики с клубнично сливочной начинкой и ягодным соусом": { kcal: 429, prot: 10, fat: 21, carb: 50 },
    "Сырники из творога со свежими фруктами и муссом из сметаны": { kcal: 478, prot: 30, fat: 26, carb: 30 },
    "Салат фруктовый с орехами": { kcal: 113, prot: 2, fat: 4, carb: 18 },
    "Хрустящая гранола": { kcal: 474, prot: 7, fat: 22, carb: 59 },
    "Скрембл с помидорами, авокадо и миксом салатных листьев": { kcal: 159, prot: 12, fat: 11, carb: 4 },
    "Яичница с колбасой из индейки, беконом и белой фасолью": { kcal: 199, prot: 16, fat: 12, carb: 6 },
    "Шакшука с овощами": { kcal: 85, prot: 5, fat: 5, carb: 4 },
    "Омлет конвертик фаршированный овощами, ветчиной и сыром": { kcal: 97, prot: 4, fat: 3, carb: 13 },
    "Тост с яйцом пашот, семгой и австралийским соусом": { kcal: 170, prot: 10, fat: 1, carb: 5 },
    "Брускетта с ростбифом из вырезки с вялеными томатами и рукколой": { kcal: 141, prot: 10, fat: 2, carb: 21 },
    
    // Буфет - Салаты
    "Цезарь с тигровыми": { kcal: 168, prot: 12, fat: 8, carb: 11 },
    "Цезарь с куриным филе": { kcal: 237, prot: 7, fat: 22, carb: 2 },
    "Греческий из свежих овощей Холодные закуски": { kcal: 189, prot: 4, fat: 18, carb: 3 },
    "Салат с авокадо": { kcal: 188, prot: 8, fat: 16, carb: 1.9 },
    "Салат зеленый": { kcal: 54, prot: 2, fat: 4, carb: 2 },
    
    // Буфет - Первые блюда
    "Борщ украинский с мясом*": { kcal: 429, prot: 10, fat: 21, carb: 50 },
    "Бульон куриный меню Гарниры": { kcal: 116, prot: 10, fat: 2, carb: 15 },
    
    // Буфет - Холодные закуски
    "Овощная тарелка": { kcal: 27, prot: 1, fat: 0, carb: 5 },
    "Семга с маслом и лимоном": { kcal: 142, prot: 23, fat: 10, carb: 0 },
    "Маслины/оливки в ассортименте Первые блюда": { kcal: 175, prot: 2, fat: 16, carb: 5 },
    
    // Буфет - Гарниры
    "Картофельное пюре": { kcal: 116, prot: 3, fat: 4, carb: 17 },
    "Каша гречневая Вторые блюда": { kcal: 101, prot: 4, fat: 1, carb: 19 },
    "Брокколи зелень в ассортименте": { kcal: 31, prot: 3, fat: 0, carb: 4 },
    "Смесь рисов": { kcal: 346, prot: 8, fat: 2, carb: 77 },
    "Овощи гриль/соте": { kcal: 55, prot: 2, fat: 1, carb: 9 },
    "Шампиньоны жаренные": { kcal: 37, prot: 4, fat: 2, carb: 1 },
    
    // Буфет - Вторые блюда
    "Стейк из семги": { kcal: 219, prot: 20, fat: 15, carb: 0 },
    "Золотистый дорадо с лимоном на ароматном оливковом масле": { kcal: 291, prot: 45, fat: 13, carb: 1 },
    "помидоры, тимьян, розмарин, масло оливковое, Язык говяжий отварной (добавка к гарниру)": { kcal: 231, prot: 24, fat: 15, carb: 3 },
    "Вырезка говяжья cy-вид": { kcal: 137, prot: 23, fat: 5, carb: 0 },
    "Куриные окорочка cу-вид/ отварные return": { kcal: 158, prot: 17, fat: 10, carb: 0 },
    "Филе индейки су-вид/отварное": { kcal: 130, prot: 25, fat: 1, carb: 0 },
    "Бефстроганов из говядины Напитки": { kcal: 193, prot: 17, fat: 11, carb: 6 },
    "Паста с креветками": { kcal: 139, prot: 7, fat: 4, carb: 16 },
    
    // Напитки (без КБЖУ в PDF, используем приблизительные)
    "Апельсиновый сок": { kcal: 90, prot: 1, fat: 0, carb: 20 },
    "Яблочный сок (200мл)": { kcal: 90, prot: 0, fat: 0, carb: 22 },
    "Морковный сок": { kcal: 50, prot: 1, fat: 0, carb: 11 },
    "Марковно-яблочный сок (200мл)": { kcal: 70, prot: 1, fat: 0, carb: 16 },
    "Черный чай": { kcal: 0, prot: 0, fat: 0, carb: 0 },
    "Зеленый чай": { kcal: 0, prot: 0, fat: 0, carb: 0 },
};

// Функция для нормализации названия товара (для сопоставления)
function normalizeTitle(title) {
    if (!title) return '';
    return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\sа-яё]/gi, '');
}

// Функция для поиска КБЖУ по названию
function findNutrition(title) {
    if (!title) return null;
    
    const normalized = normalizeTitle(title);
    
    // Прямое совпадение
    if (nutritionData[title]) {
        return nutritionData[title];
    }
    
    // Поиск по частичному совпадению
    for (const [key, value] of Object.entries(nutritionData)) {
        const normalizedKey = normalizeTitle(key);
        if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
            return value;
        }
    }
    
    // Специальные случаи
    if (normalized.includes('цезарь') && normalized.includes('тигров')) {
        return nutritionData["Цезарь с тигровыми"];
    }
    if (normalized.includes('цезарь') && normalized.includes('курин')) {
        return nutritionData["Цезарь с куриным филе"];
    }
    if (normalized.includes('греческ') && normalized.includes('овощ')) {
        return nutritionData["Греческий из свежих овощей Холодные закуски"];
    }
    if (normalized.includes('салат') && normalized.includes('авокадо')) {
        return nutritionData["Салат с авокадо"];
    }
    if (normalized.includes('салат') && normalized.includes('зелен')) {
        return nutritionData["Салат зеленый"];
    }
    if (normalized.includes('борщ')) {
        return nutritionData["Борщ украинский с мясом*"];
    }
    if (normalized.includes('бульон') && normalized.includes('курин')) {
        return nutritionData["Бульон куриный меню Гарниры"];
    }
    if (normalized.includes('овощн') && normalized.includes('тарел')) {
        return nutritionData["Овощная тарелка"];
    }
    if (normalized.includes('семга') && normalized.includes('масл')) {
        return nutritionData["Семга с маслом и лимоном"];
    }
    if (normalized.includes('маслин') || normalized.includes('оливк')) {
        return nutritionData["Маслины/оливки в ассортименте Первые блюда"];
    }
    if (normalized.includes('картофел') && normalized.includes('пюре')) {
        return nutritionData["Картофельное пюре"];
    }
    if (normalized.includes('каша') && normalized.includes('гречнев')) {
        return nutritionData["Каша гречневая Вторые блюда"];
    }
    if (normalized.includes('брокколи')) {
        return nutritionData["Брокколи зелень в ассортименте"];
    }
    if (normalized.includes('смесь') && normalized.includes('рис')) {
        return nutritionData["Смесь рисов"];
    }
    if (normalized.includes('овощ') && (normalized.includes('гриль') || normalized.includes('соте'))) {
        return nutritionData["Овощи гриль/соте"];
    }
    if (normalized.includes('шампиньон')) {
        return nutritionData["Шампиньоны жаренные"];
    }
    if (normalized.includes('стейк') && normalized.includes('семг')) {
        return nutritionData["Стейк из семги"];
    }
    if (normalized.includes('дорадо')) {
        return nutritionData["Золотистый дорадо с лимоном на ароматном оливковом масле"];
    }
    if (normalized.includes('язык') && normalized.includes('говяж')) {
        return nutritionData["помидоры, тимьян, розмарин, масло оливковое, Язык говяжий отварной (добавка к гарниру)"];
    }
    if (normalized.includes('вырезка') && normalized.includes('говяж')) {
        return nutritionData["Вырезка говяжья cy-вид"];
    }
    if (normalized.includes('окорочк') && normalized.includes('курин')) {
        return nutritionData["Куриные окорочка cу-вид/ отварные return"];
    }
    if (normalized.includes('филе') && normalized.includes('индейк')) {
        return nutritionData["Филе индейки су-вид/отварное"];
    }
    if (normalized.includes('бефстроганов')) {
        return nutritionData["Бефстроганов из говядины Напитки"];
    }
    if (normalized.includes('паста') && normalized.includes('креветк')) {
        return nutritionData["Паста с креветками"];
    }
    if (normalized.includes('апельсинов') && normalized.includes('сок')) {
        return nutritionData["Апельсиновый сок"];
    }
    if (normalized.includes('яблочн') && normalized.includes('сок')) {
        return nutritionData["Яблочный сок (200мл)"];
    }
    if (normalized.includes('морковн') && normalized.includes('сок')) {
        return nutritionData["Морковный сок"];
    }
    if (normalized.includes('марковн') && normalized.includes('яблочн')) {
        return nutritionData["Марковно-яблочный сок (200мл)"];
    }
    if (normalized.includes('черн') && normalized.includes('чай')) {
        return nutritionData["Черный чай"];
    }
    if (normalized.includes('зелен') && normalized.includes('чай')) {
        return nutritionData["Зеленый чай"];
    }
    
    return null;
}

// Читаем CSV экспорта
const csvPath = 'C:\\Users\\Admin\\Downloads\\store-6919916-202601231348.csv';
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Парсим CSV
const parsed = parseCSV(csvContent, ';');

// Обрабатываем данные
const output = parsed.data.map(row => {
    const title = row.Title;
    const nutrition = findNutrition(title);
    
    // Добавляем поля КБЖУ
    if (nutrition) {
        row['Ккал'] = nutrition.kcal;
        row['Белки'] = nutrition.prot;
        row['Жиры'] = nutrition.fat;
        row['Углеводы'] = nutrition.carb;
    } else {
        // Если не нашли - ставим 0
        row['Ккал'] = 0;
        row['Белки'] = 0;
        row['Жиры'] = 0;
        row['Углеводы'] = 0;
        console.warn(`⚠️  Не найдено КБЖУ для: "${title}"`);
    }
    
    return row;
});

// Формируем заголовки (включая новые поля)
const headers = [
    'Tilda UID', 'Brand', 'SKU', 'Mark', 'Category', 'Title', 'Description', 'Text', 
    'Photo', 'Price', 'Quantity', 'Price Old', 'Editions', 'Modifications', 
    'External ID', 'Parent UID', 'Weight', 'Length', 'Width', 'Height', 'Url',
    'Ккал', 'Белки', 'Жиры', 'Углеводы'
];

// Создаем CSV для импорта
const outputCsv = generateCSV(output, headers, ';');

// Сохраняем результат
const outputPath = path.join(__dirname, '..', 'tilda-import-with-nutrition.csv');
fs.writeFileSync(outputPath, outputCsv, 'utf-8');

console.log(`✅ CSV файл создан: ${outputPath}`);
console.log(`📊 Обработано товаров: ${output.length}`);
console.log(`📈 Товаров с КБЖУ: ${output.filter(r => r['Ккал'] > 0).length}`);
console.log(`⚠️  Товаров без КБЖУ: ${output.filter(r => r['Ккал'] === 0).length}`);

// Выводим список товаров без КБЖУ
const withoutNutrition = output.filter(r => r['Ккал'] === 0);
if (withoutNutrition.length > 0) {
    console.log('\n📋 Товары без КБЖУ:');
    withoutNutrition.forEach(r => console.log(`   - ${r.Title}`));
}
