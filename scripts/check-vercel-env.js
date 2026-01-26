/**
 * Проверка переменных окружения в Vercel
 */

const { execSync } = require('child_process');

console.log('🔍 Проверка переменных окружения в Vercel...\n');

const requiredVars = [
  'TILDA_PUBLIC_KEY',
  'TILDA_SECRET_KEY',
  'GITHUB_TOKEN',
  'GITHUB_REPO'
];

async function checkEnv() {
  try {
    // Пытаемся получить список переменных
    const result = execSync('node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env ls', {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    console.log('📋 Текущие переменные окружения:\n');
    console.log(result);
    
    // Простая проверка наличия ключевых слов
    const missing = [];
    requiredVars.forEach(varName => {
      if (!result.includes(varName)) {
        missing.push(varName);
      }
    });
    
    if (missing.length > 0) {
      console.log('\n⚠️  Отсутствуют переменные:');
      missing.forEach(v => console.log(`   - ${v}`));
      console.log('\n📝 Инструкция по добавлению:');
      console.log('   1. Откройте: https://vercel.com/dashboard');
      console.log('   2. Выберите проект → Settings → Environment Variables');
      console.log('   3. Добавьте недостающие переменные');
      console.log('\n   Или используйте CLI:');
      missing.forEach(v => {
        console.log(`   node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel env add ${v} production`);
      });
    } else {
      console.log('\n✅ Все необходимые переменные настроены!');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error.message);
    console.log('\n💡 Попробуйте проверить через веб-интерфейс:');
    console.log('   https://vercel.com/dashboard → Ваш проект → Settings → Environment Variables');
  }
}

checkEnv();
