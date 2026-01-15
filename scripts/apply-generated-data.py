#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Применение сгенерированного data.js с автоматическим бэкапом

Использование:
    python scripts/apply-generated-data.py
"""

import os
import shutil
from datetime import datetime
from pathlib import Path

def create_backup(source_file, backup_dir='backups'):
    """Создание бэкапа файла"""
    source = Path(source_file)
    if not source.exists():
        return None
    
    # Создаем директорию для бэкапов
    backup_path = Path(backup_dir)
    backup_path.mkdir(exist_ok=True)
    
    # Имя бэкапа с временной меткой
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_name = f'{source.stem}_{timestamp}{source.suffix}'
    backup_file = backup_path / backup_name
    
    # Копируем файл
    shutil.copy2(source, backup_file)
    return str(backup_file)

def apply_generated_data():
    """Применение сгенерированного data.js"""
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    data_js = project_dir / 'data.js'
    data_generated = project_dir / 'data-generated.js'
    
    print('\n[ПРИМЕНЕНИЕ] Применение сгенерированных данных...\n')
    
    # Проверяем наличие сгенерированного файла
    if not data_generated.exists():
        print('[ОШИБКА] Файл data-generated.js не найден!')
        print('         Сначала запустите: python scripts/sync-csv-to-data.py')
        return False
    
    print(f'[ИНФО] Найден файл: {data_generated.name}')
    print(f'[ИНФО] Размер: {data_generated.stat().st_size} байт\n')
    
    # Создаем бэкап текущего data.js
    if data_js.exists():
        print('[БЭКАП] Создание бэкапа текущего data.js...')
        backup_file = create_backup(data_js)
        if backup_file:
            print(f'[ОК] Бэкап создан: {backup_file}')
        else:
            print('[ОШИБКА] Не удалось создать бэкап!')
            return False
    else:
        print('[ИНФО] Файл data.js не существует, бэкап не требуется')
    
    # Копируем сгенерированный файл
    print('\n[ПРИМЕНЕНИЕ] Замена data.js на data-generated.js...')
    try:
        shutil.copy2(data_generated, data_js)
        print(f'[ОК] Файл data.js обновлен!')
    except Exception as e:
        print(f'[ОШИБКА] Не удалось применить изменения: {e}')
        return False
    
    # Создаем отчет
    print('\n[ГОТОВО] Применение завершено успешно!\n')
    print('Созданные/обновленные файлы:')
    print(f'  - data.js (обновлен)')
    if backup_file:
        print(f'  - {backup_file} (бэкап)')
    print(f'  - data-generated.js (исходный)')
    print(f'  - figma-mapping.csv (маппинг для Figma)')
    print(f'  - figma-mapping.json (JSON версия)\n')
    
    return True

if __name__ == '__main__':
    success = apply_generated_data()
    exit(0 if success else 1)





