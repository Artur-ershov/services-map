(function() {
    // --- 1. БАЗОВЫЙ URL ДЛЯ РЕСУРСОВ (для GitHub Pages) ---
    const BASE_URL = (typeof window !== 'undefined' && window.KSMM_BASE_URL) 
        ? window.KSMM_BASE_URL 
        : '';
    
    // Функция для получения полного пути к ресурсу
    function getResourcePath(relativePath) {
        if (!BASE_URL) return relativePath;
        // Убираем начальный слеш, если есть
        const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
        return `${BASE_URL}/${cleanPath}`;
    }
    
    // --- 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ и DOM-ЭЛЕМЕНТЫ ---
    const SVG_NS = "http://www.w3.org/2000/svg";
    const mapWrapper = document.getElementById('ksmm-map-wrapper');
    const mapBaseLayer = document.getElementById('ksmm-map-base');
    const mapAreasContainer = document.getElementById('ksmm-map-areas');
    const floorDropdown = document.getElementById('ksmm-floor-dropdown');
    const floorDropdownBtn = document.getElementById('ksmm-floor-dropdown-btn');
    const floorDropdownText = document.getElementById('ksmm-floor-dropdown-text');
    const floorDropdownList = document.getElementById('ksmm-floor-dropdown-list');
    const listContainer = document.getElementById('ksmm-services-list');
    const filterControls = document.querySelector('.ksmm-filter-controls');
    const subfilterControls = document.getElementById('ksmm-subfilter-controls');
    const searchInput = document.getElementById('ksmm-search-input');
    const svgMap = document.getElementById('ksmm-map');
    const floorPrevBtn = document.getElementById('ksmm-floor-prev');
    const floorNextBtn = document.getElementById('ksmm-floor-next');
    const buildingPrevBtn = document.getElementById('ksmm-building-prev');
    const buildingNextBtn = document.getElementById('ksmm-building-next');
    
    const floorPlanCatalog = (typeof svgFloorPlans !== 'undefined') ? svgFloorPlans : {};
    // Кэш распарсенного DOM (вместо текста SVG) - парсинг происходит только 1 раз
    const floorDomCache = {};
    let activeAreaId = null;
    let currentBuilding = 'B1';
    let currentFloor = (typeof buildingFloorStructure !== 'undefined' && buildingFloorStructure[currentBuilding]) ? buildingFloorStructure[currentBuilding].defaultFloor : 3;
    let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
    let floorSwitchSequence = 0; // Sequence number to track the most recent floor switch
    let isBuildingViewMode = false; // Режим просмотра всего корпуса
    const SVG_VIEWBOX_WIDTH = 800;
    const SVG_VIEWBOX_HEIGHT = 550;

    function getServiceById(id) {
        return allServices.find(s => s.id === id);
    }
    // ... (Popup/Attribute formatting functions) ...
    const popup = document.getElementById('ksmm-popup');
    const popupCloseBtn = document.getElementById('ksmm-popup-close');
    const popupTitle = document.getElementById('ksmm-popup-title');
    const popupDesc = document.getElementById('ksmm-popup-desc');
    const popupContacts = document.getElementById('ksmm-popup-contacts');
    const popupCategoryIndicator = document.getElementById('ksmm-popup-category-indicator');
    const popupGallery = document.getElementById('ksmm-popup-gallery');
    const galleryImg = document.getElementById('ksmm-gallery-img');
    const galleryPrevBtn = document.getElementById('ksmm-gallery-prev');
    const galleryNextBtn = document.getElementById('ksmm-gallery-next');
    const galleryIndicators = document.getElementById('ksmm-gallery-indicators');
    const popupLink = document.getElementById('ksmm-popup-link');
    const popupAttrs = document.getElementById('ksmm-popup-attrs');
    
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;
    let galleryTouchStartX = 0;
    let galleryTouchEndX = 0;

    function formatAttributes(service) {
        const attrs = service.attributes;
        if (!attrs) return '';
        let parts = [];
        if (attrs.location) parts.push(attrs.location);
        for (const key in attrs) {
            if (key === 'location' || key === 'hours') continue;
            const value = attrs[key];
            if (key === 'capacity' && (typeof value === 'number' || value)) {
                parts.push(value + ' чел.');
            } else if (key === 'equipment') {
                const list = Array.isArray(value) ? value : (typeof value === 'string' ? value.split(',').map(e => e.trim()).filter(Boolean) : []);
                if (list.length) parts.push(list.join(', '));
            } else if (value != null && value !== '') {
                parts.push(value);
            }
        }
        return parts.join(' • ');
    }

    // Генерация дамми изображений для тестирования
    // Парсинг изображений из строки (упрощенный - данные уже обработаны в билдтайме)
    function parseImages(imgString) {
        if (!imgString || imgString.trim() === '') return [];
        
        // Разделяем по пробелам - поддерживаем как HTTP URL, так и локальные пути
        const urls = imgString.trim().split(/\s+/).filter(url => {
            const trimmed = url.trim();
            // Принимаем HTTP/HTTPS URL или локальные пути к изображениям
            // Исключаем dummy изображения и другие невалидные значения
            const isAbsolute = trimmed.startsWith('http');
            const isRelative = trimmed.startsWith('images/');
            
            if (isAbsolute) {
                return !trimmed.includes('dummyimage.com');
            }
            
            if (isRelative) {
                return !trimmed.includes('приложила')
                    && !trimmed.includes('прикрепила')
                    && !trimmed.includes('фото')
                    && trimmed.length > 5;
            }
            
            return false;
        });
        
        return urls;
    }

    // Инициализация галереи
    function initGallery(images) {
        currentGalleryImages = images;
        currentGalleryIndex = 0;
        
        if (images.length === 0) {
            popupGallery.style.display = 'none';
            // Очищаем src изображения, чтобы избежать попыток загрузки старых URL
            if (galleryImg) {
                galleryImg.src = '';
                galleryImg.removeAttribute('src');
            }
            return;
        }
        
        popupGallery.style.display = 'block';
        updateGalleryImage();
        updateGalleryIndicators();
        updateGalleryButtons();
    }

    // Обновление текущего изображения в галерее
    function updateGalleryImage() {
        if (currentGalleryImages.length === 0) return;
        const imgSrc = currentGalleryImages[currentGalleryIndex];
        // Если абсолютный URL - используем как есть, иначе добавляем базовый URL если он есть
        const fullSrc = imgSrc.startsWith('http') ? imgSrc : getResourcePath(imgSrc);
        galleryImg.src = fullSrc;
    }

    // Обновление индикаторов галереи
    function updateGalleryIndicators() {
        galleryIndicators.innerHTML = '';
        if (currentGalleryImages.length <= 1) return;
        
        for (let i = 0; i < currentGalleryImages.length; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'ksmm-gallery-indicator';
            if (i === currentGalleryIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                currentGalleryIndex = i;
                updateGalleryImage();
                updateGalleryIndicators();
                updateGalleryButtons();
            });
            galleryIndicators.appendChild(indicator);
        }
    }

    // Обновление состояния кнопок навигации
    function updateGalleryButtons() {
        if (currentGalleryImages.length <= 1) {
            galleryPrevBtn.style.display = 'none';
            galleryNextBtn.style.display = 'none';
        } else {
            galleryPrevBtn.style.display = 'flex';
            galleryNextBtn.style.display = 'flex';
        }
    }

    // Переход к предыдущему изображению
    function galleryPrev() {
        if (currentGalleryImages.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateGalleryImage();
        updateGalleryIndicators();
    }

    // Переход к следующему изображению
    function galleryNext() {
        if (currentGalleryImages.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
        updateGalleryImage();
        updateGalleryIndicators();
    }

    function getServicesForFloor(building, floor) {
        return allServices.filter(s => s.building === building && s.floor === floor);
    }

    function getZoneElement(areaId) {
        if (!areaId || !mapBaseLayer) return null;
        // Используем атрибут селектор для поддержки ID с пробелами (SVG)
        return mapBaseLayer.querySelector(`[id="${areaId}"]`);
    }

    function setActiveArea(areaId) {
        if (activeAreaId === areaId) return;
        document.querySelectorAll('.ksmm-map-area.active').forEach(el => el.classList.remove('active'));
        activeAreaId = null;
        if (!areaId) return;
        const targetArea = document.querySelector(`.ksmm-map-area[data-area-id="${areaId}"]`);
        if (targetArea) {
            targetArea.classList.add('active');
            activeAreaId = areaId;
        }
    }

    function showPopup(service) {
        popupTitle.textContent = service.name;
        // Описания и контакты уже обработаны на этапе генерации (переносы строк заменены на <br>, ссылки преобразованы)
        // В build-time уже обработаны ссылки, поэтому просто вставляем HTML
        if (service.desc) {
            popupDesc.innerHTML = service.desc;
        } else {
            popupDesc.textContent = '';
        }
        if (service.contacts) {
            popupContacts.innerHTML = service.contacts;
        } else {
            popupContacts.textContent = '';
        }
        
        // Вместимость и оснащение для переговорных (как в списке)
        if (popupAttrs) {
            if (service.category === 'meeting' && service.attributes) {
                const parts = formatAttributes(service);
                if (parts) {
                    popupAttrs.textContent = parts;
                    popupAttrs.style.display = 'block';
                } else {
                    popupAttrs.style.display = 'none';
                }
            } else {
                popupAttrs.style.display = 'none';
            }
        }
        
        // Установка индикатора категории
        if (popupCategoryIndicator) {
            popupCategoryIndicator.setAttribute('data-category', service.category);
        }
        
        // Обработка изображений через галерею
        const images = parseImages(service.img);
        initGallery(images);
        
        // Обработка ссылки
        const linkData = parseLink(service.link);
        if (linkData.url) {
            popupLink.href = linkData.url;
            popupLink.textContent = linkData.text;
            popupLink.style.display = 'block';
        } else {
            popupLink.style.display = 'none';
        }
        
        // Выделение активной локации в списке
        document.querySelectorAll('.ksmm-list-item').forEach(item => {
            item.classList.remove('active');
        });
        const listItem = document.querySelector(`.ksmm-list-item[data-id="${service.id}"]`);
        if (listItem) {
            listItem.classList.add('active');
            // Автоскролл к активному элементу
            listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        setActiveArea(service.areaId);
        popup.style.display = 'block';
        
        // Добавляем статус работы сразу (без задержки)
        if (typeof addStatusToPopup === 'function') {
            addStatusToPopup(service);
        }
    }

    // Упрощенный парсинг ссылки
    // Функция для преобразования URL в тексте в кликабельные ссылки
    function convertUrlsToLinks(text) {
        if (!text) return text;
        
        // Временные маркеры для защиты уже обработанных ссылок
        const placeholders = new Map();
        let placeholderIndex = 0;
        
        // 0. Сначала обрабатываем email адреса (mailto: ссылки)
        // Ищем паттерны типа email@domain.com
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/g;
        text = text.replace(emailRegex, (email) => {
            // Пропускаем, если это уже обработанная ссылка
            if (email.includes('__LINK_PLACEHOLDER') || email.includes('<a ') || email.includes('</a>')) {
                return email;
            }
            const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
            placeholders.set(placeholder, `<a href="mailto:${email}">${email}</a>`);
            placeholderIndex++;
            return placeholder;
        });
        
        // 1. Обрабатываем markdown-подобный синтаксис [текст](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
            const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
            placeholders.set(placeholder, `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
            placeholderIndex++;
            return placeholder;
        });
        
        // 2. Обрабатываем URL с контекстом (текст перед URL)
        // Ищем паттерны типа "текст: url" или "текст (url)" или "текст: (url)"
        // ВАЖНО: заменяем весь паттерн на placeholder, чтобы URL не обрабатывался снова на шаге 3
        const processedUrls = new Set(); // Отслеживаем обработанные URL, чтобы не обрабатывать их дважды
        text = text.replace(/([А-Яа-яЁёA-Za-z0-9\s\-]+?)[:\s]+\(?(https?:\/\/[^\s<>"{}|\\^`\[\]()]+)\)?/gi, (match, prefix, url) => {
            // Пропускаем, если это уже обработанная ссылка
            if (match.includes('__LINK_PLACEHOLDER') || match.includes('<a ') || match.includes('</a>')) return match;
            
            // Помечаем URL как обработанный
            processedUrls.add(url);
            
            // Очищаем префикс от лишних пробелов и знаков препинания
            const cleanPrefix = prefix.trim().replace(/[:\s]+$/, '').trim();
            // Если префикс слишком длинный или пустой, используем короткий текст
            let linkText = cleanPrefix;
            if (cleanPrefix.length > 50 || !cleanPrefix) {
                try {
                    const urlObj = new URL(url);
                    linkText = urlObj.hostname.replace('www.', '');
                    if (linkText.length > 30) linkText = 'Подробнее';
                } catch (e) {
                    linkText = 'Подробнее';
                }
            }
            
            // Создаем placeholder для всего паттерна (префикс + URL)
            const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
            placeholders.set(placeholder, `${cleanPrefix}: <a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
            placeholderIndex++;
            return placeholder;
        });
        
        // 3. Обрабатываем оставшиеся обычные URL (без контекста)
        // ВАЖНО: обрабатываем только те URL, которые еще не были обработаны на предыдущих этапах
        // На этом этапе text уже содержит плейсхолдеры вместо обработанных URL с контекстом,
        // поэтому обычные URL можно безопасно обработать
        const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]()]+)/gi;
        text = text.replace(urlRegex, (url) => {
            // Пропускаем, если это уже обработанная ссылка (в плейсхолдере)
            if (url.includes('__LINK_PLACEHOLDER')) return url;
            
            // Пропускаем URL, которые уже были обработаны на шаге 2 (с контекстом)
            if (processedUrls.has(url)) return url;
            
            // Создаем короткий текст из домена
            try {
                const urlObj = new URL(url);
                const domain = urlObj.hostname.replace('www.', '');
                const shortText = domain.length > 30 ? 'Ссылка' : domain;
                const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
                placeholders.set(placeholder, `<a href="${url}" target="_blank" rel="noopener noreferrer">${shortText}</a>`);
                placeholderIndex++;
                return placeholder;
            } catch (e) {
                const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
                placeholders.set(placeholder, `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
                placeholderIndex++;
                return placeholder;
            }
        });
        
        // 4. Заменяем все плейсхолдеры обратно на ссылки
        placeholders.forEach((link, placeholder) => {
            text = text.replace(placeholder, link);
        });
        
        return text;
    }

    function parseLink(linkString) {
        if (!linkString || linkString === '#') {
            return { url: null, text: 'Подробнее' };
        }
        // Если это просто URL, начинающийся с http
        if (linkString.trim().startsWith('http')) {
            return { url: linkString.trim(), text: 'Подробнее' };
        }
        // Если это текст с несколькими ссылками (как в спортзале), берем первую ссылку
        const urlMatch = linkString.match(/(https?:\/\/[^\s\n]+)/);
        if (urlMatch) {
            return { url: urlMatch[0], text: 'Подробнее' };
        }
        return { url: null, text: 'Подробнее' };
    }

    function hidePopup() {
        popup.style.display = 'none';
        setActiveArea(null);
        // Убираем выделение активной локации из списка
        document.querySelectorAll('.ksmm-list-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    function setHighlight(id, state) {
        const service = getServiceById(id);
        if (!service) return;
        const area = document.querySelector(`.ksmm-map-area[data-area-id="${service.areaId}"]`);
        const item = document.querySelector(`.ksmm-list-item[data-id="${id}"]`);
        if (area && item && !area.classList.contains('dimmed') && !item.classList.contains('hidden')) {
            area.classList.toggle('highlight', state);
            item.classList.toggle('highlight', state);
        }
        // В режиме корпуса также подсвечиваем этаж
        if (isBuildingViewMode && service.floor) {
            const floorGroup = document.querySelector(`.ksmm-floor-rectangle[data-floor="${service.floor}"][data-building="${service.building}"]`);
            if (floorGroup) {
                floorGroup.classList.toggle('service-highlighted', state);
            }
        }
    }
    // --- 4. ЛОГИКА КАРТЫ (Pan, Zoom, Center) ---
    function applyMapTransform(disableTransition = false) {
        // Используем transform-origin для зума к курсору
        // Но для панорамирования нужно использовать translate
        // Поэтому комбинируем: сначала устанавливаем transform-origin, потом применяем transform
        if (disableTransition) {
            mapWrapper.style.transition = 'none';
        }
        mapWrapper.style.transform = `translate(${mapState.x}px, ${mapState.y}px) scale(${mapState.scale})`;
        if (disableTransition) {
            // Восстанавливаем transition после применения transform
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mapWrapper.style.transition = '';
                });
            });
        }
    }

    function initMapInteraction() {
        // Drag (Pan) Logic - Mouse
        svgMap.addEventListener('mousedown', (e) => {
            // Игнорируем клики по областям и дропдауну этажей
            if (e.target.closest('.ksmm-map-area') || e.target.closest('.ksmm-floor-dropdown')) return;
            mapState.dragging = true;
            svgMap.classList.add('dragging');
            // Получаем текущие смещения
            const transformMatrix = window.getComputedStyle(mapWrapper).transform;
            if (transformMatrix !== 'none') {
                const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                mapState.x = parseFloat(matrixValues[4]);
                mapState.y = parseFloat(matrixValues[5]);
            } else {
                mapState.x = 0;
                mapState.y = 0;
            }
            mapState.startX = e.clientX - mapState.x;
            mapState.startY = e.clientY - mapState.y;
        });
        document.addEventListener('mousemove', (e) => {
            if (!mapState.dragging) return;
            mapState.x = e.clientX - mapState.startX;
            mapState.y = e.clientY - mapState.startY;
            applyMapTransform();
        });
        document.addEventListener('mouseup', () => {
            mapState.dragging = false;
            svgMap.classList.remove('dragging');
        });
        
        // Touch events для мобильных устройств
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartDistance = 0;
        let isPinching = false;
        
        svgMap.addEventListener('touchstart', (e) => {
            if (e.target.closest('.ksmm-map-area') || e.target.closest('.ksmm-floor-dropdown')) return;
            
            if (e.touches.length === 1) {
                // Одиночное касание - панорамирование
                const touch = e.touches[0];
                mapState.dragging = true;
                svgMap.classList.add('dragging');
                const transformMatrix = window.getComputedStyle(mapWrapper).transform;
                if (transformMatrix !== 'none') {
                    const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                    mapState.x = parseFloat(matrixValues[4]);
                    mapState.y = parseFloat(matrixValues[5]);
                } else {
                    mapState.x = 0;
                    mapState.y = 0;
                }
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                mapState.startX = touch.clientX - mapState.x;
                mapState.startY = touch.clientY - mapState.y;
            } else if (e.touches.length === 2) {
                // Двойное касание - зум
                isPinching = true;
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                touchStartDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const transformMatrix = window.getComputedStyle(mapWrapper).transform;
                if (transformMatrix !== 'none') {
                    const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                    mapState.scale = parseFloat(matrixValues[0]);
                    mapState.x = parseFloat(matrixValues[4]);
                    mapState.y = parseFloat(matrixValues[5]);
                }
            }
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!mapState.dragging && !isPinching) return;
            
            if (e.touches.length === 1 && mapState.dragging) {
                // Панорамирование
                const touch = e.touches[0];
                mapState.x = touch.clientX - mapState.startX;
                mapState.y = touch.clientY - mapState.startY;
                applyMapTransform();
            } else if (e.touches.length === 2 && isPinching) {
                // Зум
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const scaleChange = currentDistance / touchStartDistance;
                const newScale = mapState.scale * scaleChange;
                mapState.scale = Math.max(0.5, Math.min(3, newScale));
                applyMapTransform();
                touchStartDistance = currentDistance;
            }
            e.preventDefault();
        });
        
        document.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                mapState.dragging = false;
                isPinching = false;
                svgMap.classList.remove('dragging');
            }
        });
        // Zoom Logic (Wheel)
        svgMap.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Временно отключаем transition для мгновенного применения transform
            // Это нужно для правильной работы зума к курсору
            const originalTransition = mapWrapper.style.transition;
            mapWrapper.style.transition = 'none';
            
            // Синхронизируем mapState с реальным transform перед вычислениями
            // Это важно, если предыдущий зум еще не завершился (transition)
            const currentTransform = window.getComputedStyle(mapWrapper).transform;
            if (currentTransform !== 'none') {
                const matrixValues = currentTransform.match(/matrix.*\((.+)\)/)[1].split(', ');
                mapState.scale = parseFloat(matrixValues[0]);
                mapState.x = parseFloat(matrixValues[4]);
                mapState.y = parseFloat(matrixValues[5]);
            }
            
            // ПЛАВНЫЙ ЗУМ: Меньший фактор для плавности (1.05)
            const scaleFactor = 1.05;
            const newScale = e.deltaY < 0 ? mapState.scale * scaleFactor : mapState.scale / scaleFactor; // Ограничиваем зум
            const prevScale = mapState.scale;
            mapState.scale = Math.max(0.5, Math.min(3, newScale));
            // Если масштаб не изменился (достигли лимита), то не выполняем трансформацию
            if (mapState.scale === prevScale && newScale !== mapState.scale) {
                mapWrapper.style.transition = originalTransition;
                return;
            }
            const bbox = svgMap.getBoundingClientRect();
            const mouseX = e.clientX - bbox.left;
            const mouseY = e.clientY - bbox.top;
            
            // Зум относительно курсора
            // Transform применяется к wrapper: translate(x, y) scale(s)
            // Порядок операций: сначала scale, потом translate
            // Transform-origin по умолчанию для <g> - это (0, 0)
            //
            // Чтобы точка под курсором осталась на месте после зума:
            // 1. Точка под курсором в viewBox координатах (до зума)
            // 2. После зума эта точка должна остаться на том же месте на экране
            // 3. Вычисляем новое смещение так, чтобы это было так
            
            const viewBox = svgMap.viewBox.baseVal;
            const viewBoxWidth = viewBox.width || 1991;
            const viewBoxHeight = viewBox.height || 909;
            const viewBoxToScreenX = bbox.width / viewBoxWidth;
            const viewBoxToScreenY = bbox.height / viewBoxHeight;
            
            // ИСПРАВЛЕННАЯ ФОРМУЛА ЗУМА К КУРСОРУ
            // Transform: translate(tx, ty) scale(s) применяется в пространстве viewBox
            // Порядок: сначала scale (относительно 0,0), потом translate
            // Точка (vx, vy) в пространстве wrapper отображается в viewBox как: (vx * s + tx, vy * s + ty)
            // И затем viewBox преобразует в экранные координаты: (viewBoxX * viewBoxToScreenX, viewBoxY * viewBoxToScreenY)
            
            // 1. Преобразуем координаты мыши из экранных в viewBox
            const mouseViewBoxX = mouseX / viewBoxToScreenX;
            const mouseViewBoxY = mouseY / viewBoxToScreenY;
            
            // 2. Вычисляем точку в пространстве wrapper (до transform)
            // viewBoxX = vx * scale + translateX => vx = (viewBoxX - translateX) / scale
            const vx = (mouseViewBoxX - mapState.x) / prevScale;
            const vy = (mouseViewBoxY - mapState.y) / prevScale;
            
            const oldX = mapState.x;
            const oldY = mapState.y;
            
            // 3. После зума, точка должна остаться на том же месте в viewBox
            // viewBoxX = vx * newScale + newTranslateX => newTranslateX = viewBoxX - vx * newScale
            mapState.x = mouseViewBoxX - vx * mapState.scale;
            mapState.y = mouseViewBoxY - vy * mapState.scale;
            
            applyMapTransform();
            
            // Восстанавливаем transition после применения transform
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mapWrapper.style.transition = originalTransition;
                });
            });
        });
    }

    function centerOnArea(areaId) {
        const areaElement = document.querySelector(`.ksmm-map-area[data-area-id="${areaId}"]`);
        if (!areaElement || typeof areaElement.getBBox !== 'function') {
            // Если элемент не найден, пробуем еще раз через небольшую задержку
            setTimeout(() => {
                const retryElement = document.querySelector(`.ksmm-map-area[data-area-id="${areaId}"]`);
                if (retryElement && typeof retryElement.getBBox === 'function') {
                    centerOnArea(areaId);
                }
            }, 50);
            return;
        }
        
        // getBBox() возвращает координаты в системе координат SVG (viewBox)
        // НО: если на wrapper уже применен transform, getBBox может вернуть координаты в другой системе
        // Поэтому нужно получить bbox ДО применения transform, или использовать getBoundingClientRect
        const bbox = areaElement.getBBox();
        if (!bbox || (bbox.width === 0 && bbox.height === 0)) return;
        
        // Получаем реальные размеры контейнера SVG
        const svgRect = svgMap.getBoundingClientRect();
        const containerWidth = svgRect.width;
        const containerHeight = svgRect.height;
        
        // Получаем viewBox основного SVG
        const viewBox = svgMap.viewBox.baseVal;
        const viewBoxWidth = viewBox.width || 1991;
        const viewBoxHeight = viewBox.height || 909;
        
        // Вычисляем центр области в viewBox координатах
        const targetCenterX = bbox.x + (bbox.width / 2);
        const targetCenterY = bbox.y + (bbox.height / 2);
        
        // Добавляем padding (25% от размера области для лучшего спейсинга)
        const paddingX = bbox.width * 0.25;
        const paddingY = bbox.height * 0.25;
        
        // Вычисляем масштаб viewBox к экрану (без учета нашего scale)
        const viewBoxToScreenX = containerWidth / viewBoxWidth;
        const viewBoxToScreenY = containerHeight / viewBoxHeight;
        const viewBoxToScreen = Math.min(viewBoxToScreenX, viewBoxToScreenY);
        
        // Вычисляем оптимальный масштаб, чтобы область поместилась с padding
        // bbox.width и bbox.height - в viewBox координатах
        // Нужно конвертировать их в пиксели экрана: bbox.width * viewBoxToScreen
        // Затем вычислить scale так, чтобы область + padding поместилась в 75% контейнера
        const bboxWidthScreen = bbox.width * viewBoxToScreen;
        const bboxHeightScreen = bbox.height * viewBoxToScreen;
        const paddingXScreen = paddingX * viewBoxToScreen;
        const paddingYScreen = paddingY * viewBoxToScreen;
        
        const scaleX = (containerWidth * 0.75) / (bboxWidthScreen + paddingXScreen * 2);
        const scaleY = (containerHeight * 0.75) / (bboxHeightScreen + paddingYScreen * 2);
        const optimalScale = Math.min(scaleX, scaleY, 2.5); // Ограничиваем максимальный зум
        
        // Центр контейнера в viewBox координатах
        const containerCenterXViewBox = (containerWidth / 2) / viewBoxToScreenX;
        const containerCenterYViewBox = (containerHeight / 2) / viewBoxToScreenY;
        
        // Transform применяется к wrapper: translate(x, y) scale(s)
        // Порядок операций: сначала scale, потом translate
        // Transform-origin по умолчанию для <g> - это (0, 0)
        // 
        // После применения scale(s), все координаты умножаются на s
        // Затем применяется translate(x, y), который смещает уже масштабированный элемент
        //
        // Чтобы центр области оказался в центре контейнера:
        // 1. Центр области после scale будет: targetCenterX * optimalScale
        // 2. Нужно сместить так, чтобы: targetCenterX * optimalScale + x = containerCenterXViewBox
        // 3. Отсюда: x = containerCenterXViewBox - targetCenterX * optimalScale
        // mapState.x и mapState.y должны быть в viewBox координатах (как в функции зума)
        mapState.scale = optimalScale;
        mapState.x = containerCenterXViewBox - targetCenterX * optimalScale;
        mapState.y = containerCenterYViewBox - targetCenterY * optimalScale;
        
        applyMapTransform();
    }

    // Парсит SVG текст и подготавливает кэшированные данные (выполняется только 1 раз на этаж)
    function parseSvgAndPrepareCache(svgText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const sourceSvg = doc.documentElement;
        
        // Собираем все defs, маски и clipPath
        const defsFragment = document.createDocumentFragment();
        const existingDefs = sourceSvg.querySelectorAll('defs');
        existingDefs.forEach(defs => {
            Array.from(defs.children).forEach(child => {
                defsFragment.appendChild(child.cloneNode(true));
            });
        });
        
        // Маски и clipPath вне <defs>
        const masksOutsideDefs = sourceSvg.querySelectorAll('mask:not(defs mask)');
        const clipPathsOutsideDefs = sourceSvg.querySelectorAll('clipPath:not(defs clipPath)');
        masksOutsideDefs.forEach(mask => defsFragment.appendChild(mask.cloneNode(true)));
        clipPathsOutsideDefs.forEach(clipPath => defsFragment.appendChild(clipPath.cloneNode(true)));
        
        // Собираем контент (без defs)
        // Исправляем элементы без fill - устанавливаем fill="none", чтобы не отображались черными
        const contentFragment = document.createDocumentFragment();
        Array.from(sourceSvg.children).forEach(child => {
            if (child.tagName !== 'defs') {
                const clonedChild = child.cloneNode(true);
                
                // Устанавливаем fill="none" для всех элементов без fill, чтобы не отображались черными
                // НО НЕ ТРОГАЕМ элементы с fill="white" (фон карты) - они должны остаться белыми
                // Используем рекурсивный поиск, чтобы найти все элементы, включая вложенные в группы
                function setFillNoneRecursive(element) {
                    const tagName = element.tagName?.toLowerCase();
                    if (tagName && ['path', 'circle', 'ellipse', 'rect', 'polygon', 'polyline'].includes(tagName)) {
                        const fill = element.getAttribute('fill');
                        // Если нет fill атрибута, устанавливаем fill="none"
                        // Элементы с fill="white" оставляем как есть
                        if (!fill) {
                            element.setAttribute('fill', 'none');
                        }
                    }
                    // Рекурсивно обрабатываем все дочерние элементы
                    Array.from(element.children).forEach(child => {
                        setFillNoneRecursive(child);
                    });
                }
                setFillNoneRecursive(clonedChild);
                
                contentFragment.appendChild(clonedChild);
            }
        });
        
        return {
            defs: defsFragment,
            content: contentFragment,
            viewBox: sourceSvg.getAttribute('viewBox')
        };
    }
    
    // Вставляет закэшированный контент в DOM (быстрая операция клонирования)
    function injectCachedFloor(cached, config, sequenceNumber) {
        if (sequenceNumber !== floorSwitchSequence) return;
        
        // Устанавливаем viewBox
        if (config.viewBox) {
            svgMap.setAttribute('viewBox', config.viewBox);
            svgMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
        
        // Убираем fill="none" у корневого SVG, чтобы не наследовался на элементы без fill
        // Это предотвратит черные квадраты
        svgMap.removeAttribute('fill');
        
        // Очищаем слой
        mapBaseLayer.innerHTML = '';
        
        if (sequenceNumber !== floorSwitchSequence) return;
        
        // Вставляем defs (если ещё нет)
        if (cached.defs.childNodes.length > 0) {
            let targetDefs = svgMap.querySelector('defs');
            if (!targetDefs) {
                targetDefs = document.createElementNS(SVG_NS, 'defs');
                svgMap.insertBefore(targetDefs, svgMap.firstChild);
            }
            
            // Клонируем defs из кэша
            const defsClone = cached.defs.cloneNode(true);
            Array.from(defsClone.childNodes).forEach(child => {
                // Проверяем, нет ли уже элемента с таким ID
                if (child.id && svgMap.querySelector(`#${CSS.escape(child.id)}`)) {
                    return; // Уже существует
                }
                targetDefs.appendChild(child);
            });
        }
        
        if (sequenceNumber !== floorSwitchSequence) return;
        
        // Клонируем контент из кэша и вставляем
        // Примечание: fill="none" для элементов без fill обрабатывается через CSS
        mapBaseLayer.appendChild(cached.content.cloneNode(true));
    }

    function renderFloorBaseLayer(floorKey, sequenceNumber) {
        return new Promise((resolve) => {
            // Очищаем слой сразу (пользователь видит состояние загрузки)
            if (sequenceNumber === floorSwitchSequence) {
                mapBaseLayer.innerHTML = '';
            }
            
            const config = floorPlanCatalog[floorKey];
            if (!config) {
                resolve();
                return;
            }

            // Если есть кэш распарсенного DOM — используем его (мгновенно)
            if (floorDomCache[floorKey]) {
                injectCachedFloor(floorDomCache[floorKey], config, sequenceNumber);
                resolve();
                return;
            }

            // Загружаем и парсим SVG (только первый раз)
            const src = config.src;
            const fullSrc = src.startsWith('http') ? src : getResourcePath(src);
            fetch(fullSrc)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    // Парсим и кэшируем DOM (один раз)
                    floorDomCache[floorKey] = parseSvgAndPrepareCache(text);
                    // Вставляем в DOM
                    injectCachedFloor(floorDomCache[floorKey], config, sequenceNumber);
                    resolve();
                })
                .catch(err => {
                    console.error(`Не удалось загрузить SVG карту для ${floorKey}:`, err);
                    resolve();
                });
        });
    }
    
    // Предзагрузка всех этажей в фоне (после первой загрузки)
    function preloadAllFloors() {
        Object.keys(floorPlanCatalog).forEach(floorKey => {
            if (!floorDomCache[floorKey]) {
                const src = floorPlanCatalog[floorKey].src;
                const fullSrc = src.startsWith('http') ? src : getResourcePath(src);
                fetch(fullSrc)
                    .then(r => r.ok ? r.text() : Promise.reject())
                    .then(text => {
                        floorDomCache[floorKey] = parseSvgAndPrepareCache(text);
                    })
                    .catch(() => {}); // Тихо игнорируем ошибки предзагрузки
            }
        });
    }
    // --- 5. ФУНКЦИИ РЕНДЕРИНГА (Обновлены) ---
    function createListItem(service, isCurrentFloor = false) {
        const item = document.createElement('div');
        item.className = 'ksmm-list-item';
        item.setAttribute('data-id', service.id);
        item.setAttribute('data-category', service.category);
        item.setAttribute('data-area-id', service.areaId);
        item.setAttribute('data-building', service.building);
        item.setAttribute('data-floor', service.floor);
        
        const formattedAttrs = formatAttributes(service);
        const indicatorClass = isCurrentFloor ? 'filled' : 'outlined';
        // Safety check for buildingFloorStructure access
        const buildingLabel = buildingFloorStructure[service.building]?.label || service.building || 'Неизвестно';
        const locationText = isCurrentFloor ? '' : `<p class="ksmm-item-location">${buildingLabel}, ${service.floor} этаж</p>`;
        
        item.innerHTML = `
            <span class="ksmm-category-indicator ${indicatorClass}" data-category="${service.category}"></span>
            <div class="ksmm-item-content">
                <h4>${service.name}</h4>
                <p class="ksmm-item-attrs">${formattedAttrs}</p>
                ${locationText}
            </div>
        `;
        listContainer.appendChild(item);
        return item;
    }

    function renderBuildingView(building, options) {
        options = options || {};
        // Очищаем слои
        mapBaseLayer.innerHTML = '';
        mapAreasContainer.innerHTML = '';
        setActiveArea(null);
        
        // Обновляем текст кнопки дропдауна
        if (floorDropdownText) {
            floorDropdownText.textContent = `${buildingFloorStructure[building].label} (все этажи)`;
        }
        
        const bData = buildingFloorStructure[building];
        if (!bData) return;
        
        // Получаем все этажи корпуса
        const sortedFloors = [...bData.floors].sort((a, b) => a - b);
        
        // Параметры для размещения этажей
        const SVG_WIDTH = 328; // Ширина SVG из floors.svg
        const SVG_HEIGHT = 660; // Высота SVG из floors.svg
        const PADDING = 50; // Отступы по краям
        const CIRCLE_AREA_WIDTH = 200; // Место для кружочков справа
        const viewBoxWidth = SVG_WIDTH + CIRCLE_AREA_WIDTH + 2 * PADDING;
        const viewBoxHeight = SVG_HEIGHT + 2 * PADDING;
        
        // Устанавливаем viewBox для всего корпуса
        svgMap.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        svgMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        // Цвета по категориям
        const categoryColors = {
            'meeting': '#00C573',
            'food': '#FFA436',
            'sport': '#7027E2',
            'relax': '#FF645A',
            'service': '#475DEB'
        };
        
        // Загружаем SVG с этажами
        fetch(getResourcePath('map/floors.svg'))
            .then(response => response.text())
            .then(svgText => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const sourceSvg = svgDoc.documentElement;
                const floorsGroup = sourceSvg.querySelector('#floors');
                
                if (!floorsGroup) {
                    console.error('Не найдена группа #floors в SVG');
                    return;
                }
                
                // Клонируем всю группу этажей
                const floorsClone = floorsGroup.cloneNode(true);
                floorsClone.removeAttribute('id');
                floorsClone.setAttribute('transform', `translate(${PADDING}, ${PADDING})`);
                
                // Сначала собираем все этажи в массив (до изменений DOM)
                const floorGroups = [];
                sortedFloors.forEach((floor) => {
                    const floorSvgGroup = floorsClone.querySelector(`[id="${floor}"]`);
                    if (floorSvgGroup) {
                        floorGroups.push({ floor, floorSvgGroup });
                    } else {
                        console.warn(`Этаж ${floor} не найден в SVG`);
                    }
                });
                
                // Добавляем в DOM сначала, чтобы можно было использовать getBBox
                mapBaseLayer.appendChild(floorsClone);
                
                // Обрабатываем каждый этаж после добавления в DOM
                floorGroups.forEach(({ floor, floorSvgGroup }) => {
                    // Клонируем содержимое группы этажа
                    const floorClone = floorSvgGroup.cloneNode(true);
                    
                    // Создаем группу-обертку для этажа
                    const floorWrapper = document.createElementNS(SVG_NS, 'g');
                    floorWrapper.setAttribute('class', 'ksmm-floor-rectangle');
                    floorWrapper.setAttribute('data-floor', floor);
                    floorWrapper.setAttribute('data-building', building);
                    
                    // Заменяем оригинальную группу на обертку
                    const parent = floorSvgGroup.parentNode;
                    parent.replaceChild(floorWrapper, floorSvgGroup);
                    
                    floorClone.removeAttribute('id');
                    floorClone.setAttribute('class', 'ksmm-floor-svg');
                    floorClone.style.cursor = 'pointer';
                    floorClone.style.pointerEvents = 'all';
                    
                    // Обработчики событий на SVG этаже
                    floorClone.addEventListener('click', () => {
                        switchFloor(building, floor);
                    });
                    floorClone.addEventListener('mouseenter', () => {
                        floorWrapper.classList.add('hovered');
                    });
                    floorClone.addEventListener('mouseleave', () => {
                        floorWrapper.classList.remove('hovered');
                    });
                    
                    floorWrapper.appendChild(floorClone);
                    
                    // Получаем bbox этажа для позиционирования кружочков
                    const bbox = floorClone.getBBox();
                    const floorCenterY = bbox.y + bbox.height / 2;
                    
                    // Получаем сервисы этого этажа
                    const servicesOnFloor = getServicesForFloor(building, floor);
                    
                    // Рисуем кружочки для каждого сервиса справа от этажа
                    const CIRCLE_RADIUS = 12;
                    const CIRCLE_SPACING = 4;
                    const CIRCLE_START_X = SVG_WIDTH + 30;
                    const CIRCLE_Y = floorCenterY;
                    
                    servicesOnFloor.forEach((service, serviceIndex) => {
                        const circle = document.createElementNS(SVG_NS, 'circle');
                        const circleX = CIRCLE_START_X + serviceIndex * (CIRCLE_RADIUS * 2 + CIRCLE_SPACING);
                        circle.setAttribute('cx', circleX);
                        circle.setAttribute('cy', CIRCLE_Y);
                        circle.setAttribute('r', CIRCLE_RADIUS);
                        circle.setAttribute('fill', categoryColors[service.category] || '#999');
                        circle.setAttribute('stroke', '#fff');
                        circle.setAttribute('stroke-width', '2');
                        circle.classList.add('ksmm-service-dot');
                        circle.setAttribute('data-service-id', service.id);
                        circle.setAttribute('data-floor', floor);
                        circle.setAttribute('data-category', service.category);
                        circle.style.cursor = 'pointer';
                        circle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            switchFloor(building, floor, {
                                onFloorReady: () => {
                                    showPopup(service);
                                    centerOnArea(service.areaId);
                                }
                            });
                        });
                        circle.addEventListener('mouseenter', () => {
                            circle.setAttribute('r', CIRCLE_RADIUS + 3);
                            setHighlight(service.id, true);
                            // Подсвечиваем этаж при подсветке сервиса
                            floorWrapper.classList.add('service-highlighted');
                        });
                        circle.addEventListener('mouseleave', () => {
                            circle.setAttribute('r', CIRCLE_RADIUS);
                            setHighlight(service.id, false);
                            // Убираем подсветку этажа
                            floorWrapper.classList.remove('service-highlighted');
                        });
                        floorWrapper.appendChild(circle);
                    });
                });

                // Обновляем список
                updateListAndFilters();
                updateNavigationButtons();
                if (options.onContentReady) options.onContentReady();
            })
            .catch(err => {
                console.error('Ошибка загрузки floors.svg:', err);
                updateListAndFilters();
                updateNavigationButtons();
            });
    }

    function renderMapAreas(b, f) {
        mapAreasContainer.innerHTML = '';
        setActiveArea(null);
        const servicesOnFloor = getServicesForFloor(b, f).filter(service => Boolean(service.areaId));
        // Обновляем текст кнопки дропдауна
        if (floorDropdownText) {
            floorDropdownText.textContent = `${buildingFloorStructure[b].label}, ${f} этаж`;
        }
        if (servicesOnFloor.length === 0) {
            // Нет сервисов на этаже - просто возвращаемся без сообщения
            return;
        }

        servicesOnFloor.forEach(service => {
            const originalZone = getZoneElement(service.areaId);
            if (!originalZone || !originalZone.parentNode) {
                console.warn(`Zone not found for areaId: ${service.areaId}`);
                return;
            }
            const zone = originalZone.cloneNode(true);
            originalZone.parentNode.replaceChild(zone, originalZone);
            
            // Не изменяем стили зон - берем как есть из SVG
            // Не удаляем никакие атрибуты, чтобы сохранить оригинальное отображение
            
            zone.classList.add('ksmm-map-area');
            zone.setAttribute('data-service-id', service.id);
            zone.setAttribute('data-area-id', service.areaId);
            zone.setAttribute('data-category', service.category);
            zone.style.pointerEvents = 'all';
            zone.addEventListener('click', () => {
                showPopup(service);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        centerOnArea(service.areaId);
                    });
                });
            });
            zone.addEventListener('mouseenter', () => setHighlight(service.id, true));
            zone.addEventListener('mouseleave', () => setHighlight(service.id, false));
        });
    }

    function renderFloorDropdown() {
        if (!floorDropdownList) return;
        
        floorDropdownList.innerHTML = '';
        
        // Создаем контейнер для всех корпусов в виде колонок
        const buildingsContainer = document.createElement('div');
        buildingsContainer.className = 'ksmm-floor-dropdown-buildings';
        
        // Создаем колонку для каждого корпуса
        for (const buildingKey in buildingFloorStructure) {
            const bData = buildingFloorStructure[buildingKey];
            
            // Создаем колонку корпуса
            const buildingColumn = document.createElement('div');
            buildingColumn.className = 'ksmm-floor-dropdown-building-column';
            
            // Заголовок корпуса (кликабельный)
            const buildingHeader = document.createElement('div');
            buildingHeader.className = 'ksmm-floor-dropdown-building-header';
            if (buildingKey === currentBuilding && isBuildingViewMode) {
                buildingHeader.classList.add('active');
            }
            buildingHeader.textContent = bData.label;
            buildingHeader.setAttribute('data-building', buildingKey);
            buildingHeader.style.cursor = 'pointer';
            buildingHeader.addEventListener('click', (e) => {
                e.stopPropagation();
                switchFloor(buildingKey, null);
                closeFloorDropdown();
            });
            buildingColumn.appendChild(buildingHeader);
            
            // Контейнер для этажей (вертикальный список)
            const floorsContainer = document.createElement('div');
            floorsContainer.className = 'ksmm-floor-dropdown-floors';
            
            // Сортируем этажи по возрастанию
            const sortedFloors = [...bData.floors].sort((a, b) => a - b);
            
            // Создаем кнопки этажей
            sortedFloors.forEach(floor => {
                const floorBtn = document.createElement('button');
                floorBtn.className = 'ksmm-floor-dropdown-floor-btn';
                if (buildingKey === currentBuilding && floor === currentFloor) {
                    floorBtn.classList.add('active');
                }
                floorBtn.textContent = `${floor} этаж`;
                floorBtn.setAttribute('data-building', buildingKey);
                floorBtn.setAttribute('data-floor', floor);
                floorBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    switchFloor(buildingKey, floor);
                    closeFloorDropdown();
                });
                floorsContainer.appendChild(floorBtn);
            });
            
            buildingColumn.appendChild(floorsContainer);
            buildingsContainer.appendChild(buildingColumn);
        }
        
        floorDropdownList.appendChild(buildingsContainer);
    }
    
    function openFloorDropdown() {
        if (!floorDropdown || !floorDropdownList) return;
        floorDropdown.classList.add('open');
        floorDropdownList.style.display = 'block';
    }
    
    function closeFloorDropdown() {
        if (!floorDropdown || !floorDropdownList) return;
        floorDropdown.classList.remove('open');
        floorDropdownList.style.display = 'none';
    }
    
    function toggleFloorDropdown() {
        if (!floorDropdown) return;
        if (floorDropdown.classList.contains('open')) {
            closeFloorDropdown();
        } else {
            openFloorDropdown();
        }
    }

    // Функции для получения следующего/предыдущего этажа
    function getNextFloor(building, currentFloorNum) {
        const bData = buildingFloorStructure[building];
        if (!bData) return null;
        const sortedFloors = [...bData.floors].sort((a, b) => a - b);
        const currentIndex = sortedFloors.indexOf(currentFloorNum);
        if (currentIndex >= 0 && currentIndex < sortedFloors.length - 1) {
            return sortedFloors[currentIndex + 1];
        }
        return null;
    }
    
    function getPrevFloor(building, currentFloorNum) {
        const bData = buildingFloorStructure[building];
        if (!bData) return null;
        const sortedFloors = [...bData.floors].sort((a, b) => a - b);
        const currentIndex = sortedFloors.indexOf(currentFloorNum);
        if (currentIndex > 0) {
            return sortedFloors[currentIndex - 1];
        }
        return null;
    }
    
    // Функции для получения следующего/предыдущего корпуса
    function getNextBuilding(currentBuildingKey) {
        const buildingKeys = Object.keys(buildingFloorStructure).sort();
        const currentIndex = buildingKeys.indexOf(currentBuildingKey);
        if (currentIndex >= 0 && currentIndex < buildingKeys.length - 1) {
            return buildingKeys[currentIndex + 1];
        }
        return null;
    }
    
    function getPrevBuilding(currentBuildingKey) {
        const buildingKeys = Object.keys(buildingFloorStructure).sort();
        const currentIndex = buildingKeys.indexOf(currentBuildingKey);
        if (currentIndex > 0) {
            return buildingKeys[currentIndex - 1];
        }
        return null;
    }
    
    // Обновление видимости кнопок навигации
    function updateNavigationButtons() {
        if (isBuildingViewMode) {
            // Режим корпуса - показываем кнопки переключения корпусов
            floorPrevBtn.style.display = 'none';
            floorNextBtn.style.display = 'none';
            
            const nextBuilding = getNextBuilding(currentBuilding);
            const prevBuilding = getPrevBuilding(currentBuilding);
            
            if (prevBuilding) {
                buildingPrevBtn.style.display = 'flex';
                const prevLabel = buildingPrevBtn.querySelector('.ksmm-nav-label');
                if (prevLabel) {
                    prevLabel.textContent = buildingFloorStructure[prevBuilding].label;
                }
            } else {
                buildingPrevBtn.style.display = 'none';
            }
            
            if (nextBuilding) {
                buildingNextBtn.style.display = 'flex';
                const nextLabel = buildingNextBtn.querySelector('.ksmm-nav-label');
                if (nextLabel) {
                    nextLabel.textContent = buildingFloorStructure[nextBuilding].label;
                }
            } else {
                buildingNextBtn.style.display = 'none';
            }
        } else {
            // Режим этажа - показываем кнопки переключения этажей
            buildingPrevBtn.style.display = 'none';
            buildingNextBtn.style.display = 'none';
            
            const nextFloor = getNextFloor(currentBuilding, currentFloor);
            const prevFloor = getPrevFloor(currentBuilding, currentFloor);
            
            // Кнопка вверху (next) показывает этаж выше (nextFloor - больший номер)
            if (nextFloor) {
                floorNextBtn.style.display = 'flex';
                const nextLabel = floorNextBtn.querySelector('.ksmm-nav-label');
                if (nextLabel) {
                    nextLabel.textContent = `${nextFloor} этаж`;
                }
            } else {
                floorNextBtn.style.display = 'none';
            }
            
            // Кнопка внизу (prev) показывает этаж ниже (prevFloor - меньший номер)
            if (prevFloor) {
                floorPrevBtn.style.display = 'flex';
                const prevLabel = floorPrevBtn.querySelector('.ksmm-nav-label');
                if (prevLabel) {
                    prevLabel.textContent = `${prevFloor} этаж`;
                }
            } else {
                floorPrevBtn.style.display = 'none';
            }
        }
    }
    
    function switchFloor(b, f, options) {
        // Если f === null, активируем режим просмотра корпуса (с анимацией как при смене этажа)
        if (f === null) {
            const FLOOR_ANIM_OUT_MS = 220;
            const FLOOR_ANIM_IN_MS = 280;
            mapBaseLayer.classList.remove('ksmm-floor-enter');
            mapAreasContainer.classList.remove('ksmm-floor-enter');
            mapBaseLayer.classList.add('ksmm-floor-exit');
            mapAreasContainer.classList.add('ksmm-floor-exit');

            setTimeout(() => {
                mapBaseLayer.innerHTML = '';
                mapAreasContainer.innerHTML = '';
                mapBaseLayer.classList.remove('ksmm-floor-exit');
                mapAreasContainer.classList.remove('ksmm-floor-exit');
                setActiveArea(null);
                isBuildingViewMode = true;
                currentBuilding = b;
                currentFloor = null;
                mapState.x = 0;
                mapState.y = 0;
                mapState.scale = 1;
                applyMapTransform(true);
                hidePopup();
                document.querySelectorAll('.ksmm-floor-dropdown-floor-btn, .ksmm-floor-dropdown-building-header').forEach(btn => {
                    btn.classList.remove('active');
                });
                const buildingHeader = document.querySelector(`.ksmm-floor-dropdown-building-header[data-building="${b}"]`);
                if (buildingHeader) buildingHeader.classList.add('active');
                updateListAndFilters();
                updateNavigationButtons();

                renderBuildingView(b, {
                    onContentReady: () => {
                        mapBaseLayer.classList.add('ksmm-floor-enter');
                        mapAreasContainer.classList.add('ksmm-floor-enter');
                        setTimeout(() => {
                            mapBaseLayer.classList.remove('ksmm-floor-enter');
                            mapAreasContainer.classList.remove('ksmm-floor-enter');
                        }, FLOOR_ANIM_IN_MS);
                    }
                });
            }, FLOOR_ANIM_OUT_MS);
            return;
        }
        
        // Обычный режим просмотра одного этажа
        isBuildingViewMode = false;
        currentBuilding = b;
        currentFloor = f;
        const floorKey = `${b}-F${f}`;
        floorSwitchSequence++;
        const thisSwitchSequence = floorSwitchSequence;
        
        // Обновляем активный элемент в дропдауне
        document.querySelectorAll('.ksmm-floor-dropdown-floor-btn, .ksmm-floor-dropdown-building-header').forEach(btn => {
            btn.classList.remove('active');
        });
        const currentBtn = document.querySelector(`.ksmm-floor-dropdown-floor-btn[data-building="${b}"][data-floor="${f}"]`);
        if (currentBtn) currentBtn.classList.add('active');

        const FLOOR_ANIM_OUT_MS = 220;
        const FLOOR_ANIM_IN_MS = 280;

        // Анимация выхода: zoom out + fade
        mapBaseLayer.classList.add('ksmm-floor-exit');
        mapAreasContainer.classList.add('ksmm-floor-exit');

        setTimeout(() => {
            if (thisSwitchSequence !== floorSwitchSequence) return;

            renderFloorBaseLayer(floorKey, thisSwitchSequence).then(() => {
                if (thisSwitchSequence !== floorSwitchSequence) return;
                mapBaseLayer.classList.remove('ksmm-floor-exit');
                mapAreasContainer.classList.remove('ksmm-floor-exit');
                
                renderMapAreas(b, f);
                const savedBuilding = currentBuilding;
                const savedFloor = currentFloor;
                currentBuilding = b;
                currentFloor = f;
                updateListAndFilters();
                currentBuilding = savedBuilding;
                currentFloor = savedFloor;
                mapState.x = 0;
                mapState.y = 0;
                mapState.scale = 1;
                applyMapTransform(true);
                hidePopup();
                updateNavigationButtons();

                if (options && typeof options.onFloorReady === 'function') {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            if (thisSwitchSequence === floorSwitchSequence) options.onFloorReady();
                        });
                    });
                }

                // Анимация входа: zoom in + fade in up
                mapBaseLayer.classList.add('ksmm-floor-enter');
                mapAreasContainer.classList.add('ksmm-floor-enter');
                setTimeout(() => {
                    mapBaseLayer.classList.remove('ksmm-floor-enter');
                    mapAreasContainer.classList.remove('ksmm-floor-enter');
                    if (thisSwitchSequence === floorSwitchSequence && !(options && options.onFloorReady)) {
                        mapState.x = 0;
                        mapState.y = 0;
                        mapState.scale = 1;
                        applyMapTransform(true);
                    }
                }, FLOOR_ANIM_IN_MS);
            });
        }, FLOOR_ANIM_OUT_MS);
    }

    function createSectionTitle(text) {
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'ksmm-list-section-title';
        sectionTitle.textContent = text;
        return sectionTitle;
    }

    // Функция для получения координат области на карте для сортировки
    function getAreaPosition(areaId) {
        if (!areaId) return { y: Infinity, x: Infinity };
        const areaElement = getZoneElement(areaId);
        if (!areaElement || typeof areaElement.getBBox !== 'function') {
            return { y: Infinity, x: Infinity };
        }
        try {
            const bbox = areaElement.getBBox();
            // Используем центр области для более точной сортировки
            return { y: bbox.y + bbox.height / 2, x: bbox.x + bbox.width / 2 };
        } catch (e) {
            return { y: Infinity, x: Infinity };
        }
    }

    // Функция сортировки сервисов по позиции на карте (сверху вниз, слева направо)
    function sortServicesByMapPosition(services) {
        return services.sort((a, b) => {
            const posA = getAreaPosition(a.areaId);
            const posB = getAreaPosition(b.areaId);
            
            // Сначала по Y (сверху вниз) - используем порог 20 пикселей для группировки
            if (Math.abs(posA.y - posB.y) > 20) {
                return posA.y - posB.y;
            }
            // Затем по X (слева направо)
            return posA.x - posB.x;
        });
    }

    function updateListAndFilters() {
        listContainer.innerHTML = '';
        
        // Режим просмотра корпуса - показываем все этажи корпуса
        if (isBuildingViewMode) {
            const buildingServices = allServices.filter(s => s.building === currentBuilding);
            
            // Группируем по этажам
            const servicesByFloor = {};
            buildingServices.forEach(service => {
                if (!servicesByFloor[service.floor]) {
                    servicesByFloor[service.floor] = [];
                }
                servicesByFloor[service.floor].push(service);
            });
            
            // Сортируем этажи
            const sortedFloors = Object.keys(servicesByFloor).map(Number).sort((a, b) => a - b);
            
            sortedFloors.forEach(floor => {
                const floorServices = servicesByFloor[floor];
                // Сортируем сервисы этажа по позиции на карте
                const sortedFloorServices = sortServicesByMapPosition([...floorServices]);
                
                // Добавляем заголовок этажа
                listContainer.appendChild(createSectionTitle(`${floor} этаж`));
                
                sortedFloorServices.forEach(service => {
                    const item = createListItem(service, false);
                    item.addEventListener('click', () => {
                        switchFloor(service.building, service.floor, {
                            onFloorReady: () => {
                                showPopup(service);
                                centerOnArea(service.areaId);
                            }
                        });
                    });
                    item.addEventListener('mouseenter', () => setHighlight(service.id, true));
                    item.addEventListener('mouseleave', () => setHighlight(service.id, false));
                });
            });
            
            // Другие корпуса
            const otherBuildingsServices = allServices.filter(s => s.building !== currentBuilding);
            if (otherBuildingsServices.length > 0) {
                listContainer.appendChild(createSectionTitle('Другие корпуса'));
                otherBuildingsServices.forEach(service => {
                    const item = createListItem(service, false);
                    item.addEventListener('click', () => {
                        switchFloor(service.building, service.floor, {
                            onFloorReady: () => {
                                showPopup(service);
                                centerOnArea(service.areaId);
                            }
                        });
                    });
                    item.addEventListener('mouseenter', () => setHighlight(service.id, true));
                    item.addEventListener('mouseleave', () => setHighlight(service.id, false));
                });
            }
        } else {
            // Обычный режим просмотра одного этажа
            // Разделяем все сервисы на группы
            const currentFloorServices = allServices.filter(s => s.building === currentBuilding && s.floor === currentFloor);
            const otherFloorsServices = allServices.filter(s => s.building === currentBuilding && s.floor !== currentFloor);
            const otherBuildingsServices = allServices.filter(s => s.building !== currentBuilding);
            
            // Сортируем другие этажи от ближнего к дальнему
            otherFloorsServices.sort((a, b) => {
                const diffA = Math.abs(a.floor - currentFloor);
                const diffB = Math.abs(b.floor - currentFloor);
                if (diffA !== diffB) {
                    return diffA - diffB;
                }
                return a.floor - b.floor;
            });
            
            // Сортируем сервисы текущего этажа по позиции на карте
            const sortedCurrentFloorServices = sortServicesByMapPosition([...currentFloorServices]);
            
            // Текущий этаж
            if (sortedCurrentFloorServices.length > 0) {
                sortedCurrentFloorServices.forEach(service => {
                    const item = createListItem(service, true);
                    item.addEventListener('click', () => {
                        showPopup(service);
                        // Небольшая задержка для гарантии, что DOM обновлен
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                centerOnArea(service.areaId);
                            });
                        });
                    });
                    item.addEventListener('mouseenter', () => setHighlight(service.id, true));
                    item.addEventListener('mouseleave', () => setHighlight(service.id, false));
                });
            } else {
                const emptyMsg = document.createElement('div');
                emptyMsg.style.cssText = 'padding: 15px; color: #999;';
                emptyMsg.textContent = 'На этом этаже пока нет зарегистрированных сервисов.';
                listContainer.appendChild(emptyMsg);
            }
            
            // Другие этажи
            if (otherFloorsServices.length > 0) {
                listContainer.appendChild(createSectionTitle('Другие этажи'));
                otherFloorsServices.forEach(service => {
                    const item = createListItem(service, false);
                    item.addEventListener('click', () => {
                        switchFloor(service.building, service.floor, {
                            onFloorReady: () => {
                                showPopup(service);
                                centerOnArea(service.areaId);
                            }
                        });
                    });
                    item.addEventListener('mouseenter', () => setHighlight(service.id, true));
                    item.addEventListener('mouseleave', () => setHighlight(service.id, false));
                });
            }
            
            // Другие корпуса
            if (otherBuildingsServices.length > 0) {
                listContainer.appendChild(createSectionTitle('Другие корпуса'));
                otherBuildingsServices.forEach(service => {
                    const item = createListItem(service, false);
                    item.addEventListener('click', () => {
                        switchFloor(service.building, service.floor, {
                            onFloorReady: () => {
                                showPopup(service);
                                centerOnArea(service.areaId);
                            }
                        });
                    });
                    item.addEventListener('mouseenter', () => setHighlight(service.id, true));
                    item.addEventListener('mouseleave', () => setHighlight(service.id, false));
                });
            }
        }
        
        // Сбрасываем/рендерим подфильтры для текущей категории
        const currentCategory = filterControls.querySelector('.active')?.getAttribute('data-category');
        if (currentCategory) {
            renderSubfilters(currentCategory);
        }
        // Применяем фильтрацию
        updateView();
    }
    // --- 6. ЛОГИКА ФИЛЬТРОВ ---
    // Подфильтры по категориям
    // hours удалён - теперь есть отдельные статусы работы и фильтры (Сейчас открыто, Выходные, 24/7)
    const subfilterDefinitions = {
        'sport': ['access'],
        'meeting': ['capacity', 'equipment'], // вместимость и оборудование
        'relax': ['type']
        // food и service больше не имеют subfilters - используют новые hours filters
    };

    // Названия подфильтров на русском
    const subfilterLabels = {
        'access': 'Доступ',
        'capacity': 'Вместимость',
        'equipment': 'Оборудование',
        'type': 'Тип',
        'location': 'Номер помещения'
    };

    // Функция для группировки capacity в диапазоны
    function getCapacityRange(capacity) {
        if (typeof capacity !== 'number') return capacity;
        if (capacity <= 4) return 'до 4';
        if (capacity <= 8) return '5-8';
        if (capacity <= 12) return '9-12';
        if (capacity <= 20) return '13-20';
        if (capacity <= 30) return '21-30';
        return '31+';
    }

    function renderSubfilters(category) {
        subfilterControls.innerHTML = '';
        const definition = subfilterDefinitions[category];
        if (!definition) {
            subfilterControls.style.display = 'none';
            return;
        }
        subfilterControls.style.display = 'block';
        definition.forEach(attrKey => {
            const groupEl = document.createElement('div');
            groupEl.className = 'ksmm-subfilter-group';
            const allValues = allServices
                .filter(s => s.category === category && s.attributes && s.attributes[attrKey])
                .flatMap(s => {
                    const value = s.attributes[attrKey];
                    // Для capacity - группируем в диапазоны
                    if (attrKey === 'capacity' && typeof value === 'number') {
                        return [getCapacityRange(value)];
                    }
                    // Для equipment - разбиваем массив на отдельные элементы
                    if (attrKey === 'equipment' && Array.isArray(value)) {
                        return value;
                    }
                    // Для equipment - если строка, разбиваем по запятым (для обратной совместимости)
                    if (attrKey === 'equipment' && typeof value === 'string') {
                        return value.split(',').map(e => e.trim()).filter(e => e);
                    }
                    return [value];
                });
            const uniqueValues = [...new Set(allValues)].sort((a, b) => {
                // Специальная сортировка для capacity (диапазоны)
                if (attrKey === 'capacity') {
                    const order = ['до 4', '5-8', '9-12', '13-20', '21-30', '31+'];
                    const aIndex = order.indexOf(a);
                    const bIndex = order.indexOf(b);
                    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                    if (aIndex !== -1) return -1;
                    if (bIndex !== -1) return 1;
                }
                // Для чисел - числовая сортировка
                if (typeof a === 'number' && typeof b === 'number') return a - b;
                // Для строк - строковая сортировка
                return String(a).localeCompare(String(b));
            });
            if (uniqueValues.length === 0) {
                // Если нет данных для этого подфильтра, пропускаем (например, capacity и equipment для meeting)
                return;
            }
            const label = subfilterLabels[attrKey] || attrKey;
            groupEl.innerHTML = `<div class="ksmm-subfilter-group-title">${label}</div>`;
            const allEl = document.createElement('span');
            allEl.className = 'ksmm-subfilter active';
            allEl.textContent = 'Все';
            allEl.setAttribute('data-key', attrKey);
            allEl.setAttribute('data-value', 'all');
            groupEl.appendChild(allEl);
            uniqueValues.forEach(value => {
                const el = document.createElement('span');
                el.className = 'ksmm-subfilter';
                el.textContent = value;
                el.setAttribute('data-key', attrKey);
                el.setAttribute('data-value', value);
                groupEl.appendChild(el);
            });
            subfilterControls.appendChild(groupEl);
        });
    }

    function getActiveSubfilters() {
        const filters = {};
        document.querySelectorAll('.ksmm-subfilter.active:not([data-value="all"])').forEach(el => {
            const key = el.getAttribute('data-key');
            const value = el.getAttribute('data-value');
            if (!filters[key]) filters[key] = [];
            filters[key].push(value);
        });
        return filters;
    }
    // Главная функция обновления вида
    function updateView() {
        const activeFilter = filterControls.querySelector('.active');
        if (!activeFilter) return; // Если нет активной кнопки, выходим
        const currentCategory = activeFilter.getAttribute('data-category');
        const currentSearch = searchInput.value.toLowerCase();
        const currentSubfilters = getActiveSubfilters();
        
        // Применяем фильтры ко всем сервисам в списке
        document.querySelectorAll('.ksmm-list-item').forEach(listItem => {
            const serviceId = parseInt(listItem.getAttribute('data-id'));
            const service = getServiceById(serviceId);
            if (!service) return;
            
            const mapArea = document.querySelector(`.ksmm-map-area[data-service-id="${serviceId}"]`);
            
            // 1. Фильтр по Категории
            const isCategoryMatch = (currentCategory === 'all' || service.category === currentCategory);
            // 2. Фильтр по Поиску
            const nameMatch = service.name.toLowerCase().includes(currentSearch);
            const descMatch = service.desc.toLowerCase().includes(currentSearch);
            const isSearchMatch = (currentSearch === '') || nameMatch || descMatch;
            // 3. Фильтр по Подфильтрам
            let isSubfilterMatch = true;
            for (const key in currentSubfilters) {
                const serviceValue = service.attributes && service.attributes[key];
                const allowedValues = currentSubfilters[key];
                if (allowedValues.length > 0) {
                    // Для capacity - сравниваем диапазоны
                    if (key === 'capacity' && typeof serviceValue === 'number') {
                        const serviceRange = getCapacityRange(serviceValue);
                        if (!allowedValues.includes(serviceRange)) {
                            isSubfilterMatch = false;
                            break;
                        }
                    } 
                    // Для equipment - работаем с массивом
                    else if (key === 'equipment') {
                        let serviceEquipment = [];
                        if (Array.isArray(serviceValue)) {
                            serviceEquipment = serviceValue;
                        } else if (typeof serviceValue === 'string') {
                            // Обратная совместимость: разбиваем строку по запятым
                            serviceEquipment = serviceValue.split(',').map(e => e.trim()).filter(e => e);
                        }
                        // Проверяем, есть ли хотя бы одно выбранное оборудование в списке оборудования переговорки
                        const hasMatchingEquipment = allowedValues.some(selected => 
                            serviceEquipment.some(eq => eq === selected)
                        );
                        if (!hasMatchingEquipment) {
                            isSubfilterMatch = false;
                            break;
                        }
                    }
                    else if (!allowedValues.includes(serviceValue)) {
                        isSubfilterMatch = false;
                        break;
                    }
                }
            }
            // 4. Решение о видимости
            const isVisible = isCategoryMatch && isSearchMatch && isSubfilterMatch;
            // СПИСОК СКРЫВАЕМ
            listItem.classList.toggle('hidden', !isVisible);
            // КАРТУ ПРИГЛУШАЕМ (если mapArea существует - только для текущего этажа)
            if (mapArea) {
                mapArea.classList.toggle('dimmed', !isVisible);
                // 5. Логика Подсветки Поиска
                if (isVisible && currentSearch !== '') {
                    listItem.classList.toggle('search-highlight-priority', nameMatch);
                    listItem.classList.toggle('search-highlight-secondary', !nameMatch && descMatch);
                    mapArea.classList.toggle('search-match-priority', nameMatch);
                    mapArea.classList.toggle('search-match-secondary', !nameMatch && descMatch);
                } else {
                    listItem.classList.remove('search-highlight-priority', 'search-highlight-secondary');
                    mapArea.classList.remove('search-match-priority', 'search-match-secondary');
                }
            }
        });
        
        // Скрываем заголовки секций, если все элементы в секции скрыты
        document.querySelectorAll('.ksmm-list-section-title').forEach(sectionTitle => {
            let hasVisibleItems = false;
            let nextElement = sectionTitle.nextElementSibling;
            while (nextElement && !nextElement.classList.contains('ksmm-list-section-title')) {
                if (nextElement.classList.contains('ksmm-list-item') && !nextElement.classList.contains('hidden')) {
                    hasVisibleItems = true;
                    break;
                }
                nextElement = nextElement.nextElementSibling;
            }
            sectionTitle.style.display = hasVisibleItems ? 'block' : 'none';
        });
    }
    // --- 7. ЗАПУСК И ИНИЦИАЛИЗАЦИЯ ---
    function init() {
        // Устанавливаем начальный этаж
        if (typeof buildingFloorStructure === 'undefined' || !buildingFloorStructure['B1']) {
            console.error('buildingFloorStructure не загружен!');
            return;
        }
        currentBuilding = 'B1';
        currentFloor = buildingFloorStructure['B1'].defaultFloor;
        renderFloorDropdown();
        switchFloor(currentBuilding, currentFloor);
        
        // Обработчики для навигации этажей
        // Кнопка вверху (next) переключает на этаж выше (nextFloor - больший номер)
        if (floorNextBtn) {
            floorNextBtn.addEventListener('click', () => {
                const nextFloor = getNextFloor(currentBuilding, currentFloor);
                if (nextFloor !== null) {
                    switchFloor(currentBuilding, nextFloor);
                }
            });
        }
        // Кнопка внизу (prev) переключает на этаж ниже (prevFloor - меньший номер)
        if (floorPrevBtn) {
            floorPrevBtn.addEventListener('click', () => {
                const prevFloor = getPrevFloor(currentBuilding, currentFloor);
                if (prevFloor !== null) {
                    switchFloor(currentBuilding, prevFloor);
                }
            });
        }
        
        // Обработчики для навигации корпусов
        if (buildingPrevBtn) {
            buildingPrevBtn.addEventListener('click', () => {
                const prevBuilding = getPrevBuilding(currentBuilding);
                if (prevBuilding !== null) {
                    switchFloor(prevBuilding, null);
                }
            });
        }
        if (buildingNextBtn) {
            buildingNextBtn.addEventListener('click', () => {
                const nextBuilding = getNextBuilding(currentBuilding);
                if (nextBuilding !== null) {
                    switchFloor(nextBuilding, null);
                }
            });
        }
        
        // Обработчики для дропдауна
        if (floorDropdownBtn) {
            floorDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFloorDropdown();
            });
        }
        
        // Закрытие дропдауна при клике вне его
        document.addEventListener('click', (e) => {
            if (!floorDropdown || !floorDropdown.contains(e.target)) {
                closeFloorDropdown();
            }
        });
        initMapInteraction();
        
        // Предзагрузка остальных этажей в фоне (низкий приоритет)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => preloadAllFloors());
        } else {
            setTimeout(preloadAllFloors, 1000);
        }
        // Обработчик Категорий
        filterControls.addEventListener('click', (e) => {
            if (!e.target.matches('.ksmm-filter-btn')) return;
            const activeBtn = filterControls.querySelector('.active');
            if (activeBtn) activeBtn.classList.remove('active');
            e.target.classList.add('active');
            renderSubfilters(e.target.getAttribute('data-category'));
            updateView();
        });
        // Обработчик Подфильтров
        subfilterControls.addEventListener('click', (e) => {
            if (!e.target.matches('.ksmm-subfilter')) return;
            const el = e.target;
            const value = el.getAttribute('data-value');
            const groupContainer = el.parentElement;
            if (value === 'all') {
                groupContainer.querySelectorAll('.ksmm-subfilter').forEach(sub => sub.classList.remove('active'));
                el.classList.add('active');
            } else {
                groupContainer.querySelector('.ksmm-subfilter[data-value="all"]').classList.remove('active');
                el.classList.toggle('active');
                if (groupContainer.querySelectorAll('.ksmm-subfilter.active').length === 0) {
                    groupContainer.querySelector('.ksmm-subfilter[data-value="all"]').classList.add('active');
                }
            }
            updateView();
        });
        // Обработчик Поиска с дебаунсом
        let searchDebounceTimeout = null;
        searchInput.addEventListener('input', () => {
            if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout);
            searchDebounceTimeout = setTimeout(() => {
                updateView();
                // После updateView вызываем hours filter если он определён
                if (typeof updateViewWithHoursFilter === 'function') {
                    updateViewWithHoursFilter();
                }
            }, 150);
        });
        // Закрытие Pop-up
        popupCloseBtn.addEventListener('click', hidePopup);
        
        // Навигация по галерее
        if (galleryPrevBtn) {
            galleryPrevBtn.addEventListener('click', galleryPrev);
        }
        if (galleryNextBtn) {
            galleryNextBtn.addEventListener('click', galleryNext);
        }
        
        // Swipe жесты для галереи на мобильных
        if (popupGallery) {
            popupGallery.addEventListener('touchstart', (e) => {
                galleryTouchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            popupGallery.addEventListener('touchend', (e) => {
                if (!galleryTouchStartX) return;
                galleryTouchEndX = e.changedTouches[0].clientX;
                const swipeDistance = galleryTouchStartX - galleryTouchEndX;
                const minSwipeDistance = 50;
                
                if (Math.abs(swipeDistance) > minSwipeDistance) {
                    if (swipeDistance > 0) {
                        // Swipe влево - следующее изображение
                        galleryNext();
                    } else {
                        // Swipe вправо - предыдущее изображение
                        galleryPrev();
                    }
                }
                galleryTouchStartX = 0;
                galleryTouchEndX = 0;
            }, { passive: true });
        }
    }
    // Хелпер для мобильной версии - применяет стили если медиа-запрос не сработал
    function applyMobileStyles() {
        if (window.innerWidth <= 768) {
            const content = document.querySelector('.ksmm-content');
            const module = document.querySelector('#krok-services-map-module');
            
            if (content && window.getComputedStyle(content).display === 'grid') {
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
                content.style.height = '100vh';
                content.style.overflow = 'hidden';
            }
            
            if (module) {
                module.style.height = '100vh';
                module.style.overflow = 'hidden';
            }
        }
    }
    
    // Применяем стили при загрузке и изменении размера окна
    applyMobileStyles();
    window.addEventListener('resize', applyMobileStyles);
    
    init();
    
    // === ИНТЕГРАЦИЯ С isDayOff API ===
    // https://isdayoff.ru/ - API производственного календаря РФ
    
    // Глобальное состояние дня (0 - рабочий, 1 - выходной, 2 - сокращенный, 4 - праздник)
    let dayOffStatus = null;
    let isDayOffLoaded = false;
    
    // Категории, для которых показываем графики работы
    const CATEGORIES_WITH_HOURS = ['service', 'food'];
    
    // Запрос к isDayOff API
    async function fetchDayOffStatus() {
        try {
            const now = getMoscowDate();
            const dateStr = now.getFullYear().toString() +
                String(now.getMonth() + 1).padStart(2, '0') +
                String(now.getDate()).padStart(2, '0');
            
            const response = await fetch(`https://isdayoff.ru/${dateStr}`, {
                method: 'GET',
                cache: 'default'
            });
            
            if (response.ok) {
                const text = await response.text();
                dayOffStatus = parseInt(text, 10);
                isDayOffLoaded = true;
                console.log('[isDayOff] Статус дня:', dayOffStatus, 
                    dayOffStatus === 0 ? '(рабочий)' :
                    dayOffStatus === 1 ? '(выходной)' :
                    dayOffStatus === 2 ? '(сокращенный)' :
                    dayOffStatus === 4 ? '(праздник)' : '(неизвестно)');
                showDayNotice();
            }
        } catch (e) {
            console.warn('[isDayOff] Ошибка получения данных:', e);
            isDayOffLoaded = true;
        }
    }
    
    // Показ уведомления о праздничном/переносе дня
    function showDayNotice() {
        const notice = document.getElementById('ksmm-day-notice');
        if (!notice) return;
        
        const now = getMoscowDate();
        const dayOfWeek = now.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // Праздник или выходной в рабочий день (пн-пт)
        if (!isWeekend && (dayOffStatus === 1 || dayOffStatus === 4)) {
            const isHoliday = dayOffStatus === 4;
            notice.className = 'ksmm-day-notice holiday';
            notice.innerHTML = `
                <span class="ksmm-day-notice-icon">${isHoliday ? '🎉' : '📅'}</span>
                <span class="ksmm-day-notice-text">
                    <strong>Сегодня ${isHoliday ? 'праздничный' : 'выходной'} день</strong><br>
                    Сервисы и точки питания могут не работать
                </span>
            `;
            notice.style.display = 'flex';
        }
        // Рабочая суббота (перенос)
        else if (isWeekend && dayOffStatus === 0) {
            notice.className = 'ksmm-day-notice working-weekend';
            notice.innerHTML = `
                <span class="ksmm-day-notice-icon">💼</span>
                <span class="ksmm-day-notice-text">
                    <strong>Сегодня рабочий день</strong><br>
                    Сервисы и точки питания работают по будничному графику
                </span>
            `;
            notice.style.display = 'flex';
        }
        // Сокращенный день
        else if (dayOffStatus === 2) {
            notice.className = 'ksmm-day-notice holiday';
            notice.innerHTML = `
                <span class="ksmm-day-notice-icon">⏰</span>
                <span class="ksmm-day-notice-text">
                    <strong>Сегодня сокращенный рабочий день</strong><br>
                    Некоторые сервисы могут закрыться раньше
                </span>
            `;
            notice.style.display = 'flex';
        }
        else {
            notice.style.display = 'none';
        }
    }
    
    // Кэш статусов дней (для проверки будущих дат)
    const dayOffCache = {};
    
    // Проверка, является ли сегодня рабочим днем (с учетом isDayOff)
    function isTodayWorkingDay() {
        const now = getMoscowDate();
        const dayOfWeek = now.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        if (isDayOffLoaded && dayOffStatus !== null) {
            return dayOffStatus === 0 || dayOffStatus === 2;
        }
        
        return !isWeekend;
    }
    
    // Проверка, является ли конкретная дата рабочим днём
    async function isWorkingDay(date) {
        const dateStr = date.getFullYear().toString() +
            String(date.getMonth() + 1).padStart(2, '0') +
            String(date.getDate()).padStart(2, '0');
        
        // Проверяем кэш
        if (dayOffCache[dateStr] !== undefined) {
            return dayOffCache[dateStr] === 0 || dayOffCache[dateStr] === 2;
        }
        
        // Сегодняшняя дата - используем уже загруженный статус
        const now = getMoscowDate();
        const todayStr = now.getFullYear().toString() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0');
        
        if (dateStr === todayStr && isDayOffLoaded && dayOffStatus !== null) {
            dayOffCache[dateStr] = dayOffStatus;
            return dayOffStatus === 0 || dayOffStatus === 2;
        }
        
        // Запрашиваем API для другой даты
        try {
            const response = await fetch(`https://isdayoff.ru/${dateStr}`, {
                method: 'GET',
                cache: 'default'
            });
            if (response.ok) {
                const text = await response.text();
                const status = parseInt(text, 10);
                dayOffCache[dateStr] = status;
                return status === 0 || status === 2;
            }
        } catch (e) {
            console.warn('[isDayOff] Ошибка проверки даты:', dateStr, e);
        }
        
        // Fallback: обычная проверка по дню недели
        const dayOfWeek = date.getDay();
        return dayOfWeek !== 0 && dayOfWeek !== 6;
    }
    
    // Найти следующий рабочий день (синхронная версия с fallback)
    function findNextWorkingDaySync(fromDate) {
        const date = fromDate.clone ? fromDate.clone() : new Date(fromDate);
        const maxDays = 14; // Максимум 2 недели вперёд
        
        for (let i = 1; i <= maxDays; i++) {
            date.setDate(date.getDate() + 1);
            const dateStr = date.getFullYear().toString() +
                String(date.getMonth() + 1).padStart(2, '0') +
                String(date.getDate()).padStart(2, '0');
            
            // Проверяем кэш
            if (dayOffCache[dateStr] !== undefined) {
                if (dayOffCache[dateStr] === 0 || dayOffCache[dateStr] === 2) {
                    return { date: date, daysAhead: i };
                }
                continue;
            }
            
            // Fallback: обычная проверка по дню недели
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                return { date: date, daysAhead: i };
            }
        }
        
        return { date: date, daysAhead: maxDays };
    }
    
    // Предзагрузка статусов на ближайшие дни
    async function preloadDayOffStatuses() {
        const now = getMoscowDate();
        const promises = [];
        
        for (let i = 1; i <= 7; i++) {
            const date = now.clone();
            date.setDate(now.getDate() + i);
            const dateStr = date.getFullYear().toString() +
                String(date.getMonth() + 1).padStart(2, '0') +
                String(date.getDate()).padStart(2, '0');
            
            if (dayOffCache[dateStr] === undefined) {
                const promise = fetch(`https://isdayoff.ru/${dateStr}`, {
                    method: 'GET',
                    cache: 'default'
                }).then(response => {
                    if (response.ok) {
                        return response.text().then(text => {
                            dayOffCache[dateStr] = parseInt(text, 10);
                        });
                    }
                }).catch(() => {});
                promises.push(promise);
            }
        }
        
        await Promise.all(promises);
        console.log('[isDayOff] Предзагружены статусы дней:', Object.keys(dayOffCache).length);
    }
    
    // Запускаем загрузку статуса дня
    fetchDayOffStatus().then(() => {
        // После загрузки сегодняшнего статуса, загружаем статусы на неделю вперёд
        preloadDayOffStatuses();
    });
    
    // === МОСКОВСКОЕ ВРЕМЯ ===
    
    // ============================================================
    // !!! ВРЕМЕННЫЙ КОД - ТЕСТОВАЯ ПАНЕЛЬ !!!
    // !!! УДАЛИТЬ ПЕРЕД ИНТЕГРАЦИЕЙ В ПРОДАКШН !!!
    // ============================================================
    let testModeEnabled = false;
    let testDate = null; // формат: { year, month, day, hour, minute }
    
    function createTestPanel() {
        const panel = document.createElement('div');
        panel.id = 'ksmm-test-panel';
        panel.innerHTML = `
            <style>
                #ksmm-test-panel {
                    position: fixed;
                    bottom: 10px;
                    right: 10px;
                    background: #1a1a2e;
                    color: #fff;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-family: system-ui, sans-serif;
                    font-size: 13px;
                    z-index: 99999;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    min-width: 280px;
                }
                #ksmm-test-panel .test-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #333;
                }
                #ksmm-test-panel .test-header span {
                    color: #ff6b6b;
                    font-weight: bold;
                }
                #ksmm-test-panel .test-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 8px 0;
                }
                #ksmm-test-panel label {
                    min-width: 50px;
                }
                #ksmm-test-panel input {
                    background: #2d2d44;
                    border: 1px solid #444;
                    color: #fff;
                    padding: 6px 8px;
                    border-radius: 4px;
                    font-size: 13px;
                }
                #ksmm-test-panel input[type="date"] { width: 140px; }
                #ksmm-test-panel input[type="time"] { width: 100px; }
                #ksmm-test-panel button {
                    background: #4a4aff;
                    color: #fff;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    margin-top: 8px;
                    width: 100%;
                }
                #ksmm-test-panel button:hover { background: #5a5aff; }
                #ksmm-test-panel button.off { background: #666; }
                #ksmm-test-panel .test-status {
                    margin-top: 8px;
                    padding: 6px;
                    background: #2d2d44;
                    border-radius: 4px;
                    font-size: 12px;
                }
            </style>
            <div class="test-header">
                <span>⚠️ ТЕСТ РЕЖИМ</span>
                <small style="color:#888">удалить перед релизом</small>
            </div>
            <div class="test-row">
                <label>Дата:</label>
                <input type="date" id="test-date-input" />
            </div>
            <div class="test-row">
                <label>Время:</label>
                <input type="time" id="test-time-input" />
            </div>
            <button id="test-toggle-btn" class="off">Включить тест-режим</button>
            <div class="test-status" id="test-status">Режим: реальное время</div>
        `;
        document.body.appendChild(panel);
        
        const dateInput = document.getElementById('test-date-input');
        const timeInput = document.getElementById('test-time-input');
        const toggleBtn = document.getElementById('test-toggle-btn');
        const statusDiv = document.getElementById('test-status');
        
        // Установить текущую дату/время по умолчанию
        const now = new Date();
        dateInput.value = now.toISOString().split('T')[0];
        timeInput.value = now.toTimeString().slice(0, 5);
        
        toggleBtn.addEventListener('click', async () => {
            testModeEnabled = !testModeEnabled;
            
            if (testModeEnabled) {
                const [year, month, day] = dateInput.value.split('-').map(Number);
                const [hour, minute] = timeInput.value.split(':').map(Number);
                testDate = { year, month: month - 1, day, hour, minute };
                
                toggleBtn.textContent = 'Выключить тест-режим';
                toggleBtn.classList.remove('off');
                
                // Загрузить статус дня для тестовой даты
                const dateStr = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
                try {
                    const response = await fetch(`https://isdayoff.ru/${dateStr}`);
                    if (response.ok) {
                        const text = await response.text();
                        dayOffStatus = parseInt(text, 10);
                        const statusText = dayOffStatus === 0 ? 'рабочий' :
                                          dayOffStatus === 1 ? 'выходной' :
                                          dayOffStatus === 2 ? 'сокращённый' :
                                          dayOffStatus === 4 ? 'праздник' : 'неизвестно';
                        statusDiv.innerHTML = `Тест: ${dateInput.value} ${timeInput.value}<br>isDayOff: ${dayOffStatus} (${statusText})`;
                        
                        // Очищаем кэш чтобы загрузить новые данные
                        Object.keys(dayOffCache).forEach(k => delete dayOffCache[k]);
                        await preloadDayOffStatuses();
                    }
                } catch (e) {
                    statusDiv.textContent = `Тест: ${dateInput.value} ${timeInput.value} (API недоступен)`;
                }
                
                showDayNotice();
            } else {
                testDate = null;
                toggleBtn.textContent = 'Включить тест-режим';
                toggleBtn.classList.add('off');
                statusDiv.textContent = 'Режим: реальное время';
                
                // Восстановить реальный статус дня
                await fetchDayOffStatus();
            }
            
            // Обновить статусы
            if (typeof addStatusToItems === 'function') addStatusToItems();
            if (typeof updateViewWithHoursFilter === 'function') updateViewWithHoursFilter();
        });
    }
    
    // Создать панель только если в URL есть ?test=1
    // Для тестирования: добавить ?test=1 к URL
    if (new URLSearchParams(window.location.search).get('test') === '1') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createTestPanel);
        } else {
            createTestPanel();
        }
    }
    // ============================================================
    // !!! КОНЕЦ ВРЕМЕННОГО КОДА !!!
    // ============================================================
    
    function getMoscowDate() {
        // Если тест-режим включен, возвращаем тестовую дату
        if (testModeEnabled && testDate) {
            const moscowDate = new Date(Date.UTC(
                testDate.year, testDate.month, testDate.day, 
                testDate.hour, testDate.minute, 0
            ));
            
            return {
                getDay: () => moscowDate.getUTCDay(),
                getHours: () => moscowDate.getUTCHours(),
                getMinutes: () => moscowDate.getUTCMinutes(),
                getSeconds: () => 0,
                getDate: () => moscowDate.getUTCDate(),
                getMonth: () => moscowDate.getUTCMonth(),
                getFullYear: () => moscowDate.getUTCFullYear(),
                setDate: (d) => moscowDate.setUTCDate(d),
                setHours: (h, m, s, ms) => moscowDate.setUTCHours(h, m || 0, s || 0, ms || 0),
                getTime: () => moscowDate.getTime(),
                clone: function() {
                    const cloned = new Date(moscowDate.getTime());
                    return {
                        getDay: () => cloned.getUTCDay(),
                        getHours: () => cloned.getUTCHours(),
                        getMinutes: () => cloned.getUTCMinutes(),
                        getDate: () => cloned.getUTCDate(),
                        getMonth: () => cloned.getUTCMonth(),
                        getFullYear: () => cloned.getUTCFullYear(),
                        setDate: (d) => cloned.setUTCDate(d),
                        setHours: (h, m, s, ms) => cloned.setUTCHours(h, m || 0, s || 0, ms || 0),
                        getTime: () => cloned.getTime(),
                        clone: function() { return getMoscowDate(); }
                    };
                }
            };
        }
        
        // Реальное московское время
        const now = new Date();
        const moscowTimeStr = now.toLocaleString('en-US', { 
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const [datePart, timePart] = moscowTimeStr.split(', ');
        const [month, day, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        
        const moscowDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
        
        return {
            getDay: () => moscowDate.getUTCDay(),
            getHours: () => moscowDate.getUTCHours(),
            getMinutes: () => moscowDate.getUTCMinutes(),
            getSeconds: () => moscowDate.getUTCSeconds(),
            getDate: () => moscowDate.getUTCDate(),
            getMonth: () => moscowDate.getUTCMonth(),
            getFullYear: () => moscowDate.getUTCFullYear(),
            setDate: (d) => moscowDate.setUTCDate(d),
            setHours: (h, m, s, ms) => moscowDate.setUTCHours(h, m || 0, s || 0, ms || 0),
            getTime: () => moscowDate.getTime(),
            clone: function() {
                const cloned = new Date(moscowDate.getTime());
                return {
                    getDay: () => cloned.getUTCDay(),
                    getHours: () => cloned.getUTCHours(),
                    getMinutes: () => cloned.getUTCMinutes(),
                    getDate: () => cloned.getUTCDate(),
                    getMonth: () => cloned.getUTCMonth(),
                    getFullYear: () => cloned.getUTCFullYear(),
                    setDate: (d) => cloned.setUTCDate(d),
                    setHours: (h, m, s, ms) => cloned.setUTCHours(h, m || 0, s || 0, ms || 0),
                    getTime: () => cloned.getTime(),
                    clone: function() { return getMoscowDate(); }
                };
            }
        };
    }
    
    // === ФУНКЦИИ ДЛЯ РАБОТЫ С ГРАФИКАМИ ===
    
    // Парсинг графика работы
    function parseHours(hoursText) {
        if (!hoursText) return null;
        const text = hoursText.toLowerCase().trim();
        
        if (text.includes('круглосуточно') || text.includes('24/7') || text.includes('24 часа')) {
            return { type: '24-7', schedule: null };
        }
        
        const weekdayMatch = text.match(/(?:понедельник|вторник|среда|четверг|пятница|суббота|воскресенье).*?с\s+(\d{1,2}):(\d{2})\s+до\s+(\d{1,2}):(\d{2})/);
        if (weekdayMatch) {
            return {
                type: 'weekday',
                schedule: {
                    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                    open: { hour: parseInt(weekdayMatch[1]), minute: parseInt(weekdayMatch[2]) },
                    close: { hour: parseInt(weekdayMatch[3]), minute: parseInt(weekdayMatch[4]) }
                }
            };
        }
        
        const simpleMatch = text.match(/с\s+(\d{1,2}):(\d{2})\s+до\s+(\d{1,2}):(\d{2})/);
        if (simpleMatch) {
            return {
                type: 'weekday',
                schedule: {
                    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                    open: { hour: parseInt(simpleMatch[1]), minute: parseInt(simpleMatch[2]) },
                    close: { hour: parseInt(simpleMatch[3]), minute: parseInt(simpleMatch[4]) }
                }
            };
        }
        
        const dashMatch = text.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
        if (dashMatch) {
            return {
                type: 'weekday',
                schedule: {
                    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                    open: { hour: parseInt(dashMatch[1]), minute: parseInt(dashMatch[2]) },
                    close: { hour: parseInt(dashMatch[3]), minute: parseInt(dashMatch[4]) }
                }
            };
        }
        
        return null;
    }
    
    // Определение статуса работы
    function getWorkStatus(service) {
        const hoursText = service.attributes && service.attributes.hours;
        const parsed = parseHours(hoursText);
        if (!parsed) return { status: '24-7', text: 'Круглосуточно', nextOpen: null };
        
        const now = getMoscowDate();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;
        
        if (parsed.type === '24-7') {
            return { status: '24-7', text: 'Круглосуточно', nextOpen: null };
        }
        
        if (parsed.type === 'weekday' && parsed.schedule) {
            const isWorkingDay = isTodayWorkingDay();
            const dayNames = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу'];
            
            if (!isWorkingDay) {
                // Сегодня выходной/праздник - ищем следующий рабочий день
                const nextWorking = findNextWorkingDaySync(now);
                const nextDate = nextWorking.date;
                nextDate.setHours(parsed.schedule.open.hour, parsed.schedule.open.minute, 0, 0);
                
                const openTimeStr = `${String(parsed.schedule.open.hour).padStart(2, '0')}:${String(parsed.schedule.open.minute).padStart(2, '0')}`;
                let text;
                if (nextWorking.daysAhead === 1) {
                    text = `Закрыто • откроется завтра в ${openTimeStr}`;
                } else {
                    text = `Закрыто • откроется в ${dayNames[nextDate.getDay()]} в ${openTimeStr}`;
                }
                
                return {
                    status: 'closed',
                    text: text,
                    nextOpen: nextDate
                };
            }
            
            const openTime = parsed.schedule.open.hour * 60 + parsed.schedule.open.minute;
            const closeTime = parsed.schedule.close.hour * 60 + parsed.schedule.close.minute;
            
            if (currentTime < openTime) {
                const today = now.clone();
                today.setHours(parsed.schedule.open.hour, parsed.schedule.open.minute, 0, 0);
                return {
                    status: 'closed',
                    text: `Закрыто • откроется сегодня в ${String(parsed.schedule.open.hour).padStart(2, '0')}:${String(parsed.schedule.open.minute).padStart(2, '0')}`,
                    nextOpen: today
                };
            }
            
            if (currentTime >= closeTime) {
                // Закрыто после рабочего дня - ищем следующий рабочий день
                const nextWorking = findNextWorkingDaySync(now);
                const nextDate = nextWorking.date;
                nextDate.setHours(parsed.schedule.open.hour, parsed.schedule.open.minute, 0, 0);
                
                const openTimeStr = `${String(parsed.schedule.open.hour).padStart(2, '0')}:${String(parsed.schedule.open.minute).padStart(2, '0')}`;
                let text;
                if (nextWorking.daysAhead === 1) {
                    text = `Закрыто • откроется завтра в ${openTimeStr}`;
                } else {
                    text = `Закрыто • откроется в ${dayNames[nextDate.getDay()]} в ${openTimeStr}`;
                }
                
                return {
                    status: 'closed',
                    text: text,
                    nextOpen: nextDate
                };
            }
            
            const minutesUntilClose = closeTime - currentTime;
            
            if (minutesUntilClose <= 30) {
                return {
                    status: 'closing',
                    text: `Закроется через ${minutesUntilClose} мин`,
                    nextOpen: null
                };
            }
            
            return {
                status: 'open',
                text: `Открыто до ${String(parsed.schedule.close.hour).padStart(2, '0')}:${String(parsed.schedule.close.minute).padStart(2, '0')}`,
                nextOpen: null
            };
        }
        
        return { status: 'unknown', text: 'График не распознан', nextOpen: null };
    }
    
    // === ИНТЕГРАЦИЯ С СУЩЕСТВУЮЩИМ КОДОМ ===
    
    // Функция для добавления времени работы в элемент списка
    // Объявляем функции
    let addStatusToItems, updateViewWithHoursFilter, addStatusToPopup;
    
    // Ждём создания DOM элементов списка (allServices уже загружен синхронно из data.js)
    function waitForListItems() {
        const servicesList = document.getElementById('ksmm-services-list');
        const hasItems = servicesList && servicesList.querySelectorAll('.ksmm-list-item').length > 0;
        
        if (hasItems) {
            try {
                initHoursFilters();
            } catch (e) {
                console.error('Hours filter: initialization error', e);
            }
        } else {
            // Элементы ещё не созданы - ждём следующего кадра отрисовки
            requestAnimationFrame(waitForListItems);
        }
    }
    
    // Запускаем после готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForListItems);
    } else {
        waitForListItems();
    }
    
    // Определяем функции
    addStatusToItems = function() {
        try {
            if (typeof allServices === 'undefined' || !allServices || allServices.length === 0) {
                return;
            }
            
            const items = document.querySelectorAll('.ksmm-list-item');
            if (items.length === 0) return;
            
            items.forEach(item => {
                const existingStatus = item.querySelector('.ksmm-work-status');
                if (existingStatus) {
                    const serviceId = parseInt(item.getAttribute('data-id'));
                    if (!serviceId || isNaN(serviceId)) return;
                    
                    const service = allServices.find(s => s.id === serviceId);
                    if (!service) return;
                    
                    if (!CATEGORIES_WITH_HOURS.includes(service.category)) {
                        existingStatus.closest('div')?.remove();
                        return;
                    }
                    
                    const status = getWorkStatus(service);
                    const statusClass = `status-${status.status === 'closing' ? 'closing' : status.status}`;
                    
                    existingStatus.className = `ksmm-work-status ${statusClass}`;
                    existingStatus.innerHTML = `<span class="status-icon"></span><span class="status-text">${status.text}</span>`;
                    return;
                }
                
                const serviceId = parseInt(item.getAttribute('data-id'));
                if (!serviceId || isNaN(serviceId)) return;
                
                const service = allServices.find(s => s.id === serviceId);
                if (!service) return;
                
                if (!CATEGORIES_WITH_HOURS.includes(service.category)) return;
                
                const status = getWorkStatus(service);
                const statusClass = `status-${status.status === 'closing' ? 'closing' : status.status}`;
                
                const statusEl = document.createElement('div');
                statusEl.className = `ksmm-work-status ${statusClass}`;
                statusEl.innerHTML = `<span class="status-icon"></span><span class="status-text">${status.text}</span>`;
                
                const contentEl = item.querySelector('.ksmm-item-content');
                if (contentEl) {
                    // Добавляем статус в конец элемента списка
                    contentEl.appendChild(statusEl);
                }
            });
        } catch (e) {
            console.error('Hours filter: addStatusToItems error', e);
        }
    };
    
    addStatusToPopup = function(service) {
        if (!service) return;
        
        const popupStatus = document.getElementById('ksmm-popup-status');
        if (!popupStatus) return;
        
        const showHours = CATEGORIES_WITH_HOURS.includes(service.category);
        
        if (!showHours) {
            popupStatus.style.display = 'none';
            return;
        }
        
        const status = getWorkStatus(service);
        const statusClass = `status-${status.status === 'closing' ? 'closing' : status.status}`;
        
        popupStatus.className = `ksmm-popup-status ${statusClass}`;
        
        let statusHTML = `<span class="status-row"><span class="status-icon"></span><span class="status-text">${status.text}</span></span>`;
        
        if (service.attributes && service.attributes.hours) {
            const hoursText = service.attributes.hours;
            const cleanHoursText = hoursText.replace(/^График работы:\s*/i, '').trim();
            statusHTML += `<span class="ksmm-popup-status-hours">${cleanHoursText}</span>`;
        }
        
        popupStatus.innerHTML = statusHTML;
        popupStatus.style.display = 'block';
    };
    
    updateViewWithHoursFilter = function() {
        try {
            const filter = window.currentHoursFilter || 'all';
            const items = document.querySelectorAll('.ksmm-list-item');
            
            // Сначала убираем hidden-hours со всех элементов
            items.forEach(item => {
                item.classList.remove('hidden-hours');
            });
            
            // Применяем фильтр по часам только если не "Все"
            if (filter !== 'all') {
                items.forEach(item => {
                    const serviceId = parseInt(item.getAttribute('data-id'));
                    if (!serviceId || isNaN(serviceId)) {
                        item.classList.add('hidden-hours');
                        return;
                    }
                    
                    const service = allServices.find(s => s.id === serviceId);
                    if (!service) {
                        item.classList.add('hidden-hours');
                        return;
                    }
                    
                    const status = getWorkStatus(service);
                    let shouldShow = false;
                    
                    if (filter === 'open') {
                        shouldShow = status.status === 'open' || status.status === 'closing' || status.status === '24-7';
                    } else if (filter === '24h') {
                        shouldShow = status.status === '24-7';
                    }
                    
                    if (!shouldShow) {
                        item.classList.add('hidden-hours');
                    }
                });
            }
            
            // Обновляем заголовки секций
            document.querySelectorAll('.ksmm-list-section-title').forEach(sectionTitle => {
                let hasVisibleItems = false;
                let nextElement = sectionTitle.nextElementSibling;
                while (nextElement && !nextElement.classList.contains('ksmm-list-section-title')) {
                    if (nextElement.classList.contains('ksmm-list-item')) {
                        const isHidden = nextElement.classList.contains('hidden') || nextElement.classList.contains('hidden-hours');
                        if (!isHidden) {
                            hasVisibleItems = true;
                            break;
                        }
                    }
                    nextElement = nextElement.nextElementSibling;
                }
                sectionTitle.style.display = hasVisibleItems ? 'block' : 'none';
            });
            
            // Применяем фильтр к карте
            document.querySelectorAll('.ksmm-map-area').forEach(mapArea => {
                const areaId = mapArea.getAttribute('data-area-id');
                if (areaId) {
                    const service = allServices.find(s => s.areaId === areaId);
                    if (service) {
                        const listItem = document.querySelector(`.ksmm-list-item[data-id="${service.id}"]`);
                        if (listItem) {
                            const isHidden = listItem.classList.contains('hidden-hours') || listItem.classList.contains('hidden');
                            if (isHidden) {
                                mapArea.classList.add('dimmed');
                            } else {
                                mapArea.classList.remove('dimmed');
                            }
                        }
                    }
                }
            });
        } catch (e) {
            console.error('Hours filter: updateViewWithHoursFilter error', e);
        }
    };
    
    function initHoursFilters() {
        const hoursFilterControls = document.getElementById('ksmm-hours-filter-controls');
        if (!hoursFilterControls) {
            return;
        }
        
        hoursFilterControls.addEventListener('click', (e) => {
            const btn = e.target.closest('.ksmm-hours-filter-btn');
            if (!btn) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const activeBtn = hoursFilterControls.querySelector('.active');
            if (activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');
            const filter = btn.getAttribute('data-hours-filter');
            window.currentHoursFilter = filter;
            
            updateViewWithHoursFilter();
        });
        
        function updateHoursFilterVisibilityForCategory() {
            const filterControls = document.querySelector('.ksmm-filter-controls');
            const activeBtn = filterControls?.querySelector('.ksmm-filter-btn.active');
            const category = activeBtn?.getAttribute('data-category') || 'all';
            
            const showHoursFilter = category === 'service' || category === 'food';
            hoursFilterControls.style.display = showHoursFilter ? 'flex' : 'none';
            
            if (!showHoursFilter) {
                const allBtn = hoursFilterControls.querySelector('[data-hours-filter="all"]');
                const activeHoursBtn = hoursFilterControls.querySelector('.active');
                if (activeHoursBtn) activeHoursBtn.classList.remove('active');
                if (allBtn) allBtn.classList.add('active');
                window.currentHoursFilter = 'all';
            }
        }
        
        updateHoursFilterVisibilityForCategory();
        
        const filterControls = document.querySelector('.ksmm-filter-controls');
        if (filterControls) {
            filterControls.addEventListener('click', (e) => {
                const btn = e.target.closest('.ksmm-filter-btn');
                if (btn) {
                    // requestAnimationFrame для синхронизации с DOM
                    requestAnimationFrame(() => {
                        updateHoursFilterVisibilityForCategory();
                        updateViewWithHoursFilter();
                    });
                }
            });
        }
        
        // Поиск обрабатывается в init() через searchInput.addEventListener
        // Здесь только синхронизируем с hours filter после updateView
        
        const subfilterControls = document.getElementById('ksmm-subfilter-controls');
        if (subfilterControls) {
            subfilterControls.addEventListener('click', (e) => {
                const btn = e.target.closest('.ksmm-subfilter');
                if (btn) {
                    requestAnimationFrame(() => {
                        updateViewWithHoursFilter();
                    });
                }
            });
        }
        
        // MutationObserver для отслеживания изменений в списке (смена этажа/корпуса)
        let statusUpdateTimeout = null;
        const listObserver = new MutationObserver((mutations) => {
            const hasListItems = mutations.some(m => 
                Array.from(m.addedNodes).some(node => 
                    node.nodeType === 1 && node.classList && node.classList.contains('ksmm-list-item')
                )
            );
            
            if (hasListItems) {
                if (statusUpdateTimeout) clearTimeout(statusUpdateTimeout);
                // Минимальный дебаунс - 50ms достаточно для группировки быстрых добавлений
                statusUpdateTimeout = setTimeout(() => {
                    addStatusToItems();
                    updateViewWithHoursFilter();
                }, 50);
            }
        });
        
        const servicesList = document.getElementById('ksmm-services-list');
        if (servicesList) {
            listObserver.observe(servicesList, { childList: true, subtree: true });
            // Начальная инициализация - сразу после подключения observer
            addStatusToItems();
            updateViewWithHoursFilter();
        }
        
        window.currentHoursFilter = 'all';
    }
    
    // Обновление статусов каждую минуту
    setInterval(() => {
        try {
            if (typeof allServices === 'undefined' || !allServices || allServices.length === 0) {
                return;
            }
            addStatusToItems();
            updateViewWithHoursFilter();
            
            const popupEl = document.getElementById('ksmm-popup');
            if (popupEl && popupEl.style.display !== 'none' && popupEl.style.display !== '') {
                const popupTitle = document.getElementById('ksmm-popup-title');
                if (popupTitle && popupTitle.textContent) {
                    const serviceName = popupTitle.textContent.trim();
                    const service = allServices.find(s => s.name === serviceName);
                    if (service) {
                        addStatusToPopup(service);
                    }
                }
            }
        } catch (e) {
            console.error('Hours filter: periodic update error', e);
        }
    }, 60000);
})();