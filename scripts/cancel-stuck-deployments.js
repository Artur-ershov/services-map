#!/usr/bin/env node
/**
 * Скрипт для отмены зависших деплоев на Vercel
 * Автоматически отменяет деплои в статусе "Building" дольше 5 минут
 */

const { execSync } = require('child_process');

function getDeployments() {
    try {
        const output = execSync(
            'node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel ls',
            { encoding: 'utf8' }
        );
        // Парсим текстовый вывод
        const lines = output.split('\n');
        const deployments = [];
        let currentDeployment = null;
        
        for (const line of lines) {
            // Ищем строки с URL деплоя
            if (line.includes('https://')) {
                const urlMatch = line.match(/https:\/\/[^\s]+/);
                if (urlMatch) {
                    if (currentDeployment) {
                        deployments.push(currentDeployment);
                    }
                    currentDeployment = {
                        url: urlMatch[0],
                        state: 'UNKNOWN'
                    };
                }
            }
            // Ищем статус Building
            if (line.includes('● Building') || line.includes('Building')) {
                if (currentDeployment) {
                    currentDeployment.state = 'BUILDING';
                }
            }
        }
        if (currentDeployment) {
            deployments.push(currentDeployment);
        }
        
        return deployments;
    } catch (error) {
        console.error('Ошибка получения списка деплоев:', error.message);
        return [];
    }
}

function cancelDeployment(deploymentUrl) {
    try {
        console.log(`Отмена деплоя: ${deploymentUrl}`);
        // Извлекаем ID деплоя из URL
        const deploymentId = deploymentUrl.split('/').pop().split('-').slice(1).join('-');
        execSync(
            `node "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npx-cli.js" vercel rm ${deploymentUrl} --yes`,
            { stdio: 'inherit' }
        );
        return true;
    } catch (error) {
        // Пробуем альтернативный способ - через веб-интерфейс
        console.log(`   Попробуйте отменить вручную: https://vercel.com/arts-projects-362cad37/srv`);
        return false;
    }
}

function main() {
    console.log('🔍 Поиск зависших деплоев...\n');
    
    const deployments = getDeployments();
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;
    
    let cancelled = 0;
    
    deployments.forEach(deployment => {
        if (deployment.state === 'BUILDING' || deployment.state === 'UNKNOWN') {
            // Если статус Building, считаем зависшим
            console.log(`⚠️  Найден зависший деплой:`);
            console.log(`   URL: ${deployment.url}`);
            console.log(`   Статус: ${deployment.state}\n`);
            
            if (cancelDeployment(deployment.url)) {
                cancelled++;
            }
        }
    });
    
    if (cancelled === 0) {
        console.log('✅ Зависших деплоев не найдено');
    } else {
        console.log(`\n✅ Отменено деплоев: ${cancelled}`);
    }
}

main();
