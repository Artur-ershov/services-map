// --- ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---
// Автоматически сгенерировано из CSV таблицы
// Дата генерации: 2026-01-26 10:48:12

const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

const allServices = [
    {
        id: 1000,
        name: "Входная группа",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-enter",
        desc: "для удобства ваших гостей организована зона ожидания https://andreymashkin.ru/disk/share/Y76a8zsnZ8qv6",
        contacts: "",
        img: "images/andreymashkin_7KAD3WueOqq86.jpg",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1001,
        name: "Отдел писем",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-letter",
        desc: "Приём и выдача корреспонденции<br><br>Дополнителньо смотри информацию про Почтовые отправления и курьерскую доставку (https://jive.croc.ru/community/knowledge/everyday/social/pochtovye-otpravleniya-i-kurerskaya-dostavka)",
        contacts: "тел. #4940<br>Otdel_pisem@croc.ru",
        img: "",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/sekretariat#post",
        attributes: {
            location: "108",
            hours: "График работы: понедельник пятница с 9:00 до 23:00"
        }
    },
    {
        id: 1002,
        name: "КРОК кофе",
        category: "food",
        building: "B1",
        floor: 1,
        areaId: "b1f1-coffee",
        desc: "Точка подзарядки вкусным кофе",
        contacts: "",
        img: "images/andreymashkin_eeVndbCkDv3zb.jpg",
        link: "#",
        attributes: {
            hours: "График работы: понедельник пятница с 9:00 до 20:00"
        }
    },
    {
        id: 1003,
        name: "Банкомат Сбербанка",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-atm",
        desc: "Банкомат: Сбербанк, работает на внесение и снятие наличных денежных средств",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1004,
        name: "Вендинг",
        category: "food",
        building: "B1",
        floor: 1,
        areaId: "b1f1-vending",
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.<br>1 этаж Альфа и Бета - микромаркет ВкусВилл;<br> 5, 6, 7, 8, 9, 10 этажи Альфа – вэндинг со снэками.",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1005,
        name: "Гардероб",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-garderob",
        desc: "Гардероб предназначен для хранения верхней одежды, а также обуви в пакетах.<br>В гардеробе альфа расположены Локеры, которые предназначены для хранения пакетов, зонтов и других личных вещей небольшого размера.<br><br>Для удобства все ячейки пронумерованы.<br><br>Информационно: <br>Для поддержания чистоты и комфортности использования просим не оставлять в ячейках еду и напитки.<br><br>Хранение личных вещей предполагается только в течение одного рабочего дня, запирать локер на более длительный период и уносить ключ домой запрещено.",
        contacts: "Альфа - VOnufreichik@croc.ru<br>Бета - AntKalinin@croc.ru",
        img: "images/andreymashkin_XRYPVXsx76v3P.jpg",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1006,
        name: "Лифты",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-elevator-1",
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.<br><br>При неисправности лифта следует:<br>нажать колокольчик и описать<br>ситуацию диспетчеру<br>ЛИБО<br>позвонить 8 (495) 974-22-74<br>доб 83-02, 83-03, круглосуточно<br>ЛИБО<br>позвонить дежурному лифтеру<br>ООО «ЛифтКомплекс» 8 (495) 974-22-74<br>доб 83-01.",
        contacts: "FieldService@croc.ru",
        img: "images/andreymashkin_y0rVxlSZKk8Xo.jpg",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1007,
        name: "Charity Shop",
        category: "eco",
        building: "B1",
        floor: 1,
        areaId: "b1f1-charity-shop",
        desc: "Пункт сбора ненужной одежды для переработки и вторичного использования",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4216",
        attributes: {
        }
    },
    {
        id: 1008,
        name: "EcoPoint",
        category: "eco",
        building: "B1",
        floor: 1,
        areaId: "b1f1-eco-point",
        desc: "Точка сбора трудноперерабатываемых отходов<br>Собираем: ручки и фломастеры, блистеры от таблеток, постельное бельё (позже заменим на пластиковые карты / LEGO), зубные щётки.<br><br>Больше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1009,
        name: "Утилизация батареек",
        category: "eco",
        building: "B1",
        floor: 1,
        areaId: "b1f1-batteries",
        desc: "Точка утилизации батареек<br><br>Больше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1010,
        name: "Станция мониторинга воздуха AirVisual",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "b1f1-air",
        desc: "В нашем офисе установлены приборы по анализу качества воздуха в офисе. Они позволяют нам контролировать состояние воздуха в помещениях, сравнивать его с параметрами воздуха на улице и оперативно принимать меры при наличии отклонений, чтобы сделать ваше пребывание в офисе еще более комфортным<br><br>Больше информации про ЭКО-офис: https://jive.croc.ru/docs/DOC-239136",
        contacts: "FieldService@croc.ru",
        img: "",
        link: "https://jive.croc.ru/docs/DOC-287102",
        attributes: {
        }
    },
    {
        id: 1011,
        name: "Конференц-зал + холл перед ним",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-212",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_ozWe94uAZMd9k.jpg\nimages/andreymashkin_6MZG26hp9mPvX.jpg\nimages/andreymashkin_zoqVAmHJ71gkb.jpg",
        attributes: {
            location: "212",
            capacity: 100
        }
    },
    {
        id: 1012,
        name: "Конференц-зал",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-214",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_gWGdybS0yPd3q.jpg",
        link: "#",
        attributes: {
            location: "214",
            capacity: 30
        }
    },
    {
        id: 1013,
        name: "Переговорная 204",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-204",
        desc: "ВКС<br>Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "204",
            capacity: 6
        }
    },
    {
        id: 1014,
        name: "Переговорная 206",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-206",
        desc: "ВКС<br>Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "206",
            capacity: 8
        }
    },
    {
        id: 1015,
        name: "Переговорная 208",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-208",
        desc: "ВСК, флипчарт<br>Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "208",
            capacity: 10
        }
    },
    {
        id: 1016,
        name: "Переговорная 210",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-210",
        desc: "ВКС<br>Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "210",
            capacity: 9
        }
    },
    {
        id: 1017,
        name: "Учебный класс (аудитория  202)",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-202",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "202",
            capacity: 70
        }
    },
    {
        id: 1018,
        name: "Мультимедийный класс",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-2b",
        desc: "ВКС<br>Бронируй через календарь в Outlook",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "2Б",
            capacity: 7
        }
    },
    {
        id: 1019,
        name: "Столовая",
        category: "food",
        building: "B1",
        floor: 2,
        areaId: "b1f2-stolovaya",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОК<br>Основной зал<br>2 мягкие зоны",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_kmDWabUzP83Q2.jpg\nimages/andreymashkin_G09JoeSx16y3M.jpg\nimages/andreymashkin_22gG7MuDggp6G.jpg\nimages/andreymashkin_b8AVKqhX9ekd6.jpg\nimages/andreymashkin_4KvpGYu59b10O.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1020,
        name: "Летняя веранда",
        category: "relax",
        building: "B1",
        floor: 2,
        areaId: "service_Летняя-веранда",
        desc: "для встреч с коллегами или гостями в летний период работает открытая летня веранда",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1021,
        name: "Утилизация пластиковых крышек",
        category: "eco",
        building: "B1",
        floor: 2,
        areaId: "b1f2-plastic",
        desc: "Точка сбора пластиковых крышек для дальнейшей переработки",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1022,
        name: "Зона для настольных игр",
        category: "relax",
        building: "B1",
        floor: 2,
        areaId: "b1f2-nastolka",
        desc: "Тот самый уголок в столовой «Альфа» теперь зона релакса и игр! <br>Здесь можно отдохнуть от рабочих задач, поболтать с коллегами или сразиться в настолки. <br>Тебя ждет множество игр, удобные пуфики и расслабленная атмосфера, в которой хочется остаться.<br>Бронируй пространство через Outlook для своей компании - имя пространства *Play Zone*",
        contacts: "",
        img: "images/andreymashkin_02XRVKuegZ6k7.jpg\nimages/andreymashkin_AXnVWvs5BW9aV.jpg",
        link: "#",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1023,
        name: "Буфет",
        category: "food",
        building: "B1",
        floor: 2,
        areaId: "b1f2-201",
        desc: "Пространство для еды и встреч с выходом на летнюю веранду.<br>Можно заказать блюда к определенному времени по телефону #8368<br><br>Доступна оплата части стоимости заказа картой-пропуском, а также проверка остатка баланса на карте.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_ngye5OCvyJM07.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            location: "201",
            hours: "Часы работы: 11:00-19:00\nЗаказы принимаются до 16:00"
        }
    },
    {
        id: 1024,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 3,
        areaId: "b1f3-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1025,
        name: "Кикер",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "b1f3-kicker",
        desc: "Зона для игр",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            location: "холл (оранжевый квадратик на карте )"
        }
    },
    {
        id: 1026,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 3,
        areaId: "b1f3-3b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_JZeVJvuWxJvn0.jpg",
        link: "#",
        attributes: {
            location: "3Б",
            capacity: 3
        }
    },
    {
        id: 1027,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 3,
        areaId: "b1f3-306",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.<br><br>ВКС",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "306",
            capacity: 8
        }
    },
    {
        id: 1028,
        name: "Комната отдыха",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "b1f3-rest",
        desc: "Уютное пространство для отдыха, разделённое на несколько зон:<br>     ·Игровая — с плазмой и мультимедийным оборудованием;<br>     ·Мягкая — с акустической стеной и диваном-трансформером<br>     ·Дзен — с массажными креслами и расслабляющей подсветкой под настроение.<br>Бронируй пространство<br>      через календарь в Outlook",
        contacts: "FieldService@croc.ru",
        img: "images/andreymashkin_WOMWqau3KqPo9.jpg\nimages/andreymashkin_JZeVJvuWxJ70x.jpg",
        link: "#",
        attributes: {
            location: "316",
            hours: "Время бронирования\n      доступно с 9 до 21ч"
        }
    },
    {
        id: 1029,
        name: "Спортзал",
        category: "sport",
        building: "B1",
        floor: 3,
        areaId: "b1f3-gym",
        desc: "Площадь 190 м2,<br>Доступ 24/7<br>5 зон для занятия различными видами спорта<br>8 тренажеров<br>Групповые программы <br><br>Подробнее о спортзале: https://jive.croc.ru/community/knowledge/everyday/corporate/sport/gym",
        contacts: "",
        img: "images/andreymashkin_WOMWqau3Kq5xn.jpg\nimages/andreymashkin_D4WEXGSnYXpQY.jpg\nimages/andreymashkin_RrOMAYu0qAe0q.jpg\nimages/andreymashkin_8nbGEPsG6VRdv.jpg",
        link: "#",
        attributes: {
            location: "318"
        }
    },
    {
        id: 1030,
        name: "Раздевалка и душевые (спортзал)",
        category: "sport",
        building: "B1",
        floor: 3,
        areaId: "b1f3-razdevalka",
        desc: "Мужская/женская раздевалки <br>Шкафчики для ождежды <br>Фен <br>Душевые кабинки<br>Санузел",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            location: "318"
        }
    },
    {
        id: 1031,
        name: "Стоматологический кабинет",
        category: "health",
        building: "B1",
        floor: 3,
        areaId: "b1f3-308b",
        desc: "Услуги оказываются по ДМС.<br>Доктор:  Климчук Мария <br>Запись на прием:<br>+7-926-535-52-27<br><br>Внутренний телефон стоматологического кабинета: 8321",
        contacts: "",
        img: "images/andreymashkin_ZRP375srMARBr.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/stomatology",
        attributes: {
            location: "308",
            hours: "Каждую неделю по вторникам.\nТребуется предварительная запись"
        }
    },
    {
        id: 1032,
        name: "Кабинет парикмахера и мастера по маникюру",
        category: "beauty",
        building: "B1",
        floor: 3,
        areaId: "b1f3-314",
        desc: "Кабинет можно забронировать для своего мастера",
        contacts: "",
        img: "images/andreymashkin_KzBrRvuP9RO0x.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/parikmaxer",
        attributes: {
            location: "314"
        }
    },
    {
        id: 1033,
        name: "Массажный кабинет",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "b1f3-308a",
        desc: "Кабинет можно забронировать для своего мастера",
        contacts: "",
        img: "",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/massazhnyj-kabinet",
        attributes: {
            location: "308А"
        }
    },
    {
        id: 1034,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 Б",
            capacity: 3
        }
    },
    {
        id: 1035,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402g",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 Г",
            capacity: 3
        }
    },
    {
        id: 1036,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402d",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 Д",
            capacity: 3
        }
    },
    {
        id: 1037,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402e",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 Е",
            capacity: 3
        }
    },
    {
        id: 1038,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402z",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 З",
            capacity: 3
        }
    },
    {
        id: 1039,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402i",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 И",
            capacity: 3
        }
    },
    {
        id: 1040,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402k",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 К",
            capacity: 3
        }
    },
    {
        id: 1041,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402l",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "402 Л",
            capacity: 3
        }
    },
    {
        id: 1042,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-4b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "4Б",
            capacity: 4
        }
    },
    {
        id: 1043,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 4,
        areaId: "b1f4-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1044,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 4,
        areaId: "b1f4-r",
        desc: "",
        contacts: "",
        img: "images/andreymashkin_xAl7ZoFDnz1O8.jpg",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
            hours: "с 9:00-23:00"
        }
    },
    {
        id: 1045,
        name: "Зона ожидания",
        category: "relax",
        building: "B1",
        floor: 4,
        areaId: "b1f4-w",
        desc: "",
        contacts: "",
        img: "images/andreymashkin_vxBekbfbp1XdJ.jpg\nimages/andreymashkin_zoqVAmHJ71l8O.jpg",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1046,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 5,
        areaId: "b1f5-504",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "504",
            capacity: 10,
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1047,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 5,
        areaId: "b1f5-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1048,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 5,
        areaId: "b1f5-r",
        desc: "",
        contacts: "",
        img: "images/andreymashkin_xAl7ZoFDnz1O8.jpg",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
            hours: "с 9:00-23:00"
        }
    },
    {
        id: 1049,
        name: "Акустические кабинки",
        category: "service",
        building: "B1",
        floor: 6,
        areaId: "b1f6-ac",
        desc: "Свободный доступ",
        contacts: "",
        img: "images/andreymashkin_P58KZMh9aZJbb.jpg",
        link: "#",
        attributes: {
            location: "Холл 6 этажа"
        }
    },
    {
        id: 1050,
        name: "Комната тишины",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-603",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "603",
            capacity: 4
        }
    },
    {
        id: 1051,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-608",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "608",
            capacity: 6,
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1052,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-6b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "6 Б",
            capacity: 4
        }
    },
    {
        id: 1053,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-606",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "606",
            capacity: 5,
            equipment: ["ВКС"]
        }
    },
    {
        id: 1054,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 6,
        areaId: "b1f6-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1055,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 6,
        areaId: "b1f6-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1056,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 7,
        areaId: "b1f7-712",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "712",
            capacity: 10,
            equipment: ["ВКС"]
        }
    },
    {
        id: 1057,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 7,
        areaId: "b1f7-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1058,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 7,
        areaId: "b1f7-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1059,
        name: "Конмата тишины",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "b1f8-803",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "803",
            capacity: 4
        }
    },
    {
        id: 1060,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "b1f8-808",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "808",
            capacity: 6
        }
    },
    {
        id: 1061,
        name: "Учебный зал",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "b1f8-810",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            location: "810",
            capacity: 12
        }
    },
    {
        id: 1062,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 8,
        areaId: "b1f8-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1063,
        name: "Конмата тишины",
        category: "meeting",
        building: "B1",
        floor: 9,
        areaId: "b1f9-903",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_5nkGOys6QrGxV.jpg",
        link: "#",
        attributes: {
            location: "903",
            capacity: 4
        }
    },
    {
        id: 1064,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 9,
        areaId: "b1f9-9b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "9Б",
            capacity: 4
        }
    },
    {
        id: 1065,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 9,
        areaId: "b1f9-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1066,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 9,
        areaId: "b1f9-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1067,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "b1f10-1008",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1008",
            capacity: 6,
            equipment: ["ВКС"]
        }
    },
    {
        id: 1068,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "b1f10-1010",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_WOMWqau3KqPam.jpg",
        link: "#",
        attributes: {
            location: "1010",
            capacity: 10,
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1069,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "b1f10-10b",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "10 Б",
            capacity: 6,
            equipment: ["ВКС"]
        }
    },
    {
        id: 1070,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 10,
        areaId: "b1f10-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1071,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 10,
        areaId: "b1f10-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1072,
        name: "Утилизация батареек",
        category: "eco",
        building: "B1",
        floor: 10,
        areaId: "service_Утилизация-батареек",
        desc: "Точка утилизации батареек<br><br>Больше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1073,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 10,
        areaId: "b1f10-r",
        desc: "",
        contacts: "",
        img: "images/andreymashkin_xAl7ZoFDnz1O8.jpg",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
            hours: "с 9:00-23:00"
        }
    },
    {
        id: 1074,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 11,
        areaId: "b1f11-1102",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_JZeVJvuWxJvvY.jpg\nimages/andreymashkin_VOK6mPu3ymDz8.jpg",
        link: "#",
        attributes: {
            location: "1102",
            capacity: 24,
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1075,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 11,
        areaId: "b1f11-1104",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_ppa4glhpXoaPx.jpg",
        link: "#",
        attributes: {
            location: "1104",
            capacity: 13,
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1076,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 11,
        areaId: "b1f11-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1077,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 11,
        areaId: "b1f11-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1078,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 11,
        areaId: "b1f11-r",
        desc: "",
        contacts: "",
        img: "images/andreymashkin_xAl7ZoFDnz1O8.jpg",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
            hours: "с 9:00-23:00"
        }
    },
    {
        id: 1079,
        name: "Парковка",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "b2f1-intro",
        desc: "подробнее о парковке https://jive.croc.ru/community/knowledge/everyday/social/parkovka-krok",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1080,
        name: "Велопарковка",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "b2f1-velo",
        desc: "Точка паркинга и проката велосипедов",
        contacts: "",
        img: "images/andreymashkin_Era2zvubQz3pX.jpg",
        link: "Подробнее о прокате велосипедов https://jive.croc.ru/community/knowledge/everyday/corporate/sport/zelyonye-velosipedy-krok",
        attributes: {
        }
    },
    {
        id: 1081,
        name: "Точки зарядки электромобилей",
        category: "service",
        building: "B2",
        floor: 3,
        areaId: "b2f3-electro",
        desc: "Точка зарядки электромобиля",
        contacts: "",
        img: "",
        link: "Для того чтобы воспользоваться зарядным устройством, пожалуйста, заранее согласуйте время зарядки автомобиля в Telegram-чате. \nЭто поможет эффективнее распределить время использования зарядок между всеми заинтересованными.\n\nНадеемся, что поездки на работу станут более удобными и экологичными 🌱",
        attributes: {
        }
    },
    {
        id: 1082,
        name: "",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "b2f4-electro",
        desc: "",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1083,
        name: "Входная группа",
        category: "service",
        building: "B3",
        floor: 1,
        areaId: "b3f1-enter",
        desc: "ЗАО «КРОК инкорпорейтед»<br>https://www.croc.ru<br>для удобства ваших гостей оргнаизована зона ожидания <br><br>Возможность прохода в офис без использования пластиковой карты-пропуска, а через идентификацию с передачей номера карты по NFC/BLE смартфона.<br>https://jive.croc.ru/community/knowledge/everyday/social/proxod-v-ofis-s-pomoshhyu-telefona",
        contacts: "",
        img: "images/andreymashkin_WOMWqau3Kqr4z.jpg",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1084,
        name: "КРОК кофе",
        category: "food",
        building: "B3",
        floor: 1,
        areaId: "b3f1-coffee",
        desc: "Точка подзарядки вкусным кофе",
        contacts: "",
        img: "images/andreymashkin_eeVndbCkDv3zb.jpg",
        link: "#",
        attributes: {
            hours: "График работы: понедельник пятница с 8:00 до 19:00"
        }
    },
    {
        id: 1085,
        name: "Вендинг",
        category: "food",
        building: "B3",
        floor: 1,
        areaId: "b3f1-vending",
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.<br>1 этаж",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1086,
        name: "Гардероб",
        category: "service",
        building: "B3",
        floor: 1,
        areaId: "b3f1-g",
        desc: "Гардероб предназначен для хранения верхней одежды, а также обуви в пакетах",
        contacts: "FieldService@croc.ru",
        img: "images/andreymashkin_VOK6mPu3ymbW1.jpg",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1087,
        name: "Лифты",
        category: "service",
        building: "B3",
        floor: 1,
        areaId: "b3f1-elevator",
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.<br><br>При неисправности лифта следует:<br>нажать колокольчик и описать<br>ситуацию диспетчеру<br>ЛИБО<br>позвонить 8 (495) 974-22-74<br>доб 83-02, 83-03, круглосуточно<br>ЛИБО<br>позвонить дежурному лифтеру<br>ООО «ЛифтКомплекс» 8 (495) 974-22-74<br>доб 83-01.",
        contacts: "FieldService@croc.ru",
        img: "images/andreymashkin_y0rVxlSZKk8Xo.jpg",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1088,
        name: "Конференц-зал",
        category: "meeting",
        building: "B3",
        floor: 2,
        areaId: "b3f2-203",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_zoqVAmHJ711q7.jpg",
        link: "#",
        attributes: {
            location: "203",
            capacity: 70
        }
    },
    {
        id: 1089,
        name: "Конференц-зал",
        category: "meeting",
        building: "B3",
        floor: 2,
        areaId: "b3f2-201",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "201",
            capacity: 20
        }
    },
    {
        id: 1090,
        name: "Столовая",
        category: "food",
        building: "B3",
        floor: 2,
        areaId: "b3f2-stolovaya",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОК<br>Основной зал<br>Мягкая зона <br>Летняя веранда",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_WOMWqau3KqrbO.jpg\nimages/andreymashkin_02XRVKuegZYPW.jpg\nimages/andreymashkin_7KAD3WueOqbX1.jpg\nimages/andreymashkin_XRYPVXsKyVvXR.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            hours: "с 8:30 до 17:00"
        }
    },
    {
        id: 1091,
        name: "Летняя веранда",
        category: "relax",
        building: "B1",
        floor: 2,
        areaId: "service_Летняя-веранда",
        desc: "для встреч с коллегами или гостями в летний период работает открытая летня веранда",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1092,
        name: "Банкомат",
        category: "service",
        building: "B3",
        floor: 2,
        areaId: "b3f2-atm",
        desc: "Банкомат: Сбербанк, работает на внесение и снятие наличных денежных средств",
        contacts: "",
        img: "",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1093,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 3,
        areaId: "b3f3-311",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "311",
            capacity: 9,
            equipment: ["ЖК-панель", "Телефон"]
        }
    },
    {
        id: 1094,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 3,
        areaId: "b3f3-315",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "315",
            capacity: 4,
            equipment: ["ЖК-панель", "Телефон"]
        }
    },
    {
        id: 1095,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 3,
        areaId: "b3f3-317",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "317",
            capacity: 10,
            equipment: ["ЖК-панель", "Телефон"]
        }
    },
    {
        id: 1096,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 3,
        areaId: "b3f3-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1097,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B3",
        floor: 3,
        areaId: "b3f3-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1098,
        name: "Кабинет врача",
        category: "health",
        building: "B3",
        floor: 4,
        areaId: "b3f4-doctor",
        desc: "Прием проводит врач общей практики Дрюкова Анна Викторовна",
        contacts: "ndemidova@croc.ru",
        img: "images/andreymashkin_4KvpGYu59bbgz.jpg\nimages/andreymashkin_OZqQBnu56BBgn.jpg",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%BD%D0%B0-%D0%BF%D1%80%D0%B8%D0%B5%D0%BC-%D0%BA-%D0%B2%D1%80%D0%B0%D1%87%D1%83",
        attributes: {
            location: "416",
            hours: "График: по средам - с 14.30 до 20.00, по пятницам - с 9.00 до 13.00"
        }
    },
    {
        id: 1099,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 4,
        areaId: "b3f4-417",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "417",
            capacity: 6,
            equipment: ["Флипчарт", "ЖК-панель"]
        }
    },
    {
        id: 1100,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 4,
        areaId: "b3f4-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1101,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B3",
        floor: 4,
        areaId: "b3f4-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1102,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 5,
        areaId: "b3f5-512",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "512",
            capacity: 10,
            equipment: ["ЖК-панель"]
        }
    },
    {
        id: 1103,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 5,
        areaId: "b3f5-511",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "нет номера",
            capacity: 10
        }
    },
    {
        id: 1104,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 5,
        areaId: "b3f5-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1105,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 6,
        areaId: "b3f6-611",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "611",
            capacity: 6
        }
    },
    {
        id: 1106,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 6,
        areaId: "b3f6-615",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "615",
            capacity: 4
        }
    },
    {
        id: 1107,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 6,
        areaId: "b3f6-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1108,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 7,
        areaId: "b3f7-701",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "701",
            capacity: 3
        }
    },
    {
        id: 1109,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 7,
        areaId: "b3f7-715",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "715",
            capacity: 3
        }
    },
    {
        id: 1110,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 7,
        areaId: "b3f7-775",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "717",
            capacity: 3
        }
    },
    {
        id: 1111,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 7,
        areaId: "b3f7-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1112,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 8,
        areaId: "b3f8-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1113,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 9,
        areaId: "b3f9-915",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "915",
            capacity: 4
        }
    },
    {
        id: 1114,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 9,
        areaId: "b3f9-917",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "917",
            capacity: 7,
            equipment: ["Флипчарт", "ЖК-панель"]
        }
    },
    {
        id: 1115,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 9,
        areaId: "b3f9-925",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "925",
            capacity: 3
        }
    },
    {
        id: 1116,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 9,
        areaId: "b3f9-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1117,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B3",
        floor: 9,
        areaId: "b3f9-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1118,
        name: "Коворкинг маркетинга",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1007",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "images/andreymashkin_AXnVWvs5BWW2G.jpg\nimages/andreymashkin_rg9eJlCk1ddvE.jpg\nimages/andreymashkin_Mnl0eZsX8eeWP.jpg\nimages/andreymashkin_KzBrRvuP9RR09.jpg\nimages/andreymashkin_D4WEXGSnYXXrW.jpg",
        link: "#",
        attributes: {
            location: "1007",
            equipment: ["ВКС", "Флипчарт"]
        }
    },
    {
        id: 1119,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1013",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1013",
            capacity: 4
        }
    },
    {
        id: 1120,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1015",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1015",
            capacity: 6
        }
    },
    {
        id: 1121,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1022",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1022",
            capacity: 8
        }
    },
    {
        id: 1122,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1024",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1024",
            capacity: 8
        }
    },
    {
        id: 1123,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 10,
        areaId: "b3f10-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1124,
        name: "Ресепшен",
        category: "service",
        building: "B3",
        floor: 11,
        areaId: "b3f11-r",
        desc: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        contacts: "",
        img: "images/andreymashkin_qvzb04hoVQQzD.jpg",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
            hours: "с 9:00-23:00"
        }
    },
    {
        id: 1125,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 11,
        areaId: "b3f11-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.<br><br>Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.<br><br>Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.<br><br>Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "images/andreymashkin_RrOMAYu0qAMGx.jpg\nimages/andreymashkin_y0rVxlSZKk8o6.jpg",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1126,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B3",
        floor: 11,
        areaId: "b3f11-paper",
        desc: "Точка сбора бумаги<br>можно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1127,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 11,
        areaId: "b3f11-1111",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1111",
            capacity: 6,
            equipment: ["ЖК-панель", "Телефон", "Магнитная доска"]
        }
    },
    {
        id: 1128,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 11,
        areaId: "b3f11-1113",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1113",
            capacity: 4
        }
    },
    {
        id: 1129,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 11,
        areaId: "b3f11-1117",
        desc: "Бронируй через календарь в Outlook<br>или в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru<br><br>По вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "",
        link: "#",
        attributes: {
            location: "1117",
            capacity: 5
        }
    }
];

const buildingFloorStructure = {
    "B1": {
        "label": "Корпус Альфа",
        "floors": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ],
        "defaultFloor": 1
    },
    "B2": {
        "label": "Парковка",
        "floors": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ],
        "defaultFloor": 1
    },
    "B3": {
        "label": "Корпус Бета",
        "floors": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ],
        "defaultFloor": 1
    }
};

// svgFloorPlans сохранен из существующего data.js
const svgFloorPlans = {
    "B1-F1": {
        src: "map/b1f1.svg",
        viewBox: "0 0 1074 525"
    },
    "B1-F10": {
        src: "map/b1f10.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F11": {
        src: "map/b1f11.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F2": {
        src: "map/b1f2.svg",
        viewBox: "0 0 1095 503"
    },
    "B1-F3": {
        src: "map/b1f3.svg",
        viewBox: "0 0 1125 501"
    },
    "B1-F4": {
        src: "map/b1f4.svg",
        viewBox: "0 0 1124 480"
    },
    "B1-F5": {
        src: "map/b1f5.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F6": {
        src: "map/b1f6.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F7": {
        src: "map/b1f7.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F8": {
        src: "map/b1f8.svg",
        viewBox: "0 0 1128 501"
    },
    "B1-F9": {
        src: "map/b1f9.svg",
        viewBox: "0 0 1128 501"
    },
    "B2-F1": {
        src: "map/b2f1.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F10": {
        src: "map/b2f10.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F11": {
        src: "map/b2f11.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F2": {
        src: "map/b2f2.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F3": {
        src: "map/b2f3.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F4": {
        src: "map/b2f4.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F5": {
        src: "map/b2f5.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F6": {
        src: "map/b2f6.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F7": {
        src: "map/b2f7.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F8": {
        src: "map/b2f8.svg",
        viewBox: "0 0 872 512"
    },
    "B2-F9": {
        src: "map/b2f9.svg",
        viewBox: "0 0 872 512"
    },
    "B3-F1": {
        src: "map/b3f1.svg",
        viewBox: "0 0 1035 317"
    },
    "B3-F10": {
        src: "map/b3f10.svg",
        viewBox: "0 0 1149 357"
    },
    "B3-F11": {
        src: "map/b3f11.svg",
        viewBox: "0 0 1135 359"
    },
    "B3-F2": {
        src: "map/b3f2.svg",
        viewBox: "0 0 1130 320"
    },
    "B3-F3": {
        src: "map/b3f3.svg",
        viewBox: "0 0 1103 330"
    },
    "B3-F4": {
        src: "map/b3f4.svg",
        viewBox: "0 0 962 299"
    },
    "B3-F5": {
        src: "map/b3f5.svg",
        viewBox: "0 0 1150 358"
    },
    "B3-F6": {
        src: "map/b3f6.svg",
        viewBox: "0 0 1149 358"
    },
    "B3-F7": {
        src: "map/b3f7.svg",
        viewBox: "0 0 1149 358"
    },
    "B3-F8": {
        src: "map/b3f8.svg",
        viewBox: "0 0 1149 357"
    },
    "B3-F9": {
        src: "map/b3f9.svg",
        viewBox: "0 0 1149 358"
    }
};

