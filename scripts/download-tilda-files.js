#!/usr/bin/env node
/**
 * Скрипт для скачивания файлов Tilda через API
 * 
 * Использование:
 *   node scripts/download-tilda-files.js [projectId]
 * 
 * Требуется .env файл с:
 *   TILDA_PUBLIC_KEY=ваш_public_key
 *   TILDA_SECRET_KEY=ваш_secret_key
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Загрузка переменных окружения
require('dotenv').config();

const TILDA_API_BASE = 'https://api.tildacdn.info/v1';
const PUBLIC_KEY = process.env.TILDA_PUBLIC_KEY;
const SECRET_KEY = process.env.TILDA_SECRET_KEY;

// Путь для сохранения файлов
const OUTPUT_DIR = path.join(__dirname, '..', 'tilda-files');

/**
 * Создает директорию, если её нет
 */
async function ensureDir(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }
}

/**
 * Скачивает файл по URL
 */
async function downloadFile(url, filePath) {
    try {
        await ensureDir(path.dirname(filePath));
        
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer',
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        await fs.writeFile(filePath, Buffer.from(response.data));
        return true;
    } catch (error) {
        console.error(`Ошибка при скачивании ${url}:`, error.message);
        return null;
    }
}

/**
 * Получает список проектов
 */
async function getProjectsList() {
    try {
        const response = await axios.get(`${TILDA_API_BASE}/getprojectslist`, {
            params: {
                publickey: PUBLIC_KEY,
                secretkey: SECRET_KEY
            }
        });

        if (response.data.status === 'FOUND') {
            return response.data.result;
        }
        throw new Error('Проекты не найдены');
    } catch (error) {
        console.error('Ошибка при получении списка проектов:', error.message);
        throw error;
    }
}

/**
 * Получает информацию о проекте
 */
async function getProjectInfo(projectId) {
    try {
        const response = await axios.get(`${TILDA_API_BASE}/getprojectinfo`, {
            params: {
                publickey: PUBLIC_KEY,
                secretkey: SECRET_KEY,
                projectid: projectId
            }
        });

        if (response.data.status === 'FOUND') {
            return response.data.result;
        }
        throw new Error('Проект не найден');
    } catch (error) {
        console.error('Ошибка при получении информации о проекте:', error.message);
        throw error;
    }
}

/**
 * Получает список страниц проекта
 */
async function getPagesList(projectId) {
    try {
        const response = await axios.get(`${TILDA_API_BASE}/getpageslist`, {
            params: {
                publickey: PUBLIC_KEY,
                secretkey: SECRET_KEY,
                projectid: projectId
            }
        });

        if (response.data.status === 'FOUND') {
            return response.data.result;
        }
        throw new Error('Страницы не найдены');
    } catch (error) {
        console.error('Ошибка при получении списка страниц:', error.message);
        throw error;
    }
}

/**
 * Получает информацию о странице для экспорта (полный HTML)
 */
async function getPageExport(pageId) {
    try {
        // Используем getpagefullexport для получения полного HTML (с DOCTYPE, html, head, body)
        const response = await axios.get(`${TILDA_API_BASE}/getpagefullexport`, {
            params: {
                publickey: PUBLIC_KEY,
                secretkey: SECRET_KEY,
                pageid: pageId
            }
        });

        if (response.data.status === 'FOUND') {
            return response.data.result;
        }
        throw new Error('Страница не найдена');
    } catch (error) {
        console.error(`Ошибка при получении страницы ${pageId}:`, error.message);
        return null;
    }
}

/**
 * Исправляет пути в HTML для локального просмотра
 */
function fixHtmlPaths(html, basePath) {
    let fixed = html;
    
    // Нормализуем basePath: убеждаемся, что он заканчивается на /
    const normalizedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
    
    // Заменяем существующие пути /tilda-files/project-XXX/ на новый basePath
    // Это нужно для перехода с локальных путей на пути основного хоста
    fixed = fixed.replace(/\/tilda-files\/project-\d+\//g, normalizedBasePath);
    
    // Исправляем пути к изображениям: src="tild..." -> src="[basePath]images/tild..."
    fixed = fixed.replace(/src="(tild[^"]+)"/g, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return `src="${normalizedBasePath}images/${imgPath}"`;
        }
        return match;
    });
    
    // Исправляем пути в CSS: url(tild...) -> url("[basePath]images/tild...")
    fixed = fixed.replace(/url\(["']?(tild[^"')]+)["']?\)/g, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return `url("${normalizedBasePath}images/${imgPath}")`;
        }
        return match;
    });
    
    // Исправляем пути к JS файлам в script src: src="tilda-..." -> src="/tilda-files/project-XXX/js/tilda-..."
    // Также исправляем пути, которые указывают на /images/ вместо /js/ или без слэша
    fixed = fixed.replace(/<script[^>]*src=["']([^"']+\.js)["']/gi, (match, jsPath) => {
        if (!jsPath.startsWith('http') && !jsPath.startsWith('data:')) {
            // Исправляем пути типа /project-6919916js/ -> /project-6919916/js/
            if (jsPath.match(/project-\d+js\//)) {
                const correctedPath = jsPath.replace(/project-(\d+)js\//g, 'project-$1/js/');
                return match.replace(jsPath, correctedPath);
            }
            // Исправляем пути типа /project-6919916images/ -> /project-6919916/js/
            if (jsPath.match(/project-\d+images\//)) {
                const correctedPath = jsPath.replace(/project-(\d+)images\//g, 'project-$1/js/');
                return match.replace(jsPath, correctedPath);
            }
            // Если путь указывает на /images/ и это JS файл (включая tilda-blocks-*.js), заменяем на /js/
            if (jsPath.includes('/images/') && jsPath.includes('.js')) {
                const correctedPath = jsPath.replace(/\/images\//g, '/js/');
                return match.replace(jsPath, correctedPath);
            }
            // Если путь относительный (tilda-blocks-*.js без /), добавляем normalizedBasePath + js/
            if (!jsPath.startsWith('/') && jsPath.includes('tilda-blocks-') && jsPath.includes('.js')) {
                const queryString = jsPath.includes('?') ? jsPath.split('?')[1] : '';
                const fileName = jsPath.split('?')[0];
                return match.replace(jsPath, `${normalizedBasePath}js/${fileName}${queryString ? '?' + queryString : ''}`);
            }
            // Если путь относительный и не начинается с /, добавляем normalizedBasePath
            if (!jsPath.startsWith('/') && !jsPath.includes('/')) {
                return match.replace(jsPath, `${normalizedBasePath}js/${jsPath}`);
            }
        }
        return match;
    });
    
    // Исправляем пути в t_loadJsFile вызовах: t_loadJsFile('tilda-...') -> t_loadJsFile('/tilda-files/project-XXX/js/tilda-...')
    fixed = fixed.replace(/t_loadJsFile\(["']([^"']+\.js)["']/gi, (match, jsPath) => {
        // Если путь содержит /images/ и это JS файл, исправляем на /js/
        if (jsPath.includes('/images/')) {
            return match.replace('/images/', '/js/');
        }
        if (!jsPath.startsWith('http') && !jsPath.startsWith('/') && !jsPath.startsWith('data:')) {
            // Если путь относительный, добавляем normalizedBasePath
            if (!jsPath.includes('/')) {
                return match.replace(jsPath, `${normalizedBasePath}js/${jsPath}`);
            }
        }
        // Если путь начинается с normalizedBasePath и указывает на images, но это JS файл, исправляем
        if (jsPath.startsWith(normalizedBasePath) && jsPath.includes('/images/')) {
            return match.replace(`${normalizedBasePath}images/`, `${normalizedBasePath}js/`);
        }
        return match;
    });
    
    // Исправляем пути к CSS файлам в link href: href="tilda-..." -> href="/tilda-files/project-XXX/css/tilda-..."
    // Также исправляем пути, которые указывают на /images/ вместо /css/
    fixed = fixed.replace(/<link[^>]*href=["']([^"']+\.css)["']/gi, (match, cssPath) => {
        if (!cssPath.startsWith('http') && !cssPath.startsWith('data:')) {
            // Исправляем /custom.css -> [basePath]css/custom.css
            if (cssPath === '/custom.css' || cssPath.startsWith('/custom.css')) {
                const queryString = cssPath.includes('?') ? '?' + cssPath.split('?').slice(1).join('?') : '';
                return match.replace(cssPath, `${normalizedBasePath}css/custom.css${queryString}`);
            }
            // Если путь указывает на /images/, заменяем на /css/
            if (cssPath.includes('/images/') || cssPath.includes('images/')) {
                const correctedPath = cssPath.replace(/\/?images\//g, 'css/');
                return match.replace(cssPath, correctedPath);
            }
            // Если путь относительный (tilda-blocks-*.css без /), добавляем normalizedBasePath + css/
            if (!cssPath.startsWith('/') && cssPath.includes('tilda-blocks-')) {
                const queryString = cssPath.includes('?') ? '?' + cssPath.split('?').slice(1).join('?') : '';
                const fileName = cssPath.split('?')[0];
                return match.replace(cssPath, `${normalizedBasePath}css/${fileName}${queryString}`);
            }
            // Если путь относительный и не начинается с /, добавляем normalizedBasePath
            if (!cssPath.startsWith('/') && !cssPath.includes('/')) {
                return match.replace(cssPath, `${normalizedBasePath}css/${cssPath}`);
            }
        }
        return match;
    });
    
    // Исправляем пути к изображениям (относительные пути типа src='tild...' или src="tild...")
    fixed = fixed.replace(/src=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/gi, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return match.replace(`tild${imgPath}`, `${normalizedBasePath}images/tild${imgPath}`);
        }
        return match;
    });
    fixed = fixed.replace(/href=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/gi, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return match.replace(`tild${imgPath}`, `${normalizedBasePath}images/tild${imgPath}`);
        }
        return match;
    });
    fixed = fixed.replace(/data-original=['"]tild([^'"]+\.(svg|png|jpg|jpeg|gif))['"]/gi, (match, imgPath) => {
        if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
            return match.replace(`tild${imgPath}`, `${normalizedBasePath}images/tild${imgPath}`);
        }
        return match;
    });
    
    // Исправляем data-* атрибуты с именами изображений (data-content-cover-bg, data-bg и т.д.)
    // data-content-cover-bg="tild*.png" -> data-content-cover-bg="images/tild*.png"
    // Это нужно, чтобы JS правильно формировал пути относительно basePath
    fixed = fixed.replace(/data-content-cover-bg=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/gi, `data-content-cover-bg="images/$1"`);
    fixed = fixed.replace(/data-bg=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/gi, `data-bg="images/$1"`);
    // Общий паттерн для любых data-* атрибутов с изображениями
    fixed = fixed.replace(/data-([^=]+)=["'](tild[^'"]+\.(svg|png|jpg|jpeg|gif))["']/gi, (match, attrName, imgPath) => {
        // Пропускаем уже обработанные атрибуты и те, что начинаются с http или /
        if (imgPath.startsWith('http') || imgPath.startsWith('/') || imgPath.startsWith('images/')) {
            return match;
        }
        return `data-${attrName}="images/${imgPath}"`;
    });
    
    // Исправляем пути в строках JavaScript (например, в tildastatscript)
    // 'tilda-stat-1.0.min.js' -> '[basePath]js/tilda-stat-1.0.min.js'
    fixed = fixed.replace(/(['"])(tilda-[^'"]+\.js)\1/g, (match, quote, jsPath) => {
        if (!jsPath.startsWith('http') && !jsPath.startsWith('/')) {
            return `${quote}${normalizedBasePath}js/${jsPath}${quote}`;
        }
        return match;
    });
    
    // Добавляем загрузку основных скриптов Tilda перед закрывающим тегом body или в начало
    // Ищем место для вставки скриптов (перед </body> или в конец)
    const bodyEnd = fixed.lastIndexOf('</body>');
    const hasTildaScripts = fixed.includes('tilda-scripts-3.0.min.js') || fixed.includes('tilda-scripts');
    
    if (!hasTildaScripts && bodyEnd !== -1) {
        // Добавляем основные скрипты Tilda перед </body>
        const scriptsToAdd = `
<script src="${normalizedBasePath}js/jquery-1.10.2.min.js"></script>
<script src="${normalizedBasePath}js/tilda-scripts-3.0.min.js"></script>
`;
        fixed = fixed.slice(0, bodyEnd) + scriptsToAdd + fixed.slice(bodyEnd);
    }
    
    // Добавляем загрузку основных скриптов Tilda перед первым использованием t_onReady
    // Ищем первое использование t_onReady в теге <script> и добавляем скрипты перед ним
    const scriptTagPattern = /<script[^>]*>[\s\S]*?t_onReady/;
    const hasTildaScriptsLoaded = fixed.includes('tilda-scripts-3.0.min.js') || 
                                   fixed.includes('tilda-scripts-3.0');
    
    if (!hasTildaScriptsLoaded) {
        // Ищем первый <script> с t_onReady
        const match = fixed.match(/<script[^>]*>[\s\S]*?t_onReady/);
        if (match) {
            const matchIndex = fixed.indexOf(match[0]);
            // Находим начало тега <script>
            const scriptStart = fixed.lastIndexOf('<script', matchIndex);
            if (scriptStart !== -1) {
                // Добавляем основные скрипты Tilda перед этим тегом
                const scriptsToAdd = `<script src="${normalizedBasePath}js/jquery-1.10.2.min.js"></script>
<script src="${normalizedBasePath}js/tilda-scripts-3.0.min.js"></script>
`;
                fixed = fixed.slice(0, scriptStart) + scriptsToAdd + fixed.slice(scriptStart);
            }
        }
    }
    
    // Для полного HTML (getpagefullexport) base tag должен быть в <head>
    // Если это полный HTML с <head>, обновляем или добавляем base в head
    const normalizedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
    if (fixed.includes('<head>')) {
        // Обновляем существующий base tag или добавляем новый
        if (fixed.includes('<base')) {
            fixed = fixed.replace(/<base[^>]*href=["'][^"']*["'][^>]*>/i, `<base href="${normalizedBasePath}">`);
        } else {
            fixed = fixed.replace(/<head>/i, `<head>\n<base href="${normalizedBasePath}">`);
        }
    } else if (!fixed.includes('<base') && !fixed.includes('<head>')) {
        // Если нет head (только body), добавляем base в начало
        fixed = `<base href="${normalizedBasePath}">\n` + fixed;
    }
    
    return fixed;
}

/**
 * Скачивает все файлы страницы
 */
async function downloadPageFiles(pageData, projectDir) {
    const pageDir = path.join(projectDir, 'pages');
    await ensureDir(pageDir);

    // Исправляем пути в HTML перед сохранением
    // projectDir = tilda-files/project-6919916, basename = project-6919916
    // Используем относительные пути для работы на основном хосте (как на zabota.croc.ru)
    // Можно переопределить через переменную окружения TILDA_BASE_PATH (по умолчанию корень сайта)
    const basePath = process.env.TILDA_BASE_PATH || '/';
    const fixedHtml = fixHtmlPaths(pageData.html, basePath);

    // Сохраняем HTML с исправленными путями
    const htmlPath = path.join(pageDir, pageData.filename || `page-${pageData.id}.html`);
    await fs.writeFile(htmlPath, fixedHtml, 'utf8');
    console.log(`✓ Сохранена страница (пути исправлены): ${htmlPath}`);

    // Скачиваем изображения
    if (pageData.images && pageData.images.length > 0) {
        const imagesDir = path.join(projectDir, 'images');
        for (const img of pageData.images) {
            if (img.from && img.to) {
                const imgPath = path.join(imagesDir, img.to);
                await downloadFile(img.from, imgPath);
                console.log(`✓ Скачано изображение: ${img.to}`);
            }
        }
    }

    // Скачиваем JS файлы
    // Примечание: getpagefullexport не возвращает массив js, только images и html
    // Но мы можем извлечь пути к JS из HTML и скачать их
    // Также проверяем, есть ли массив js в ответе (на случай других методов API)
    if (pageData.js && pageData.js.length > 0) {
        const jsDir = path.join(projectDir, 'js');
        for (const js of pageData.js) {
            if (js.from && js.to) {
                const jsPath = path.join(jsDir, js.to);
                await downloadFile(js.from, jsPath);
                console.log(`✓ Скачан JS: ${js.to}`);
            }
        }
    }
    
    // Дополнительно: извлекаем пути к JS файлам из HTML и скачиваем их
    // Это нужно, так как getpagefullexport может не возвращать массив js
    const jsMatches = pageData.html.match(/<script[^>]*src=["']([^"']+\.js)["']/gi);
    if (jsMatches) {
        const jsDir = path.join(projectDir, 'js');
        const imagesDir = path.join(projectDir, 'images');
        for (const match of jsMatches) {
            const srcMatch = match.match(/src=["']([^"']+)["']/i);
            if (srcMatch) {
                let jsUrl = srcMatch[1];
                // Если это относительный путь или путь с basePath, извлекаем имя файла
                if (jsUrl.includes('tilda-') && !jsUrl.startsWith('http')) {
                    // Убираем basePath если есть
                    if (jsUrl.startsWith(basePath)) {
                        jsUrl = jsUrl.replace(basePath, '');
                    }
                    // Исправляем путь если он указывает на images
                    if (jsUrl.startsWith('images/')) {
                        jsUrl = jsUrl.replace('images/', 'js/');
                    }
                    // Извлекаем имя файла
                    const fileName = path.basename(jsUrl);
                    if (fileName && fileName.includes('tilda-')) {
                        // Пытаемся скачать из стандартного места Tilda
                        const tildaUrl = `https://static.tildacdn.com/js/${fileName}`;
                        const localPath = path.join(jsDir, fileName);
                        // Проверяем, не скачан ли уже
                        try {
                            await fs.access(localPath);
                        } catch {
                            // Файл не существует, скачиваем
                            await downloadFile(tildaUrl, localPath);
                            console.log(`✓ Скачан JS из HTML: ${fileName}`);
                        }
                    }
                }
            }
        }
    }

    // Скачиваем CSS файлы
    if (pageData.css && pageData.css.length > 0) {
        const cssDir = path.join(projectDir, 'css');
        for (const css of pageData.css) {
            if (css.from && css.to) {
                const cssPath = path.join(cssDir, css.to);
                await downloadFile(css.from, cssPath);
                console.log(`✓ Скачан CSS: ${css.to}`);
            }
        }
    }
}

/**
 * Основная функция синхронизации
 */
async function syncTildaFiles(projectId) {
    console.log('🚀 Начало синхронизации файлов Tilda...\n');

    // Проверка ключей
    if (!PUBLIC_KEY || !SECRET_KEY) {
        console.error('❌ Ошибка: Не указаны TILDA_PUBLIC_KEY и TILDA_SECRET_KEY в .env файле');
        console.error('Создайте .env файл на основе .env.example');
        process.exit(1);
    }

    try {
        // Если projectId не указан, получаем список проектов
        if (!projectId) {
            console.log('📋 Получение списка проектов...');
            const projects = await getProjectsList();
            console.log('Доступные проекты:');
            projects.forEach(p => {
                console.log(`  - ${p.title} (ID: ${p.id})`);
            });
            
            if (projects.length === 0) {
                console.error('❌ Проекты не найдены');
                process.exit(1);
            }
            
            // Используем первый проект
            projectId = projects[0].id;
            console.log(`\nИспользуется проект: ${projects[0].title} (ID: ${projectId})\n`);
        }

        // Получаем информацию о проекте
        console.log('📦 Получение информации о проекте...');
        const projectInfo = await getProjectInfo(projectId);
        
        const projectDir = path.join(OUTPUT_DIR, `project-${projectId}`);
        await ensureDir(projectDir);

        // Скачиваем общие файлы проекта (изображения, JS, CSS)
        if (projectInfo.images && projectInfo.images.length > 0) {
            console.log('\n📸 Скачивание общих изображений проекта...');
            for (const img of projectInfo.images) {
                if (img.from && img.to) {
                    const imgPath = path.join(projectDir, 'images', img.to);
                    await downloadFile(img.from, imgPath);
                    console.log(`✓ ${img.to}`);
                }
            }
        }

        // Получаем список страниц
        console.log('\n📄 Получение списка страниц...');
        const pages = await getPagesList(projectId);
        console.log(`Найдено страниц: ${pages.length}\n`);

        // Скачиваем каждую страницу
        for (const page of pages) {
            console.log(`📄 Обработка страницы: ${page.title} (ID: ${page.id})`);
            const pageData = await getPageExport(page.id);
            
            if (pageData) {
                await downloadPageFiles(pageData, projectDir);
            }
            console.log('');
        }

        console.log('✅ Синхронизация завершена!');
        console.log(`📁 Файлы сохранены в: ${projectDir}`);
        console.log('\n💡 Важно: Изучите файлы в tilda-files/js/ для понимания API корзины');

    } catch (error) {
        console.error('❌ Ошибка синхронизации:', error.message);
        process.exit(1);
    }
}

// Запуск
const projectId = process.argv[2];
syncTildaFiles(projectId);
