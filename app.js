(function() {
    // --- 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ и DOM-ЭЛЕМЕНТЫ ---
    const SVG_NS = "http://www.w3.org/2000/svg";
    const mapWrapper = document.getElementById('ksmm-map-wrapper');
    const mapAreasContainer = document.getElementById('ksmm-map-areas');
    const mapTitle = document.getElementById('ksmm-map-title');
    const listContainer = document.getElementById('ksmm-services-list');
    const filterControls = document.querySelector('.ksmm-filter-controls');
    const subfilterControls = document.getElementById('ksmm-subfilter-controls');
    const searchInput = document.getElementById('ksmm-search-input');
    const floorSelect = document.getElementById('ksmm-floor-select');
    const svgMap = document.getElementById('ksmm-map');
    let currentBuilding = 'B1';
    let currentFloor = buildingFloorStructure[currentBuilding].defaultFloor;
    let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
    let touchState = { 
        touches: [], 
        initialDistance: 0, 
        initialScale: 1, 
        initialX: 0, 
        initialY: 0,
        panning: false
    };
    const SVG_VIEWBOX_WIDTH = 800;
    const SVG_VIEWBOX_HEIGHT = 600;

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
    const loadingIndicator = document.getElementById('ksmm-loading-indicator');

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

    function showPopup(service) {
        popupTitle.textContent = service.name;
        popupDesc.textContent = service.desc;
        // ИЗМЕНЕНИЕ: Исправление источника картинки
        popupImg.src = service.img;
        popupContacts.textContent = service.contacts;
        popupLink.href = service.link;
        popupLink.style.display = (service.link === '#') ? 'none' : 'inline-block';
        popup.style.display = 'block';
    }

    function hidePopup() { popup.style.display = 'none'; }

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
    function applyMapTransform() {
        mapWrapper.style.transform = `translate(${mapState.x}px, ${mapState.y}px) scale(${mapState.scale})`;
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
            // ПЛАВНЫЙ ЗУМ: Меньший фактор для плавности (1.05)
            const scaleFactor = 1.05;
            const newScale = e.deltaY < 0 ? mapState.scale * scaleFactor : mapState.scale / scaleFactor; // // Ограничиваем зум 
            const prevScale = mapState.scale;
            mapState.scale = Math.max(0.5, Math.min(3, newScale));
            // Если масштаб не изменился (достигли лимита), то не выполняем трансформацию //
            if (mapState.scale === prevScale && newScale !== prevScale) return; // // Зум относительно курсора (центр зума) // 
            const bbox = svgMap.getBoundingClientRect(); //
            const mouseX = e.clientX - bbox.left; //
            const mouseY = e.clientY - bbox.top; // // Смещение в зависимости от нового масштаба //
            mapState.x = mapState.x - (mouseX - mapState.x) * (mapState.scale / prevScale - 1);
            mapState.y = mapState.y - (mouseY - mapState.y) * (mapState.scale / prevScale - 1);
            applyMapTransform();
        });
        
        // Touch Events для мобильных устройств
        svgMap.addEventListener('touchstart', (e) => {
            if (e.target.closest('.ksmm-map-area')) return;
            e.preventDefault();
            touchState.touches = Array.from(e.touches);
            
            if (touchState.touches.length === 1) {
                // Одно касание - панорамирование
                touchState.panning = true;
                const touch = touchState.touches[0];
                const transformMatrix = window.getComputedStyle(mapWrapper).transform;
                if (transformMatrix !== 'none') {
                    const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                    mapState.x = parseFloat(matrixValues[4]);
                    mapState.y = parseFloat(matrixValues[5]);
                } else {
                    mapState.x = 0;
                    mapState.y = 0;
                }
                touchState.initialX = touch.clientX - mapState.x;
                touchState.initialY = touch.clientY - mapState.y;
            } else if (touchState.touches.length === 2) {
                // Два касания - pinch-to-zoom
                touchState.panning = false;
                const touch1 = touchState.touches[0];
                const touch2 = touchState.touches[1];
                touchState.initialDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                touchState.initialScale = mapState.scale;
                const transformMatrix = window.getComputedStyle(mapWrapper).transform;
                if (transformMatrix !== 'none') {
                    const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                    mapState.x = parseFloat(matrixValues[4]);
                    mapState.y = parseFloat(matrixValues[5]);
                }
            }
        });
        
        svgMap.addEventListener('touchmove', (e) => {
            if (e.target.closest('.ksmm-map-area')) return;
            e.preventDefault();
            touchState.touches = Array.from(e.touches);
            
            if (touchState.touches.length === 1 && touchState.panning) {
                // Панорамирование
                const touch = touchState.touches[0];
                mapState.x = touch.clientX - touchState.initialX;
                mapState.y = touch.clientY - touchState.initialY;
                applyMapTransform();
            } else if (touchState.touches.length === 2) {
                // Pinch-to-zoom
                const touch1 = touchState.touches[0];
                const touch2 = touchState.touches[1];
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const scaleRatio = currentDistance / touchState.initialDistance;
                const newScale = touchState.initialScale * scaleRatio;
                mapState.scale = Math.max(0.5, Math.min(3, newScale));
                
                // Центр зума - середина между двумя касаниями
                const bbox = svgMap.getBoundingClientRect();
                const centerX = (touch1.clientX + touch2.clientX) / 2 - bbox.left;
                const centerY = (touch1.clientY + touch2.clientY) / 2 - bbox.top;
                
                const viewBox = svgMap.viewBox.baseVal;
                const viewBoxWidth = viewBox.width || 800;
                const viewBoxHeight = viewBox.height || 600;
                const viewBoxToScreenX = bbox.width / viewBoxWidth;
                const viewBoxToScreenY = bbox.height / viewBoxHeight;
                
                const mouseViewBoxX = centerX / viewBoxToScreenX;
                const mouseViewBoxY = centerY / viewBoxToScreenY;
                
                const vx = (mouseViewBoxX - mapState.x) / touchState.initialScale;
                const vy = (mouseViewBoxY - mapState.y) / touchState.initialScale;
                
                mapState.x = mouseViewBoxX - vx * mapState.scale;
                mapState.y = mouseViewBoxY - vy * mapState.scale;
                
                applyMapTransform();
            }
        });
        
        svgMap.addEventListener('touchend', (e) => {
            if (e.target.closest('.ksmm-map-area')) return;
            e.preventDefault();
            touchState.touches = Array.from(e.touches);
            if (touchState.touches.length === 0) {
                touchState.panning = false;
            }
        });
    }

    function centerOnArea(areaId) {
        const areaData = areaDefinitions[`${currentBuilding}-F${currentFloor}`].find(a => a.id === areaId);
        if (!areaData) return;
        // Центр SVG в мировых координатах (SVG viewBox: 800x600)
        const mapCenterX = SVG_VIEWBOX_WIDTH / 2;
        const mapCenterY = SVG_VIEWBOX_HEIGHT / 2;
        // Координаты центра области
        const targetX = areaData.xCenter;
        const targetY = areaData.yCenter;
        // Требуемый сдвиг для центрирования
        const offsetX = mapCenterX - targetX;
        const offsetY = mapCenterY - targetY;
        // Устанавливаем масштаб для центрирования
        mapState.scale = 1;
        mapState.x = offsetX * mapState.scale;
        mapState.y = offsetY * mapState.scale;
        applyMapTransform();
    }
    // --- 5. ФУНКЦИИ РЕНДЕРИНГА (Обновлены) ---
    function createListItem(service) {
        const item = document.createElement('div');
        item.className = 'ksmm-list-item';
        item.setAttribute('data-id', service.id);
        item.setAttribute('data-category', service.category);
        item.setAttribute('data-area-id', service.areaId);
        item.setAttribute('role', 'listitem');
        item.setAttribute('tabindex', '0');
        const formattedAttrs = formatAttributes(service);
        item.setAttribute('aria-label', `${service.name}. ${formattedAttrs}`);
        item.innerHTML = `
    <h4>${service.name}</h4>
    <p class="ksmm-item-attrs">${formattedAttrs}</p>
    `;
        return item;
    }

    function renderMapAreas(b, f) {
        mapAreasContainer.innerHTML = '';
        const floorKey = `${b}-F${f}`;
        // Использование заглушек для этажей без реальных данных
        const areas = areaDefinitions[floorKey] || [];
        mapTitle.textContent = `${buildingFloorStructure[b].label}, ${f} этаж`;
        // Если для этажа нет данных карты, отображаем предупреждение
        if (areas.length === 0) {
            const text = document.createElementNS(SVG_NS, 'text');
            text.setAttribute('x', '400');
            text.setAttribute('y', '300');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '24');
            text.setAttribute('fill', '#999');
            text.textContent = `План этажа ${f} пока не отрисован.`;
            mapAreasContainer.appendChild(text);
        }
        areas.forEach(areaData => {
            const service = getServiceById(areaData.serviceId);
            if (!service) return;
            const area = document.createElementNS(SVG_NS, 'path');
            area.setAttribute('d', areaData.d);
            area.setAttribute('class', 'ksmm-map-area');
            area.setAttribute('data-service-id', service.id);
            area.setAttribute('data-area-id', areaData.id);
            area.setAttribute('data-category', service.category);
            mapAreasContainer.appendChild(area);
            // Привязка событий
            area.addEventListener('click', () => {
                showPopup(service);
                centerOnArea(areaData.id);
            });
            area.addEventListener('mouseenter', () => setHighlight(service.id, true));
            area.addEventListener('mouseleave', () => setHighlight(service.id, false));
        });
    }

    function renderFloorSelect() {
        floorSelect.innerHTML = '';
        for (const buildingKey in buildingFloorStructure) {
            const bData = buildingFloorStructure[buildingKey];
            const optgroup = document.createElement('optgroup');
            optgroup.label = bData.label;
            // Рендерим этажи в обратном порядке (сверху вниз)
            bData.floors.sort((a, b) => b - a).forEach(f => {
                const option = document.createElement('option');
                option.value = `${buildingKey}-${f}`;
                option.textContent = `${f} этаж`;
                if (buildingKey === currentBuilding && f === currentFloor) {
                    option.selected = true;
                }
                optgroup.appendChild(option);
            });
            floorSelect.appendChild(optgroup);
        }
    }

    function switchFloor(b, f) {
        currentBuilding = b;
        currentFloor = f;
        // 1. Обновляем select
        floorSelect.value = `${b}-${f}`;
        // 2. Показываем индикатор загрузки
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
        // 3. Рендерим карту для нового этажа (с небольшой задержкой для плавности)
        setTimeout(() => {
            renderMapAreas(b, f);
            // 4. Обновляем список и фильтры
            updateListAndFilters();
            // 5. Сбрасываем Pan/Zoom
            mapState.x = 0;
            mapState.y = 0;
            mapState.scale = 1;
            applyMapTransform();
            hidePopup();
            // 6. Скрываем индикатор загрузки
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 100);
    }

    function updateListAndFilters() {
        listContainer.innerHTML = '';
        // Использование заглушек сервисов для этажей без реальных данных
        const servicesOnCurrentFloor = allServices.filter(s => s.building === currentBuilding && s.floor === currentFloor);
        if (servicesOnCurrentFloor.length === 0) {
            listContainer.innerHTML = '<div style="padding: 15px; color: #999;">На этом этаже пока нет зарегистрированных сервисов.</div>';
        }
        // Создаем элементы списка для текущего этажа
        servicesOnCurrentFloor.forEach(service => {
            const item = createListItem(service);
            listContainer.appendChild(item);
            item.addEventListener('click', () => {
                showPopup(service);
                centerOnArea(service.areaId);
            });
            item.addEventListener('mouseenter', () => setHighlight(service.id, true));
            item.addEventListener('mouseleave', () => setHighlight(service.id, false));
        });
        // Сбрасываем/рендерим подфильтры для текущей категории/этажа
        const currentCategory = filterControls.querySelector('.active').getAttribute('data-category');
        renderSubfilters(currentCategory);
        // Применяем фильтрацию
        updateView();
    }

    function createListItemWithFloor(service, isOtherFloor = false) {
        const item = createListItem(service);
        if (isOtherFloor) {
            item.classList.add('ksmm-list-item-other-floor');
            const floorBadge = document.createElement('span');
            floorBadge.className = 'ksmm-floor-badge';
            floorBadge.textContent = `${buildingFloorStructure[service.building].label}, ${service.floor} этаж`;
            const h4 = item.querySelector('h4');
            if (h4) {
                h4.appendChild(floorBadge);
            }
        }
        return item;
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
        if (!activeFilter) return;
        const currentCategory = activeFilter.getAttribute('data-category');
        const currentSearch = searchInput.value.toLowerCase();
        const currentSubfilters = getActiveSubfilters();
        
        // Определяем, нужно ли показывать сервисы с других этажей
        const showOtherFloors = (currentCategory !== 'all' || currentSearch !== '');
        
        // Фильтруем сервисы на текущем этаже
        const currentFloorServices = allServices.filter(s => s.building === currentBuilding && s.floor === currentFloor);
        
        // Обрабатываем сервисы текущего этажа
        currentFloorServices.forEach(service => {
            const id = service.id;
            const listItem = document.querySelector(`.ksmm-list-item[data-id="${id}"]`);
            const mapArea = document.querySelector(`.ksmm-map-area[data-service-id="${id}"]`);
            if (!listItem) return;
            
            const isCategoryMatch = (currentCategory === 'all' || service.category === currentCategory);
            const nameMatch = service.name.toLowerCase().includes(currentSearch);
            const descMatch = service.desc.toLowerCase().includes(currentSearch);
            const isSearchMatch = (currentSearch === '') || nameMatch || descMatch;
            
            let isSubfilterMatch = true;
            for (const key in currentSubfilters) {
                const serviceValue = service.attributes[key];
                const allowedValues = currentSubfilters[key];
                if (allowedValues.length > 0 && !allowedValues.includes(serviceValue)) {
                    isSubfilterMatch = false;
                    break;
                }
            }
            
            const isVisible = isCategoryMatch && isSearchMatch && isSubfilterMatch;
            listItem.classList.toggle('hidden', !isVisible);
            
            if (mapArea) {
                mapArea.classList.toggle('dimmed', !isVisible);
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
        
        // Если нужно показать сервисы с других этажей
        if (showOtherFloors) {
            // Удаляем старые элементы с других этажей
            document.querySelectorAll('.ksmm-list-item-other-floor').forEach(el => el.remove());
            document.querySelectorAll('.ksmm-floor-divider').forEach(el => el.remove());
            
            // Фильтруем сервисы с других этажей
            const otherFloorServices = allServices.filter(s => 
                !(s.building === currentBuilding && s.floor === currentFloor)
            );
            
            // Применяем те же фильтры
            const filteredOtherServices = otherFloorServices.filter(service => {
                const isCategoryMatch = (currentCategory === 'all' || service.category === currentCategory);
                const nameMatch = service.name.toLowerCase().includes(currentSearch);
                const descMatch = service.desc.toLowerCase().includes(currentSearch);
                const isSearchMatch = (currentSearch === '') || nameMatch || descMatch;
                
                let isSubfilterMatch = true;
                for (const key in currentSubfilters) {
                    const serviceValue = service.attributes[key];
                    const allowedValues = currentSubfilters[key];
                    if (allowedValues.length > 0 && !allowedValues.includes(serviceValue)) {
                        isSubfilterMatch = false;
                        break;
                    }
                }
                
                return isCategoryMatch && isSearchMatch && isSubfilterMatch;
            });
            
            // Если есть сервисы с других этажей, добавляем разделитель и элементы
            if (filteredOtherServices.length > 0) {
                const divider = document.createElement('div');
                divider.className = 'ksmm-floor-divider';
                divider.innerHTML = '<div class="ksmm-floor-divider-line"></div><span class="ksmm-floor-divider-text">Другие этажи</span><div class="ksmm-floor-divider-line"></div>';
                listContainer.appendChild(divider);
                
                filteredOtherServices.forEach(service => {
                    const item = createListItemWithFloor(service, true);
                    item.addEventListener('click', () => {
                        switchFloor(service.building, service.floor);
                        setTimeout(() => {
                            showPopup(service);
                            centerOnArea(service.areaId);
                        }, 150);
                    });
                    item.addEventListener('mouseenter', () => {
                        // Можно добавить подсказку, что это другой этаж
                    });
                    listContainer.appendChild(item);
                });
            }
        } else {
            // Удаляем элементы с других этажей, если не нужно показывать
            document.querySelectorAll('.ksmm-list-item-other-floor').forEach(el => el.remove());
            document.querySelectorAll('.ksmm-floor-divider').forEach(el => el.remove());
        }
    }
    // --- 7. СОХРАНЕНИЕ СОСТОЯНИЯ ---
    function saveState() {
        const state = {
            building: currentBuilding,
            floor: currentFloor,
            category: filterControls.querySelector('.active')?.getAttribute('data-category') || 'all',
            search: searchInput.value,
            subfilters: getActiveSubfilters()
        };
        try {
            localStorage.setItem('ksmm-state', JSON.stringify(state));
        } catch (e) {
            console.warn('Не удалось сохранить состояние:', e);
        }
    }

    function loadState() {
        try {
            const saved = localStorage.getItem('ksmm-state');
            if (saved) {
                const state = JSON.parse(saved);
                if (state.building && buildingFloorStructure[state.building]) {
                    currentBuilding = state.building;
                    if (buildingFloorStructure[state.building].floors.includes(state.floor)) {
                        currentFloor = state.floor;
                    }
                }
                if (state.category) {
                    const categoryBtn = filterControls.querySelector(`[data-category="${state.category}"]`);
                    if (categoryBtn) {
                        filterControls.querySelector('.active')?.classList.remove('active');
                        categoryBtn.classList.add('active');
                    }
                }
                if (state.search) {
                    searchInput.value = state.search;
                }
                return state;
            }
        } catch (e) {
            console.warn('Не удалось загрузить состояние:', e);
        }
        return null;
    }

    // --- 8. ЗАПУСК И ИНИЦИАЛИЗАЦИЯ ---
    function init() {
        // Загружаем сохраненное состояние
        const savedState = loadState();
        
        // Устанавливаем начальный этаж
        if (!savedState) {
            currentBuilding = 'B1';
            currentFloor = buildingFloorStructure['B1'].defaultFloor;
        }
        
        renderFloorSelect();
        switchFloor(currentBuilding, currentFloor);
        initMapInteraction();
        
        // Восстанавливаем подфильтры после переключения этажа
        if (savedState && savedState.subfilters) {
            setTimeout(() => {
                const currentCategory = filterControls.querySelector('.active')?.getAttribute('data-category');
                if (currentCategory) {
                    renderSubfilters(currentCategory);
                    // Восстанавливаем активные подфильтры
                    Object.keys(savedState.subfilters).forEach(key => {
                        savedState.subfilters[key].forEach(value => {
                            const subfilter = subfilterControls.querySelector(`[data-key="${key}"][data-value="${value}"]`);
                            if (subfilter) {
                                const groupContainer = subfilter.parentElement;
                                groupContainer.querySelector('.ksmm-subfilter[data-value="all"]')?.classList.remove('active');
                                subfilter.classList.add('active');
                            }
                        });
                    });
                    updateView();
                }
            }, 200);
        }
        
        // Обработчик переключения этажей через select
        floorSelect.addEventListener('change', (e) => {
            const [building, floor] = e.target.value.split('-');
            switchFloor(building, parseInt(floor, 10));
            saveState();
        });
        // Обработчик Категорий
        filterControls.addEventListener('click', (e) => {
            if (!e.target.matches('.ksmm-filter-btn')) return;
            filterControls.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            renderSubfilters(e.target.getAttribute('data-category'));
            updateView();
            saveState();
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
            saveState();
        });
        // Обработчик Поиска
        searchInput.addEventListener('input', () => {
            updateView();
            saveState();
        });
        // Закрытие Pop-up
        popupCloseBtn.addEventListener('click', hidePopup);
        
        // Клавиатурная навигация
        // Escape закрывает popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.style.display === 'block') {
                hidePopup();
            }
        });
        
        // Enter/Space активирует фильтры
        filterControls.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (e.target.matches('.ksmm-filter-btn')) {
                    e.target.click();
                }
            }
        });
        
        // Enter активирует подфильтры
        subfilterControls.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (e.target.matches('.ksmm-subfilter')) {
                    e.target.click();
                }
            }
        });
        
        // Enter активирует элементы списка
        listContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (e.target.closest('.ksmm-list-item')) {
                    e.target.closest('.ksmm-list-item').click();
                }
            }
        });
    }
    init();
})();