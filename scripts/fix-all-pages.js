const fs = require('fs');
const path = require('path');

const pagesDir = 'tilda-files/project-6919916/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Используем относительные пути для работы на основном хосте (как на zabota.croc.ru)
    // Можно переопределить через переменную окружения TILDA_BASE_PATH (по умолчанию корень сайта)
    const basePath = process.env.TILDA_BASE_PATH || '/';
    const normalizedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
    
    // Заменяем существующие пути /tilda-files/project-XXX/ на новый basePath
    // Это нужно для перехода с локальных путей на пути основного хоста
    content = content.replace(/\/tilda-files\/project-\d+\//g, normalizedBasePath);
    
    // Обновляем base tag
    if (content.includes('<base')) {
        content = content.replace(/<base[^>]*href=["'][^"']*["'][^>]*>/i, `<base href="${normalizedBasePath}">`);
    }
    
    // Исправляем tilda-blocks-*.css (относительные пути)
    content = content.replace(/href="tilda-blocks-([^"]+\.css[^"]*)"/g, `href="${normalizedBasePath}css/tilda-blocks-$1"`);
    
    // Исправляем /custom.css
    content = content.replace(/href="\/custom\.css/g, `href="${normalizedBasePath}css/custom.css`);
    
    // Исправляем /images/tilda-blocks-*.js -> /js/tilda-blocks-*.js
    content = content.replace(/\/images\/tilda-blocks-([^"]+\.js[^"]*)"/g, `/js/tilda-blocks-$1"`);
    
    // Исправляем пути к изображениям в корне проекта (tild*.svg, tild*.png и т.д.)
    // Они должны быть в /images/
    // Обрабатываем src и href атрибуты с полными путями (после первой замены эти пути уже не будут найдены, но оставляем для безопасности)
    content = content.replace(/src="\/tilda-files\/project-6919916\/(tild[^"]+\.(svg|png|jpg|jpeg|gif))"/g, `src="${normalizedBasePath}images/$1"`);
    content = content.replace(/href="\/tilda-files\/project-6919916\/(tild[^"]+\.(svg|png|jpg|jpeg|gif))"/g, `href="${normalizedBasePath}images/$1"`);
    // Также обрабатываем пути без кавычек и в других форматах
    content = content.replace(/src=['"]\/tilda-files\/project-6919916\/(tild[^'"]+\.(svg|png|jpg|jpeg|gif))['"]/g, `src="${normalizedBasePath}images/$1"`);
    content = content.replace(/href=['"]\/tilda-files\/project-6919916\/(tild[^'"]+\.(svg|png|jpg|jpeg|gif))['"]/g, `href="${normalizedBasePath}images/$1"`);
    
    // Исправляем относительные пути к изображениям (src='tild...' или src="tild...")
    // Они должны быть в /images/ относительно basePath
    content = content.replace(/src=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/g, `src="${normalizedBasePath}images/tild$1"`);
    content = content.replace(/href=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/g, `href="${normalizedBasePath}images/tild$1"`);
    content = content.replace(/data-original=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/g, `data-original="${normalizedBasePath}images/tild$1"`);
    
    // Исправляем пути к изображениям в корне проекта (без папки images)
    // После первой замены эти пути уже не будут найдены, но оставляем для безопасности
    content = content.replace(/\/tilda-files\/project-6919916\/(tild[^'"]+\.(svg|png|jpg|jpeg|gif))/g, `${normalizedBasePath}images/$1`);
    
    // Исправляем пути к JS файлам в корне проекта (без папки js)
    // После первой замены эти пути уже не будут найдены, но оставляем для безопасности
    content = content.replace(/\/tilda-files\/project-6919916\/(tilda-[^'"]+\.js)/g, `${normalizedBasePath}js/$1`);
    
    // Исправляем пути в data-original атрибутах (они могут быть без кавычек или с разными кавычками)
    content = content.replace(/data-original=["']([^'"]*\/tilda-files\/project-6919916\/tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/g, (match, path) => {
        const fixed = path.replace(/\/tilda-files\/project-6919916\/(tild[^'"]+\.(svg|png|jpg|jpeg|gif))/, `${normalizedBasePath}images/$1`);
        return `data-original="${fixed}"`;
    });
    
    // Исправляем пути в content атрибутах meta тегов
    content = content.replace(/content=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/g, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return `content="${normalizedBasePath}images/${imgPath}"`;
        }
        return match;
    });
    
    // Исправляем пути в строках JavaScript (например, в tildastatscript)
    // 'tilda-stat-1.0.min.js' -> '/js/tilda-stat-1.0.min.js' (если basePath = '/')
    content = content.replace(/(['"])(tilda-[^'"]+\.js)\1/g, (match, quote, jsPath) => {
        if (!jsPath.startsWith('http') && !jsPath.startsWith('/')) {
            return `${quote}${normalizedBasePath}js/${jsPath}${quote}`;
        }
        return match;
    });
    
    // Исправляем data-* атрибуты с именами изображений (data-content-cover-bg, data-bg и т.д.)
    // data-content-cover-bg="tild*.png" -> data-content-cover-bg="images/tild*.png"
    // Это нужно, чтобы JS правильно формировал пути относительно basePath
    content = content.replace(/data-content-cover-bg=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/g, `data-content-cover-bg="images/$1"`);
    content = content.replace(/data-bg=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/g, `data-bg="images/$1"`);
    // Общий паттерн для любых data-* атрибутов с изображениями
    content = content.replace(/data-([^=]+)=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/g, (match, attrName, imgPath) => {
        // Пропускаем уже обработанные атрибуты и те, что начинаются с http или /
        if (imgPath.startsWith('http') || imgPath.startsWith('/') || imgPath.startsWith('images/')) {
            return match;
        }
        return `data-${attrName}="images/${imgPath}"`;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
});

console.log(`\n✅ Исправлено ${files.length} страниц`);
