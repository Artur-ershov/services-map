#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Экспорт SVG из Figma через MCP (для ручного использования)

Этот скрипт показывает, как использовать MCP инструменты для получения SVG
из Figma. Для автоматизации нужен доступ к MCP серверу.

Использование:
    python scripts/export-figma-svg.py
"""

print("""
Для экспорта SVG из Figma используйте MCP инструменты:

1. mcp_Figma_get_design_context - для получения SVG кода
2. mcp_Figma_get_metadata - для получения структуры
3. mcp_Figma_get_screenshot - для получения скриншота

Пример использования через MCP:
- fileKey: MUjKq30tTItxa1RBJYUCYb
- nodeId: 72:24 (для B1-F3)

После получения SVG кода сохраните его в папку map/
с соответствующим именем файла (например, floor-B1-F3.svg)

Для автоматизации экспорта всех этажей используйте:
- figma-config.js для маппинга node IDs
- MCP инструменты для получения SVG
- Скрипты для сохранения файлов
""")






