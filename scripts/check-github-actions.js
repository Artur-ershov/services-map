/**
 * Проверка статуса GitHub Actions workflow
 */

const GITHUB_REPO = 'Artur-ershov/services-map';
const WORKFLOW_NAME = 'Tilda Sync on Webhook';

console.log('🔍 Проверка GitHub Actions...\n');
console.log(`Репозиторий: ${GITHUB_REPO}`);
console.log(`Workflow: ${WORKFLOW_NAME}\n`);
console.log('─'.repeat(60));
console.log('\n📋 Откройте в браузере:');
console.log(`   https://github.com/${GITHUB_REPO}/actions\n`);
console.log('Ищите workflow "Tilda Sync on Webhook"');
console.log('\n💡 Последние запуски могут быть с задержкой до 20 минут');
console.log('   после публикации страницы в Tilda.\n');
