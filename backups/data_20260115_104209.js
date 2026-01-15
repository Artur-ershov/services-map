// --- ДАННЫЕ СЕРВИСОВ, ЭТАЖЕЙ И КОМНАТ ---
// Автоматически сгенерировано из CSV таблицы
// Дата генерации: 2026-01-15 10:36:36

const DUMMY_IMG_URL = 'https://dummyimage.com/600x400/f3f3f3/000.png&text=';

const allServices = [
    {
        id: 1000,
        name: "Входная группа",
        category: "other",
        building: "B1",
        floor: 1,
        areaId: "service_Входная-группа",
        desc: "зона ожидания https://andreymashkin.ru/disk/share/Y76a8zsnZ8qv6",
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
        areaId: "area_108",
        desc: "Приём и выдача корреспонденции\n\nДополнителньог смотри информацию про Почтовые отправления и курьерскую доставку (https://jive.croc.ru/community/knowledge/everyday/social/pochtovye-otpravleniya-i-kurerskaya-dostavka)",
        contacts: "тел. #4940\nOtdel_pisem@croc.ru",
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
        areaId: "service_КРОК-кофе",
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
        areaId: "service_Банкомат-Сбербанка",
        desc: "Банкомат: Сбербанк, работает на внесение и снятие наличных денежных средств",
        contacts: "",
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20\nhttps://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        areaId: "service_Вендинг",
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.\n1 этаж Альфа и Бета - микромаркет ВкусВилл;\n 5, 6, 7, 8, 9, 10 этажи Альфа – вэндинг со снэками.",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20\nhttps://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
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
        areaId: "service_Гардероб",
        desc: "Гардероб предназначен для хранения верхней одежды, а также обуви в пакетах.\nВ гардеробе альфа расположены Локеры, которые предназначены для хранения пакетов, зонтов и других личных вещей небольшого размера.\n\nДля удобства все ячейки пронумерованы.",
        contacts: "Альфа - VOnufreichik@croc.ru\nБета - AntKalinin@croc.ru",
        img: "https://andreymashkin.ru/disk/share/XRYPVXsx76v3P",
        link: "Информационно: \nДля поддержания чистоты и комфортности использования просим не оставлять в ячейках еду и напитки.\n\nХранение личных вещей предполагается только в течение одного рабочего дня, запирать локер на более длительный период и уносить ключ домой запрещено.",
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
        areaId: "service_Лифты",
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.\n\nПри неисправности лифта следует:\nнажать колокольчик и описать\nситуацию диспетчеру\nЛИБО\nпозвонить 8 (495) 974-22-74\nдоб 83-02, 83-03, круглосуточно\nЛИБО\nпозвонить дежурному лифтеру\nООО «ЛифтКомплекс» 8 (495) 974-22-74\nдоб 83-01.",
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
        areaId: "service_Charity-Shop",
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
        areaId: "service_EcoPoint",
        desc: "Точка сбора трудноперерабатываемых отходов\nСобираем: ручки и фломастеры, блистеры от таблеток, постельное бельё (позже заменим на пластиковые карты / LEGO), зубные щётки.\n\nБольше информации: https://jive.croc.ru/docs/DOC-239136",
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
        areaId: "service_Утилизация-батареек",
        desc: "Точка утилизации батареек\n\nБольше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "WorkCare@croc.ru",
        img: "https://chistogradplyus.ru/products/343841621-urna_dlya_sbora_batareyek?utm_referrer=https%3A%2F%2Fyandex.ru%2Fimages%2Fsearch%3Fcbir_id%3D1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%26rpt%3Dimageview%26url%3Dhttps%253A%252F%252Favatars.mds.yandex.net%252Fget-images-cbir%252F1871052%252FIS3-FCNbh6lhUdyxaCCkDA5906%252Forig%26cbir_page%3Dsearch-by-image",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1010,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 1,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1011,
        name: "Станция мониторинга воздуха AirVisual",
        category: "service",
        building: "B1",
        floor: 1,
        areaId: "service_Станция-мониторинга-воздуха-AirVisual",
        desc: "В нашем офисе установлены приборы по анализу качества воздуха в офисе. Они позволяют нам контролировать состояние воздуха в помещениях, сравнивать его с параметрами воздуха на улице и оперативно принимать меры при наличии отклонений, чтобы сделать ваше пребывание в офисе еще более комфортным\n\nБольше информации: https://jive.croc.ru/docs/DOC-239136",
        contacts: "FieldService@croc.ru",
        img: "просто поставить тиочку на 1 этаже с информацией",
        link: "https://jive.croc.ru/docs/DOC-287102",
        attributes: {
        }
    },
    {
        id: 1012,
        name: "Конференц-зал + холл перед ним",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_212",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ozWe94uAZMd9k\nhttps://andreymashkin.ru/disk/share/6MZG26hp9mPvX\nhttps://andreymashkin.ru/disk/share/zoqVAmHJ71gkb\nприкрепила дополнительно фото",
        link: "#",
        attributes: {
            location: "212"
        }
    },
    {
        id: 1013,
        name: "Переговорка",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_212a",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/ozWe94uAZMd9k\nhttps://andreymashkin.ru/disk/share/6MZG26hp9mPvX\nhttps://andreymashkin.ru/disk/share/zoqVAmHJ71gkb\nприкрепила дополнительно фото",
        link: "#",
        attributes: {
            location: "212a"
        }
    },
    {
        id: 1014,
        name: "Конференц-зал",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_214",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/gWGdybS0yPd3q",
        link: "#",
        attributes: {
            location: "214"
        }
    },
    {
        id: 1015,
        name: "Переговорная 204",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_204",
        desc: "ВКС\nБронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 204",
        link: "#",
        attributes: {
            location: "204"
        }
    },
    {
        id: 1016,
        name: "Переговорная 206",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_206",
        desc: "ВКС\nБронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 206",
        link: "#",
        attributes: {
            location: "206"
        }
    },
    {
        id: 1017,
        name: "Переговорная 208",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_208",
        desc: "ВСК, флипчарт\nБронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "208"
        }
    },
    {
        id: 1018,
        name: "Переговорная 210",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_210",
        desc: "ВКС\nБронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная 210",
        link: "#",
        attributes: {
            location: "210"
        }
    },
    {
        id: 1019,
        name: "Учебный класс (аудитория  202)",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_202",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "202"
        }
    },
    {
        id: 1020,
        name: "Мультимедийный класс",
        category: "meeting",
        building: "B1",
        floor: 2,
        areaId: "area_2Б",
        desc: "ВКС\nБронируй через календарь в Outlook",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "приложила папку с фото",
        link: "#",
        attributes: {
            location: "2Б"
        }
    },
    {
        id: 1021,
        name: "Столовая",
        category: "food",
        building: "B1",
        floor: 2,
        areaId: "service_Столовая",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОК\nОсновной зал\n2 мягкие зоны \nЛетняя веранда",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/kmDWabUzP83Q2\nhttps://andreymashkin.ru/disk/share/G09JoeSx16y3M\nhttps://andreymashkin.ru/disk/share/22gG7MuDggp6G\nhttps://andreymashkin.ru/disk/share/b8AVKqhX9ekd6\nhttps://andreymashkin.ru/disk/share/4KvpGYu59b10O",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1022,
        name: "Утилизация пластиковых крышек",
        category: "eco",
        building: "B1",
        floor: 2,
        areaId: "service_Утилизация-пластиковых-крышек",
        desc: "Точка сбора пластиковых крышек для дальнейшей переработки",
        contacts: "",
        img: "сделать типовую картинку крышки КРОК",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1023,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 2,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1024,
        name: "Зона для настолок в столовой",
        category: "relax",
        building: "B1",
        floor: 2,
        areaId: "service_Зона-для-настолок-в-столовой",
        desc: "Тот самый уголок в столовой «Альфа» теперь зона релакса и игр! \nЗдесь можно отдохнуть от рабочих задач, поболтать с коллегами или сразиться в настолки. \nТебя ждет множество игр, удобные пуфики и расслабленная атмосфера, в которой хочется остаться.\nБронируй пространство через Outlook для своей компании - имя пространства *Play Zone*",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/02XRVKuegZ6k7\nhttps://andreymashkin.ru/disk/share/AXnVWvs5BW9aV",
        link: "#",
        attributes: {
            hours: "с 8:30 до 21:30"
        }
    },
    {
        id: 1025,
        name: "Буфет",
        category: "food",
        building: "B1",
        floor: 2,
        areaId: "area_201",
        desc: "Пространство для еды и встреч с выходом на летнюю веранду.\nМожно заказать блюда к определенному времени по телефону #8368\n\nДоступна оплата части стоимости заказа картой-пропуском, а также проверка остатка баланса на карте.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ngye5OCvyJM07",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            location: "201",
            hours: "Часы работы: 11:00-19:00\nЗаказы принимаются до 16:00"
        }
    },
    {
        id: 1026,
        name: "Кикер",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "area_холл-(оранжевый-квадратик-на-карте-)",
        desc: "Зона для игр",
        contacts: "",
        img: "значок кикер",
        link: "#",
        attributes: {
            location: "холл (оранжевый квадратик на карте )"
        }
    },
    {
        id: 1027,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 3,
        areaId: "area_3Б",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/JZeVJvuWxJvn0",
        link: "#",
        attributes: {
            location: "3Б"
        }
    },
    {
        id: 1028,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 3,
        areaId: "area_306",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.\n\nВКС",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "306"
        }
    },
    {
        id: 1029,
        name: "Комната отдыха",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "area_316",
        desc: "Уютное пространство для отдыха, разделённое на несколько зон:\n     ·Игровая — с плазмой и мультимедийным оборудованием;\n     ·Мягкая — с акустической стеной и диваном-трансформером\n     ·Дзен — с массажными креслами и расслабляющей подсветкой под настроение.\nБронируй пространство\n      через календарь в Outlook",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqPo9\nhttps://andreymashkin.ru/disk/share/JZeVJvuWxJ70x",
        link: "#",
        attributes: {
            location: "316",
            hours: "Время бронирования\n      доступно с 9 до 21ч"
        }
    },
    {
        id: 1030,
        name: "Спортзал",
        category: "sport",
        building: "B1",
        floor: 3,
        areaId: "area_318",
        desc: "Площадь 190 м2,\nДоступ 24/7\n5 зон для занятия различными видами спорта\n8 тренажеров\nГрупповые программы",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3Kq5xn\nhttps://andreymashkin.ru/disk/share/D4WEXGSnYXpQY\nhttps://andreymashkin.ru/disk/share/RrOMAYu0qAe0q\nhttps://andreymashkin.ru/disk/share/8nbGEPsG6VRdv",
        link: "Подробнее о спортзале: https://jive.croc.ru/community/knowledge/everyday/corporate/sport/gym\nСпортивная жизнь компании  : https://corplifecroc.ru/sport",
        attributes: {
            location: "318"
        }
    },
    {
        id: 1031,
        name: "Раздевалка и душевые (спортзал)",
        category: "sport",
        building: "B1",
        floor: 3,
        areaId: "area_318",
        desc: "Мужская/женская раздевалки \nШкафчики для ождежды \nФен \nДушевые кабинки\nСанузел",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Раздевалка и душевые (спортзал)",
        link: "#",
        attributes: {
            location: "318"
        }
    },
    {
        id: 1032,
        name: "Стоматологический кабинет",
        category: "health",
        building: "B1",
        floor: 3,
        areaId: "area_308",
        desc: "Услуги оказываются по ДМС.\nДоктор:  Климчук Мария \nЗапись на прием:\n+7-926-535-52-27\n\nВнутренний телефон стоматологического кабинета: 8321",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/ZRP375srMARBr",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/stomatology",
        attributes: {
            location: "308",
            hours: "Каждую неделю по вторникам.\nТребуется предварительная запись"
        }
    },
    {
        id: 1033,
        name: "Кабинет парикмахера и мастера по маникюру",
        category: "beauty",
        building: "B1",
        floor: 3,
        areaId: "area_314",
        desc: "Кабинет можно забронировать для своего мастера",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/KzBrRvuP9RO0x",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/parikmaxer",
        attributes: {
            location: "314"
        }
    },
    {
        id: 1034,
        name: "",
        category: "beauty",
        building: "B1",
        floor: 3,
        areaId: "service_",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/P58KZMh9aZ7a3\nhttps://andreymashkin.ru/disk/share/m4dazGS9gv6k6",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/master-po-manikyuru",
        attributes: {
        }
    },
    {
        id: 1035,
        name: "Массажный кабинет",
        category: "relax",
        building: "B1",
        floor: 3,
        areaId: "area_308А",
        desc: "Кабинет можно забронировать для своего мастера",
        contacts: "",
        img: "значок можно поставить",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/massazhnyj-kabinet",
        attributes: {
            location: "308А"
        }
    },
    {
        id: 1036,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-Б",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "Типовое фото \nhttps://andreymashkin.ru/disk/share/b8AVKqhX9enzq",
        link: "#",
        attributes: {
            location: "402 Б"
        }
    },
    {
        id: 1037,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-Г",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Г"
        }
    },
    {
        id: 1038,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-Д",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Д"
        }
    },
    {
        id: 1039,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-Е",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Е"
        }
    },
    {
        id: 1040,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-З",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 З"
        }
    },
    {
        id: 1041,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-И",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 И"
        }
    },
    {
        id: 1042,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-К",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 К"
        }
    },
    {
        id: 1043,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_402-Л",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "402 Л"
        }
    },
    {
        id: 1044,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 4,
        areaId: "area_4Б",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "4Б"
        }
    },
    {
        id: 1045,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 4,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1046,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 4,
        areaId: "service_Ресепшен",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
        }
    },
    {
        id: 1047,
        name: "Зона ожидания",
        category: "relax",
        building: "B1",
        floor: 4,
        areaId: "service_Зона-ожидания",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/vxBekbfbp1XdJ\nhttps://andreymashkin.ru/disk/share/zoqVAmHJ71l8O",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1048,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 5,
        areaId: "area_504",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "504"
        }
    },
    {
        id: 1049,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 5,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1050,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 5,
        areaId: "service_Ресепшен",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
        }
    },
    {
        id: 1051,
        name: "Акустические кабинки",
        category: "service",
        building: "B1",
        floor: 6,
        areaId: "area_Холл-6-этажа",
        desc: "Свободный доступ",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/P58KZMh9aZJbb",
        link: "#",
        attributes: {
            location: "Холл 6 этажа"
        }
    },
    {
        id: 1052,
        name: "Комната тишины",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "area_603",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "фото приложила",
        link: "#",
        attributes: {
            location: "603"
        }
    },
    {
        id: 1053,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "area_608",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "608"
        }
    },
    {
        id: 1054,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "area_6-Б",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "6 Б"
        }
    },
    {
        id: 1055,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 6,
        areaId: "area_606",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "606"
        }
    },
    {
        id: 1056,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 6,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1057,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 6,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1058,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 7,
        areaId: "area_712",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "712"
        }
    },
    {
        id: 1059,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 7,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1060,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 7,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1061,
        name: "Конмата тишины",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "area_803",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "фото приложила",
        link: "#",
        attributes: {
            location: "803"
        }
    },
    {
        id: 1062,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "area_808",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "точка, а фото будет позже",
        link: "#",
        attributes: {
            location: "808"
        }
    },
    {
        id: 1063,
        name: "Учебный зал",
        category: "meeting",
        building: "B1",
        floor: 8,
        areaId: "area_810",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Учебный зал",
        link: "#",
        attributes: {
            location: "810"
        }
    },
    {
        id: 1064,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 7,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1065,
        name: "Конмата тишины",
        category: "meeting",
        building: "B1",
        floor: 9,
        areaId: "area_903",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/5nkGOys6QrGxV",
        link: "#",
        attributes: {
            location: "903"
        }
    },
    {
        id: 1066,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 9,
        areaId: "area_9Б",
        desc: "",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "9Б"
        }
    },
    {
        id: 1067,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 9,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1068,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 9,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1069,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "area_1008",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1008"
        }
    },
    {
        id: 1070,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "area_1010",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqPam",
        link: "#",
        attributes: {
            location: "1010"
        }
    },
    {
        id: 1071,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 10,
        areaId: "area_10-Б",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "10 Б"
        }
    },
    {
        id: 1072,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 10,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1073,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 10,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1074,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 10,
        areaId: "service_Ресепшен",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
        }
    },
    {
        id: 1075,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 11,
        areaId: "area_1102",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/JZeVJvuWxJvvY\nhttps://andreymashkin.ru/disk/share/VOK6mPu3ymDz8",
        link: "#",
        attributes: {
            location: "1102"
        }
    },
    {
        id: 1076,
        name: "Переговорная",
        category: "meeting",
        building: "B1",
        floor: 11,
        areaId: "area_1104",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/ppa4glhpXoaPx",
        link: "#",
        attributes: {
            location: "1104"
        }
    },
    {
        id: 1077,
        name: "Мини-кухня",
        category: "food",
        building: "B1",
        floor: 11,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1078,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B1",
        floor: 11,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1079,
        name: "Ресепшен",
        category: "service",
        building: "B1",
        floor: 11,
        areaId: "service_Ресепшен",
        desc: "",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/xAl7ZoFDnz1O8",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
        }
    },
    {
        id: 1080,
        name: "Парковка",
        category: "other",
        building: "PARKING",
        floor: 1,
        areaId: "service_Парковка",
        desc: "подробнее о парковке https://jive.croc.ru/community/knowledge/everyday/social/parkovka-krok",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Парковка",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1081,
        name: "Велопарковка",
        category: "service",
        building: "PARKING",
        floor: 1,
        areaId: "service_Велопарковка",
        desc: "Точка паркинга и проката велосипедов",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/Era2zvubQz3pX",
        link: "Подробнее о прокате велосипедов https://jive.croc.ru/community/knowledge/everyday/corporate/sport/zelyonye-velosipedy-krok",
        attributes: {
        }
    },
    {
        id: 1082,
        name: "Точки зарядки электромобилей",
        category: "service",
        building: "PARKING",
        floor: 1,
        areaId: "service_Точки-зарядки-электромобилей",
        desc: "Точка зарядки электромобиля",
        contacts: "",
        img: "просто точки поставить , карту ранее отправляла",
        link: "Для того чтобы воспользоваться зарядным устройством, пожалуйста, заранее согласуйте время зарядки автомобиля в Telegram-чате. \nЭто поможет эффективнее распределить время использования зарядок между всеми заинтересованными.\n\nНадеемся, что поездки на работу станут более удобными и экологичными 🌱",
        attributes: {
        }
    },
    {
        id: 1083,
        name: "Входная группа",
        category: "other",
        building: "B2",
        floor: 1,
        areaId: "service_Входная-группа",
        desc: "ЗАО «КРОК инкорпорейтед»\nhttps://www.croc.ru",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3Kqr4z",
        link: "#",
        attributes: {
        }
    },
    {
        id: 1084,
        name: "Турникет с NFC проходом",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "area_Турникет",
        desc: "Возможность прохода в офис без использования пластиковой карты-пропуска, а через идентификацию с передачей номера карты по NFC/BLE смартфона.",
        contacts: "",
        img: "Просто  поставить точку локации во входной группе",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/proxod-v-ofis-s-pomoshhyu-telefona",
        attributes: {
            location: "Турникет"
        }
    },
    {
        id: 1085,
        name: "КРОК кофе (кофе-точка на карте)",
        category: "food",
        building: "B2",
        floor: 1,
        areaId: "service_КРОК-кофе-кофе-точка-на-карте",
        desc: "Точка подзарядки вкусным кофе",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/eeVndbCkDv3zb",
        link: "#",
        attributes: {
            hours: "График работы: понедельник пятница с 8:00 до 19:00"
        }
    },
    {
        id: 1086,
        name: "Вендинг",
        category: "food",
        building: "B2",
        floor: 1,
        areaId: "service_Вендинг",
        desc: "Быстрый перекус или полноценный обед в «шаговой» доступности.\n1 этаж",
        contacts: "Для вендинга ОС - foodfeedback@croc.ru",
        img: "https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fwww.niasam.ru%2F221783_i_gallerybig.jpg&lr=213&pos=1&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%BC%D0%B0%D1%82%D0%B0%20\nhttps://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fvending-machine-snack-drink_6427-85.jpg%3Fw%3D2000&lr=213&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3%D0%B0",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1087,
        name: "Гардероб",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "service_Гардероб",
        desc: "Гардероб предназначен для хранения верхней одежды, а также обуви в пакетах",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/VOK6mPu3ymbW1",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1088,
        name: "Лифты (подсветить только 1 этаж коопуса 1 и 3 , для информации) \nЕсть большой и малый лифтовой холл 9обратить внимание)",
        category: "service",
        building: "B2",
        floor: 1,
        areaId: "service_Лифты-подсветить-только-1-этаж-коопуса-1-и-3--для-информации-Есть-большой-и-малый-лифтовой-холл-9обратить-внимание",
        desc: "При застревании в лифте соблюдайте спокойствие и действуйте согласно инструкции, расположенной на панели управления в каждом лифте.\n\nПри неисправности лифта следует:\nнажать колокольчик и описать\nситуацию диспетчеру\nЛИБО\nпозвонить 8 (495) 974-22-74\nдоб 83-02, 83-03, круглосуточно\nЛИБО\nпозвонить дежурному лифтеру\nООО «ЛифтКомплекс» 8 (495) 974-22-74\nдоб 83-01.",
        contacts: "FieldService@croc.ru",
        img: "https://andreymashkin.ru/disk/share/y0rVxlSZKk8Xo",
        link: "#",
        attributes: {
            hours: "Круглосуточно"
        }
    },
    {
        id: 1089,
        name: "Конференц-зал",
        category: "meeting",
        building: "B2",
        floor: 2,
        areaId: "area_203",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/zoqVAmHJ711q7",
        link: "#",
        attributes: {
            location: "203"
        }
    },
    {
        id: 1090,
        name: "Конференц-зал",
        category: "meeting",
        building: "B2",
        floor: 2,
        areaId: "area_201",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Конференц-зал",
        link: "#",
        attributes: {
            location: "201"
        }
    },
    {
        id: 1091,
        name: "Столовая",
        category: "food",
        building: "B2",
        floor: 2,
        areaId: "service_Столовая",
        desc: "Столовая полного цикла для питания сотрудников и гостей КРОК\nОсновной зал\nМягкая зона \nЛетняя веранда",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/WOMWqau3KqrbO\nhttps://andreymashkin.ru/disk/share/02XRVKuegZYPW\nhttps://andreymashkin.ru/disk/share/7KAD3WueOqbX1\nhttps://andreymashkin.ru/disk/share/XRYPVXsKyVvXR",
        link: "https://jive.croc.ru/community/knowledge/everyday/social/lunch",
        attributes: {
            hours: "с 8:30 до 17:00"
        }
    },
    {
        id: 1092,
        name: "Банкомат",
        category: "service",
        building: "B2",
        floor: 2,
        areaId: "service_Банкомат",
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
        building: "B2",
        floor: 3,
        areaId: "area_311",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
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
        building: "B2",
        floor: 3,
        areaId: "area_315",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
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
        building: "B2",
        floor: 3,
        areaId: "area_317",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
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
        building: "B2",
        floor: 3,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1097,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B2",
        floor: 3,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
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
        building: "B2",
        floor: 4,
        areaId: "area_416",
        desc: "Прием проводит врач общей практики Дрюкова Анна Викторовна",
        contacts: "ndemidova@croc.ru",
        img: "https://andreymashkin.ru/disk/share/4KvpGYu59bbgz\nhttps://andreymashkin.ru/disk/share/OZqQBnu56BBgn",
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
        building: "B2",
        floor: 4,
        areaId: "area_417",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
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
        building: "B2",
        floor: 4,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1101,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B2",
        floor: 4,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
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
        building: "B2",
        floor: 5,
        areaId: "area_512",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
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
        building: "B2",
        floor: 5,
        areaId: "area_511",
        desc: "",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "511"
        }
    },
    {
        id: 1104,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 5,
        areaId: "area_513",
        desc: "",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "513"
        }
    },
    {
        id: 1105,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 5,
        areaId: "area_517",
        desc: "",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "517"
        }
    },
    {
        id: 1106,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 5,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1107,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 6,
        areaId: "area_611",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "611"
        }
    },
    {
        id: 1108,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 6,
        areaId: "area_615",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "615"
        }
    },
    {
        id: 1109,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 6,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1110,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 7,
        areaId: "area_701",
        desc: "",
        contacts: "",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "701"
        }
    },
    {
        id: 1111,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 7,
        areaId: "area_715",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "715"
        }
    },
    {
        id: 1112,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 7,
        areaId: "area_717",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "717"
        }
    },
    {
        id: 1113,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 7,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1114,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 8,
        areaId: "area_803",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "803"
        }
    },
    {
        id: 1115,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 8,
        areaId: "area_808",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "808"
        }
    },
    {
        id: 1116,
        name: "Лекторий",
        category: "meeting",
        building: "B2",
        floor: 8,
        areaId: "area_810",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Лекторий",
        link: "#",
        attributes: {
            location: "810"
        }
    },
    {
        id: 1117,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 8,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1118,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 9,
        areaId: "area_915",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "915"
        }
    },
    {
        id: 1119,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 9,
        areaId: "area_917",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "917"
        }
    },
    {
        id: 1120,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 9,
        areaId: "area_925",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "925"
        }
    },
    {
        id: 1121,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 9,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1122,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B2",
        floor: 9,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1123,
        name: "Коворкинг маркетинга",
        category: "meeting",
        building: "B2",
        floor: 10,
        areaId: "area_1007",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://andreymashkin.ru/disk/share/AXnVWvs5BWW2G\nhttps://andreymashkin.ru/disk/share/rg9eJlCk1ddvE\nhttps://andreymashkin.ru/disk/share/Mnl0eZsX8eeWP\nhttps://andreymashkin.ru/disk/share/KzBrRvuP9RR09\nhttps://andreymashkin.ru/disk/share/D4WEXGSnYXXrW",
        link: "#",
        attributes: {
            location: "1007"
        }
    },
    {
        id: 1124,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 10,
        areaId: "area_1013",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1013"
        }
    },
    {
        id: 1125,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 10,
        areaId: "area_1015",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1015"
        }
    },
    {
        id: 1126,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 10,
        areaId: "area_1022",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1022"
        }
    },
    {
        id: 1127,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 10,
        areaId: "area_1024",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1024"
        }
    },
    {
        id: 1128,
        name: "Ресепшен",
        category: "service",
        building: "B2",
        floor: 11,
        areaId: "service_Ресепшен",
        desc: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        contacts: "",
        img: "https://andreymashkin.ru/disk/share/qvzb04hoVQQzD",
        link: "Подробнее https://jive.croc.ru/community/knowledge/everyday/social/sekretariat/overview",
        attributes: {
        }
    },
    {
        id: 1129,
        name: "Мини-кухня",
        category: "food",
        building: "B2",
        floor: 11,
        areaId: "area_с-3-11",
        desc: "Уютные локации для быстрых встреч и перекусов на всех этажах корпусов Альфа и Бета.\n\nКаждая мини-кухня оборудована кофемашиной, системой фильтрации питьевой воды и холодильником для хранения еды.\n\nСледить за порядком на мини-кухнях помогают кофе-леди. Если неожиданно закончилось молоко, чай/кофе или нужна помощь с бытовой техникой – напиши об этом или позвони по номеру +7(926)041-47-51.\n\nТвой запрос передадут ответственному за данную локацию и решат в кратчайшие сроки.",
        contacts: "foodfeedback@croc.ru",
        img: "https://andreymashkin.ru/disk/share/RrOMAYu0qAMGx\nhttps://andreymashkin.ru/disk/share/y0rVxlSZKk8o6",
        link: "#",
        attributes: {
            location: "с 3-11"
        }
    },
    {
        id: 1130,
        name: "Утилизация бумаги",
        category: "eco",
        building: "B2",
        floor: 11,
        areaId: "service_Утилизация-бумаги",
        desc: "Точка сбора бумаги\nможно поставить у лифтового холла однотипно для всех локаций",
        contacts: "WorkCare@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Утилизация бумаги",
        link: "https://jive.croc.ru/photos/4205",
        attributes: {
        }
    },
    {
        id: 1131,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 11,
        areaId: "area_1111",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1111"
        }
    },
    {
        id: 1132,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 11,
        areaId: "area_1113",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1113"
        }
    },
    {
        id: 1133,
        name: "Переговорная",
        category: "meeting",
        building: "B2",
        floor: 11,
        areaId: "area_1117",
        desc: "Бронируй через календарь в Outlook\nили в @CrocLiveBot.",
        contacts: "Во вопросам оборудования: HelpDesk@croc.ru\n\nПо вопросам организации встреч и канцелярии : Receptions_Group@croc.ru",
        img: "https://dummyimage.com/600x400/f3f3f3/000.png&text=Переговорная",
        link: "#",
        attributes: {
            location: "1117"
        }
    }
];

const buildingFloorStructure = {
    "B1": {
        "label": "Корпус 1",
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
    "PARKING": {
        "label": "PARKING",
        "floors": [
            1
        ],
        "defaultFloor": 1
    },
    "B2": {
        "label": "Корпус 2",
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

// svgFloorPlans нужно обновить вручную на основе актуальных SVG файлов
const svgFloorPlans = {
    'B1-F1': {
        src: './map/b1f1.svg',
        viewBox: '0 0 1074 525'
    },
    'B1-F2': {
        src: './map/b1f2.svg',
        viewBox: '0 0 1095 503'
    },
    'B1-F3': {
        src: './map/floor-B1-F3.svg',
        viewBox: '0 0 800 550'
    },
    'B3-F1': {
        src: './map/floor-B3-F1.svg',
        viewBox: '0 0 800 550'
    }
};
