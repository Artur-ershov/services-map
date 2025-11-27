(function() {
    // --- КОНФИГУРАЦИЯ GOOGLE SHEETS ---
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlLYPaWGFoalKQt-IAgSzU78Yz9Us6GEOSmqTilhPl7e-HTanFn7oZyLR5YteteTUWsYcVG__3cEe8/pub?gid=0&single=true&output=tsv';
    const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

    // --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
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

    let allServices = []; // Будет заполнено из Google Sheets
    let buildingFloorStructure = {}; // Будет сгенерировано автоматически
    let activeAreaId = null;
    let currentBuilding = 'B1';
    let currentFloor = 3;
    let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 };
    const SVG_VIEWBOX_WIDTH = 800;
    const SVG_VIEWBOX_HEIGHT = 550;

    // --- ФУНКЦИИ ДЛЯ РАБОТЫ С GOOGLE SHEETS ---
    async function loadServicesFromGoogleSheet() {
        try {
            console.log('Загрузка данных из Google Sheets...');
            const response = await fetch(SHEET_URL);
            const tsvData = await response.text();

            // Разбиваем TSV данные на строки и колонки
            const lines = tsvData.trim().split('\n');
            const headers = lines[0].split('\t');

            const services = [];

            // Обрабатываем каждую строку, начиная со второй (первая - заголовки)
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split('\t');
                const service = {};

                // Сопоставляем значения с заголовками
                headers.forEach((header, index) => {
                    const value = values[index] || '';
                    service[header.trim()] = value.trim();
                });

                // Преобразуем в нужный формат
                const formattedService = {
                    id: parseInt(service.id) || i,
                    name: service.name || 'Без названия',
                    category: service.category || 'meeting',
                    building: service.building || 'B1',
                    floor: parseInt(service.floor) || 3,
                    areaId: service.areaId || 'area_' + i,
                    desc: service.desc || '',
                    contacts: service.contacts || '',
                    img: service.img || DUMMY_IMG_URL + encodeURIComponent(service.name || 'Помещение'),
                    link: service.link || '#',
                    attributes: {
                        location: service.location || '',
                        capacity: service.capacity || '',
                        equipment: service.equipment || '',
                        hours: service.hours || ''
                    }
                };

                services.push(formattedService);
            }

            console.log('Загружено ' + services.length + ' услуг из Google Sheets');
            return services;

        } catch (error) {
            console.error('Ошибка загрузки данных из Google Sheets:', error);
            // Возвращаем пустой массив в случае ошибки
            return [];
        }
    }

    function generateBuildingStructure(services) {
        const structure = {};

        services.forEach(function(service) {
            const building = service.building;
            const floor = service.floor;

            if (!structure[building]) {
                structure[building] = {
                    label: 'Корпус ' + building.replace('B', ''),
                    floors: [],
                    defaultFloor: floor
                };
            }

            if (structure[building].floors.indexOf(floor) === -1) {
                structure[building].floors.push(floor);
                structure[building].floors.sort(function(a, b) { return a - b; });
            }

            // Обновляем defaultFloor на минимальный этаж
            structure[building].defaultFloor = Math.min.apply(Math, structure[building].floors);
        });

        return structure;
    }

    // --- СУЩЕСТВУЮЩИЕ ФУНКЦИИ (с небольшими изменениями) ---
    function getServiceById(id) {
        for (var i = 0; i < allServices.length; i++) {
            if (allServices[i].id === id) {
                return allServices[i];
            }
        }
        return null;
    }

    var popup = document.getElementById('ksmm-popup');
    var popupCloseBtn = document.getElementById('ksmm-popup-close');
    var popupTitle = document.getElementById('ksmm-popup-title');
    var popupDesc = document.getElementById('ksmm-popup-desc');
    var popupContacts = document.getElementById('ksmm-popup-contacts');
    var popupImg = document.getElementById('ksmm-popup-img');
    var popupLink = document.getElementById('ksmm-popup-link');

    function formatAttributes(service) {
        var attrs = service.attributes;
        var parts = [];
        if (attrs.location) parts.push(attrs.location);
        for (var key in attrs) {
            if (key !== 'location' && attrs[key]) {
                parts.push(attrs[key]);
            }
        }
        return parts.join(' • ');
    }

    function getServicesForFloor(building, floor) {
        return allServices.filter(function(s) {
            return s.building === building && s.floor === floor;
        });
    }

    function getZoneElement(areaId) {
        if (!areaId || !mapBaseLayer) return null;
        return mapBaseLayer.querySelector('#' + areaId);
    }

    function setActiveArea(areaId) {
        if (activeAreaId === areaId) return;
        var activeAreas = document.querySelectorAll('.ksmm-map-area.active');
        for (var i = 0; i < activeAreas.length; i++) {
            activeAreas[i].classList.remove('active');
        }
        activeAreaId = null;
        if (!areaId) return;
        var targetArea = document.querySelector('.ksmm-map-area[data-area-id="' + areaId + '"]');
        if (targetArea) {
            targetArea.classList.add('active');
            activeAreaId = areaId;
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
        var service = getServiceById(id);
        if (!service) return;

        var area = document.querySelector('.ksmm-map-area[data-area-id="' + service.areaId + '"]');
        var item = document.querySelector('.ksmm-list-item[data-id="' + id + '"]');

        if (area && item && !area.classList.contains('dimmed') && !item.classList.contains('hidden')) {
            area.classList.toggle('highlight', state);
            item.classList.toggle('highlight', state);
        }
    }

    // --- ЛОГИКА КАРТЫ (Pan, Zoom, Center) ---
    function applyMapTransform() {
        console.log('APPLY TRANSFORM - x:', Math.round(mapState.x), 'y:', Math.round(mapState.y), 'scale:', mapState.scale);
        mapWrapper.style.transform = 'translate(' + mapState.x + 'px, ' + mapState.y + 'px) scale(' + mapState.scale + ')';
    }

    function initMapInteraction() {
        // Drag (Pan) Logic
        svgMap.addEventListener('mousedown', function(e) {
            if (e.target.closest('.ksmm-map-area') || e.target.id === 'ksmm-map-title' || e.target.closest('.ksmm-floor-switcher')) return;
            if (e.target.closest('.ksmm-floor-switcher')) return;

            mapState.dragging = true;
            svgMap.classList.add('dragging');

            var transformMatrix = window.getComputedStyle(mapWrapper).transform;
            if (transformMatrix !== 'none') {
                var matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                mapState.x = parseFloat(matrixValues[4]);
                mapState.y = parseFloat(matrixValues[5]);
            } else {
                mapState.x = 0;
                mapState.y = 0;
            }
            mapState.startX = e.clientX - mapState.x;
            mapState.startY = e.clientY - mapState.y;
        });

        document.addEventListener('mousemove', function(e) {
            if (!mapState.dragging) return;
            mapState.x = e.clientX - mapState.startX;
            mapState.y = e.clientY - mapState.startY;
            applyMapTransform();
        });

        document.addEventListener('mouseup', function() {
            mapState.dragging = false;
            svgMap.classList.remove('dragging');
        });

        // Zoom Logic (Wheel)
        svgMap.addEventListener('wheel', function(e) {
            e.preventDefault();
            var scaleFactor = 1.05;
            var newScale = e.deltaY < 0 ? mapState.scale * scaleFactor : mapState.scale / scaleFactor;
            var prevScale = mapState.scale;
            mapState.scale = Math.max(0.5, Math.min(3, newScale));

            if (mapState.scale === prevScale && newScale !== prevScale) return;

            var bbox = svgMap.getBoundingClientRect();
            var mouseX = e.clientX - bbox.left;
            var mouseY = e.clientY - bbox.top;

            mapState.x = mapState.x - (mouseX - mapState.x) * (mapState.scale / prevScale - 1);
            mapState.y = mapState.y - (mouseY - mapState.y) * (mapState.scale / prevScale - 1);
            applyMapTransform();
        });
    }

    function centerOnArea(areaId) {
        console.log('=== CENTER ON AREA (CORRECTED) ===');

        var areaElement = document.querySelector('.ksmm-map-area[data-area-id="' + areaId + '"]');
        if (!areaElement || typeof areaElement.getBBox !== 'function') return;

        var bbox = areaElement.getBBox();
        if (!bbox || (bbox.width === 0 && bbox.height === 0)) return;

        // Получаем размеры контейнера карты
        var containerRect = svgMap.getBoundingClientRect();
        var containerWidth = containerRect.width;
        var containerHeight = containerRect.height;

        // Центр целевой области в координатах SVG
        var targetCenterX = bbox.x + bbox.width / 2;
        var targetCenterY = bbox.y + bbox.height / 2;

        // Желаемая позиция в пикселях экрана (75% ширины, 50% высоты)
        var desiredScreenX = containerWidth * 0.75;
        var desiredScreenY = containerHeight * 0.5;

        console.log('Container size:', { width: containerWidth, height: containerHeight });
        console.log('Target center (SVG):', { x: targetCenterX, y: targetCenterY });
        console.log('Desired screen:', { x: desiredScreenX, y: desiredScreenY });
        console.log('Current map state:', { x: mapState.x, y: mapState.y, scale: mapState.scale });

        // Получаем реальные размеры SVG через viewBox
        var svgViewBox = svgMap.getAttribute('viewBox');
        var viewBoxParts = svgViewBox ? svgViewBox.split(' ').map(parseFloat) : [0, 0, SVG_VIEWBOX_WIDTH, SVG_VIEWBOX_HEIGHT];
        var svgWidth = viewBoxParts[2];
        var svgHeight = viewBoxParts[3];

        console.log('SVG viewBox:', svgViewBox, 'Dimensions:', { width: svgWidth, height: svgHeight });

        // Рассчитываем соотношение между SVG координатами и экранными пикселями
        var scaleX = containerWidth / svgWidth;
        var scaleY = containerHeight / svgHeight;

        // Текущая позиция центра области в экранных координатах (без трансформации)
        var currentScreenX = targetCenterX * scaleX;
        var currentScreenY = targetCenterY * scaleY;

        console.log('Scale factors:', { scaleX: scaleX, scaleY: scaleY });
        console.log('Current screen position (no transform):', { x: currentScreenX, y: currentScreenY });

        // Вычисляем необходимое смещение с учетом текущего масштаба
        // desired = (current * scale) + translate
        // => translate = desired - (current * scale)
        mapState.x = desiredScreenX - (currentScreenX * mapState.scale);
        mapState.y = desiredScreenY - (currentScreenY * mapState.scale);

        console.log('New map state:', { x: mapState.x, y: mapState.y });

        applyMapTransform();
    }

    function renderFloorBaseLayer(floorKey) {
        return new Promise(function(resolve) {
            mapBaseLayer.innerHTML = '';
            var config = floorPlanCatalog[floorKey];
            if (!config) {
                console.log('No config for floor:', floorKey);
                resolve();
                return;
            }

            console.log('Loading floor plan:', floorKey, 'from:', config.src);

            var injectSvg = function(svgText) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(svgText, 'image/svg+xml');
                var inlineSvg = document.importNode(doc.documentElement, true);

                // Логируем viewBox загруженного SVG
                var viewBox = inlineSvg.getAttribute('viewBox');
                console.log('Loaded SVG viewBox:', viewBox);

                // Устанавливаем правильный viewBox для основного SVG
                if (viewBox) {
                    svgMap.setAttribute('viewBox', viewBox);
                }

                inlineSvg.removeAttribute('id');
                inlineSvg.setAttribute('width', '100%');
                inlineSvg.setAttribute('height', '100%');
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
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('HTTP ' + response.status);
                    }
                    return response.text();
                })
                .then(function(text) {
                    floorSvgCache[floorKey] = text;
                    injectSvg(text);
                })
                .catch(function(err) {
                    console.error('Не удалось загрузить SVG карту для ' + floorKey + ':', err);
                    resolve();
                });
        });
    }

    // --- ФУНКЦИИ РЕНДЕРИНГА ---
    function createListItem(service) {
        var item = document.createElement('div');
        item.className = 'ksmm-list-item';
        item.setAttribute('data-id', service.id);
        item.setAttribute('data-category', service.category);
        item.setAttribute('data-area-id', service.areaId);
        var formattedAttrs = formatAttributes(service);
        item.innerHTML = '\
            <h4>' + service.name + '</h4>\
            <p class="ksmm-item-attrs">' + formattedAttrs + '</p>\
        ';
        listContainer.appendChild(item);
        return item;
    }

    function renderMapAreas(b, f) {
        mapAreasContainer.innerHTML = '';
        setActiveArea(null);
        var servicesOnFloor = getServicesForFloor(b, f).filter(function(service) {
            return Boolean(service.areaId);
        });

        if (buildingFloorStructure[b]) {
            mapTitle.textContent = buildingFloorStructure[b].label + ', ' + f + ' этаж';
        }

        if (servicesOnFloor.length === 0) {
            var text = document.createElementNS(SVG_NS, 'text');
            text.setAttribute('x', (SVG_VIEWBOX_WIDTH / 2).toString());
            text.setAttribute('y', (SVG_VIEWBOX_HEIGHT / 2).toString());
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '24');
            text.setAttribute('fill', '#999');
            text.textContent = 'На этаже ' + f + ' пока нет отмеченных зон.';
            mapAreasContainer.appendChild(text);
            return;
        }

        servicesOnFloor.forEach(function(service) {
            var originalZone = getZoneElement(service.areaId);
            if (!originalZone || !originalZone.parentNode) return;

            var zone = originalZone.cloneNode(true);
            originalZone.parentNode.replaceChild(zone, originalZone);
            zone.removeAttribute('style');
            ['fill', 'stroke', 'stroke-width', 'opacity', 'fill-opacity'].forEach(function(attr) {
                zone.removeAttribute(attr);
            });

            zone.classList.add('ksmm-map-area');
            zone.setAttribute('data-service-id', service.id);
            zone.setAttribute('data-area-id', service.areaId);
            zone.setAttribute('data-category', service.category);
            zone.style.pointerEvents = 'all';

            zone.addEventListener('click', function() {
                showPopup(service);
                centerOnArea(service.areaId);
            });
            zone.addEventListener('mouseenter', function() {
                setHighlight(service.id, true);
            });
            zone.addEventListener('mouseleave', function() {
                setHighlight(service.id, false);
            });
        });
    }

    function renderFloorSwitcher() {
        floorSwitcher.innerHTML = '';

        for (var buildingKey in buildingFloorStructure) {
            if (buildingFloorStructure.hasOwnProperty(buildingKey)) {
                var bData = buildingFloorStructure[buildingKey];
                var title = document.createElement('div');
                title.className = 'ksmm-floor-group-title';
                title.textContent = bData.label;
                floorSwitcher.appendChild(title);

                bData.floors.sort(function(a, b) { return b - a; }).forEach(function(f) {
                    var btn = document.createElement('button');
                    btn.className = 'ksmm-floor-btn';
                    btn.textContent = f + ' этаж';
                    btn.setAttribute('data-building', buildingKey);
                    btn.setAttribute('data-floor', f);

                    if (buildingKey === currentBuilding && f === currentFloor) {
                        btn.classList.add('active');
                    }

                    btn.addEventListener('click', function() {
                        switchFloor(buildingKey, f);
                    });
                    floorSwitcher.appendChild(btn);
                });
            }
        }
    }

    function switchFloor(b, f) {
        currentBuilding = b;
        currentFloor = f;
        var floorKey = b + '-F' + f;

        var floorButtons = document.querySelectorAll('.ksmm-floor-btn');
        for (var i = 0; i < floorButtons.length; i++) {
            floorButtons[i].classList.remove('active');
        }
        var currentBtn = document.querySelector('.ksmm-floor-btn[data-building="' + b + '"][data-floor="' + f + '"]');
        if (currentBtn) currentBtn.classList.add('active');

        renderFloorBaseLayer(floorKey).then(function() {
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
        var servicesOnCurrentFloor = getServicesForFloor(currentBuilding, currentFloor);

        if (servicesOnCurrentFloor.length === 0) {
            listContainer.innerHTML = '<div style="padding: 15px; color: #999;">На этом этаже пока нет зарегистрированных сервисов.</div>';
            return;
        }

        servicesOnCurrentFloor.forEach(function(service) {
            var item = createListItem(service);
            item.addEventListener('click', function() {
                showPopup(service);
            });
            item.addEventListener('mouseenter', function() {
                setHighlight(service.id, true);
            });
            item.addEventListener('mouseleave', function() {
                setHighlight(service.id, false);
            });
        });

        var activeFilter = filterControls.querySelector('.active');
        var currentCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        renderSubfilters(currentCategory);
        updateView();
    }

    // --- ЛОГИКА ФИЛЬТРОВ ---
    var subfilterDefinitions = {
        'food': ['hours'],
        'sport': ['access'],
        'meeting': ['capacity', 'equipment'],
        'relax': ['type'],
        'service': ['hours']
    };

    function renderSubfilters(category) {
        subfilterControls.innerHTML = '';
        var definition = subfilterDefinitions[category];

        if (!definition) {
            subfilterControls.style.display = 'none';
            return;
        }

        subfilterControls.style.display = 'block';
        definition.forEach(function(attrKey) {
            var groupEl = document.createElement('div');
            groupEl.className = 'ksmm-subfilter-group';

            var allValues = allServices
                .filter(function(s) {
                    return s.building === currentBuilding && s.floor === currentFloor && s.category === category && s.attributes[attrKey];
                })
                .map(function(s) {
                    return s.attributes[attrKey];
                });

            var uniqueValues = allValues.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            }).sort();

            if (uniqueValues.length === 0) return;

            groupEl.innerHTML = '<div class="ksmm-subfilter-group-title">' + attrKey + '</div>';

            var allEl = document.createElement('span');
            allEl.className = 'ksmm-subfilter active';
            allEl.textContent = 'Все';
            allEl.setAttribute('data-key', attrKey);
            allEl.setAttribute('data-value', 'all');
            groupEl.appendChild(allEl);

            uniqueValues.forEach(function(value) {
                var el = document.createElement('span');
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
        var filters = {};
        var activeSubfilters = document.querySelectorAll('.ksmm-subfilter.active:not([data-value="all"])');
        for (var i = 0; i < activeSubfilters.length; i++) {
            var el = activeSubfilters[i];
            var key = el.getAttribute('data-key');
            var value = el.getAttribute('data-value');
            if (!filters[key]) filters[key] = [];
            filters[key].push(value);
        }
        return filters;
    }

    function updateView() {
        var activeFilter = filterControls.querySelector('.active');
        var currentCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        var currentSearch = searchInput.value.toLowerCase();
        var currentSubfilters = getActiveSubfilters();

        var currentFloorServices = allServices.filter(function(s) {
            return s.building === currentBuilding && s.floor === currentFloor;
        });

        currentFloorServices.forEach(function(service) {
            var id = service.id;
            var listItem = document.querySelector('.ksmm-list-item[data-id="' + id + '"]');
            var mapArea = document.querySelector('.ksmm-map-area[data-service-id="' + id + '"]');

            if (!listItem) return;

            var isCategoryMatch = (currentCategory === 'all' || service.category === currentCategory);
            var nameMatch = service.name.toLowerCase().indexOf(currentSearch) !== -1;
            var descMatch = service.desc.toLowerCase().indexOf(currentSearch) !== -1;
            var isSearchMatch = (currentSearch === '') || nameMatch || descMatch;

            var isSubfilterMatch = true;
            for (var key in currentSubfilters) {
                if (currentSubfilters.hasOwnProperty(key)) {
                    var serviceValue = service.attributes[key];
                    var allowedValues = currentSubfilters[key];
                    if (allowedValues.length > 0 && allowedValues.indexOf(serviceValue) === -1) {
                        isSubfilterMatch = false;
                        break;
                    }
                }
            }

            var isVisible = isCategoryMatch && isSearchMatch && isSubfilterMatch;

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
    }

    // --- ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ---
    async function init() {
        try {
            // Загружаем данные из Google Sheets
            allServices = await loadServicesFromGoogleSheet();

            // Если данные не загрузились, используем fallback
            if (allServices.length === 0) {
                console.warn('Не удалось загрузить данные из Google Sheets, используются тестовые данные');
                // Проверяем, есть ли уже данные от старой версии
                if (typeof allServices === 'undefined') {
                    allServices = [];
                }
            }

            // Генерируем структуру зданий
            buildingFloorStructure = generateBuildingStructure(allServices);

            // Устанавливаем текущее здание и этаж
            var buildingKeys = Object.keys(buildingFloorStructure);
            if (buildingKeys.length > 0) {
                currentBuilding = buildingKeys[0];
                currentFloor = buildingFloorStructure[currentBuilding].defaultFloor;
            }

            // Инициализируем интерфейс
            renderFloorSwitcher();
            switchFloor(currentBuilding, currentFloor);
            initMapInteraction();

            // Обработчики событий
            filterControls.addEventListener('click', function(e) {
                if (!e.target.matches('.ksmm-filter-btn')) return;
                filterControls.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                renderSubfilters(e.target.getAttribute('data-category'));
                updateView();
            });

            subfilterControls.addEventListener('click', function(e) {
                if (!e.target.matches('.ksmm-subfilter')) return;
                var el = e.target;
                var value = el.getAttribute('data-value');
                var groupContainer = el.parentElement;

                if (value === 'all') {
                    var subfilters = groupContainer.querySelectorAll('.ksmm-subfilter');
                    for (var i = 0; i < subfilters.length; i++) {
                        subfilters[i].classList.remove('active');
                    }
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

            searchInput.addEventListener('input', updateView);
            popupCloseBtn.addEventListener('click', hidePopup);

            console.log('Приложение инициализировано с данными из Google Sheets');

        } catch (error) {
            console.error('Ошибка инициализации приложения:', error);
        }
    }

    // Запускаем приложение
    init();
})();