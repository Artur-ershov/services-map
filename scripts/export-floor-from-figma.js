#!/usr/bin/env node

/**
 * Скрипт для экспорта планов этажей из Figma
 * Использует Figma MCP для получения SVG
 * 
 * Использование:
 * node scripts/export-floor-from-figma.js B1-F3
 * или
 * node scripts/export-floor-from-figma.js --all
 */

const fs = require('fs');
const path = require('path');
const figmaConfig = require('../figma-config.js');

// Эта функция должна быть вызвана через MCP инструмент
// В реальном сценарии, это должно работать через MCP сервер
// Здесь представлена структура для ручной интеграции

async function exportFloorFromFigma(building, floor) {
    const floorKey = `${building}-F${floor}`;
    const mapping = figmaConfig.floorMapping[floorKey];
    
    if (!mapping || !mapping.nodeId) {
        console.error(`❌ Не найден маппинг для ${floorKey}`);
        console.error(`   Добавьте конфигурацию в figma-config.js`);
        return false;
    }
    
    console.log(`📥 Экспорт этажа ${floorKey} из Figma...`);
    console.log(`   Node ID: ${mapping.nodeId}`);
    console.log(`   Файл: ${mapping.fileName}`);
    
    // ВАЖНО: Этот скрипт требует интеграции с Figma MCP
    // Для реальной работы нужно использовать MCP инструменты:
    // - mcp_Figma_get_design_context для получения SVG
    // - или mcp_Figma_get_metadata для получения структуры
    
    console.log(`\n⚠️  Для экспорта SVG из Figma используйте MCP инструменты:`);
    console.log(`   1. mcp_Figma_get_design_context для получения SVG кода`);
    console.log(`   2. Сохраните результат в файл ${mapping.fileName}`);
    console.log(`\n   Или используйте Figma API напрямую для экспорта SVG`);
    
    return false;
}

// Главная функция
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Использование:');
        console.log('  node scripts/export-floor-from-figma.js <BUILDING-FLOOR>');
        console.log('  node scripts/export-floor-from-figma.js --all');
        console.log('\nПримеры:');
        console.log('  node scripts/export-floor-from-figma.js B1-F3');
        console.log('  node scripts/export-floor-from-figma.js B3-F1');
        process.exit(1);
    }
    
    if (args[0] === '--all') {
        // Экспорт всех этажей из конфига
        const floorKeys = Object.keys(figmaConfig.floorMapping);
        for (const floorKey of floorKeys) {
            const mapping = figmaConfig.floorMapping[floorKey];
            await exportFloorFromFigma(mapping.building, mapping.floor);
        }
    } else {
        // Экспорт конкретного этажа
        const floorKey = args[0];
        const match = floorKey.match(/^([B0-9]+)-F(\d+)$/);
        
        if (!match) {
            console.error(`❌ Неверный формат: ${floorKey}`);
            console.error(`   Используйте формат: B1-F3`);
            process.exit(1);
        }
        
        const [, building, floor] = match;
        await exportFloorFromFigma(building, parseInt(floor));
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { exportFloorFromFigma };




