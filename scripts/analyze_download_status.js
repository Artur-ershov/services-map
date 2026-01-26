// Анализ статуса скачивания изображений
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dataContent = fs.readFileSync('data.js', 'utf8');
const imagesDir = path.join(__dirname, 'images');

const allServicesMatch = dataContent.match(/const allServices = (\[[\s\S]*?\]);/);
const allServices = eval(allServicesMatch[1]);

function getShareIdFromPath(localPath) {
    const match = localPath.match(/andreymashkin_([^\.\s]+)/);
    return match ? match[1] : null;
}

// Собираем все share ID из data.js
const shareIds = new Set();
const shareIdToService = new Map();

allServices.forEach(service => {
    if (!service.img) return;
    
    const paths = service.img.trim().split(/\s+/).filter(p => {
        return p.includes('images/andreymashkin_');
    });
    
    paths.forEach(localPath => {
        const shareId = getShareIdFromPath(localPath);
        if (shareId) {
            shareIds.add(shareId);
            if (!shareIdToService.has(shareId)) {
                shareIdToService.set(shareId, []);
            }
            shareIdToService.get(shareId).push({
                id: service.id,
                name: service.name,
                category: service.category
            });
        }
    });
});

// Из лога скрипта знаем, что были ошибки 404
const error404 = ['G09JoeSx16y3M', 'b8AVKqhX9ekd6', '02XRVKuegZ6k7'];

const status = {
    valid: [],
    invalid: [],
    missing: [],
    skipped: []
};

async function checkImage(shareId) {
    const filename = `andreymashkin_${shareId}.jpg`;
    const filePath = path.join(imagesDir, filename);
    
    if (!fs.existsSync(filePath)) {
        status.missing.push({
            shareId,
            filename,
            reason: 'Файл отсутствует',
            services: shareIdToService.get(shareId),
            is404: error404.includes(shareId)
        });
        return;
    }
    
    try {
        const stats = fs.statSync(filePath);
        if (stats.size < 1000) {
            status.invalid.push({
                shareId,
                filename,
                reason: `Файл слишком маленький (${stats.size} байт)`,
                services: shareIdToService.get(shareId)
            });
            return;
        }
        
        const metadata = await sharp(filePath).metadata();
        if (metadata.width > 0 && metadata.height > 0) {
            status.valid.push({
                shareId,
                filename,
                size: `${metadata.width}x${metadata.height}`,
                fileSize: stats.size,
                services: shareIdToService.get(shareId)
            });
        } else {
            status.invalid.push({
                shareId,
                filename,
                reason: 'Невалидные метаданные изображения',
                services: shareIdToService.get(shareId)
            });
        }
    } catch (error) {
        status.invalid.push({
            shareId,
            filename,
            reason: `Ошибка проверки: ${error.message}`,
            services: shareIdToService.get(shareId)
        });
    }
}

async function main() {
    console.log('=== АНАЛИЗ СТАТУСА ИЗОБРАЖЕНИЙ ===\n');
    console.log(`Всего уникальных изображений в data.js: ${shareIds.size}\n`);
    
    // Проверяем все изображения
    for (const shareId of shareIds) {
        await checkImage(shareId);
    }
    
    console.log('📊 СТАТИСТИКА:');
    console.log(`  ✓ Валидные: ${status.valid.length}`);
    console.log(`  ✗ Невалидные: ${status.invalid.length}`);
    console.log(`  ❌ Отсутствуют: ${status.missing.length}\n`);
    
    if (status.missing.length > 0) {
        console.log('❌ ОТСУТСТВУЮЩИЕ ФАЙЛЫ:');
        status.missing.forEach(item => {
            console.log(`\n  ${item.filename}`);
            console.log(`    Причина: ${item.reason}`);
            console.log(`    Share ID: ${item.shareId}`);
            console.log(`    URL: https://andreymashkin.ru/disk/share/${item.shareId}`);
            if (item.is404) {
                console.log(`    ⚠️  ОШИБКА 404: Изображение удалено с сервера andreymashkin.ru`);
            }
            if (item.services && item.services.length > 0) {
                console.log(`    Используется в:`);
                item.services.forEach(s => {
                    console.log(`      - ${s.name} (ID: ${s.id}, категория: ${s.category})`);
                });
            }
        });
        console.log('');
    }
    
    if (status.invalid.length > 0) {
        console.log('✗ НЕВАЛИДНЫЕ ФАЙЛЫ:');
        status.invalid.forEach(item => {
            console.log(`\n  ${item.filename}`);
            console.log(`    Причина: ${item.reason}`);
            if (item.services && item.services.length > 0) {
                console.log(`    Используется в:`);
                item.services.forEach(s => {
                    console.log(`      - ${s.name} (ID: ${s.id})`);
                });
            }
        });
        console.log('');
    }
    
    // Показываем примеры валидных (которые были пропущены при скачивании)
    if (status.valid.length > 0) {
        console.log('⊘ ПРОПУЩЕНЫ ПРИ СКАЧИВАНИИ (уже были валидными):');
        const skippedCount = status.valid.length - (shareIds.size - status.missing.length - status.invalid.length);
        if (skippedCount > 0) {
            status.valid.slice(0, 10).forEach(item => {
                console.log(`  ${item.filename} (${item.size})`);
            });
            if (status.valid.length > 10) {
                console.log(`  ... и еще ${status.valid.length - 10} изображений`);
            }
        } else {
            console.log('  (все изображения были перескачаны)');
        }
        console.log('');
    }
    
    console.log('\n=== РЕКОМЕНДАЦИИ ===');
    if (status.missing.length > 0) {
        const missing404 = status.missing.filter(m => m.is404);
        if (missing404.length > 0) {
            console.log(`\n1. Ошибки 404 (${missing404.length} изображений удалены с сервера):`);
            missing404.forEach(item => {
                console.log(`   - ${item.filename} (${item.shareId})`);
                if (item.services && item.services.length > 0) {
                    console.log(`     Используется в: ${item.services.map(s => s.name).join(', ')}`);
                }
            });
            console.log(`   Действие: Нужно найти альтернативные изображения или удалить ссылки из data.js`);
        }
        
        const missingOther = status.missing.filter(m => !m.is404);
        if (missingOther.length > 0) {
            console.log(`\n2. Отсутствуют файлы (${missingOther.length}):`);
            console.log(`   Действие: Запустите download_restore.js для их скачивания`);
        }
    }
    
    if (status.invalid.length > 0) {
        console.log(`\n3. Найдено ${status.invalid.length} невалидных файлов.`);
        console.log(`   Действие: Запустите download_restore.js для их перескачивания`);
    }
    
    if (status.missing.length === 0 && status.invalid.length === 0) {
        console.log('\n✅ Все изображения в порядке!');
    }
}

main().catch(console.error);
