// Скрипт для сохранения кастомных изображений после синхронизации
// Восстанавливает изображения из старого data.js в новый data-generated.js
const fs = require('fs');
const path = require('path');

const oldDataPath = path.join(__dirname, '..', 'data.js');
const newDataPath = path.join(__dirname, '..', 'data-generated.js');

if (!fs.existsSync(oldDataPath)) {
    console.log('Старый data.js не найден, пропускаем сохранение кастомных изображений');
    process.exit(0);
}

if (!fs.existsSync(newDataPath)) {
    console.log('Новый data-generated.js не найден');
    process.exit(1);
}

// Читаем старый data.js и извлекаем кастомные изображения
const oldData = fs.readFileSync(oldDataPath, 'utf8');
const newData = fs.readFileSync(newDataPath, 'utf8');

// Маппинг: areaId -> img (только для кастомных изображений, не из andreymashkin.ru)
const customImages = {};

// Ищем все сервисы в старом data.js
const serviceRegex = /{\s*id:\s*(\d+)[^}]*?areaId:\s*"([^"]+)"[^}]*?img:\s*"([^"]*)"[^}]*?}/gs;
let match;

while ((match = serviceRegex.exec(oldData)) !== null) {
    const id = match[1];
    const areaId = match[2];
    const img = match[3];
    
    // Сохраняем только локальные изображения (не URL на andreymashkin.ru и не пустые)
    if (img && img.startsWith('images/') && !img.includes('andreymashkin.ru')) {
        customImages[areaId] = img;
        console.log(`Найдено кастомное изображение: ${areaId} -> ${img}`);
    }
}

if (Object.keys(customImages).length === 0) {
    console.log('Кастомные изображения не найдены');
    process.exit(0);
}

// Обновляем новый data-generated.js
let updatedData = newData;

for (const [areaId, img] of Object.entries(customImages)) {
    // Экранируем специальные символы для регулярного выражения
    const escapedAreaId = areaId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Ищем сервис с таким areaId в новом файле - более гибкий паттерн
    const areaIdRegex = new RegExp(`(areaId:\\s*"${escapedAreaId}"[^}]*?img:\\s*")[^"]*(")`, 'gs');
    
    const beforeReplace = updatedData;
    updatedData = updatedData.replace(areaIdRegex, (match, prefix, suffix) => {
        console.log(`Восстановлено изображение для ${areaId}: ${img}`);
        return prefix + img + suffix;
    });
    
    // Если замена не произошла, пробуем другой паттерн (многострочный поиск)
    if (beforeReplace === updatedData) {
        // Пробуем найти по areaId и заменить img в следующей строке
        const lines = updatedData.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`areaId: "${areaId}"`)) {
                // Ищем строку с img в следующих строках
                for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
                    if (lines[j].includes('img:') && !lines[j].includes('images/battery.jpg')) {
                        lines[j] = lines[j].replace(/img:\s*"[^"]*"/, `img: "${img}"`);
                        console.log(`Восстановлено изображение для ${areaId} (альтернативный метод): ${img}`);
                        updatedData = lines.join('\n');
                        break;
                    }
                }
                break;
            }
        }
    }
}

// Сохраняем обновленный файл
fs.writeFileSync(newDataPath, updatedData, 'utf8');
console.log(`\n✓ Кастомные изображения восстановлены в data-generated.js`);
