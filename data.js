 // --- 1. DUMMY ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---

 // Надежный URL для изображений-заглушек
 const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

 const allServices = [
     // B1 - Floor 7 
     { id: 108, name: 'Переговорка "Венера"', category: 'meeting', building: 'B1', floor: 7, areaId: 'B1-F7-R1', desc: 'С панорамным видом.', contacts: 'Вн. 701', img: DUMMY_IMG_URL + 'Переговорка "Венера"', link: 'https://booking.example.com/mars', attributes: { location: 'Б1-701', capacity: '20 чел', equipment: 'Проектор' } },
     { id: 109, name: 'VIP-Переговорка "Олимп"', category: 'meeting', building: 'B1', floor: 7, areaId: 'B1-F7-R2', desc: 'Для ТОП-менеджмента.', contacts: 'Вн. 702', img: DUMMY_IMG_URL + 'VIP-Переговорка "Олимп"', link: 'https://booking.example.com/mars', attributes: { location: 'Б1-702', capacity: '15 чел', equipment: 'Телеконференция' } },
     { id: 110, name: 'Кабинет ТОП-менеджмента', category: 'service', building: 'B1', floor: 7, areaId: 'B1-F7-R3', desc: 'Офис ТОП-менеджмента.', contacts: 'Секретариат', img: DUMMY_IMG_URL + 'Кабинет ТОП-менеджмента', link: '#', attributes: { location: 'Б1-703', access: 'Ограничен' } },

     // B1 - Floor 6 
     { id: 313, name: 'Зал совещаний "Град"', category: 'meeting', building: 'B1', floor: 6, areaId: 'B1-F6-R1', desc: 'Крупный зал для общих встреч.', contacts: 'Вн. 601', img: DUMMY_IMG_URL + 'Зал совещаний "Град"', link: '#', attributes: { location: 'Б1-601', capacity: '30 чел', equipment: 'Проектор, Звук' } },
     { id: 314, name: 'Отдел АХО', category: 'service', building: 'B1', floor: 6, areaId: 'B1-F6-R2', desc: 'Административно-хозяйственный отдел.', contacts: 'Вн. 605', img: DUMMY_IMG_URL + 'Отдел АХО', link: '#', attributes: { location: 'Б1-605', hours: '09:00-18:00' } },
     { id: 315, name: 'Капсулы для сна', category: 'relax', building: 'B1', floor: 6, areaId: 'B1-F6-R3', desc: 'Индивидуальные капсулы для быстрого отдыха.', contacts: 'Зона Релакса', img: DUMMY_IMG_URL + 'Капсулы для сна', link: '#', attributes: { location: 'Холл', type: 'Капсулы для сна' } },

     // B1 - Floor 5 
     { id: 310, name: 'Зал для Йоги', category: 'sport', building: 'B1', floor: 5, areaId: 'B1-F5-R1', desc: 'Групповые занятия, коврики.', contacts: 'Запись в приложении', img: DUMMY_IMG_URL + 'Зал для Йоги', link: '#', attributes: { location: 'Б1-502', access: 'По расписанию' } },
     { id: 311, name: 'IT-Склад', category: 'service', building: 'B1', floor: 5, areaId: 'B1-F5-R2', desc: 'Выдача расходников и комплектующих.', contacts: 'Вн. 50-01', img: DUMMY_IMG_URL + 'IT-Склад', link: '#', attributes: { location: 'Б1-505', access: 'По заявке' } },
     { id: 312, name: 'Кафетерий "5-й этаж"', category: 'food', building: 'B1', floor: 5, areaId: 'B1-F5-R3', desc: 'Смузи и ПП-закуски.', contacts: 'Барная стойка', img: DUMMY_IMG_URL + 'Кафетерий "5-й этаж"', link: '#', attributes: { location: 'Холл', hours: '09:00-19:00' } },

     // B1 - Floor 4 
     { id: 307, name: 'Кафе "Терраса"', category: 'food', building: 'B1', floor: 4, areaId: 'B1-F4-R1', desc: 'Кофе, десерты, летняя площадка.', contacts: 'Вн. 401', img: DUMMY_IMG_URL + 'Кафе "Терраса"', link: '#', attributes: { location: 'Б1-401', hours: '09:00-20:00' } },
     { id: 308, name: 'Массажный кабинет', category: 'relax', building: 'B1', floor: 4, areaId: 'B1-F4-R2', desc: 'Профессиональный массаж по записи.', contacts: 'Запись на портале', img: DUMMY_IMG_URL + 'Массажный кабинет', link: '#', attributes: { location: 'Б1-405', access: 'По записи' } },
     { id: 309, name: 'Переговорка "Нептун"', category: 'meeting', building: 'B1', floor: 4, areaId: 'B1-F4-R3', desc: 'На 6 человек, модульная мебель.', contacts: 'Вн. 410', img: DUMMY_IMG_URL + 'Переговорка "Нептун"', link: 'https://booking.example.com/neptun', attributes: { location: 'Б1-410', capacity: '6 чел', equipment: 'Флипчарт' } },

     // B1 - Floor 3 (Дефолтный этаж)
     { id: 101, name: 'Переговорка "Марс"', category: 'meeting', building: 'B1', floor: 3, areaId: 'B1-F3-R1', desc: 'На 10 человек, с большим экраном и флипчартом.', contacts: 'Вн. 315', img: DUMMY_IMG_URL + 'Переговорка "Марс"', link: 'https://booking.example.com/mars', attributes: { location: 'Б1-315', capacity: '10 чел', equipment: 'Проектор' } },
     { id: 102, name: 'Кофе-поинт (Эспрессо)', category: 'food', building: 'B1', floor: 3, areaId: 'B1-F3-R2', desc: 'Свежий кофе и снеки. Круглосуточно.', contacts: 'Этаж 3, у лифта', img: DUMMY_IMG_URL + 'Кофе-поинт (Эспрессо)', link: '#', attributes: { location: 'У лифта', hours: '24/7' } },
     { id: 103, name: 'Спортзал (Мат)', category: 'sport', building: 'B1', floor: 3, areaId: 'B1-F3-R3', desc: 'Коврики, гантели, мячи. Зона разминки.', contacts: 'Запись у админа', img: DUMMY_IMG_URL + 'Спортзал (Мат)', link: '#', attributes: { location: 'Б1-301', access: 'Свободный' } },
     { id: 104, name: 'Переговорка "Юпитер"', category: 'meeting', building: 'B1', floor: 3, areaId: 'B1-F3-R4', desc: 'На 4 человека, для быстрых встреч. Есть маркерная доска.', contacts: 'Вн. 312', img: DUMMY_IMG_URL + 'Переговорка "Юпитер"', link: 'https://booking.example.com/jupiter', attributes: { location: 'Б1-312', capacity: '4 чел', equipment: 'Маркерная доска' } },
     { id: 105, name: 'Зона отдыха (Диваны)', category: 'relax', building: 'B1', floor: 3, areaId: 'B1-F3-R5', desc: 'Мягкие диваны, пуфы и тихая музыка.', contacts: 'Холл 3 этажа', img: DUMMY_IMG_URL + 'Зона отдыха (Диваны)', link: '#', attributes: { location: 'Холл', type: 'Диваны, пуфы' } },
     { id: 106, name: 'IT Help Desk', category: 'service', building: 'B1', floor: 3, areaId: 'B1-F3-R6', desc: 'Помощь с техникой, ПО и доступом. Выдача оборудования.', contacts: 'Кабинет 305, Вн. 77-77', img: DUMMY_IMG_URL + 'IT Help Desk', link: 'https://helpdesk.example.com', attributes: { location: 'Б1-305', hours: '09:00-18:00' } },
     { id: 107, name: 'Кабинет психолога', category: 'relax', building: 'B1', floor: 3, areaId: 'B1-F3-R7', desc: 'Конфиденциально, по записи.', contacts: 'Запись на портале', img: DUMMY_IMG_URL + 'Кабинет психолога', link: '#', attributes: { location: 'Б1-308', access: 'По записи' } },

     // B1 - Floor 2 
     { id: 304, name: 'Переговорка "Земля"', category: 'meeting', building: 'B1', floor: 2, areaId: 'B1-F2-R1', desc: 'На 8 человек, с большой плазмой.', contacts: 'Вн. 201', img: DUMMY_IMG_URL + 'Переговорка "Земля"', link: 'https://booking.example.com/earth', attributes: { location: 'Б1-201', capacity: '8 чел', equipment: 'Плазма' } },
     { id: 305, name: 'Бухгалтерия', category: 'service', building: 'B1', floor: 2, areaId: 'B1-F2-R2', desc: 'Решение финансовых вопросов.', contacts: 'Вн. 205', img: DUMMY_IMG_URL + 'Бухгалтерия', link: '#', attributes: { location: 'Б1-205', access: 'По пропуску' } },
     { id: 306, name: 'Теннисный стол', category: 'sport', building: 'B1', floor: 2, areaId: 'B1-F2-R3', desc: 'Свободный доступ.', contacts: 'Зона отдыха', img: DUMMY_IMG_URL + 'Теннисный стол', link: '#', attributes: { location: 'Холл', access: 'Свободный доступ' } },

     // B1 - Floor 1 
     { id: 301, name: 'Столовая (Главный зал)', category: 'food', building: 'B1', floor: 1, areaId: 'B1-F1-R1', desc: 'Главный зал, комплексные обеды.', contacts: 'Вн. 10-01', img: DUMMY_IMG_URL + 'Столовая (Главный зал)', link: '#', attributes: { location: 'Б1-101', hours: '12:00-16:00' } },
     { id: 302, name: 'Отдел кадров', category: 'service', building: 'B1', floor: 1, areaId: 'B1-F1-R2', desc: 'HR-вопросы, оформление документов.', contacts: 'Кабинет 105', img: DUMMY_IMG_URL + 'Отдел кадров', link: 'https://hr.example.com', attributes: { location: 'Б1-105', hours: '09:00-18:00' } },
     { id: 303, name: 'Зона ожидания', category: 'relax', building: 'B1', floor: 1, areaId: 'B1-F1-R3', desc: 'Диваны для гостей и посетителей.', contacts: 'Стойка ресепшн', img: DUMMY_IMG_URL + 'Зона ожидания', link: '#', attributes: { location: 'Холл', type: 'Диваны' } },

     // B2 - Floor 2 
     { id: 316, name: 'Кафе "Фьюжн"', category: 'food', building: 'B2', floor: 2, areaId: 'B2-F2-A1', desc: 'Кофе, сэндвичи, европейская кухня.', contacts: 'Барная стойка', img: DUMMY_IMG_URL + 'Кафе "Фьюжн"', link: '#', attributes: { location: 'Б2-201', hours: '09:00-19:00' } },
     { id: 317, name: 'Бильярдная', category: 'sport', building: 'B2', floor: 2, areaId: 'B2-F2-A2', desc: 'Два стола, кии, свободный доступ.', contacts: 'Зона отдыха', img: DUMMY_IMG_URL + 'Бильярдная', link: '#', attributes: { location: 'Б2-205', access: 'Свободный доступ' } },
     { id: 318, name: 'Переговорка "Шаттл"', category: 'meeting', building: 'B2', floor: 2, areaId: 'B2-F2-A3', desc: 'На 12 человек, с системой видеоконференцсвязи.', contacts: 'Вн. 210', img: DUMMY_IMG_URL + 'Переговорка "Шаттл"', link: 'https://booking.example.com/shuttle', attributes: { location: 'Б2-210', capacity: '12 чел', equipment: 'ВКС' } },

     // B2 - Floor 1 
     { id: 201, name: 'Столовая (Корпус 2)', category: 'food', building: 'B2', floor: 1, areaId: 'B2-F1-A1', desc: 'Ежедневное меню с 12:00 до 16:00.', contacts: 'Вн. 20-01', img: DUMMY_IMG_URL + 'Столовая (Корпус 2)', link: '#', attributes: { location: 'Б2-101', hours: '12:00-16:00' } },
     { id: 202, name: 'Зал для презентаций "Форум"', category: 'meeting', building: 'B2', floor: 1, areaId: 'B2-F1-A2', desc: 'Большой зал на 100 человек.', contacts: 'Отдел Ивентов', img: DUMMY_IMG_URL + 'Зал для презентаций "Форум"', link: '#', attributes: { location: 'Б2-102', capacity: '100 чел' } },
     { id: 203, name: 'Киберспортивная зона', category: 'sport', building: 'B2', floor: 1, areaId: 'B2-F1-A3', desc: 'ПК и консоли для турниров.', contacts: 'Свободный доступ', img: DUMMY_IMG_URL + 'Киберспортивная зона', link: '#', attributes: { location: 'Б2-103', access: 'Свободный' } },
     { id: 204, name: 'Медпункт', category: 'service', building: 'B2', floor: 1, areaId: 'B2-F1-A4', desc: 'Первая помощь, прививки.', contacts: 'Вн. 90-09', img: DUMMY_IMG_URL + 'Медпункт', link: '#', attributes: { location: 'Б2-104', hours: '24/7' } },
     { id: 205, name: 'Массажные кресла', category: 'relax', building: 'B2', floor: 1, areaId: 'B2-F1-A5', desc: 'Три кресла для быстрого релакса.', contacts: 'Зона отдыха', img: DUMMY_IMG_URL + 'Массажные кресла', link: '#', attributes: { location: 'Холл', type: 'Кресла' } },
 ];

 const buildingFloorStructure = {
     'B1': { label: 'Корпус 1', floors: [7, 6, 5, 4, 3, 2, 1], defaultFloor: 3 },
     'B2': { label: 'Корпус 2', floors: [2, 1], defaultFloor: 1 }
 };

 const areaDefinitions = {
     // B1 - Floor 7
     'B1-F7': [
         { id: 'B1-F7-R1', d: 'M 100 100 L 700 100 L 700 200 L 100 200 Z', category: 'meeting', xCenter: 400, yCenter: 150, serviceId: 108 },
         { id: 'B1-F7-R2', d: 'M 100 300 L 400 300 L 400 550 L 100 550 Z', category: 'meeting', xCenter: 250, yCenter: 425, serviceId: 109 },
         { id: 'B1-F7-R3', d: 'M 450 300 L 750 300 L 750 550 L 450 550 Z', category: 'service', xCenter: 600, yCenter: 425, serviceId: 110 },
     ],
     // B1 - Floor 6 
     'B1-F6': [
         { id: 'B1-F6-R1', d: 'M 50 50 L 300 50 L 300 200 L 50 200 Z', category: 'meeting', xCenter: 175, yCenter: 125, serviceId: 313 },
         { id: 'B1-F6-R2', d: 'M 350 100 L 550 100 L 550 300 L 350 300 Z', category: 'service', xCenter: 450, yCenter: 200, serviceId: 314 },
         { id: 'B1-F6-R3', d: 'M 600 50 L 750 50 L 750 150 L 600 150 Z', category: 'relax', xCenter: 675, yCenter: 100, serviceId: 315 },
     ],
     // B1 - Floor 5 
     'B1-F5': [
         { id: 'B1-F5-R1', d: 'M 150 150 L 250 150 L 250 250 L 150 250 Z', category: 'sport', xCenter: 200, yCenter: 200, serviceId: 310 },
         { id: 'B1-F5-R2', d: 'M 50 350 L 350 350 L 350 550 L 50 550 Z', category: 'service', xCenter: 200, yCenter: 450, serviceId: 311 },
         { id: 'B1-F5-R3', d: 'M 500 400 L 750 400 L 750 550 L 500 550 Z', category: 'food', xCenter: 625, yCenter: 475, serviceId: 312 },
     ],
     // B1 - Floor 4 
     'B1-F4': [
         { id: 'B1-F4-R1', d: 'M 500 50 L 700 50 L 700 200 L 500 200 Z', category: 'food', xCenter: 600, yCenter: 125, serviceId: 307 },
         { id: 'B1-F4-R2', d: 'M 100 450 L 200 450 L 200 550 L 100 550 Z', category: 'relax', xCenter: 150, yCenter: 500, serviceId: 308 },
         { id: 'B1-F4-R3', d: 'M 300 350 L 550 350 L 550 500 L 300 500 Z', category: 'meeting', xCenter: 425, yCenter: 425, serviceId: 309 },
     ],
     // B1 - Floor 3 (ОСТАВЛЕН)
     'B1-F3': [
         { id: 'B1-F3-R1', d: 'M 100 400 L 300 400 L 300 500 L 100 500 Z', category: 'meeting', xCenter: 200, yCenter: 450, serviceId: 101 },
         { id: 'B1-F3-R2', d: 'M 350 250 L 450 250 L 450 350 L 350 350 Z', category: 'food', xCenter: 400, yCenter: 300, serviceId: 102 },
         { id: 'B1-F3-R3', d: 'M 550 450 L 650 450 L 650 550 L 550 550 Z', category: 'sport', xCenter: 600, yCenter: 500, serviceId: 103 },
         { id: 'B1-F3-R4', d: 'M 200 300 L 330 300 L 330 380 L 200 380 Z', category: 'meeting', xCenter: 265, yCenter: 340, serviceId: 104 },
         { id: 'B1-F3-R5', d: 'M 500 100 L 650 100 L 650 250 L 500 250 Z', category: 'relax', xCenter: 575, yCenter: 175, serviceId: 105 },
         { id: 'B1-F3-R6', d: 'M 300 50 L 450 50 L 450 150 L 300 150 Z', category: 'service', xCenter: 375, yCenter: 100, serviceId: 106 },
         { id: 'B1-F3-R7', d: 'M 680 100 L 780 100 L 780 200 L 680 200 Z', category: 'relax', xCenter: 730, yCenter: 150, serviceId: 107 },
     ],
     // B1 - Floor 2 
     'B1-F2': [
         { id: 'B1-F2-R1', d: 'M 50 300 L 250 300 L 250 450 L 50 450 Z', category: 'meeting', xCenter: 150, yCenter: 375, serviceId: 304 },
         { id: 'B1-F2-R2', d: 'M 350 50 L 550 50 L 550 150 L 350 150 Z', category: 'service', xCenter: 450, yCenter: 100, serviceId: 305 },
         { id: 'B1-F2-R3', d: 'M 600 300 L 700 300 L 700 400 L 600 400 Z', category: 'sport', xCenter: 650, yCenter: 350, serviceId: 306 },
     ],
     // B1 - Floor 1 
     'B1-F1': [
         { id: 'B1-F1-R1', d: 'M 50 50 L 400 50 L 400 250 L 50 250 Z', category: 'food', xCenter: 225, yCenter: 150, serviceId: 301 },
         { id: 'B1-F1-R2', d: 'M 50 350 L 250 350 L 250 500 L 50 500 Z', category: 'service', xCenter: 150, yCenter: 425, serviceId: 302 },
         { id: 'B1-F1-R3', d: 'M 600 300 L 750 300 L 750 400 L 600 400 Z', category: 'relax', xCenter: 675, yCenter: 350, serviceId: 303 },
     ],
     // B2 - Floor 2 
     'B2-F2': [
         { id: 'B2-F2-A1', d: 'M 400 100 L 750 100 L 750 250 L 400 250 Z', category: 'food', xCenter: 575, yCenter: 175, serviceId: 316 },
         { id: 'B2-F2-A2', d: 'M 50 100 L 300 100 L 300 250 L 50 250 Z', category: 'sport', xCenter: 175, yCenter: 175, serviceId: 317 },
         { id: 'B2-F2-A3', d: 'M 50 400 L 200 400 L 200 550 L 50 550 Z', category: 'meeting', xCenter: 125, yCenter: 475, serviceId: 318 },
     ],
     // B2 - Floor 1 
     'B2-F1': [
         { id: 'B2-F1-A1', d: 'M 50 150 L 300 150 L 300 350 L 50 350 Z', category: 'food', xCenter: 175, yCenter: 250, serviceId: 201 },
         { id: 'B2-F1-A2', d: 'M 350 50 L 600 50 L 600 250 L 350 250 Z', category: 'meeting', xCenter: 475, yCenter: 150, serviceId: 202 },
         { id: 'B2-F1-A3', d: 'M 620 350 L 750 350 L 750 550 L 620 550 Z', category: 'sport', xCenter: 685, yCenter: 450, serviceId: 203 },
         { id: 'B2-F1-A4', d: 'M 50 400 L 200 400 L 200 600 L 50 600 Z', category: 'service', xCenter: 125, yCenter: 500, serviceId: 204 },
         { id: 'B2-F1-A5', d: 'M 450 500 L 600 500 L 600 600 L 450 600 Z', category: 'relax', xCenter: 525, yCenter: 550, serviceId: 205 },
     ]
 };