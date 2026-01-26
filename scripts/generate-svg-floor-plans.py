#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для генерации svgFloorPlans на основе существующих SVG файлов
"""

import os
import re
import xml.etree.ElementTree as ET

def get_viewbox_from_svg(filepath):
    """Извлекает viewBox из SVG файла"""
    try:
        tree = ET.parse(filepath)
        root = tree.getroot()
        viewbox = root.get('viewBox')
        if viewbox:
            return viewbox
        # Если viewBox нет, используем width и height
        width = root.get('width', '800')
        height = root.get('height', '550')
        return f"0 0 {width} {height}"
    except Exception as e:
        print(f"Ошибка при чтении {filepath}: {e}")
        return "0 0 800 550"

def generate_svg_floor_plans():
    """Генерирует svgFloorPlans на основе существующих SVG файлов"""
    map_dir = 'map'
    if not os.path.exists(map_dir):
        print(f"Папка {map_dir} не найдена!")
        return
    
    # Паттерн для файлов: b1f1.svg, b2f3.svg и т.д.
    pattern = re.compile(r'^b([123])f(\d+)\.svg$')
    
    floor_plans = {}
    
    for filename in sorted(os.listdir(map_dir)):
        match = pattern.match(filename)
        if not match:
            continue
        
        building_num = match.group(1)
        floor_num = int(match.group(2))
        
        # Преобразуем в формат B1, B2, B3
        building = f"B{building_num}"
        floor_key = f"{building}-F{floor_num}"
        
        filepath = os.path.join(map_dir, filename)
        viewbox = get_viewbox_from_svg(filepath)
        
        floor_plans[floor_key] = {
            'src': filepath.replace('\\', '/'),  # Используем / для веб-путей
            'viewBox': viewbox
        }
    
    # Генерируем JavaScript код
    js_code = "const svgFloorPlans = {\n"
    for key in sorted(floor_plans.keys()):
        plan = floor_plans[key]
        js_code += f'    "{key}": {{\n'
        js_code += f'        src: "{plan["src"]}",\n'
        js_code += f'        viewBox: "{plan["viewBox"]}"\n'
        js_code += f'    }},\n'
    js_code = js_code.rstrip(',\n') + "\n};\n"
    
    return js_code

if __name__ == '__main__':
    js_code = generate_svg_floor_plans()
    print(js_code)





