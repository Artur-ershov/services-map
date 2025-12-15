(function() {
    // --- 1. КОНСТАНТЫ И КОНФИГУРАЦИЯ ---
    const Constants = {
        // SVG namespace
        SVG_NS: "http://www.w3.org/2000/svg",
        
        // Zoom limits
        MIN_ZOOM: 0.5,
        MAX_ZOOM: 3,
        ZOOM_FACTOR: 1.05,
        
        // Center on area
        CENTER_PADDING: 0.25,
        CENTER_CONTAINER_RATIO: 0.75,
        CENTER_SCALE_LIMIT: 2.5,
        
        // Default viewBox dimensions
        DEFAULT_VIEWBOX_WIDTH: 1991,
        DEFAULT_VIEWBOX_HEIGHT: 909,
        INITIAL_VIEWBOX_WIDTH: 800,
        INITIAL_VIEWBOX_HEIGHT: 550,
        
        // DOM selectors
        SELECTORS: {
            MAP_WRAPPER: '#ksmm-map-wrapper',
            MAP_BASE_LAYER: '#ksmm-map-base',
            MAP_AREAS_CONTAINER: '#ksmm-map-areas',
            MAP_TITLE: '#ksmm-map-title',
            LIST_CONTAINER: '#ksmm-services-list',
            FILTER_CONTROLS: '.ksmm-filter-controls',
            SUBFILTER_CONTROLS: '#ksmm-subfilter-controls',
            SEARCH_INPUT: '#ksmm-search-input',
            FLOOR_SWITCHER: '#ksmm-floor-switcher',
            SVG_MAP: '#ksmm-map',
            POPUP: '#ksmm-popup',
            POPUP_CLOSE: '#ksmm-popup-close',
            POPUP_TITLE: '#ksmm-popup-title',
            POPUP_DESC: '#ksmm-popup-desc',
            POPUP_CONTACTS: '#ksmm-popup-contacts',
            POPUP_IMG: '#ksmm-popup-img',
            POPUP_LINK: '#ksmm-popup-link',
            TOGGLE_PANEL: '#ksmm-toggle-panel',
            LIST_CONTAINER_EL: '#ksmm-list-container'
        },
        
        // CSS classes
        CLASSES: {
            MAP_AREA: 'ksmm-map-area',
            MAP_AREA_ACTIVE: 'ksmm-map-area.active',
            MAP_AREA_DIMMED: 'dimmed',
            MAP_AREA_HIGHLIGHT: 'highlight',
            LIST_ITEM: 'ksmm-list-item',
            LIST_ITEM_HIDDEN: 'hidden',
            LIST_ITEM_HIGHLIGHT: 'highlight',
            LIST_ITEM_SEARCH_PRIORITY: 'search-highlight-priority',
            LIST_ITEM_SEARCH_SECONDARY: 'search-highlight-secondary',
            MAP_AREA_SEARCH_PRIORITY: 'search-match-priority',
            MAP_AREA_SEARCH_SECONDARY: 'search-match-secondary',
            FILTER_BTN: 'ksmm-filter-btn',
            FILTER_BTN_ACTIVE: 'active',
            SUBFILTER: 'ksmm-subfilter',
            SUBFILTER_ACTIVE: 'active',
            FLOOR_BTN: 'ksmm-floor-btn',
            FLOOR_GROUP_TITLE: 'ksmm-floor-group-title',
            DRAGGING: 'dragging'
        },
        
        // Attributes separator
        ATTRIBUTES_SEPARATOR: ' • ',
        
        // Default building
        DEFAULT_BUILDING: 'B1',
        DEFAULT_FLOOR: 3
    };

    // --- 2. УТИЛИТЫ ---
    const Utils = {
        getServiceById: function(id) {
            return allServices.find(s => s.id === id);
        },
        
        formatAttributes: function(service) {
            const attrs = service.attributes;
            let parts = [];
            if (attrs.location) parts.push(attrs.location);
            for (const key in attrs) {
                if (key !== 'location') {
                    parts.push(attrs[key]);
                }
            }
            return parts.join(Constants.ATTRIBUTES_SEPARATOR);
        },
        
        getServicesForFloor: function(building, floor) {
            return allServices.filter(s => s.building === building && s.floor === floor);
        },
        
        getZoneElement: function(areaId, mapBaseLayer) {
            if (!areaId || !mapBaseLayer) return null;
            return mapBaseLayer.querySelector(`#${areaId}`);
        }
    };

    // --- 3. МОДУЛЬ УПРАВЛЕНИЯ СОСТОЯНИЕМ КАРТЫ ---
    const MapState = (function() {
        const floorPlanCatalog = (typeof svgFloorPlans !== 'undefined') ? svgFloorPlans : {};
        const floorDomCache = {};
        let activeAreaId = null;
        let currentBuilding = Constants.DEFAULT_BUILDING;
        let currentFloor = (typeof buildingFloorStructure !== 'undefined' && buildingFloorStructure[currentBuilding]) ? buildingFloorStructure[currentBuilding].defaultFloor : Constants.DEFAULT_FLOOR;
        let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
        let floorSwitchSequence = 0;
        
        return {
            getFloorPlanCatalog: function() { return floorPlanCatalog; },
            getFloorDomCache: function() { return floorDomCache; },
            getActiveAreaId: function() { return activeAreaId; },
            setActiveAreaId: function(id) { activeAreaId = id; },
            getCurrentBuilding: function() { return currentBuilding; },
            setCurrentBuilding: function(b) { currentBuilding = b; },
            getCurrentFloor: function() { return currentFloor; },
            setCurrentFloor: function(f) { currentFloor = f; },
            getMapState: function() { return mapState; },
            setMapState: function(state) { Object.assign(mapState, state); },
            getFloorSwitchSequence: function() { return floorSwitchSequence; },
            incrementFloorSwitchSequence: function() { return ++floorSwitchSequence; },
            resetMapState: function() {
                mapState.x = 0;
                mapState.y = 0;
                mapState.scale = 1;
            },
            getState: function() { return mapState; }
        };
    })();

    // --- 7. МОДУЛЬ УПРАВЛЕНИЯ POPUP ---
    const PopupController = (function() {
        const popup = document.getElementById('ksmm-popup');
        const popupCloseBtn = document.getElementById('ksmm-popup-close');
        const popupTitle = document.getElementById('ksmm-popup-title');
        const popupDesc = document.getElementById('ksmm-popup-desc');
        const popupContacts = document.getElementById('ksmm-popup-contacts');
        const popupImg = document.getElementById('ksmm-popup-img');
        const popupLink = document.getElementById('ksmm-popup-link');

        function setActiveArea(areaId) {
            if (MapState.getActiveAreaId() === areaId) return;
            document.querySelectorAll(`.${Constants.CLASSES.MAP_AREA}.${Constants.CLASSES.FILTER_BTN_ACTIVE}`).forEach(el => el.classList.remove(Constants.CLASSES.FILTER_BTN_ACTIVE));
            MapState.setActiveAreaId(null);
            if (!areaId) return;
            const targetArea = document.querySelector(`.${Constants.CLASSES.MAP_AREA}[data-area-id="${areaId}"]`);
            if (targetArea) {
                targetArea.classList.add(Constants.CLASSES.FILTER_BTN_ACTIVE);
                MapState.setActiveAreaId(areaId);
            }
        }

        function showPopup(service) {
            popupTitle.textContent = service.name;
            popupDesc.textContent = service.desc;
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
            const service = Utils.getServiceById(id);
            if (!service) return;
            const area = document.querySelector(`.${Constants.CLASSES.MAP_AREA}[data-area-id="${service.areaId}"]`);
            const item = document.querySelector(`.${Constants.CLASSES.LIST_ITEM}[data-id="${id}"]`);
            if (area && item && !area.classList.contains(Constants.CLASSES.MAP_AREA_DIMMED) && !item.classList.contains(Constants.CLASSES.LIST_ITEM_HIDDEN)) {
                area.classList.toggle(Constants.CLASSES.MAP_AREA_HIGHLIGHT, state);
                item.classList.toggle(Constants.CLASSES.LIST_ITEM_HIGHLIGHT, state);
            }
        }
        
        return {
            showPopup: showPopup,
            hidePopup: hidePopup,
            setActiveArea: setActiveArea,
            setHighlight: setHighlight,
            getPopupCloseBtn: function() { return popupCloseBtn; }
        };
    })();
    // --- 4. МОДУЛЬ ВЗАИМОДЕЙСТВИЯ С КАРТОЙ ---
    const MapInteraction = (function() {
        function applyMapTransform(mapWrapper, disableTransition = false) {
            const state = MapState.getMapState();
            if (disableTransition) {
                mapWrapper.style.transition = 'none';
            }
            mapWrapper.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
            if (disableTransition) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        mapWrapper.style.transition = '';
                    });
                });
            }
        }

        function initMapInteraction(svgMap, mapWrapper) {
        // Drag (Pan) Logic
        svgMap.addEventListener('mousedown', (e) => {
            if (e.target.closest(`.${Constants.CLASSES.MAP_AREA}`) || e.target.id === 'ksmm-map-title' || e.target.closest('.ksmm-floor-switcher')) return;
            if (e.target.closest('.ksmm-floor-switcher')) return;
            const state = MapState.getMapState();
            MapState.setMapState({ dragging: true, startX: e.clientX - state.x, startY: e.clientY - state.y });
            svgMap.classList.add(Constants.CLASSES.DRAGGING);
            const transformMatrix = window.getComputedStyle(mapWrapper).transform;
            if (transformMatrix !== 'none') {
                const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                MapState.setMapState({ x: parseFloat(matrixValues[4]), y: parseFloat(matrixValues[5]) });
            } else {
                MapState.setMapState({ x: 0, y: 0 });
            }
            const updatedState = MapState.getMapState();
            MapState.setMapState({ startX: e.clientX - updatedState.x, startY: e.clientY - updatedState.y });
        });
        document.addEventListener('mousemove', (e) => {
            const state = MapState.getMapState();
            if (!state.dragging) return;
            MapState.setMapState({ x: e.clientX - state.startX, y: e.clientY - state.startY });
            applyMapTransform(mapWrapper);
        });
        document.addEventListener('mouseup', () => {
            MapState.setMapState({ dragging: false });
            svgMap.classList.remove(Constants.CLASSES.DRAGGING);
        });
        // Zoom Logic (Wheel)
        svgMap.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Временно отключаем transition для мгновенного применения transform
            // Это нужно для правильной работы зума к курсору
            const originalTransition = mapWrapper.style.transition;
            mapWrapper.style.transition = 'none';
            
            // Синхронизируем mapState с реальным transform перед вычислениями
            const currentTransform = window.getComputedStyle(mapWrapper).transform;
            if (currentTransform !== 'none') {
                const matrixValues = currentTransform.match(/matrix.*\((.+)\)/)[1].split(', ');
                MapState.setMapState({
                    scale: parseFloat(matrixValues[0]),
                    x: parseFloat(matrixValues[4]),
                    y: parseFloat(matrixValues[5])
                });
            }
            
            const state = MapState.getMapState();
            const scaleFactor = Constants.ZOOM_FACTOR;
            const newScale = e.deltaY < 0 ? state.scale * scaleFactor : state.scale / scaleFactor;
            const prevScale = state.scale;
            const clampedScale = Math.max(Constants.MIN_ZOOM, Math.min(Constants.MAX_ZOOM, newScale));
            if (clampedScale === prevScale && newScale !== clampedScale) {
                mapWrapper.style.transition = originalTransition;
                return;
            }
            MapState.setMapState({ scale: clampedScale });
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
            const viewBoxWidth = viewBox.width || Constants.DEFAULT_VIEWBOX_WIDTH;
            const viewBoxHeight = viewBox.height || Constants.DEFAULT_VIEWBOX_HEIGHT;
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
            const currentState = MapState.getMapState();
            const vx = (mouseViewBoxX - currentState.x) / prevScale;
            const vy = (mouseViewBoxY - currentState.y) / prevScale;
            
            // 3. После зума, точка должна остаться на том же месте в viewBox
            const newState = MapState.getMapState();
            MapState.setMapState({
                x: mouseViewBoxX - vx * newState.scale,
                y: mouseViewBoxY - vy * newState.scale
            });
            
            applyMapTransform(mapWrapper);
            
            // Восстанавливаем transition после применения transform
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mapWrapper.style.transition = originalTransition;
                });
            });
        });
        }

        function centerOnArea(areaId, svgMap, mapWrapper) {
            const areaElement = document.querySelector(`.${Constants.CLASSES.MAP_AREA}[data-area-id="${areaId}"]`);
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
        const viewBoxWidth = viewBox.width || Constants.DEFAULT_VIEWBOX_WIDTH;
        const viewBoxHeight = viewBox.height || Constants.DEFAULT_VIEWBOX_HEIGHT;
        
        // Вычисляем центр области в viewBox координатах
        const targetCenterX = bbox.x + (bbox.width / 2);
        const targetCenterY = bbox.y + (bbox.height / 2);
        
        // Добавляем padding для лучшего спейсинга
        const paddingX = bbox.width * Constants.CENTER_PADDING;
        const paddingY = bbox.height * Constants.CENTER_PADDING;
        
        // Вычисляем масштаб viewBox к экрану (без учета нашего scale)
        const viewBoxToScreenX = containerWidth / viewBoxWidth;
        const viewBoxToScreenY = containerHeight / viewBoxHeight;
        const viewBoxToScreen = Math.min(viewBoxToScreenX, viewBoxToScreenY);
        
        // Вычисляем оптимальный масштаб, чтобы область поместилась с padding
        // bbox.width и bbox.height - в viewBox координатах
        // Нужно конвертировать их в пиксели экрана: bbox.width * viewBoxToScreen
        // Затем вычислить scale так, чтобы область + padding поместилась в заданный процент контейнера
        const bboxWidthScreen = bbox.width * viewBoxToScreen;
        const bboxHeightScreen = bbox.height * viewBoxToScreen;
        const paddingXScreen = paddingX * viewBoxToScreen;
        const paddingYScreen = paddingY * viewBoxToScreen;
        
        const scaleX = (containerWidth * Constants.CENTER_CONTAINER_RATIO) / (bboxWidthScreen + paddingXScreen * 2);
        const scaleY = (containerHeight * Constants.CENTER_CONTAINER_RATIO) / (bboxHeightScreen + paddingYScreen * 2);
        const optimalScale = Math.min(scaleX, scaleY, Constants.CENTER_SCALE_LIMIT);
        
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
        MapState.setMapState({
            scale: optimalScale,
            x: containerCenterXViewBox - targetCenterX * optimalScale,
            y: containerCenterYViewBox - targetCenterY * optimalScale
        });
        
        applyMapTransform(mapWrapper);
        }
        
        return {
            applyMapTransform: applyMapTransform,
            initMapInteraction: initMapInteraction,
            centerOnArea: centerOnArea
        };
    })();

    // --- 5. МОДУЛЬ КЭШИРОВАНИЯ И ПАРСИНГА SVG ---
    const SvgCache = (function() {
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
            if (sequenceNumber !== MapState.getFloorSwitchSequence()) return;
            
            // Устанавливаем viewBox
            if (config.viewBox) {
                svgMap.setAttribute('viewBox', config.viewBox);
                svgMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            }
            
            // Очищаем слой
            mapBaseLayer.innerHTML = '';
            
            if (sequenceNumber !== MapState.getFloorSwitchSequence()) return;
            
            // Вставляем defs (если ещё нет)
            if (cached.defs.childNodes.length > 0) {
                let targetDefs = svgMap.querySelector('defs');
                if (!targetDefs) {
                    targetDefs = document.createElementNS(Constants.SVG_NS, 'defs');
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
            
            if (sequenceNumber !== MapState.getFloorSwitchSequence()) return;
            
            // Клонируем контент из кэша и вставляем
            mapBaseLayer.appendChild(cached.content.cloneNode(true));
        }

        function renderFloorBaseLayer(floorKey, sequenceNumber, svgMap, mapBaseLayer) {
            return new Promise((resolve) => {
                // Очищаем слой сразу (пользователь видит состояние загрузки)
                if (sequenceNumber === MapState.getFloorSwitchSequence()) {
                    mapBaseLayer.innerHTML = '';
                }
                
                const catalog = MapState.getFloorPlanCatalog();
                const config = catalog[floorKey];
                if (!config) {
                    resolve();
                    return;
                }

                // Если есть кэш распарсенного DOM — используем его (мгновенно)
                const cache = MapState.getFloorDomCache();
                if (cache[floorKey]) {
                    injectCachedFloor(cache[floorKey], config, sequenceNumber, svgMap, mapBaseLayer);
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
                        const cache = MapState.getFloorDomCache();
                        cache[floorKey] = parseSvgAndPrepareCache(text);
                        // Вставляем в DOM
                        injectCachedFloor(cache[floorKey], config, sequenceNumber, svgMap, mapBaseLayer);
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
            const catalog = MapState.getFloorPlanCatalog();
            const cache = MapState.getFloorDomCache();
            Object.keys(catalog).forEach(floorKey => {
                if (!cache[floorKey]) {
                    fetch(catalog[floorKey].src)
                        .then(r => r.ok ? r.text() : Promise.reject())
                        .then(text => {
                            cache[floorKey] = parseSvgAndPrepareCache(text);
                        })
                        .catch(() => {}); // Тихо игнорируем ошибки предзагрузки
                }
            });
        }
        
        return {
            parseSvgAndPrepareCache: parseSvgAndPrepareCache,
            injectCachedFloor: injectCachedFloor,
            renderFloorBaseLayer: renderFloorBaseLayer,
            preloadAllFloors: preloadAllFloors
        };
    })();
    // --- 6. МОДУЛЬ РЕНДЕРИНГА КАРТЫ ---
    const MapRenderer = (function() {
        function createListItem(service, listContainer) {
            const item = document.createElement('div');
            item.className = Constants.CLASSES.LIST_ITEM;
            item.setAttribute('data-id', service.id);
            item.setAttribute('data-category', service.category);
            item.setAttribute('data-area-id', service.areaId);
            const formattedAttrs = Utils.formatAttributes(service);
            item.innerHTML = `
    <h4>${service.name}</h4>
    <p class="ksmm-item-attrs">${formattedAttrs}</p>
    `;
            listContainer.appendChild(item);
            return item;
        }

        function renderMapAreas(b, f, mapAreasContainer, mapBaseLayer, svgMap, mapTitle, callbacks) {
            mapAreasContainer.innerHTML = '';
            if (callbacks.setActiveArea) callbacks.setActiveArea(null);
            const servicesOnFloor = Utils.getServicesForFloor(b, f).filter(service => Boolean(service.areaId));
            if (buildingFloorStructure && buildingFloorStructure[b]) {
                mapTitle.textContent = `${buildingFloorStructure[b].label}, ${f} этаж`;
            }
            if (servicesOnFloor.length === 0) {
                const viewBox = svgMap.viewBox.baseVal;
                const viewBoxWidth = viewBox.width || Constants.DEFAULT_VIEWBOX_WIDTH;
                const viewBoxHeight = viewBox.height || Constants.DEFAULT_VIEWBOX_HEIGHT;
                const text = document.createElementNS(Constants.SVG_NS, 'text');
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
                const originalZone = Utils.getZoneElement(service.areaId, mapBaseLayer);
                if (!originalZone || !originalZone.parentNode) return;
                const zone = originalZone.cloneNode(true);
                originalZone.parentNode.replaceChild(zone, originalZone);
                zone.removeAttribute('style');
                ['fill', 'stroke', 'stroke-width', 'opacity', 'fill-opacity'].forEach(attr => zone.removeAttribute(attr));
                zone.classList.add(Constants.CLASSES.MAP_AREA);
                zone.setAttribute('data-service-id', service.id);
                zone.setAttribute('data-area-id', service.areaId);
                zone.setAttribute('data-category', service.category);
                zone.style.pointerEvents = 'all';
                if (callbacks.onZoneClick) {
                    zone.addEventListener('click', () => {
                        callbacks.onZoneClick(service);
                    });
                }
                if (callbacks.onZoneMouseEnter) {
                    zone.addEventListener('mouseenter', () => callbacks.onZoneMouseEnter(service.id));
                }
                if (callbacks.onZoneMouseLeave) {
                    zone.addEventListener('mouseleave', () => callbacks.onZoneMouseLeave(service.id));
                }
            });
        }
        
        return {
            createListItem: createListItem,
            renderMapAreas: renderMapAreas
        };
    })();

    // --- 9. МОДУЛЬ ПЕРЕКЛЮЧЕНИЯ ЭТАЖЕЙ ---
    const FloorSwitcher = (function() {
        function renderFloorSwitcher(floorSwitcher) {
            floorSwitcher.innerHTML = '';
            for (const buildingKey in buildingFloorStructure) {
                const bData = buildingFloorStructure[buildingKey];
                const title = document.createElement('div');
                title.className = Constants.CLASSES.FLOOR_GROUP_TITLE;
                title.textContent = bData.label;
                floorSwitcher.appendChild(title);
                // Рендерим этажи в обратном порядке (сверху вниз)
                bData.floors.sort((a, b) => b - a).forEach(f => {
                    const btn = document.createElement('button');
                    btn.className = Constants.CLASSES.FLOOR_BTN;
                    btn.textContent = `${f} этаж`;
                    btn.setAttribute('data-building', buildingKey);
                    btn.setAttribute('data-floor', f);
                    if (buildingKey === MapState.getCurrentBuilding() && f === MapState.getCurrentFloor()) {
                        btn.classList.add(Constants.CLASSES.FILTER_BTN_ACTIVE);
                    }
                    btn.addEventListener('click', () => {
                        FloorSwitcher.switchFloor(buildingKey, f, mapAreasContainer, mapBaseLayer, svgMap, mapTitle, mapWrapper);
                    });
                    floorSwitcher.appendChild(btn);
                });
            }
        }

        function switchFloor(b, f, mapAreasContainer, mapBaseLayer, svgMap, mapTitle, mapWrapper) {
        MapState.setCurrentBuilding(b);
        MapState.setCurrentFloor(f);
        const floorKey = `${b}-F${f}`;
        // Increment sequence number to mark this as the most recent switch
        const thisSwitchSequence = MapState.incrementFloorSwitchSequence();
        
        document.querySelectorAll(`.${Constants.CLASSES.FLOOR_BTN}`).forEach(btn => btn.classList.remove(Constants.CLASSES.FILTER_BTN_ACTIVE));
        const currentBtn = document.querySelector(`.${Constants.CLASSES.FLOOR_BTN}[data-building="${b}"][data-floor="${f}"]`);
        if (currentBtn) currentBtn.classList.add(Constants.CLASSES.FILTER_BTN_ACTIVE);

        SvgCache.renderFloorBaseLayer(floorKey, thisSwitchSequence, svgMap, mapBaseLayer).then(() => {
            // Check if this is still the most recent floor switch
            if (thisSwitchSequence !== MapState.getFloorSwitchSequence()) {
                return; // Stale operation, ignore
            }
            
            // Use closure-captured values to prevent race conditions
            MapRenderer.renderMapAreas(b, f, mapAreasContainer, mapBaseLayer, svgMap, mapTitle, {
                setActiveArea: PopupController.setActiveArea,
                onZoneClick: (service) => {
                    PopupController.showPopup(service);
                    MapInteraction.centerOnArea(service.areaId, svgMap, mapWrapper);
                },
                onZoneMouseEnter: (id) => PopupController.setHighlight(id, true),
                onZoneMouseLeave: (id) => PopupController.setHighlight(id, false)
            });
            updateListAndFilters();
            MapState.resetMapState();
            MapInteraction.applyMapTransform(mapWrapper);
            PopupController.hidePopup();
        });
        }
        
        return {
            renderFloorSwitcher: renderFloorSwitcher,
            switchFloor: switchFloor
        };
    })();

    function updateListAndFilters() {
        listContainer.innerHTML = '';
        const servicesOnCurrentFloor = Utils.getServicesForFloor(MapState.getCurrentBuilding(), MapState.getCurrentFloor());
        if (servicesOnCurrentFloor.length === 0) {
            listContainer.innerHTML = '<div style="padding: 15px; color: #999;">На этом этаже пока нет зарегистрированных сервисов.</div>';
            return;
        }
        // Создаем элементы списка для текущего этажа
        servicesOnCurrentFloor.forEach(service => {
            const item = MapRenderer.createListItem(service, listContainer);
            item.addEventListener('click', () => {
                PopupController.showPopup(service);
                MapInteraction.centerOnArea(service.areaId, svgMap, mapWrapper);
            });
            item.addEventListener('mouseenter', () => PopupController.setHighlight(service.id, true));
            item.addEventListener('mouseleave', () => PopupController.setHighlight(service.id, false));
        });
        // Сбрасываем/рендерим подфильтры для текущей категории/этажа
        const currentCategory = filterControls.querySelector(`.${Constants.CLASSES.FILTER_BTN_ACTIVE}`)?.getAttribute('data-category');
        if (currentCategory) {
            FilterController.renderSubfilters(currentCategory, subfilterControls);
        }
        // Применяем фильтрацию
        FilterController.updateView(filterControls, searchInput);
    }
    // --- 8. МОДУЛЬ УПРАВЛЕНИЯ ФИЛЬТРАМИ ---
    const FilterController = (function() {
        const subfilterDefinitions = {
            'food': ['hours'],
            'sport': ['access'],
            'meeting': ['capacity', 'equipment'],
            'relax': ['type'],
            'service': ['hours']
        };

        function renderSubfilters(category, subfilterControls) {
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
                .filter(s => s.building === MapState.getCurrentBuilding() && s.floor === MapState.getCurrentFloor() && s.category === category && s.attributes[attrKey])
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
            document.querySelectorAll(`.${Constants.CLASSES.SUBFILTER}.${Constants.CLASSES.SUBFILTER_ACTIVE}:not([data-value="all"])`).forEach(el => {
                const key = el.getAttribute('data-key');
                const value = el.getAttribute('data-value');
                if (!filters[key]) filters[key] = [];
                filters[key].push(value);
            });
            return filters;
        }
        
        function updateView(filterControls, searchInput) {
        const activeFilter = filterControls.querySelector('.active');
        if (!activeFilter) return; // Если нет активной кнопки, выходим
        const currentCategory = activeFilter.getAttribute('data-category');
        const currentSearch = searchInput.value.toLowerCase();
        const currentSubfilters = FilterController.getActiveSubfilters();
        // Фильтруем только сервисы на текущем этаже
        const currentFloorServices = allServices.filter(s => s.building === MapState.getCurrentBuilding() && s.floor === MapState.getCurrentFloor());
        currentFloorServices.forEach(service => {
            const id = service.id;
            const listItem = document.querySelector(`.${Constants.CLASSES.LIST_ITEM}[data-id="${id}"]`);
            const mapArea = document.querySelector(`.${Constants.CLASSES.MAP_AREA}[data-service-id="${id}"]`);
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
            listItem.classList.toggle(Constants.CLASSES.LIST_ITEM_HIDDEN, !isVisible);
            // КАРТУ ПРИГЛУШАЕМ (если mapArea существует)
            if (mapArea) {
                mapArea.classList.toggle(Constants.CLASSES.MAP_AREA_DIMMED, !isVisible);
                // 5. Логика Подсветки Поиска
                if (isVisible && currentSearch !== '') {
                    listItem.classList.toggle(Constants.CLASSES.LIST_ITEM_SEARCH_PRIORITY, nameMatch);
                    listItem.classList.toggle(Constants.CLASSES.LIST_ITEM_SEARCH_SECONDARY, !nameMatch && descMatch);
                    mapArea.classList.toggle(Constants.CLASSES.MAP_AREA_SEARCH_PRIORITY, nameMatch);
                    mapArea.classList.toggle(Constants.CLASSES.MAP_AREA_SEARCH_SECONDARY, !nameMatch && descMatch);
                } else {
                    listItem.classList.remove(Constants.CLASSES.LIST_ITEM_SEARCH_PRIORITY, Constants.CLASSES.LIST_ITEM_SEARCH_SECONDARY);
                    mapArea.classList.remove(Constants.CLASSES.MAP_AREA_SEARCH_PRIORITY, Constants.CLASSES.MAP_AREA_SEARCH_SECONDARY);
                }
            }
        });
        }
        
        return {
            renderSubfilters: renderSubfilters,
            getActiveSubfilters: getActiveSubfilters,
            updateView: updateView
        };
    })();
    // --- 10. ЗАПУСК И ИНИЦИАЛИЗАЦИЯ ---
    function init() {
        // Устанавливаем начальный этаж
        if (typeof buildingFloorStructure === 'undefined' || !buildingFloorStructure['B1']) {
            console.error('buildingFloorStructure не загружен!');
            return;
        }
        MapState.setCurrentBuilding(Constants.DEFAULT_BUILDING);
        MapState.setCurrentFloor(buildingFloorStructure[Constants.DEFAULT_BUILDING].defaultFloor);
        FloorSwitcher.renderFloorSwitcher(floorSwitcher);
        FloorSwitcher.switchFloor(MapState.getCurrentBuilding(), MapState.getCurrentFloor(), mapAreasContainer, mapBaseLayer, svgMap, mapTitle, mapWrapper);
        MapInteraction.initMapInteraction(svgMap, mapWrapper);
        
        // Предзагрузка остальных этажей в фоне (низкий приоритет)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => SvgCache.preloadAllFloors());
        } else {
            setTimeout(() => SvgCache.preloadAllFloors(), 1000);
        }
        // Обработчик Категорий
        filterControls.addEventListener('click', (e) => {
            if (!e.target.matches(`.${Constants.CLASSES.FILTER_BTN}`)) return;
            const activeBtn = filterControls.querySelector(`.${Constants.CLASSES.FILTER_BTN_ACTIVE}`);
            if (activeBtn) activeBtn.classList.remove(Constants.CLASSES.FILTER_BTN_ACTIVE);
            e.target.classList.add(Constants.CLASSES.FILTER_BTN_ACTIVE);
            FilterController.renderSubfilters(e.target.getAttribute('data-category'), subfilterControls);
            FilterController.updateView(filterControls, searchInput);
        });
        // Обработчик Подфильтров
        subfilterControls.addEventListener('click', (e) => {
            if (!e.target.matches(`.${Constants.CLASSES.SUBFILTER}`)) return;
            const el = e.target;
            const value = el.getAttribute('data-value');
            const groupContainer = el.parentElement;
            if (value === 'all') {
                groupContainer.querySelectorAll(`.${Constants.CLASSES.SUBFILTER}`).forEach(sub => sub.classList.remove(Constants.CLASSES.SUBFILTER_ACTIVE));
                el.classList.add(Constants.CLASSES.SUBFILTER_ACTIVE);
            } else {
                groupContainer.querySelector(`.${Constants.CLASSES.SUBFILTER}[data-value="all"]`).classList.remove(Constants.CLASSES.SUBFILTER_ACTIVE);
                el.classList.toggle(Constants.CLASSES.SUBFILTER_ACTIVE);
                if (groupContainer.querySelectorAll(`.${Constants.CLASSES.SUBFILTER}.${Constants.CLASSES.SUBFILTER_ACTIVE}`).length === 0) {
                    groupContainer.querySelector(`.${Constants.CLASSES.SUBFILTER}[data-value="all"]`).classList.add(Constants.CLASSES.SUBFILTER_ACTIVE);
                }
            }
            FilterController.updateView(filterControls, searchInput);
        });
        // Обработчик Поиска
        searchInput.addEventListener('input', () => FilterController.updateView(filterControls, searchInput));
        // Закрытие Pop-up
        PopupController.getPopupCloseBtn().addEventListener('click', PopupController.hidePopup);
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