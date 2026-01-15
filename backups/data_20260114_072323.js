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
        areaId: 'area',
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
    },
    {
        id: 501,
        name: 'Кофе-точка',
        category: 'food',
        building: 'B3',
        floor: 1,
        areaId: 'Group 1201',
        desc: 'Быстрый кофе, сэндвичи и снеки для перекуса.',
        contacts: 'Вн. 101',
        img: DUMMY_IMG_URL + 'Кофе-точка',
        link: '#',
        attributes: { location: 'Центральная зона', hours: '08:00-20:00' }
    },
    {
        id: 502,
        name: 'Вендинг',
        category: 'service',
        building: 'B3',
        floor: 1,
        areaId: 'Group 1202',
        desc: 'Автоматы с напитками, снеками и быстрыми перекусами.',
        contacts: 'Автомат',
        img: DUMMY_IMG_URL + 'Вендинг',
        link: '#',
        attributes: { location: 'У входа', hours: 'Круглосуточно' }
    },
    {
        id: 503,
        name: 'Гардероб',
        category: 'service',
        building: 'B3',
        floor: 1,
        areaId: 'Group 1200',
        desc: 'Хранение верхней одежды и личных вещей.',
        contacts: 'Вн. 102',
        img: DUMMY_IMG_URL + 'Гардероб',
        link: '#',
        attributes: { location: 'Входная зона', hours: '08:00-20:00' }
    },
    {
        id: 504,
        name: 'Входная группа',
        category: 'service',
        building: 'B3',
        floor: 1,
        areaId: 'Group 1203',
        desc: 'Ресепшн и информационная стойка.',
        contacts: 'Ресепшн',
        img: DUMMY_IMG_URL + 'Входная группа',
        link: '#',
        attributes: { location: 'Главный вход', hours: '08:00-20:00' }
    }
];

 const buildingFloorStructure = {
    'B1': { label: 'Корпус 1', floors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], defaultFloor: 3 },
    'B2': { label: 'Корпус 2', floors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], defaultFloor: 1 },
    'B3': { label: 'Корпус 3', floors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], defaultFloor: 1 }
};

const svgFloorPlans = {
    'B1-F1': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F2': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F3': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F4': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F5': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F6': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F7': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F8': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F9': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B1-F10': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F1': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F2': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F3': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F4': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F5': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F6': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F7': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F8': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F9': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B2-F10': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F1': {
        src: 'map/floor-B3-F1.svg',
        viewBox: '0 0 1035 316'
    },
    'B3-F2': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F3': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F4': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F5': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F6': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F7': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F8': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F9': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    },
    'B3-F10': {
        src: 'map/floor-B1-F3.svg',
        viewBox: '0 0 1991 909'
    }
};
