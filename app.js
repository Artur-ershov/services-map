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
    const floorSvgCache = {};
    let activeAreaId = null;
    let currentBuilding = 'B1';
    let currentFloor = buildingFloorStructure[currentBuilding].defaultFloor;
    let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
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
            const newScale = e.deltaY < 0 ? mapState.scale * scaleFactor : mapState.scale / scaleFactor; // Ограничиваем зум
            const prevScale = mapState.scale;
            mapState.scale = Math.max(0.5, Math.min(3, newScale));
            // Если масштаб не изменился (достигли лимита), то не выполняем трансформацию
            if (mapState.scale === prevScale && newScale !== prevScale) return; //  Зум относительно курсора (центр зума)
            const bbox = svgMap.getBoundingClientRect();
            const mouseX = e.clientX - bbox.left;
            const mouseY = e.clientY - bbox.top; // Смещение в зависимости от нового масштаба //
            mapState.x = mapState.x - (mouseX - mapState.x) * (mapState.scale / prevScale - 1);
            mapState.y = mapState.y - (mouseY - mapState.y) * (mapState.scale / prevScale - 1);
            applyMapTransform();
        });
    }

    function centerOnArea(areaId) {
        const areaElement = document.querySelector(`.ksmm-map-area[data-area-id="${areaId}"]`);
        if (!areaElement || typeof areaElement.getBBox !== 'function') return;
        const bbox = areaElement.getBBox();
        if (!bbox || (bbox.width === 0 && bbox.height === 0)) return;
        const mapCenterX = SVG_VIEWBOX_WIDTH / 2;
        const mapCenterY = SVG_VIEWBOX_HEIGHT / 2;
        const targetX = bbox.x + (bbox.width / 2);
        const targetY = bbox.y + (bbox.height / 2);
        const offsetX = mapCenterX - targetX;
        const offsetY = mapCenterY - targetY;
        mapState.scale = 1;
        mapState.x = offsetX * mapState.scale;
        mapState.y = offsetY * mapState.scale;
        applyMapTransform();
    }

    function renderFloorBaseLayer(floorKey) {
        return new Promise((resolve) => {
            mapBaseLayer.innerHTML = '';
            const config = floorPlanCatalog[floorKey];
            if (!config) {
                resolve();
                return;
            }

            const injectSvg = (svgText) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, 'image/svg+xml');
                const inlineSvg = document.importNode(doc.documentElement, true);
                inlineSvg.removeAttribute('id');
                inlineSvg.setAttribute('width', '100%');
                inlineSvg.setAttribute('height', '100%');
                // if (config.viewBox && !inlineSvg.getAttribute('viewBox')) {
                //     inlineSvg.setAttribute('viewBox', config.viewBox);
                // }
                // if (!inlineSvg.getAttribute('preserveAspectRatio')) {
                //     inlineSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                // }
                inlineSvg.classList.add('ksmm-floorplan');
                mapBaseLayer.innerHTML = '';
                mapBaseLayer.appendChild(inlineSvg);
                resolve();
            };

            if (floorSvgCache[floorKey]) {
                injectSvg(floorSvgCache[floorKey]);
                return;
            }

            fetch(config.src)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    floorSvgCache[floorKey] = text;
                    injectSvg(text);
                })
                .catch(err => {
                    console.error(`Не удалось загрузить SVG карту для ${floorKey}:`, err);
                    resolve();
                });
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
            const text = document.createElementNS(SVG_NS, 'text');
            text.setAttribute('x', (SVG_VIEWBOX_WIDTH / 2).toString());
            text.setAttribute('y', (SVG_VIEWBOX_HEIGHT / 2).toString());
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
        document.querySelectorAll('.ksmm-floor-btn').forEach(btn => btn.classList.remove('active'));
        const currentBtn = document.querySelector(`.ksmm-floor-btn[data-building="${b}"][data-floor="${f}"]`);
        if (currentBtn) currentBtn.classList.add('active');

        renderFloorBaseLayer(floorKey).then(() => {
            renderMapAreas(b, f);
            updateListAndFilters();
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
        }
        // Создаем элементы списка для текущего этажа
        servicesOnCurrentFloor.forEach(service => {
            const item = createListItem(service);
            item.addEventListener('click', () => {
                showPopup(service);
                // centerOnArea(service.areaId);
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
        const currentCategory = filterControls.querySelector('.active').getAttribute('data-category');
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
        currentBuilding = 'B1';
        currentFloor = buildingFloorStructure['B1'].defaultFloor;
        renderFloorSwitcher();
        switchFloor(currentBuilding, currentFloor);
        initMapInteraction();
        // Обработчик Категорий
        filterControls.addEventListener('click', (e) => {
            if (!e.target.matches('.ksmm-filter-btn')) return;
            filterControls.querySelector('.active').classList.remove('active');
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
    }
    init();
})();