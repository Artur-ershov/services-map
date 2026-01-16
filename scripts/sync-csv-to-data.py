#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Автоматическая синхронизация CSV таблицы с data.js

Использование:
    python scripts/sync-csv-to-data.py [путь-к-csv-или-url]
    
    Примеры:
    python scripts/sync-csv-to-data.py
    python scripts/sync-csv-to-data.py https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
    python scripts/sync-csv-to-data.py data/table.csv

Скрипт:
1. Читает CSV таблицу (из локального файла или Google Sheets URL)
2. Использует колонку "id" напрямую как areaId (должна совпадать с id в SVG)
3. Нормализует данные (корпуса, категории, локации)
4. Генерирует обновленный data.js

Важно: Колонка "id" в CSV должна содержать правильные areaId, которые совпадают
с id элементов в SVG файлах (например, b1f1-enter, b1f1-coffee и т.д.)

По умолчанию использует Google Sheets URL из конфигурации.
"""

import csv
import json
import sys
import os
import re
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen
from urllib.error import URLError

# Маппинг корпусов
BUILDING_MAP = {
    'Альфа': 'B1',
    'Бета': 'B3',  # Бета - это B3
    'Парковка': 'B2',  # Парковка - это B2
    '1': 'B1',  # Числовые значения из CSV
    '2': 'B2',
    '3': 'B3'
}

# URL Google Sheets по умолчанию
DEFAULT_GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRAWx-3c21mmCF00XJWhIiMb23w4LgxFiJ-Cx9CgdD-BP1b2yr_Hq6U4usdAIwBHw/pub?gid=799635611&single=true&output=csv'

# Маппинг категорий
CATEGORY_MAP = {
    'Переговорные': 'meeting',
    'Питание': 'food',
    'Сервис': 'service',
    'Эко-инициативы': 'eco',
    'Релакс': 'relax',
    'Спорт': 'sport',
    'Здоровье': 'health',
    'Красота': 'beauty',
    'Без категории': 'other'
}

def normalize_name(name):
    """Нормализация названия для ID"""
    if not name:
        return ''
    name = name.replace('«', '').replace('»', '')
    name = name.replace(' ', '-')
    # Убираем спецсимволы, оставляем только буквы, цифры, дефисы
    name = ''.join(c if c.isalnum() or c == '-' else '' for c in name)
    return name.strip()

def generate_area_id(figma_id, location, name, building, floor):
    """Генерация areaId на основе ID из Figma, локации или названия"""
    # Приоритет: ID из Figma > локация > название
    if figma_id and figma_id.strip():
        return figma_id.strip()
    elif location and location.strip():
        # Если есть локация, используем её
        clean_location = location.strip().replace(' ', '-')
        return f'area_{clean_location}'
    else:
        # Иначе используем нормализованное название
        clean_name = normalize_name(name)
        return f'service_{clean_name}'

def csv_row_to_service(row, index):
    """Преобразование CSV строки в объект сервиса"""
    # Приоритет: использовать значения из CSV колонок "корпус" и "этаж"
    # areaId используется только как fallback если CSV значения отсутствуют
    
    # Читаем корпус из CSV
    building_raw = (row.get('корпус', '').strip() or 
                    row.get('Корпус', '').strip() or 
                    row.get('корпус', '').strip() or '').strip()
    
    # Читаем этаж из CSV
    floor_str = (row.get('этаж', '').strip() or 
                 row.get('Этаж', '').strip() or 
                 row.get('этаж', '').strip() or '1').strip()
    
    # Преобразуем корпус через маппинг
    building = BUILDING_MAP.get(building_raw) if building_raw else None
    
    # Если корпус не определен из CSV, пробуем извлечь из areaId
    area_id = row.get('id', '').strip() or row.get('ID', '').strip() or row.get('areaId', '').strip()
    
    if not building and area_id:
        # Fallback: извлекаем корпус из areaId
        if area_id.startswith('b1f'):
            building = 'B1'
        elif area_id.startswith('b2f'):
            building = 'B2'
        elif area_id.startswith('b3f'):
            building = 'B3'
    
    # Если все еще не определен, используем значение по умолчанию
    if not building:
        building = 'B1'
    
    # Преобразуем этаж в число
    floor_from_csv = None
    if floor_str:
        try:
            floor_from_csv = int(floor_str)
        except (ValueError, TypeError):
            pass
    
    # Если этаж не определен из CSV, пробуем извлечь из areaId
    if floor_from_csv is None and area_id:
        try:
            prefix_len = 3  # "b1f", "b2f", "b3f"
            if len(area_id) > prefix_len:
                floor_str_from_id = ''
                for i in range(prefix_len, min(prefix_len + 2, len(area_id))):
                    if area_id[i].isdigit():
                        floor_str_from_id += area_id[i]
                    else:
                        break
                if floor_str_from_id:
                    floor_from_csv = int(floor_str_from_id)
        except (ValueError, IndexError):
            pass
    
    # Если все еще не определен, используем значение по умолчанию
    floor = floor_from_csv if floor_from_csv is not None else 1
    
    category_raw = row.get(' Категория', '').strip()
    category = CATEGORY_MAP.get(category_raw, 'other')
    
    # Try multiple possible column names for location (handling encoding/spacing issues)
    location = (row.get('Локация', '') or 
                row.get('локация', '') or 
                row.get('Location', '') or 
                row.get('location', '') or
                row.get('Комната', '') or
                row.get('комната', '') or
                row.get('Room', '') or
                row.get('room', '')).strip()
    name = row.get('Название', '').strip()
    
    # Если areaId отсутствует, генерируем его
    if not area_id:
        area_id = generate_area_id(None, location, name, building, floor)
    description = row.get('Описание', '').strip()
    contacts = row.get('Контакты', '').strip()
    link = row.get('Ссылка', '').strip() or '#'
    hours = row.get('Время работы (где нужно)', '').strip()
    photo = row.get('Фото', '').strip()
    
    # Генерация ID (начинаем с 1000, чтобы не конфликтовать с тестовыми данными)
    service_id = 1000 + index
    
    # Формирование attributes
    attributes = {}
    if location:
        attributes['location'] = location
    if hours:
        attributes['hours'] = hours
    
    # Формирование изображения
    if photo:
        img = photo
    else:
        img = f'https://dummyimage.com/600x400/f3f3f3/000.png&text={name}'
    
    return {
        'id': service_id,
        'name': name,
        'category': category,
        'building': building,
        'floor': floor,
        'areaId': area_id,
        'desc': description,
        'contacts': contacts,
        'img': img,
        'link': link,
        'attributes': attributes
    }

def escape_js_string(s):
    """Экранирование строки для JavaScript"""
    if not s:
        return '""'
    # Используем json.dumps, который правильно экранирует все специальные символы
    return json.dumps(s, ensure_ascii=False)

def get_svg_floor_plans_from_existing():
    """Пытается прочитать svgFloorPlans из существующего data.js"""
    try:
        if os.path.exists('data.js'):
            with open('data.js', 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Ищем начало блока svgFloorPlans
            start = content.find('const svgFloorPlans = {')
            if start == -1:
                return None
            
            # Проверяем, что это не пустой блок с TODO
            if 'TODO' in content[start:start+200]:
                return None
            
            # Находим закрывающую скобку, учитывая вложенность
            brace_count = 0
            i = start + len('const svgFloorPlans = {')
            in_string = False
            string_char = None
            
            while i < len(content):
                char = content[i]
                
                # Отслеживаем строки, чтобы игнорировать скобки внутри них
                if not in_string and (char == '"' or char == "'"):
                    in_string = True
                    string_char = char
                elif in_string and char == string_char:
                    # Проверяем, не экранированная ли кавычка
                    if i == 0 or content[i-1] != '\\':
                        in_string = False
                        string_char = None
                
                if not in_string:
                    if char == '{':
                        brace_count += 1
                    elif char == '}':
                        if brace_count == 0:
                            # Нашли закрывающую скобку объекта
                            end = i + 1
                            # Ищем точку с запятой после закрывающей скобки
                            while end < len(content) and content[end] in ' \n\r\t':
                                end += 1
                            if end < len(content) and content[end] == ';':
                                end += 1
                            return content[start:end] + '\n'
                        brace_count -= 1
                i += 1
    except Exception as e:
        print(f'[WARN] Не удалось прочитать svgFloorPlans из data.js: {e}')
    return None

def generate_svg_floor_plans_code():
    """Генерирует код svgFloorPlans, вызывая скрипт generate-svg-floor-plans.py"""
    try:
        import subprocess
        result = subprocess.run(
            ['python', 'scripts/generate-svg-floor-plans.py'],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )
        if result.returncode == 0:
            return result.stdout
    except Exception as e:
        print(f'[WARN] Не удалось сгенерировать svgFloorPlans: {e}')
    return None

def generate_data_js(services, output_path):
    """Генерация data.js"""
    # Правильная структура этажей для всех корпусов (всегда 11 этажей)
    building_floor_structure = {
        'B1': {
            'label': 'Корпус Альфа',
            'floors': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            'defaultFloor': 1
        },
        'B2': {
            'label': 'Парковка',
            'floors': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            'defaultFloor': 1
        },
        'B3': {
            'label': 'Корпус Бета',
            'floors': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            'defaultFloor': 1
        }
    }
    
    # Формирование кода
    code_lines = [
        '// --- ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---',
        f'// Автоматически сгенерировано из CSV таблицы',
        f'// Дата генерации: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
        '',
        "const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';",
        '',
        'const allServices = ['
    ]
    
    for i, service in enumerate(services):
        indent = '    '
        service_lines = [f'{indent}{{']
        service_lines.append(f'{indent}    id: {service["id"]},')
        service_lines.append(f'{indent}    name: {escape_js_string(service["name"])},')
        service_lines.append(f'{indent}    category: {escape_js_string(service["category"])},')
        service_lines.append(f'{indent}    building: {escape_js_string(service["building"])},')
        service_lines.append(f'{indent}    floor: {service["floor"]},')
        service_lines.append(f'{indent}    areaId: {escape_js_string(service["areaId"])},')
        service_lines.append(f'{indent}    desc: {escape_js_string(service["desc"])},')
        service_lines.append(f'{indent}    contacts: {escape_js_string(service["contacts"])},')
        service_lines.append(f'{indent}    img: {escape_js_string(service["img"])},')
        service_lines.append(f'{indent}    link: {escape_js_string(service["link"])},')
        service_lines.append(f'{indent}    attributes: {{')
        
        attrs = service['attributes']
        for j, (key, value) in enumerate(attrs.items()):
            comma = ',' if j < len(attrs) - 1 else ''
            service_lines.append(f'{indent}        {key}: {escape_js_string(value)}{comma}')
        
        service_lines.append(f'{indent}    }}')
        service_lines.append(f'{indent}}}{"," if i < len(services) - 1 else ""}')
        
        code_lines.extend(service_lines)
    
    code_lines.append('];')
    code_lines.append('')
    code_lines.append(f'const buildingFloorStructure = {json.dumps(building_floor_structure, ensure_ascii=False, indent=4)};')
    code_lines.append('')
    
    # Пытаемся сохранить существующий svgFloorPlans или сгенерировать новый
    existing_svg_plans = get_svg_floor_plans_from_existing()
    if existing_svg_plans:
        code_lines.append('// svgFloorPlans сохранен из существующего data.js')
        code_lines.append(existing_svg_plans)
    else:
        # Пытаемся сгенерировать через скрипт
        generated_svg_plans = generate_svg_floor_plans_code()
        if generated_svg_plans:
            code_lines.append('// svgFloorPlans автоматически сгенерирован из SVG файлов')
            code_lines.append(generated_svg_plans.rstrip())
        else:
            code_lines.append('// svgFloorPlans нужно обновить, запустив: python scripts/generate-svg-floor-plans.py')
            code_lines.append('const svgFloorPlans = {')
            code_lines.append('    // TODO: Заполнить на основе реальных SVG файлов')
            code_lines.append('};')
    code_lines.append('')
    
    code = '\n'.join(code_lines)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(code)
    
    print(f'[OK] data.js обновлен: {output_path}')

def generate_figma_mapping(services, output_path):
    """Генерация маппинга для Figma"""
    mapping = {
        'generated': datetime.now().isoformat(),
        'services': [
            {
                'id': s['id'],
                'name': s['name'],
                'building': s['building'],
                'floor': s['floor'],
                'areaId': s['areaId'],
                'recommendedLayerId': s['areaId'],
                'recommendedLayerName': s['name'],
                'recommendedPath': f'Building_{s["building"]}/Floor_{s["floor"]}/Services'
            }
            for s in services
        ]
    }
    
    # JSON версия
    json_path = output_path.replace('.csv', '.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    
    # CSV версия
    csv_path = output_path
    with open(csv_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', 'Название', 'Корпус', 'Этаж', 'areaId', 'Рекомендуемый ID слоя', 'Путь в Figma'])
        for s in mapping['services']:
            writer.writerow([
                s['id'],
                s['name'],
                s['building'],
                s['floor'],
                s['areaId'],
                s['recommendedLayerId'],
                s['recommendedPath']
            ])
    
    print(f'[OK] Маппинг для Figma создан: {csv_path}')
    print(f'     JSON версия: {json_path}')

def load_csv_from_url(url):
    """Загружает CSV из URL (например, Google Sheets)"""
    try:
        print(f'[ЗАГРУЗКА] Загружаю CSV из URL: {url[:80]}...')
        with urlopen(url, timeout=30) as response:
            content = response.read()
            # Пробуем определить кодировку
            try:
                text = content.decode('utf-8')
            except UnicodeDecodeError:
                text = content.decode('cp1251')
            return text
    except URLError as e:
        print(f'[ОШИБКА] Не удалось загрузить CSV из URL: {e}')
        raise
    except Exception as e:
        print(f'[ОШИБКА] Ошибка при загрузке: {e}')
        raise

def load_csv_from_file(file_path):
    """Загружает CSV из локального файла"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='cp1251') as f:
            return f.read()

def is_url(path):
    """Проверяет, является ли путь URL"""
    return path.startswith('http://') or path.startswith('https://')

def main():
    """Главная функция"""
    csv_source = None
    csv_content = None
    
    # Определяем источник данных
    if len(sys.argv) > 1:
        csv_source = sys.argv[1]
    else:
        # По умолчанию используем Google Sheets URL
        csv_source = DEFAULT_GOOGLE_SHEETS_URL
        print(f'[ИНФО] Используется Google Sheets URL по умолчанию')
    
    # Загружаем CSV
    if is_url(csv_source):
        # Загружаем из URL
        try:
            csv_content = load_csv_from_url(csv_source)
            print(f'[ОК] CSV загружен из URL')
        except Exception as e:
            print(f'[ОШИБКА] Не удалось загрузить CSV из URL')
            print(f'         Попробуйте указать локальный файл или проверьте интернет-соединение')
            sys.exit(1)
    else:
        # Локальный файл
        csv_path = csv_source
        
        # Если файл не найден, ищем в текущей директории и data/
        if not os.path.exists(csv_path):
            search_dirs = ['.', 'data']
            csv_path = None
            
            for search_dir in search_dirs:
                if not os.path.exists(search_dir):
                    continue
                try:
                    csv_files = [f for f in os.listdir(search_dir) if f.endswith('.csv')]
                    # Ищем файл с "карта сервисов" или "Sheet1" в названии
                    service_csv = [f for f in csv_files if 'карта сервисов' in f.lower() or 'sheet1' in f.lower()]
                    if service_csv:
                        # Берем самый новый файл
                        full_paths = [os.path.join(search_dir, f) for f in service_csv]
                        csv_path = sorted(full_paths, key=lambda x: os.path.getmtime(x), reverse=True)[0]
                        print(f'[ИНФО] Использован файл: {csv_path}')
                        break
                    elif csv_files:
                        csv_path = os.path.join(search_dir, csv_files[0])
                        print(f'[ИНФО] Использован файл: {csv_path}')
                        break
                except:
                    continue
            
            if not csv_path:
                print(f'[ОШИБКА] CSV файл не найден')
                print(f'         Искали в: {", ".join(search_dirs)}')
                print(f'         Текущая директория: {os.getcwd()}')
                print('\nИспользование:')
                print('  python scripts/sync-csv-to-data.py [путь-к-csv-или-url]')
                print(f'  python scripts/sync-csv-to-data.py {DEFAULT_GOOGLE_SHEETS_URL[:60]}...')
                sys.exit(1)
        
        try:
            csv_content = load_csv_from_file(csv_path)
            print(f'[ОК] CSV загружен из файла: {csv_path}')
        except FileNotFoundError:
            print(f'[ОШИБКА] Файл не найден: {csv_path}')
            sys.exit(1)
        except Exception as e:
            print(f'[ОШИБКА] Не удалось прочитать файл: {e}')
            sys.exit(1)
    
    print(f'\n[ОБРАБОТКА] Парсинг CSV...\n')
    
    # Парсим CSV
    try:
        # Используем csv.Sniffer для определения разделителя
        sample = csv_content[:1024]
        sniffer = csv.Sniffer()
        delimiter = sniffer.sniff(sample).delimiter
        
        reader = csv.DictReader(csv_content.splitlines(), delimiter=delimiter)
        rows = list(reader)
    except Exception as e:
        print(f'[ОШИБКА] Не удалось распарсить CSV: {e}')
        sys.exit(1)
    
    if not rows:
        print(f'[ОШИБКА] CSV файл пуст или не содержит данных')
        sys.exit(1)
    
    print(f'[ИНФО] Загружено строк: {len(rows)}')
    print(f'[ИНФО] Колонки: {", ".join(rows[0].keys())[:100]}...')
    
    # Фильтруем только те, что есть в макетах (опционально)
    services_in_maps = [r for r in rows if r.get('Есть в макетах?', '').strip() == 'Да']
    all_services = [csv_row_to_service(row, index) for index, row in enumerate(rows)]
    
    print(f'\n[ОК] Обработано сервисов: {len(all_services)}')
    print(f'     В макетах: {len(services_in_maps)}')
    
    # Генерация файлов
    script_dir = Path(__file__).parent
    output_dir = script_dir.parent
    data_js_path = output_dir / 'data-generated.js'
    print('\n[ГЕНЕРАЦИЯ] Создание файлов...\n')
    
    generate_data_js(all_services, str(data_js_path))
    
    print('\n[ГОТОВО] Синхронизация завершена!\n')
    print('Следующие шаги:')
    print('  1. Проверьте data-generated.js')
    print('  2. Если всё хорошо, переименуйте в data.js (сделайте бэкап!)')
    print('  3. Убедитесь, что areaId в data.js совпадают с id в SVG файлах')
    print('\n[ВАЖНО] Не удаляйте tmp.css - он нужен для локального просмотра шрифта!\n')

if __name__ == '__main__':
    main()

