(function() {
    // --- 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ и DOM-ЭЛЕМЕНТЫ ---
    const SVG_NS = "http://www.w3.org/2000/svg";
    const mapWrapper = document.getElementById('ksmm-map-wrapper');
    const mapBaseLayer = document.getElementById('ksmm-map-base');
    const mapAreasContainer = document.getElementById('ksmm-map-areas');
    const mapTitle = document.getElementById('ksmm-map-title');
    const listContainer = document.getElementById('ksmm-services-list');
    const filterControls = document.querySelector('.ksmm-filter-controls');
    const subfilterControls = document.getElementById('ksmm-subfilter-controls');
    const searchInput = document.getElementById('ksmm-search-input');
    const floorSwitcher = document.getElementById('ksmm-floor-switcher');
    const svgMap = document.getElementById('ksmm-map');
    
    const floorPlanCatalog = (typeof svgFloorPlans !== 'undefined') ? svgFloorPlans : {};
    // Кэш распарсенного DOM (вместо текста SVG) - парсинг происходит только 1 раз
    const floorDomCache = {};
    let activeAreaId = null;
    let currentBuilding = 'B1';
    let currentFloor = (typeof buildingFloorStructure !== 'undefined' && buildingFloorStructure[currentBuilding]) ? buildingFloorStructure[currentBuilding].defaultFloor : 3;
    let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
    let floorSwitchSequence = 0; // Sequence number to track the most recent floor switch
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
    const popupImg = document.getElementById('ksmm-popup-img');
    const popupLink = document.getElementById('ksmm-popup-link');

    function formatAttributes(service) {
        const attrs = service.attributes;
        let parts = [];
        if (attrs.location) parts.push(attrs.location);
        for (const key in attrs) {
            if (key !== 'location') {
                parts.push(attrs[key]);
            }
        }
        return parts.join(' • ');
    }

    function getServicesForFloor(building, floor) {
        return allServices.filter(s => s.building === building && s.floor === floor);
    }

    function getZoneElement(areaId) {
        if (!areaId || !mapBaseLayer) return null;
        return mapBaseLayer.querySelector(`#${areaId}`);
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
        popupDesc.textContent = service.desc;
        // ИЗМЕНЕНИЕ: Исправление источника картинки
        popupImg.src = service.img;
        popupContacts.textContent = service.contacts;
        popupLink.href = service.link;
        popupLink.style.display = (service.link === '#') ? 'none' : 'inline-block';
        setActiveArea(service.areaId);
        popup.style.display = 'block';
    }

    function hidePopup() {
        popup.style.display = 'none';
        setActiveArea(null);
    }

    function setHighlight(id, state) {
        const service = getServiceById(id);
        const area = document.querySelector(`.ksmm-map-area[data-area-id="${service.areaId}"]`);
        const item = document.querySelector(`.ksmm-list-item[data-id="${id}"]`);
        if (area && item && !area.classList.contains('dimmed') && !item.classList.contains('hidden')) {
            area.classList.toggle('highlight', state);
            item.classList.toggle('highlight', state);
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
        // Drag (Pan) Logic
        svgMap.addEventListener('mousedown', (e) => {
            // Игнорируем клики по областям, заголовку и переключателю этажей
            if (e.target.closest('.ksmm-map-area') || e.target.id === 'ksmm-map-title' || e.target.closest('.ksmm-floor-switcher')) return;
            // Проверяем, что не начали перетаскивание скроллбара или элемента внутри переключателя
            if (e.target.closest('.ksmm-floor-switcher')) return;
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
        if (!areaElement || typeof areaElement.getBBox !== 'function') return;
        
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
        const contentFragment = document.createDocumentFragment();
        Array.from(sourceSvg.children).forEach(child => {
            if (child.tagName !== 'defs') {
                const clonedChild = child.cloneNode(true);
                
                // Исправление черных зон: устанавливаем fill="none" для элементов без fill
                // Элементы со stroke должны иметь fill="none", чтобы не становиться черными,
                // но stroke остается видимым
                // Выполняется ОДИН РАЗ при парсинге, а не при каждом переключении
                const allPaths = clonedChild.querySelectorAll('path');
                allPaths.forEach(path => {
                    const hasFill = path.getAttribute('fill');
                    const isInMask = path.closest('mask');
                    
                    // Устанавливаем fill="none" только если нет fill и элемент не в mask
                    // Это предотвратит черный fill по умолчанию, но stroke останется видимым
                    if (!hasFill && !isInMask) {
                        path.setAttribute('fill', 'none');
                    }
                });
                
                const allShapes = clonedChild.querySelectorAll('circle, ellipse, rect, polygon, polyline');
                allShapes.forEach(shape => {
                    const hasFill = shape.getAttribute('fill');
                    const isInMask = shape.closest('mask');
                    
                    if (!hasFill && !isInMask) {
                        shape.setAttribute('fill', 'none');
                    }
                });
                
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
            fetch(config.src)
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
                fetch(floorPlanCatalog[floorKey].src)
                    .then(r => r.ok ? r.text() : Promise.reject())
                    .then(text => {
                        floorDomCache[floorKey] = parseSvgAndPrepareCache(text);
                    })
                    .catch(() => {}); // Тихо игнорируем ошибки предзагрузки
            }
        });
    }
    // --- 5. ФУНКЦИИ РЕНДЕРИНГА (Обновлены) ---
    function createListItem(service) {
        const item = document.createElement('div');
        item.className = 'ksmm-list-item';
        item.setAttribute('data-id', service.id);
        item.setAttribute('data-category', service.category);
        item.setAttribute('data-area-id', service.areaId);
        const formattedAttrs = formatAttributes(service);
        item.innerHTML = `
    <h4>${service.name}</h4>
    <p class="ksmm-item-attrs">${formattedAttrs}</p>
    `;
        listContainer.appendChild(item);
        return item;
    }

    function renderMapAreas(b, f) {
        mapAreasContainer.innerHTML = '';
        setActiveArea(null);
        const servicesOnFloor = getServicesForFloor(b, f).filter(service => Boolean(service.areaId));
        mapTitle.textContent = `${buildingFloorStructure[b].label}, ${f} этаж`;
        if (servicesOnFloor.length === 0) {
            const viewBox = svgMap.viewBox.baseVal;
            const viewBoxWidth = viewBox.width || 1991;
            const viewBoxHeight = viewBox.height || 909;
            const text = document.createElementNS(SVG_NS, 'text');
            text.setAttribute('x', (viewBoxWidth / 2).toString());
            text.setAttribute('y', (viewBoxHeight / 2).toString());
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '24');
            text.setAttribute('fill', '#999');
            text.textContent = `На этаже ${f} пока нет отмеченных зон.`;
            mapAreasContainer.appendChild(text);
            return;
        }

        servicesOnFloor.forEach(service => {
            const originalZone = getZoneElement(service.areaId);
            if (!originalZone || !originalZone.parentNode) return;
            const zone = originalZone.cloneNode(true);
            originalZone.parentNode.replaceChild(zone, originalZone);
            zone.removeAttribute('style');
            ['fill', 'stroke', 'stroke-width', 'opacity', 'fill-opacity'].forEach(attr => zone.removeAttribute(attr));
            zone.classList.add('ksmm-map-area');
            zone.setAttribute('data-service-id', service.id);
            zone.setAttribute('data-area-id', service.areaId);
            zone.setAttribute('data-category', service.category);
            zone.style.pointerEvents = 'all';
            zone.addEventListener('click', () => {
                showPopup(service);
                centerOnArea(service.areaId);
            });
            zone.addEventListener('mouseenter', () => setHighlight(service.id, true));
            zone.addEventListener('mouseleave', () => setHighlight(service.id, false));
        });
    }

    function renderFloorSwitcher() {
        floorSwitcher.innerHTML = '';
        for (const buildingKey in buildingFloorStructure) {
            const bData = buildingFloorStructure[buildingKey];
            const title = document.createElement('div');
            title.className = 'ksmm-floor-group-title';
            title.textContent = bData.label;
            floorSwitcher.appendChild(title);
            // Рендерим этажи в обратном порядке (сверху вниз)
            bData.floors.sort((a, b) => b - a).forEach(f => {
                const btn = document.createElement('button');
                btn.className = 'ksmm-floor-btn';
                btn.textContent = `${f} этаж`;
                btn.setAttribute('data-building', buildingKey);
                btn.setAttribute('data-floor', f);
                if (buildingKey === currentBuilding && f === currentFloor) {
                    btn.classList.add('active');
                }
                btn.addEventListener('click', () => {
                    switchFloor(buildingKey, f);
                });
                floorSwitcher.appendChild(btn);
            });
        }
    }

    function switchFloor(b, f) {
        currentBuilding = b;
        currentFloor = f;
        const floorKey = `${b}-F${f}`;
        // Increment sequence number to mark this as the most recent switch
        floorSwitchSequence++;
        const thisSwitchSequence = floorSwitchSequence;
        
        document.querySelectorAll('.ksmm-floor-btn').forEach(btn => btn.classList.remove('active'));
        const currentBtn = document.querySelector(`.ksmm-floor-btn[data-building="${b}"][data-floor="${f}"]`);
        if (currentBtn) currentBtn.classList.add('active');

        renderFloorBaseLayer(floorKey, thisSwitchSequence).then(() => {
            // Check if this is still the most recent floor switch
            // If user switched floors again, ignore this stale completion
            if (thisSwitchSequence !== floorSwitchSequence) {
                return; // Stale operation, ignore
            }
            
            // Use closure-captured values to prevent race conditions
            // if user switches floors before async operation completes
            renderMapAreas(b, f);
            // Temporarily set globals to closure values for updateListAndFilters
            // to ensure consistency even if user switched floors during async operation
            const savedBuilding = currentBuilding;
            const savedFloor = currentFloor;
            currentBuilding = b;
            currentFloor = f;
            updateListAndFilters();
            // Restore actual current values (may have changed if user switched floors)
            currentBuilding = savedBuilding;
            currentFloor = savedFloor;
            mapState.x = 0;
            mapState.y = 0;
            mapState.scale = 1;
            applyMapTransform();
            hidePopup();
        });
    }

    function updateListAndFilters() {
        listContainer.innerHTML = '';
        const servicesOnCurrentFloor = getServicesForFloor(currentBuilding, currentFloor);
        if (servicesOnCurrentFloor.length === 0) {
            listContainer.innerHTML = '<div style="padding: 15px; color: #999;">На этом этаже пока нет зарегистрированных сервисов.</div>';
            return;
        }
        // Создаем элементы списка для текущего этажа
        servicesOnCurrentFloor.forEach(service => {
            const item = createListItem(service);
            item.addEventListener('click', () => {
                showPopup(service);
                centerOnArea(service.areaId);
            });
            item.addEventListener('mouseenter', () => setHighlight(service.id, true));
            item.addEventListener('mouseleave', () => setHighlight(service.id, false));
        });
        // Сбрасываем/рендерим подфильтры для текущей категории/этажа
        const currentCategory = filterControls.querySelector('.active')?.getAttribute('data-category');
        if (currentCategory) {
            renderSubfilters(currentCategory);
        }
        // Применяем фильтрацию
        updateView();
    }
    // --- 6. ЛОГИКА ФИЛЬТРОВ ---
    const subfilterDefinitions = {
        'food': ['hours'],
        'sport': ['access'],
        'meeting': ['capacity', 'equipment'],
        'relax': ['type'],
        'service': ['hours']
    };

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
                .filter(s => s.building === currentBuilding && s.floor === currentFloor && s.category === category && s.attributes[attrKey])
                .map(s => s.attributes[attrKey]);
            const uniqueValues = [...new Set(allValues)].sort();
            if (uniqueValues.length === 0) return;
            groupEl.innerHTML = `<div class="ksmm-subfilter-group-title">${attrKey}</div>`;
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
        // Фильтруем только сервисы на текущем этаже
        const currentFloorServices = allServices.filter(s => s.building === currentBuilding && s.floor === currentFloor);
        currentFloorServices.forEach(service => {
            const id = service.id;
            const listItem = document.querySelector(`.ksmm-list-item[data-id="${id}"]`);
            const mapArea = document.querySelector(`.ksmm-map-area[data-service-id="${id}"]`);
            if (!listItem) return; // Элемент списка может отсутствовать, если нет сервисов на этаже
            // 1. Фильтр по Категории
            const isCategoryMatch = (currentCategory === 'all' || service.category === currentCategory);
            // 2. Фильтр по Поиску
            const nameMatch = service.name.toLowerCase().includes(currentSearch);
            const descMatch = service.desc.toLowerCase().includes(currentSearch);
            const isSearchMatch = (currentSearch === '') || nameMatch || descMatch;
            // 3. Фильтр по Подфильтрам
            let isSubfilterMatch = true;
            for (const key in currentSubfilters) {
                const serviceValue = service.attributes[key];
                const allowedValues = currentSubfilters[key];
                if (allowedValues.length > 0 && !allowedValues.includes(serviceValue)) {
                    isSubfilterMatch = false;
                    break;
                }
            }
            // 4. Решение о видимости
            const isVisible = isCategoryMatch && isSearchMatch && isSubfilterMatch;
            // СПИСОК СКРЫВАЕМ
            listItem.classList.toggle('hidden', !isVisible);
            // КАРТУ ПРИГЛУШАЕМ (если mapArea существует)
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
        renderFloorSwitcher();
        switchFloor(currentBuilding, currentFloor);
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
        // Обработчик Поиска
        searchInput.addEventListener('input', updateView);
        // Закрытие Pop-up
        popupCloseBtn.addEventListener('click', hidePopup);
        // Переключение панели
        const togglePanelBtn = document.getElementById('ksmm-toggle-panel');
        const listContainerEl = document.getElementById('ksmm-list-container');
        if (togglePanelBtn && listContainerEl) {
            togglePanelBtn.addEventListener('click', () => {
                listContainerEl.classList.toggle('collapsed');
            });
        }
    }
    init();
})();