// --- ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---
// Автоматически сгенерировано из CSV таблицы
// Дата генерации: 2026-01-16 12:38:21

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
        img: "https://andreymashkin.ru/disk/share/7KAD3WueOqq86",
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
        desc: "Приём и выдача корреспонденцииДополнителньог смотри информацию про Почтовые отправления и курьерскую доставку (https://jive.croc.ru/community/knowledge/everyday/social/pochtovye-otpravleniya-i-kurerskaya-dostavka)",
        contacts: "тел. #4940Otdel_pisem@croc.ru",
        img: "Картинка с зеленым кроковским  конвертиком, например, фото не делаем",
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
        img: "https://andreymashkin.ru/disk/share/eeVndbCkDv3zb",
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
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.1 этаж Альфа и Бета - микромаркет ВкусВилл; 5, 6, 7, 8, 9, 10 этажи Альфа – вэндинг со снэками.",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        desc: "Гардероб предназначен для хранения верхней одежды, а также обуви в пакетах.В гардеробе альфа расположены Локеры, которые предназначены для хранения пакетов, зонтов и других личных вещей небольшого размера.Для удобства все ячейки пронумерованы.Информационно: Для поддержания чистоты и комфортности использования просим не оставлять в ячейках еду и напитки.Хранение личных вещей предполагается только в течение одного рабочего дня, запирать локер на более длительный период и уносить ключ домой запрещено.",
        contacts: "Альфа - VOnufreichik@croc.ruБета - AntKalinin@croc.ru",
        img: "https://andreymashkin.ru/disk/share/XRYPVXsx76v3P",
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
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.При неисправности лифта следует:нажать колокольчик и описатьситуацию диспетчеруЛИБОпозвонить 8 (495) 974-22-74доб 83-02, 83-03, круглосуточноЛИБОпозвонить дежурному лифтеруООО «ЛифтКомплекс» 8 (495) 974-22-74доб 83-01.",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/y0rVxlSZKk8Xo",
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
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Charity Shop",
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
        desc: "Точка сбора трудноперерабатываемых отходовСобираем: ручки и фломастеры, блистеры от таблеток, постельное бельё (позже заменим на пластиковые карты / LEGO), зубные щётки.Больше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=EcoPoint",
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
        desc: "Точка утилизации батареекБольше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "https://chistogradplyus.ru/products/343841621-urna_dlya_sbora_batareyek?utm_referrer=https%3A%2F%2Fyandex.ru%2Fimages%2Fsearch%3Fcbir_id%3D1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%26rpt%3Dimageview%26url%3Dhttps%253A%252F%252Favatars.mds.yandex.net%252Fget-images-cbir%252F1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%252Forig%26cbir_page%3Dsearch-by-image",
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
        desc: "В нашем офисе установлены приборы по анализу качества воздуха в офисе. Они позволяют нам контролировать состояние воздуха в помещениях, сравнивать его с параметрами воздуха на улице и оперативно принимать меры при наличии отклонений, чтобы сделать ваше пребывание в офисе еще более комфортнымБольше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "FieldService@croc.ru",
        img: "просто поставить тиочку на 1 этаже с информацией",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ozWe94uAZMd9khttps://andreymashkin.ru/disk/share/6MZG26hp9mPvXhttps://andreymashkin.ru/disk/share/zoqVAmHJ71gkbприкрепила дополнительно фото",
        link: "#",
        attributes: {
            location: "212"
        }
    },
    {
        id: 1012,
        name: "Конференц-зал",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-214",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/gWGdybS0yPd3q",
        link: "#",
        attributes: {
            location: "214"
        }
    },
    {
        id: 1013,
        name: "Переговорная 204",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-204",
        desc: "ВКСБронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 204",
        link: "#",
        attributes: {
            location: "204"
        }
    },
    {
        id: 1014,
        name: "Переговорная 206",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-206",
        desc: "ВКСБронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 206",
        link: "#",
        attributes: {
            location: "206"
        }
    },
    {
        id: 1015,
        name: "Переговорная 208",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-208",
        desc: "ВСК, флипчартБронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "208"
        }
    },
    {
        id: 1016,
        name: "Переговорная 210",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-210",
        desc: "ВКСБронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 210",
        link: "#",
        attributes: {
            location: "210"
        }
    },
    {
        id: 1017,
        name: "Учебный класс (аудитория  202)",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-202",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "202"
        }
    },
    {
        id: 1018,
        name: "Мультимедийный класс",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "b1f2-2b",
        desc: "ВКСБронируй через календарь в Outlook",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "2Б"
        }
    },
    {
        id: 1019,
        name: "Столовая",
        category: "food",
        building: "B1",
        floor: 2,
        areaId: "b1f2-stolovaya",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОКОсновной зал2 мягкие зоны",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/kmDWabUzP83Q2https://andreymashkin.ru/disk/share/G09JoeSx16y3Mhttps://andreymashkin.ru/disk/share/22gG7MuDggp6Ghttps://andreymashkin.ru/disk/share/b8AVKqhX9ekd6https://andreymashkin.ru/disk/share/4KvpGYu59b10O",
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
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Летняя веранда",
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
        img: "сделать типовую картинку крышки КРОК",
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
        desc: "Тот самый уголок в столовой «Альфа» теперь зона релакса и игр! Здесь можно отдохнуть от рабочих задач, поболтать с коллегами или сразиться в настолки. Тебя ждет множество игр, удобные пуфики и расслабленная атмосфера, в которой хочется остаться.Бронируй пространство через Outlook для своей компании - имя пространства *Play Zone*",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/02XRVKuegZ6k7https://andreymashkin.ru/disk/share/AXnVWvs5BW9aV",
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
        desc: "Пространство для еды и встреч с выходом на летнюю веранду.Можно заказать блюда к определенному времени по телефону #8368Доступна оплата части стоимости заказа картой-пропуском, а также проверка остатка баланса на карте.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ngye5OCvyJM07",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            location: "201",
            hours: "Часы работы: 11:00-19:00Заказы принимаются до 16:00"
        }
    },
    {
        id: 1024,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 3,
        areaId: "b1f3-paper",
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        img: "значок кикер",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/JZeVJvuWxJvn0",
        link: "#",
        attributes: {
            location: "3Б"
        }
    },
    {
        id: 1027,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 3,
        areaId: "b1f3-306",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.ВКС",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "306"
        }
    },
    {
        id: 1028,
        name: "Комната отдыха",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "b1f3-rest",
        desc: "Уютное пространство для отдыха, разделённое на несколько зон:     ·Игровая — с плазмой и мультимедийным оборудованием;     ·Мягкая — с акустической стеной и диваном-трансформером     ·Дзен — с массажными креслами и расслабляющей подсветкой под настроение.Бронируй пространство      через календарь в Outlook",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqPo9https://andreymashkin.ru/disk/share/JZeVJvuWxJ70x",
        link: "#",
        attributes: {
            location: "316",
            hours: "Время бронирования      доступно с 9 до 21ч"
        }
    },
    {
        id: 1029,
        name: "Спортзал",
        category: "sport",
        building: "B1",
        floor: 3,
        areaId: "b1f3-gym",
        desc: "Площадь 190 м2,Доступ 24/75 зон для занятия различными видами спорта8 тренажеровГрупповые программы",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3Kq5xnhttps://andreymashkin.ru/disk/share/D4WEXGSnYXpQYhttps://andreymashkin.ru/disk/share/RrOMAYu0qAe0qhttps://andreymashkin.ru/disk/share/8nbGEPsG6VRdv",
        link: "Подробнее о спортзале: https://jive.croc.ru/community/knowledge/everyday/corporate/sport/gymСпортивная жизнь компании  : https://corplifecroc.ru/sport",
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
        desc: "Мужская/женская раздевалки Шкафчики для ождежды Фен Душевые кабинкиСанузел",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Раздевалка и душевые (спортзал)",
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
        desc: "Услуги оказываются по ДМС.Доктор:  Климчук Мария Запись на прием:+7-926-535-52-27Внутренний телефон стоматологического кабинета: 8321",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/ZRP375srMARBr",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/stomatology",
        attributes: {
            location: "308",
            hours: "Каждую неделю по вторникам.Требуется предварительная запись"
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
        img: "https://andreymashkin.ru/disk/share/KzBrRvuP9RO0x",
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
        img: "значок можно поставить",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "Типовое фото https://andreymashkin.ru/disk/share/b8AVKqhX9enzq",
        link: "#",
        attributes: {
            location: "402 Б"
        }
    },
    {
        id: 1035,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402g",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Г"
        }
    },
    {
        id: 1036,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402d",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Д"
        }
    },
    {
        id: 1037,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402e",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Е"
        }
    },
    {
        id: 1038,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402z",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 З"
        }
    },
    {
        id: 1039,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402i",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 И"
        }
    },
    {
        id: 1040,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402k",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 К"
        }
    },
    {
        id: 1041,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-402l",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Л"
        }
    },
    {
        id: 1042,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "b1f4-4b",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "4Б"
        }
    },
    {
        id: 1043,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 4,
        areaId: "b1f4-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
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
        img: "https://andreymashkin.ru/disk/share/vxBekbfbp1XdJhttps://andreymashkin.ru/disk/share/zoqVAmHJ71l8O",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "504"
        }
    },
    {
        id: 1047,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 5,
        areaId: "b1f5-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
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
        img: "https://andreymashkin.ru/disk/share/P58KZMh9aZJbb",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "фото приложила",
        link: "#",
        attributes: {
            location: "603"
        }
    },
    {
        id: 1051,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-608",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "608"
        }
    },
    {
        id: 1052,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-6b",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "6 Б"
        }
    },
    {
        id: 1053,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "b1f6-606",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "606"
        }
    },
    {
        id: 1054,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 6,
        areaId: "b1f6-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "712"
        }
    },
    {
        id: 1057,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 7,
        areaId: "b1f7-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "фото приложила",
        link: "#",
        attributes: {
            location: "803"
        }
    },
    {
        id: 1060,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "b1f8-808",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "точка, а фото будет позже",
        link: "#",
        attributes: {
            location: "808"
        }
    },
    {
        id: 1061,
        name: "Учебный зал",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "b1f8-810",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Учебный зал",
        link: "#",
        attributes: {
            location: "810"
        }
    },
    {
        id: 1062,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 8,
        areaId: "b1f8-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/5nkGOys6QrGxV",
        link: "#",
        attributes: {
            location: "903"
        }
    },
    {
        id: 1064,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 9,
        areaId: "b1f9-9b",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "9Б"
        }
    },
    {
        id: 1065,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 9,
        areaId: "b1f9-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1008"
        }
    },
    {
        id: 1068,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "b1f10-1010",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqPam",
        link: "#",
        attributes: {
            location: "1010"
        }
    },
    {
        id: 1069,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "b1f10-10b",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "10 Б"
        }
    },
    {
        id: 1070,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 10,
        areaId: "b1f10-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Точка утилизации батареекБольше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "https://chistogradplyus.ru/products/343841621-urna_dlya_sbora_batareyek?utm_referrer=https%3A%2F%2Fyandex.ru%2Fimages%2Fsearch%3Fcbir_id%3D1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%26rpt%3Dimageview%26url%3Dhttps%253A%252F%252Favatars.mds.yandex.net%252Fget-images-cbir%252F1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%252Forig%26cbir_page%3Dsearch-by-image",
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
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/JZeVJvuWxJvvYhttps://andreymashkin.ru/disk/share/VOK6mPu3ymDz8",
        link: "#",
        attributes: {
            location: "1102"
        }
    },
    {
        id: 1075,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 11,
        areaId: "b1f11-1104",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ppa4glhpXoaPx",
        link: "#",
        attributes: {
            location: "1104"
        }
    },
    {
        id: 1076,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 11,
        areaId: "b1f11-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
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
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Парковка",
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
        img: "https://andreymashkin.ru/disk/share/Era2zvubQz3pX",
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
        img: "просто точки поставить , карту ранее отправляла",
        link: "Для того чтобы воспользоваться зарядным устройством, пожалуйста, заранее согласуйте время зарядки автомобиля в Telegram-чате. Это поможет эффективнее распределить время использования зарядок между всеми заинтересованными.Надеемся, что поездки на работу станут более удобными и экологичными 🌱",
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
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=",
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
        desc: "ЗАО «КРОК инкорпорейтед»https://www.croc.ruдля удобства ваших гостей оргнаизована зона ожидания Возможность прохода в офис без использования пластиковой карты-пропуска, а через идентификацию с передачей номера карты по NFC/BLE смартфона.https://jive.croc.ru/community/knowledge/everyday/social/proxod-v-ofis-s-pomoshhyu-telefona",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3Kqr4z",
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
        img: "https://andreymashkin.ru/disk/share/eeVndbCkDv3zb",
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
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.1 этаж",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        img: "https://andreymashkin.ru/disk/share/VOK6mPu3ymbW1",
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
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.При неисправности лифта следует:нажать колокольчик и описатьситуацию диспетчеруЛИБОпозвонить 8 (495) 974-22-74доб 83-02, 83-03, круглосуточноЛИБОпозвонить дежурному лифтеруООО «ЛифтКомплекс» 8 (495) 974-22-74доб 83-01.",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/y0rVxlSZKk8Xo",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/zoqVAmHJ711q7",
        link: "#",
        attributes: {
            location: "203"
        }
    },
    {
        id: 1089,
        name: "Конференц-зал",
        category: "meeting",
        building: "B3",
        floor: 2,
        areaId: "b3f2-201",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Конференц-зал",
        link: "#",
        attributes: {
            location: "201"
        }
    },
    {
        id: 1090,
        name: "Столовая",
        category: "food",
        building: "B3",
        floor: 2,
        areaId: "b3f2-stolovaya",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОКОсновной залМягкая зона Летняя веранда",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqrbOhttps://andreymashkin.ru/disk/share/02XRVKuegZYPWhttps://andreymashkin.ru/disk/share/7KAD3WueOqbX1https://andreymashkin.ru/disk/share/XRYPVXsKyVvXR",
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
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Летняя веранда",
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
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "311"
        }
    },
    {
        id: 1094,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 3,
        areaId: "b3f3-315",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "315"
        }
    },
    {
        id: 1095,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 3,
        areaId: "b3f3-317",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "317"
        }
    },
    {
        id: 1096,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 3,
        areaId: "b3f3-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        img: "https://andreymashkin.ru/disk/share/4KvpGYu59bbgzhttps://andreymashkin.ru/disk/share/OZqQBnu56BBgn",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "417"
        }
    },
    {
        id: 1100,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 4,
        areaId: "b3f4-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "512"
        }
    },
    {
        id: 1103,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 5,
        areaId: "b3f5-511",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "нет номера"
        }
    },
    {
        id: 1104,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 5,
        areaId: "b3f5-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "611"
        }
    },
    {
        id: 1106,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 6,
        areaId: "b3f6-615",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "615"
        }
    },
    {
        id: 1107,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 6,
        areaId: "b3f6-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "701"
        }
    },
    {
        id: 1109,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 7,
        areaId: "b3f7-715",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "715"
        }
    },
    {
        id: 1110,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 7,
        areaId: "b3f7-775",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "717"
        }
    },
    {
        id: 1111,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 7,
        areaId: "b3f7-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "915"
        }
    },
    {
        id: 1114,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 9,
        areaId: "b3f9-917",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "917"
        }
    },
    {
        id: 1115,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 9,
        areaId: "b3f9-925",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "925"
        }
    },
    {
        id: 1116,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 9,
        areaId: "b3f9-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/AXnVWvs5BWW2Ghttps://andreymashkin.ru/disk/share/rg9eJlCk1ddvEhttps://andreymashkin.ru/disk/share/Mnl0eZsX8eeWPhttps://andreymashkin.ru/disk/share/KzBrRvuP9RR09https://andreymashkin.ru/disk/share/D4WEXGSnYXXrW",
        link: "#",
        attributes: {
            location: "1007"
        }
    },
    {
        id: 1119,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1013",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1013"
        }
    },
    {
        id: 1120,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1015",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1015"
        }
    },
    {
        id: 1121,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1022",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1022"
        }
    },
    {
        id: 1122,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 10,
        areaId: "b3f10-1024",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1024"
        }
    },
    {
        id: 1123,
        name: "Мини-кухня",
        category: "food",
        building: "B3",
        floor: 10,
        areaId: "b3f10-k",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        img: "https://andreymashkin.ru/disk/share/qvzb04hoVQQzD",
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
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.Каждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.Следить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.Твой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGxhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
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
        desc: "Точка сбора бумагиможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
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
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1111"
        }
    },
    {
        id: 1128,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 11,
        areaId: "b3f11-1113",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1113"
        }
    },
    {
        id: 1129,
        name: "Переговорная",
        category: "meeting",
        building: "B3",
        floor: 11,
        areaId: "b3f11-1117",
        desc: "Бронируй через календарь в Outlookили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ruПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1117"
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

