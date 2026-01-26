/**
 * Скрипт для проверки работы webhook
 * Проверяет логи Vercel и статус GitHub Actions
 */

const { execSync } = require('child_process');

const VERCEL_URL = 'https://srv-8s7gl6ln7-arts-projects-362cad37.vercel.app';
const GITHUB_REPO = 'Artur-ershov/services-map';

console.log('🧪 Проверка работы webhook...\n');
console.log('📝 Инструкция:');
console.log('   1. Создайте или измените страницу в Tilda');
console.log('   2. Опубликуйте страницу');
console.log('   3. Подождите 10-30 секунд');
console.log('   4. Запустите этот скрипт снова для проверки\n');
console.log('─'.repeat(60));

// Проверка логов Vercel
console.log('\n📋 Проверка логов Vercel...\n');
try {
  const logs = execSync(
    `node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel logs ${VERCEL_URL}`,
    { encoding: 'utf-8', stdio: 'pipe', maxBuffer: 1024 * 1024 }
  );
  
  const lines = logs.split('\n').slice(-20); // Последние 20 строк
  console.log(lines.join('\n'));
  
  // Поиск ключевых сообщений
  const hasWebhook = logs.includes('Webhook получен') || logs.includes('🔔');
  const hasGitHub = logs.includes('GitHub Actions') || logs.includes('✅');
  const hasError = logs.includes('❌') || logs.includes('Error');
  
  console.log('\n─'.repeat(60));
  console.log('📊 Результаты:');
  console.log(`   Webhook получен: ${hasWebhook ? '✅' : '❌'}`);
  console.log(`   GitHub Actions запущен: ${hasGitHub ? '✅' : '❌'}`);
  console.log(`   Ошибки: ${hasError ? '⚠️  Есть ошибки' : '✅ Нет ошибок'}`);
  
} catch (error) {
  console.error('❌ Ошибка при получении логов:', error.message);
  console.log('\n💡 Попробуйте вручную:');
  console.log(`   node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel logs ${VERCEL_URL}`);
}

console.log('\n─'.repeat(60));
console.log('🔗 Полезные ссылки:');
console.log(`   GitHub Actions: https://github.com/${GITHUB_REPO}/actions`);
console.log(`   Vercel Dashboard: https://vercel.com/dashboard`);
console.log(`   Webhook URL: ${VERCEL_URL}/tilda-webhook`);

console.log('\n💡 Для просмотра всех логов:');
console.log(`   node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel logs ${VERCEL_URL}`);
