#!/usr/bin/env node
/**
 * Webhook сервер для автоматической синхронизации при изменениях в Tilda
 * 
 * Использование:
 *   node scripts/tilda-webhook-server.js [port]
 * 
 * Настройка в Tilda:
 *   Настройки сайта → Экспорт → API → Webhook URL
 *   Укажите: http://ваш-сервер:3000/tilda-webhook
 * 
 * Для локальной разработки используйте ngrok:
 *   ngrok http 3000
 *   Укажите полученный URL в настройках Tilda
 */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = process.argv[2] || 3000;
const SYNC_SCRIPT = path.join(__dirname, 'download-tilda-files.js');

/**
 * Обработка webhook запроса от Tilda
 */
function handleWebhook(req, res) {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    
    if (url.pathname !== '/tilda-webhook') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
    }

    // Получаем параметры из запроса
    const pageid = url.searchParams.get('pageid');
    const projectid = url.searchParams.get('projectid');
    const published = url.searchParams.get('published');
    const publickey = url.searchParams.get('publickey');

    console.log(`\n🔔 Webhook получен:`);
    console.log(`   Page ID: ${pageid}`);
    console.log(`   Project ID: ${projectid}`);
    console.log(`   Published: ${published}`);
    console.log(`   Public Key: ${publickey}`);

    // Отвечаем Tilda сразу (в течение 5 секунд)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');

    // Запускаем синхронизацию в фоне
    console.log(`\n🔄 Запуск синхронизации для проекта ${projectid}...`);
    
    exec(`node ${SYNC_SCRIPT} ${projectid}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Ошибка синхронизации: ${error.message}`);
            return;
        }
        
        if (stdout) {
            console.log(stdout);
        }
        
        if (stderr) {
            console.error(stderr);
        }
        
        console.log('✅ Синхронизация завершена\n');
    });
}

// Создаем сервер
const server = http.createServer(handleWebhook);

server.listen(PORT, () => {
    console.log(`🚀 Webhook сервер запущен на порту ${PORT}`);
    console.log(`📡 URL для настройки в Tilda: http://localhost:${PORT}/tilda-webhook`);
    console.log(`\n💡 Для локальной разработки используйте ngrok:`);
    console.log(`   ngrok http ${PORT}`);
    console.log(`   Затем укажите полученный URL в настройках Tilda\n`);
});

// Обработка ошибок
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Порт ${PORT} уже занят. Используйте другой порт:`);
        console.error(`   node scripts/tilda-webhook-server.js 3001`);
    } else {
        console.error('❌ Ошибка сервера:', error);
    }
    process.exit(1);
});
