#!/usr/bin/env node
/**
 * Скрипт для автоматического деплоя на Vercel
 * 
 * Использование:
 *   node scripts/deploy-vercel.js
 * 
 * Требуется:
 *   1. vercel login (выполнить один раз вручную)
 *   2. Переменные окружения в .env
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Начало деплоя на Vercel...\n');

// Проверяем наличие .env файла
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    console.error('❌ Файл .env не найден!');
    console.error('Создайте .env файл на основе .env.example');
    process.exit(1);
}

// Читаем переменные из .env
require('dotenv').config();

if (!process.env.TILDA_PUBLIC_KEY || !process.env.TILDA_SECRET_KEY) {
    console.error('❌ Не указаны TILDA_PUBLIC_KEY и TILDA_SECRET_KEY в .env');
    process.exit(1);
}

try {
    // Проверяем авторизацию
    console.log('🔐 Проверка авторизации Vercel...');
    try {
        execSync('npx vercel whoami', { stdio: 'pipe' });
        console.log('✅ Авторизация подтверждена\n');
    } catch (error) {
        console.error('❌ Не авторизован в Vercel!');
        console.error('\nВыполните вручную:');
        console.error('  npx vercel login');
        console.error('\nЭто откроет браузер для авторизации.');
        process.exit(1);
    }

    // Деплой
    console.log('📦 Деплой проекта...');
    const output = execSync('npx vercel --yes --prod', { 
        encoding: 'utf8',
        stdio: 'pipe'
    });
    
    console.log(output);
    
    // Извлекаем URL из вывода
    const urlMatch = output.match(/https:\/\/[^\s]+/);
    if (urlMatch) {
        const url = urlMatch[0];
        console.log('\n✅ Деплой завершен!');
        console.log(`\n🔗 URL: ${url}`);
        console.log(`\n📝 Укажите в Tilda:`);
        console.log(`   ${url}/tilda-webhook`);
        console.log(`\n   Настройки сайта → Экспорт → API → Webhook URL`);
        
        // Добавляем переменные окружения
        console.log('\n🔧 Добавление переменных окружения...');
        console.log('   (Выполните вручную после деплоя, если нужно)');
        console.log(`   npx vercel env add TILDA_PUBLIC_KEY production`);
        console.log(`   npx vercel env add TILDA_SECRET_KEY production`);
        
        console.log('\n✅ Готово! Webhook настроен.');
    } else {
        console.log('\n✅ Деплой завершен, но URL не найден в выводе.');
        console.log('Проверьте вывод выше или выполните: vercel ls');
    }
    
} catch (error) {
    console.error('\n❌ Ошибка деплоя:', error.message);
    if (error.message.includes('login')) {
        console.error('\nВыполните авторизацию:');
        console.error('  vercel login');
    }
    process.exit(1);
}
