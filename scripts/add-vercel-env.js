#!/usr/bin/env node
/**
 * Скрипт для добавления переменных окружения в Vercel
 */

const { execSync } = require('child_process');
require('dotenv').config();

const TILDA_PUBLIC_KEY = process.env.TILDA_PUBLIC_KEY;
const TILDA_SECRET_KEY = process.env.TILDA_SECRET_KEY;

if (!TILDA_PUBLIC_KEY || !TILDA_SECRET_KEY) {
    console.error('❌ Не указаны ключи в .env файле');
    process.exit(1);
}

console.log('🔧 Добавление переменных окружения в Vercel...\n');

try {
    console.log('Добавление TILDA_PUBLIC_KEY...');
    // Используем echo для передачи значения
    const cmd1 = `echo ${TILDA_PUBLIC_KEY} | node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env add TILDA_PUBLIC_KEY production`;
    execSync(cmd1, { stdio: 'inherit' });
    
    console.log('\nДобавление TILDA_SECRET_KEY...');
    const cmd2 = `echo ${TILDA_SECRET_KEY} | node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env add TILDA_SECRET_KEY production`;
    execSync(cmd2, { stdio: 'inherit' });
    
    console.log('\n✅ Переменные окружения добавлены!');
} catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.log('\n💡 Выполните вручную:');
    console.log('   node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env add TILDA_PUBLIC_KEY production');
    console.log('   node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env add TILDA_SECRET_KEY production');
}
