// Восстановление и правильное скачивание изображений
// Извлекает share ID из локальных путей и скачивает заново
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.error('Ошибка: требуется установить sharp: npm install sharp');
    process.exit(1);
}

let dataContent = fs.readFileSync('data.js', 'utf8');
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 85;

function getShareIdFromPath(localPath) {
    const match = localPath.match(/andreymashkin_([^\.]+)/);
    return match ? match[1] : null;
}

function getFilenameFromShareId(shareId) {
    return `andreymashkin_${shareId}.jpg`;
}

async function getImageUrlFromPage(page, shareUrl) {
    try {
        await page.goto(shareUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        // Увеличиваем время ожидания для загрузки изображения
        await page.waitForTimeout(3000);
        
        // Ждем, пока изображение загрузится
        await page.waitForSelector('img[src]', { timeout: 10000 }).catch(() => {});
        
        const imgSrc = await page.evaluate(() => {
            const img = document.querySelector('img[src]');
            if (img && img.src && img.src.startsWith('http')) {
                return img.src;
            }
            return null;
        });
        
        return imgSrc;
    } catch (error) {
        console.error(`  Ошибка при получении URL: ${error.message}`);
        return null;
    }
}

async function downloadImage(url, outputPath) {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Referer': 'https://andreymashkin.ru/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    });
    
    try {
        // Пробуем несколько раз с разными стратегиями
        let buffer = null;
        
        // Способ 1: Прямое скачивание через goto
        try {
            const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            if (response && response.ok()) {
                buffer = await response.buffer();
                if (buffer.length < 1000) {
                    throw new Error('Получен слишком маленький файл');
                }
            } else {
                throw new Error(`HTTP ${response ? response.status() : 'нет ответа'}`);
            }
        } catch (error1) {
            // Способ 2: Через fetch в контексте страницы
            try {
                buffer = await page.evaluate(async (imgUrl) => {
                    const response = await fetch(imgUrl, {
                        headers: {
                            'Referer': 'https://andreymashkin.ru/'
                        }
                    });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const blob = await response.blob();
                    const arrayBuffer = await blob.arrayBuffer();
                    return Array.from(new Uint8Array(arrayBuffer));
                }, url);
                
                buffer = Buffer.from(buffer);
                if (buffer.length < 1000) {
                    throw new Error('Получен слишком маленький файл');
                }
            } catch (error2) {
                throw error1; // Возвращаем первую ошибку
            }
        }
        
        await browser.close();
        return buffer;
    } catch (error) {
        await browser.close();
        throw error;
    }
}

async function processImage(buffer, outputPath) {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
    }
    
    let output = image.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
    });
    
    output = output.jpeg({ quality: QUALITY, mozjpeg: true });
    
    await output.toFile(outputPath);
    return { width, height };
}

async function verifyImage(filePath) {
    try {
        if (!fs.existsSync(filePath)) return false;
        const buffer = fs.readFileSync(filePath);
        if (buffer.length < 1000) {
            return false;
        }
        const metadata = await sharp(buffer).metadata();
        return metadata.width > 0 && metadata.height > 0;
    } catch (e) {
        return false;
    }
}

async function main() {
    console.log('🚀 Восстановление и скачивание изображений...\n');
    console.log('💡 Убедитесь, что ProtonVPN подключен\n');
    
    const allServicesMatch = dataContent.match(/const allServices = (\[[\s\S]*?\]);/);
    if (!allServicesMatch) {
        console.error("Не удалось найти allServices в data.js");
        process.exit(1);
    }
    const allServices = eval(allServicesMatch[1]);
    
    // Собираем все share ID из локальных путей
    const shareIds = new Set();
    
    allServices.forEach(service => {
        if (!service.img) return;
        
        const paths = service.img.trim().split(/\s+/).filter(p => {
            return p.includes('images/andreymashkin_');
        });
        
        paths.forEach(localPath => {
            const shareId = getShareIdFromPath(localPath);
            if (shareId) {
                shareIds.add(shareId);
            }
        });
    });
    
    console.log(`Найдено ${shareIds.size} уникальных изображений для обработки\n`);
    
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;
    
    for (const shareId of shareIds) {
        const filename = getFilenameFromShareId(shareId);
        const outputPath = path.join(imagesDir, filename);
        const shareUrl = `https://andreymashkin.ru/disk/share/${shareId}`;
        
        // Проверяем, есть ли уже валидное изображение
        const isValid = await verifyImage(outputPath);
        if (isValid) {
            console.log(`⊘ Пропущено: ${filename}`);
            skipCount++;
            continue;
        }
        
        // Удаляем битое изображение, если есть
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        
        try {
            console.log(`📥 Обрабатываю: ${shareUrl.substring(0, 70)}...`);
            
            // Получаем прямую ссылку на изображение со страницы
            const imageUrl = await getImageUrlFromPage(page, shareUrl);
            
            if (!imageUrl) {
                throw new Error('Не удалось найти изображение на странице');
            }
            
            console.log(`  Найдена ссылка: ${imageUrl.substring(0, 80)}...`);
            
            // Скачиваем изображение
            const buffer = await downloadImage(imageUrl, outputPath);
            
            // Обрабатываем изображение
            const result = await processImage(buffer, outputPath);
            
            // Проверяем результат
            const isValidResult = await verifyImage(outputPath);
            if (!isValidResult) {
                throw new Error('Обработанное изображение невалидно');
            }
            
            console.log(`✓ Обработано: ${filename} (${result.width}x${result.height})\n`);
            successCount++;
            
            // Задержка 2-3 секунды между запросами
            await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
            
        } catch (error) {
            console.error(`✗ Ошибка: ${error.message}\n`);
            failCount++;
            
            // После ошибки ждем 3 секунды
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    await browser.close();
    
    console.log(`\n📊 Итоги:`);
    console.log(`  ✓ Скачано: ${successCount}`);
    console.log(`  ⊘ Пропущено: ${skipCount}`);
    console.log(`  ✗ Ошибок: ${failCount}`);
}

main().catch(console.error);

