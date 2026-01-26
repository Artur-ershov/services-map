#!/usr/bin/env node
/**
 * Упрощенный скрипт деплоя на Vercel
 * Использует переменные окружения для неинтерактивного деплоя
 */

const { execSync } = require('child_process');

console.log('🚀 Деплой на Vercel...\n');

try {
    // Проверяем авторизацию
    console.log('🔐 Проверка авторизации...');
    execSync('npx vercel whoami', { stdio: 'inherit' });
    
    console.log('\n📦 Запуск деплоя...');
    console.log('   (Отвечайте на вопросы в терминале)\n');
    
    // Запускаем деплой в интерактивном режиме
    // Пользователь должен ответить на вопросы:
    // - Link to existing project? (N для нового)
    // - What's your project's name? (любое имя)
    // - In which directory is your code located? (./)
    execSync('npx vercel', { stdio: 'inherit' });
    
    console.log('\n✅ Деплой завершен!');
    console.log('\n📝 Следующие шаги:');
    console.log('1. Скопируйте URL из вывода выше');
    console.log('2. Добавьте переменные окружения:');
    console.log('   npx vercel env add TILDA_PUBLIC_KEY production');
    console.log('   npx vercel env add TILDA_SECRET_KEY production');
    console.log('3. Укажите URL в Tilda:');
    console.log('   Настройки сайта → Экспорт → API → Webhook URL');
    console.log('   https://ваш-проект.vercel.app/tilda-webhook');
    
} catch (error) {
    console.error('\n❌ Ошибка:', error.message);
    process.exit(1);
}
