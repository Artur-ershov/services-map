/**
 * Вспомогательный скрипт для работы с Figma через MCP
 * 
 * Этот скрипт должен использоваться в контексте, где доступны MCP инструменты
 * для работы с Figma. Он предоставляет функции для:
 * - Получения метаданных этажей из Figma
 * - Экспорта SVG планов этажей
 * - Синхронизации структуры
 */

const fs = require('fs');
const path = require('path');
const figmaConfig = require('../figma-config.js');

/**
 * Получает метаданные этажа из Figma
 * @param {string} building - Код корпуса (например, 'B1')
 * @param {number} floor - Номер этажа (например, 3)
 * @returns {Promise<Object>} Метаданные этажа
 */
async function getFloorMetadata(building, floor) {
    const floorKey = `${building}-F${floor}`;
    const mapping = figmaConfig.floorMapping[floorKey];
    
    if (!mapping || !mapping.nodeId) {
        throw new Error(`Не найден маппинг для ${floorKey} в figma-config.js`);
    }
    
    // В реальном сценарии здесь должен быть вызов MCP инструмента
    // Например: mcp_Figma_get_metadata(fileKey, nodeId)
    
    return {
        floorKey,
        nodeId: mapping.nodeId,
        building: mapping.building,
        floor: mapping.floor,
        fileName: mapping.fileName
    };
}

/**
 * Экспортирует SVG план этажа из Figma и сохраняет в файл
 * @param {string} building - Код корпуса
 * @param {number} floor - Номер этажа
 * @returns {Promise<string>} Путь к сохраненному файлу
 */
async function exportFloorSVG(building, floor) {
    const metadata = await getFloorMetadata(building, floor);
    const outputPath = path.join(figmaConfig.outputDir, metadata.fileName);
    
    // В реальном сценарии здесь должен быть вызов MCP инструмента
    // для получения SVG кода из Figma
    // Например: mcp_Figma_get_design_context(fileKey, nodeId) -> code
    
    console.log(`📥 Экспорт ${metadata.floorKey}...`);
    console.log(`   Node ID: ${metadata.nodeId}`);
    console.log(`   Сохранение в: ${outputPath}`);
    
    // TODO: Интеграция с MCP инструментами для получения SVG
    // const svgCode = await mcpFigmaGetDesignContext(figmaConfig.fileKey, metadata.nodeId);
    // fs.writeFileSync(outputPath, svgCode, 'utf8');
    
    return outputPath;
}

/**
 * Получает список всех этажей из конфигурации
 * @returns {Array<Object>} Список этажей
 */
function getAllFloors() {
    return Object.keys(figmaConfig.floorMapping).map(floorKey => {
        const mapping = figmaConfig.floorMapping[floorKey];
        return {
            floorKey,
            ...mapping
        };
    });
}

/**
 * Синхронизирует структуру этажей с Figma
 * Проверяет наличие файлов и соответствие конфигурации
 */
async function syncFloorsStructure() {
    const floors = getAllFloors();
    const outputDir = path.resolve(figmaConfig.outputDir);
    
    console.log(`\n🔍 Проверка структуры этажей...\n`);
    
    for (const floor of floors) {
        const filePath = path.join(outputDir, floor.fileName);
        const exists = fs.existsSync(filePath);
        
        const status = exists ? '✅' : '❌';
        const statusText = exists ? 'найден' : 'отсутствует';
        
        console.log(`${status} ${floor.floorKey}: ${floor.fileName} - ${statusText}`);
        if (floor.nodeId) {
            console.log(`   Node ID: ${floor.nodeId}`);
        } else {
            console.log(`   ⚠️  Node ID не указан в конфигурации`);
        }
    }
    
    console.log(`\n📁 Папка: ${outputDir}`);
    console.log(`📋 Всего этажей в конфигурации: ${floors.length}\n`);
}

module.exports = {
    getFloorMetadata,
    exportFloorSVG,
    getAllFloors,
    syncFloorsStructure,
    figmaConfig
};




