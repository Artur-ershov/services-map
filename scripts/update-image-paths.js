// Скрипт для обновления путей к изображениям в data-generated.js
// Заменяет URL на andreymashkin.ru на локальные пути images/andreymashkin_*.jpg
const fs = require('fs');
const path = require('path');

const dataGeneratedPath = path.join(__dirname, '..', 'data-generated.js');
const imagesDir = path.join(__dirname, '..', 'images');

if (!fs.existsSync(dataGeneratedPath)) {
    console.error('Файл data-generated.js не найден!');
    process.exit(1);
}

let content = fs.readFileSync(dataGeneratedPath, 'utf8');

// Функция для замены URL на локальные пути
function replaceImageUrls(match, prefix, shareId, suffix) {
    const filename = `andreymashkin_${shareId}.jpg`;
    const localPath = path.join(imagesDir, filename);
    
    // Проверяем, существует ли файл
    if (fs.existsSync(localPath)) {
        return `images/${filename}`;
    }
    
    // Если файл не найден, оставляем URL как есть
    return match;
}

// Заменяем URL вида https://andreymashkin.ru/disk/share/XXXXX на images/andreymashkin_XXXXX.jpg
// Обрабатываем как одиночные URL, так и множественные (через \n)
content = content.replace(/https:\/\/andreymashkin\.ru\/disk\/share\/([a-zA-Z0-9]+)/g, (match, shareId) => {
    const filename = `andreymashkin_${shareId}.jpg`;
    const localPath = path.join(imagesDir, filename);
    
    if (fs.existsSync(localPath)) {
        return `images/${filename}`;
    }
    
    // Если файл не найден, оставляем URL
    return match;
});

// Очищаем поле img от текстовых описаний и невалидных значений
content = content.replace(/img:\s*"([^"]*)"/g, (match, imgValue) => {
    // Разбиваем на строки (учитываем \n в строке)
    const lines = imgValue.split(/\\n|\n/);
    const validPaths = [];
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Пропускаем пустые строки
        if (!trimmed) continue;
        
        // Пропускаем текстовые описания (проверяем, что это не путь и не URL)
        const isTextDescription = (
            (trimmed.includes('приложила') || 
             trimmed.includes('прикрепила') || 
             trimmed.includes('дополнительно')) &&
            !trimmed.startsWith('http') && 
            !trimmed.startsWith('images/')
        );
        
        if (isTextDescription || (trimmed.includes('фото') && !trimmed.startsWith('http') && !trimmed.startsWith('images/'))) {
            continue;
        }
        
        // Если это URL на andreymashkin.ru, проверяем наличие файла
        if (trimmed.startsWith('https://andreymashkin.ru/disk/share/')) {
            const shareIdMatch = trimmed.match(/share\/([a-zA-Z0-9]+)/);
            if (shareIdMatch) {
                const shareId = shareIdMatch[1];
                const filename = `andreymashkin_${shareId}.jpg`;
                const localPath = path.join(imagesDir, filename);
                if (fs.existsSync(localPath)) {
                    validPaths.push(`images/${filename}`);
                } else {
                    // Файл не скачан, оставляем URL (или можно удалить, если не нужен)
                    // validPaths.push(trimmed);
                }
            }
        } else if (trimmed.startsWith('images/')) {
            // Уже локальный путь
            validPaths.push(trimmed);
        } else if (trimmed.startsWith('http')) {
            // Другой URL (не andreymashkin.ru)
            validPaths.push(trimmed);
        }
    }
    
    // Объединяем валидные пути через \n, если пусто - используем DUMMY_IMG_URL
    const cleaned = validPaths.length > 0 ? validPaths.join('\\n') : '';
    return `img: "${cleaned}"`;
});

// Сохраняем обновленный файл
fs.writeFileSync(dataGeneratedPath, content, 'utf8');

console.log('✓ Пути к изображениям обновлены в data-generated.js');
console.log('  Проверьте файл и замените data.js на data-generated.js при необходимости');
