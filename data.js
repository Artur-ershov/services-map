 // --- 1. DUMMY ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---

 // Надежный URL для изображений-заглушек
 const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

const allServices = [
    {
        id: 401,
        name: 'Переговорка «Альфа»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_10',
        desc: 'Главная переговорная на 12 человек с системой видеосвязи.',
        contacts: 'Вн. 301',
        img: DUMMY_IMG_URL + 'Переговорка «Альфа»',
        link: '#',
        attributes: { location: 'Центральный блок', capacity: '12 чел', equipment: 'LED-стена, ВКС' }
    },
    {
        id: 402,
        name: 'Переговорка «Север»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_4',
        desc: 'Комната с панорамным видом и длинным столом для воркшопов.',
        contacts: 'Вн. 302',
        img: DUMMY_IMG_URL + 'Переговорка «Север»',
        link: '#',
        attributes: { location: 'Северный блок', capacity: '10 чел', equipment: 'Проектор' }
    },
    {
        id: 403,
        name: 'Переговорка «Бета»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_3',
        desc: 'Классическая переговорная для проектной команды.',
        contacts: 'Вн. 303',
        img: DUMMY_IMG_URL + 'Переговорка «Бета»',
        link: '#',
        attributes: { location: 'Секция Бета', capacity: '8 чел', equipment: 'ClickShare' }
    },
    {
        id: 404,
        name: 'Переговорка «Бета-4»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_2',
        desc: 'Фокус-комната с круговым столом для дизайн-сессий.',
        contacts: 'Вн. 304',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-4»',
        link: '#',
        attributes: { location: 'Секция Бета', capacity: '6 чел', equipment: 'Флипчарт' }
    },
    {
        id: 405,
        name: 'Переговорка «Бета-5»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_8',
        desc: 'Уютная переговорка в глубине зала для stand-up встреч.',
        contacts: 'Вн. 305',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-5»',
        link: '#',
        attributes: { location: 'Секция Бета', capacity: '6 чел', equipment: 'Флипчарт' }
    },
    {
        id: 406,
        name: 'Переговорка «Бета-6»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_9',
        desc: 'Переговорная для больших команд с модульной мебелью.',
        contacts: 'Вн. 306',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-6»',
        link: '#',
        attributes: { location: 'Южное крыло', capacity: '6 чел', equipment: 'Флипчарт' }
    },
    {
        id: 407,
        name: 'Переговорка «Бета-7»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_5',
        desc: 'Пространство для неформальных встреч на диванах.',
        contacts: 'Вн. 307',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-7»',
        link: '#',
        attributes: { location: 'У лифта', capacity: '6 чел', equipment: 'Флипчарт' }
    },
    {
        id: 408,
        name: 'Переговорка «Бета-3»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_6',
        desc: 'Шумопоглощающая переговорная для онлайн-созвонов.',
        contacts: 'Вн. 308',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-3»',
        link: '#',
        attributes: { location: 'Секция Бета', capacity: '6 чел', equipment: 'Флипчарт' }
    },
    {
        id: 409,
        name: 'Переговорка «Бета-2»',
        category: 'meeting',
        building: 'B1',
        floor: 3,
        areaId: 'area_7',
        desc: 'Переговорная на быстрые one-on-one и ревью.',
        contacts: 'Вн. 309',
        img: DUMMY_IMG_URL + 'Переговорка «Бета-2»',
        link: '#',
        attributes: { location: 'Секция Бета', capacity: '3 чел', equipment: 'Сенсорная панель' }
    },
    {
        id: 410,
        name: 'Столовая «Север»',
        category: 'food',
        building: 'B1',
        floor: 3,
        areaId: 'area_12',
        desc: 'Основная столовая этажа — горячие блюда и фуд-корты.',
        contacts: 'Вн. 320',
        img: DUMMY_IMG_URL + 'Столовая «Север»',
        link: '#',
        attributes: { location: 'Центр этажа', hours: '08:00-19:00' }
    },
    {
        id: 411,
        name: 'Буфет «Снэк»',
        category: 'food',
        building: 'B1',
        floor: 3,
        areaId: 'area_11',
        desc: 'Граб-н-го зона с круассанами, смузи и матча.',
        contacts: 'Буфетчик',
        img: DUMMY_IMG_URL + 'Буфет «Снэк»',
        link: '#',
        attributes: { location: 'У лестницы', hours: '09:00-18:00' }
    }
];

 const buildingFloorStructure = {
     'B1': { label: 'Корпус 1', floors: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], defaultFloor: 3 },
     'B2': { label: 'Корпус 2', floors: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], defaultFloor: 1 },
     'B3': { label: 'Корпус 3', floors: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], defaultFloor: 1 }
 };

const svgFloorPlans = {
    'B1-F1': { src: 'floor-B1-F1.svg', viewBox: '0 0 1991 909' },
    'B1-F2': { src: 'floor-B1-F2.svg', viewBox: '0 0 1991 909' },
    'B1-F3': { src: 'floor-B1-F3.svg', viewBox: '0 0 1991 909' },
    'B1-F4': { src: 'floor-B1-F4.svg', viewBox: '0 0 1991 909' },
    'B1-F5': { src: 'floor-B1-F5.svg', viewBox: '0 0 1991 909' },
    'B1-F6': { src: 'floor-B1-F6.svg', viewBox: '0 0 1991 909' },
    'B1-F7': { src: 'floor-B1-F7.svg', viewBox: '0 0 1991 909' },
    'B1-F8': { src: 'floor-B1-F8.svg', viewBox: '0 0 1991 909' },
    'B1-F9': { src: 'floor-B1-F9.svg', viewBox: '0 0 1991 909' },
    'B1-F10': { src: 'floor-B1-F10.svg', viewBox: '0 0 1991 909' },
    'B2-F1': { src: 'floor-B2-F1.svg', viewBox: '0 0 1991 909' },
    'B2-F2': { src: 'floor-B2-F2.svg', viewBox: '0 0 1991 909' },
    'B2-F3': { src: 'floor-B2-F3.svg', viewBox: '0 0 1991 909' },
    'B2-F4': { src: 'floor-B2-F4.svg', viewBox: '0 0 1991 909' },
    'B2-F5': { src: 'floor-B2-F5.svg', viewBox: '0 0 1991 909' },
    'B2-F6': { src: 'floor-B2-F6.svg', viewBox: '0 0 1991 909' },
    'B2-F7': { src: 'floor-B2-F7.svg', viewBox: '0 0 1991 909' },
    'B2-F8': { src: 'floor-B2-F8.svg', viewBox: '0 0 1991 909' },
    'B2-F9': { src: 'floor-B2-F9.svg', viewBox: '0 0 1991 909' },
    'B2-F10': { src: 'floor-B2-F10.svg', viewBox: '0 0 1991 909' },
    'B3-F1': { src: 'floor-B3-F1.svg', viewBox: '0 0 1991 909' },
    'B3-F2': { src: 'floor-B3-F2.svg', viewBox: '0 0 1991 909' },
    'B3-F3': { src: 'floor-B3-F3.svg', viewBox: '0 0 1991 909' },
    'B3-F4': { src: 'floor-B3-F4.svg', viewBox: '0 0 1991 909' },
    'B3-F5': { src: 'floor-B3-F5.svg', viewBox: '0 0 1991 909' },
    'B3-F6': { src: 'floor-B3-F6.svg', viewBox: '0 0 1991 909' },
    'B3-F7': { src: 'floor-B3-F7.svg', viewBox: '0 0 1991 909' },
    'B3-F8': { src: 'floor-B3-F8.svg', viewBox: '0 0 1991 909' },
    'B3-F9': { src: 'floor-B3-F9.svg', viewBox: '0 0 1991 909' },
    'B3-F10': { src: 'floor-B3-F10.svg', viewBox: '0 0 1991 909' }
};

// Определения областей на картах этажей
// Каждая область содержит: id, d (SVG path), serviceId, xCenter, yCenter
const areaDefinitions = {
    'B1-F3': [
        { id: 'area_2', d: 'M 100 100 L 200 100 L 200 200 L 100 200 Z', serviceId: 404, xCenter: 150, yCenter: 150 },
        { id: 'area_3', d: 'M 250 100 L 350 100 L 350 200 L 250 200 Z', serviceId: 403, xCenter: 300, yCenter: 150 },
        { id: 'area_4', d: 'M 400 100 L 500 100 L 500 200 L 400 200 Z', serviceId: 402, xCenter: 450, yCenter: 150 },
        { id: 'area_5', d: 'M 550 100 L 650 100 L 650 200 L 550 200 Z', serviceId: 407, xCenter: 600, yCenter: 150 },
        { id: 'area_6', d: 'M 100 250 L 200 250 L 200 350 L 100 350 Z', serviceId: 408, xCenter: 150, yCenter: 300 },
        { id: 'area_7', d: 'M 250 250 L 350 250 L 350 350 L 250 350 Z', serviceId: 409, xCenter: 300, yCenter: 300 },
        { id: 'area_8', d: 'M 400 250 L 500 250 L 500 350 L 400 350 Z', serviceId: 405, xCenter: 450, yCenter: 300 },
        { id: 'area_9', d: 'M 550 250 L 650 250 L 650 350 L 550 350 Z', serviceId: 406, xCenter: 600, yCenter: 300 },
        { id: 'area_10', d: 'M 100 400 L 300 400 L 300 500 L 100 500 Z', serviceId: 401, xCenter: 200, yCenter: 450 },
        { id: 'area_11', d: 'M 350 400 L 450 400 L 450 500 L 350 500 Z', serviceId: 411, xCenter: 400, yCenter: 450 },
        { id: 'area_12', d: 'M 500 400 L 700 400 L 700 500 L 500 500 Z', serviceId: 410, xCenter: 600, yCenter: 450 }
    ]
};
