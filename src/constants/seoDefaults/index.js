import { ST } from "next/dist/shared/lib/utils";

export const seoDefaults = {
    title: "London Airport Transfers to Airport-Car Service-Minicab",
    keywords: "London airport transfers, Heathrow pickups, Gatwick pickups, airport pickups, Heathrow transfer, Gatwick transfer, Stansted transfer, Luton transfer, Heathrow airport transfer, Gatwick airport transfer.",
    description: "Airport Pickups London offers London airport taxi, transfers and airport shuttle services. We cover Heathrow, Gatwick, Stansted, Luton and City Airport and UK Cruise port.",
    footerbggray: false,
    isVisible: false,
    metaTags: []

};


export const SUPPORTED_LANGUAGES = {
    ZH: 'zh',
    RU: 'ru',
    ES: 'es',
    TR: 'tr',
    AR: 'ar',
    IT: 'it'
};
// Social Media Links
export const SOCIAL_MEDIA = {
    twitter: "https://x.com/Airport_Pickups",
    instagram: "https://www.instagram.com/airport_pickups_london",
    facebook: "https://www.facebook.com/AirportPickupsLondon"
};
// Meta Content for all languages
export const META_CONTENT_HOME_PAGE = {
    en: {
        ogTitle: "Airport Pickups London | Reliable Airport Taxi & Transfer Service",
        ogDescription: "Airport Pickups London offers reliable, professional, and hassle-free airport transfers across London, including Heathrow, Gatwick, Stansted, Luton, and City Airport. Book online for stress-free travel.",
        twitterTitle: "Airport Pickups London | Reliable Airport Taxi & Transfer Service",
        twitterDescription: "Reliable airport taxi transfers across London from Heathrow, Gatwick, Stansted, and Luton. Book now for professional service and stress-free travel."
    },
    tr: {
        ogTitle: "Airport Pickups London | Güvenilir Havalimanı Taksi ve Transfer Hizmeti",
        ogDescription: "Airport Pickups London, Heathrow, Gatwick, Stansted, Luton ve City Havalimanları için güvenilir ve profesyonel havaalanı transfer hizmetleri sunar. Stresiz bir seyahat için şimdi rezervasyon yapın.",
        twitterTitle: "Airport Pickups London | Güvenilir Havalimanı Taksi ve Transfer Hizmeti",
        twitterDescription: "Heathrow, Gatwick, Stansted ve Luton'dan profesyonel havaalanı taksi transferleri. Şimdi stresiz bir yolculuk için rezervasyon yapın."
    },
    ar: {
        ogTitle: "Airport Pickups London | خدمة تاكسي ونقل موثوقة من المطار",
        ogDescription: "تقدم Airport Pickups London خدمات نقل موثوقة ومهنية وخالية من المتاعب من مطارات لندن بما في ذلك هيثرو، جاتويك، ستانستيد، لوتون و City Airport. احجز الآن لرحلة خالية من القلق.",
        twitterTitle: "Airport Pickups London | خدمة تاكسي ونقل موثوقة من المطار",
        twitterDescription: "نقل تاكسي موثوق من مطارات لندن: هيثرو، جاتويك، ستانستيد، ولوتون. احجز الآن لرحلة خالية من المتاعب."
    },
    es: {
        ogTitle: "Airport Pickups London | Servicio de taxi y traslado fiable del aeropuerto",
        ogDescription: "Airport Pickups London ofrece traslados fiables, profesionales y sin complicaciones desde los aeropuertos de Londres, incluidos Heathrow, Gatwick, Stansted, Luton y City Airport. Reserve ahora para un viaje sin estrés.",
        twitterTitle: "Airport Pickups London | Servicio de taxi y traslado fiable del aeropuerto",
        twitterDescription: "Traslados en taxi confiables desde Heathrow, Gatwick, Stansted y Luton. Reserve ahora para un viaje sin estrés."
    },
    it: {
        ogTitle: "Airport Pickups London | Servizio di taxi e trasferimento affidabile dall'aeroporto",
        ogDescription: "Airport Pickups London offre trasferimenti aeroportuali affidabili, professionali e senza problemi da Heathrow, Gatwick, Stansted, Luton e City Airport. Prenota ora per un viaggio senza stress.",
        twitterTitle: "Airport Pickups London | Servizio di taxi e trasferimento affidabile dall'aeroporto",
        twitterDescription: "Trasferimenti in taxi affidabili da Heathrow, Gatwick, Stansted e Luton. Prenota ora per un viaggio senza stress."
    },
    ru: {
        ogTitle: "Airport Pickups London | Надежный такси-сервис и трансферы из аэропорта",
        ogDescription: "Airport Pickups London предлагает надежные, профессиональные и удобные трансферы из аэропортов Лондона, включая Хитроу, Гатвик, Станстед, Лутон и City Airport. Забронируйте сейчас для беспроблемной поездки.",
        twitterTitle: "Airport Pickups London | Надежный такси-сервис и трансферы из аэропорта",
        twitterDescription: "Надежные и удобные такси-трансферы из аэропортов Лондона: Хитроу, Гатвик, Станстед и Лутон. Забронируйте сейчас для беспроблемной поездки."
    },
    zh: {
        ogTitle: "Airport Pickups London | 可靠的机场出租车及接送服务",
        ogDescription: "Airport Pickups London 提供从伦敦希思罗机场、盖特威克机场、斯坦斯特德机场、卢顿机场及City机场的可靠、专业、无忧接送服务。现在预订，享受无忧旅程。",
        twitterTitle: "Airport Pickups London | 可靠的机场出租车及接送服务",
        twitterDescription: "从伦敦的希思罗、盖特威克、斯坦斯特德及卢顿机场提供的可靠出租车接送服务。现在预订，享受无忧旅程。"
    }
};
// Verification Constants
export const SITE_VERIFICATIONS = {
    verify_v1: "KKDrUvNuL/YKcQ6PqTYbnH+UUOq0/lz/pJU/z7M+Ro4=",
    baidu: "x5apENcEmp",
    google: "_Cn8CYgXUWiRe05oCJj_l5OkyXza4K4nIuDWUPs8P2w",
    ms: "41FC097AFD6E06774C838AC3D486664F"
};
// Route configuration
export const STATIC_ROUTES = {
    HOME: '/',
    TERMS: '/terms',
    PRIVACY: '/privacy-policy',
    ABOUT: '/about-us',
    FLEET: '/fleet',
    TRAVEL_AGENTS: '/travel-agents',
    TOURS: '/tours',
    PORTER: '/heathrow-porter-service',
    VIP: '/heathrow-vip-meet-and-assist',
    CONTACT: '/contact-us'
};

export const LINKNAME_ROUTES = {
    HEATHROW: 'heathrow-taxi-prices',
    GATWICK: "gatwick-taxi-prices",
    LONDON_CITY: "london-city-taxi-prices",
    LUTON: "luton-taxi-prices",
    STANSTED: "stansted-taxi-prices",
    SOUTHAMPTON: "southampton-cruise-taxi",
    DOVER: "dover-cruise-taxi",
    PORTSMOUTH: "portsmouth-taxi-prices"

}


export const META_CONTENT_LINKNAME = {
    HEATHROW: {
        en: {
            ogTitle: "Heathrow Taxi Prices | Affordable Transfers from London Airports",
            ogDescription: "Discover our competitive taxi prices from Heathrow Airport to various locations in London. Book your transfer online for the best rates.",
            twitterTitle: "Heathrow Taxi Prices | Affordable Transfers from London Airports",
            twitterDescription: "Check our competitive prices for transfers from Heathrow Airport to London. Reserve your taxi today for the best deals.",
            imageUrl:"heathrow.webp",
            schema: {
                "description": "Competitive taxi prices from Heathrow Airport to various locations in London. Book online for the best rates.",
                "name": "Heathrow Taxi Prices",
                "url": "/heathrow-taxi-prices",
            }
        },
        tr: {
            ogTitle: "Heathrow Taksi Fiyatları | Londra Havalimanlarından Uygun Fiyatlı Transferler",
            ogDescription: "Heathrow Havalimanı'ndan Londra'nın çeşitli noktalarına uygun taksi fiyatlarımızı keşfedin. En iyi fiyatlar için transferinizi çevrimiçi olarak rezervasyon yapın.",
            twitterTitle: "Heathrow Taksi Fiyatları | Londra Havalimanlarından Uygun Fiyatlı Transferler",
            twitterDescription: "Heathrow Havalimanı'ndan Londra'ya profesyonel transfer hizmetlerimiz için uygun fiyatları kontrol edin. En iyi fırsatlar için şimdi rezervasyon yapın.",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "Heathrow Taksi Fiyatları",
                "url": "/tr/heathrow-taxi-prices",
                "description": "Heathrow Havalimanı'ndan Londra'nın çeşitli noktalarına uygun taksi fiyatları. En iyi fiyatlar için çevrimiçi rezervasyon yapın.",
            }
        },
        ar: {
            ogTitle: "أسعار تاكسي هيثرو | نقل موثوق من مطار لندن",
            ogDescription: "اكتشف أسعارنا التنافسية لنقل تاكسي من مطار هيثرو إلى مواقع مختلفة في لندن. احجز نقلك عبر الإنترنت للحصول على أفضل الأسعار",
            twitterTitle: "أسعار تاكسي هيثرو | نقل موثوق من مطار لندن ",
            twitterDescription: "تحقق من أسعارنا التنافسية لنقل التاكسي من مطار هيثرو إلى لندن. احجز الآن للحصول على أفضل العروض",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "أسعار تاكسي هيثرو",
                "url": "/ar/heathrow-taxi-prices",
                "description": "أسعار تنافسية لنقل التاكسي من مطار هيثرو إلى مواقع مختلفة في لندن. احجز عبر الإنترنت للحصول على أفضل الأسعار.",
            }
        },
        es: {
            ogTitle: "Precios de Taxi en Heathrow | Transferencias Asequibles desde Aeropuertos de Londres",
            ogDescription: "Descubre nuestros precios competitivos para traslados en taxi desde el Aeropuerto de Heathrow a varias ubicaciones en Londres. Reserva tu transferencia en línea para las mejores tarifas",
            twitterTitle: "Precios de Taxi en Heathrow | Transferencias Asequibles desde Aeropuertos de Londres",
            twitterDescription: "Consulta nuestros precios competitivos para traslados en taxi desde el Aeropuerto de Heathrow a Londres. Reserva ahora para obtener las mejores ofertas",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "Precios de Taxi en Heathrow",
                "url": "/es/heathrow-taxi-prices",
                "description": "Precios competitivos para traslados en taxi desde el Aeropuerto de Heathrow a diversas ubicaciones en Londres. Reserva en línea para obtener las mejores tarifas.",
            }
        },
        it: {
            ogTitle: "Prezzi Taxi Heathrow | Trasferimenti Affidabili dagli Aeroporti di Londra",
            ogDescription: "Scopri i nostri prezzi competitivi per i trasferimenti in taxi dall'Aeroporto di Heathrow a varie località di Londra. Prenota il tuo trasferimento online per le migliori tariffe",
            twitterTitle: "Prezzi Taxi Heathrow | Trasferimenti Affidabili dagli Aeroporti di Londra",
            twitterDescription: "Controlla i nostri prezzi competitivi per i trasferimenti in taxi dall'Aeroporto di Heathrow a Londra. Prenota ora per le migliori offerte",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "Prezzi Taxi Heathrow",
                "url": "/it/heathrow-taxi-prices",
                "description": "Prezzi competitivi per trasferimenti in taxi dall'Aeroporto di Heathrow a varie località di Londra. Prenota online per ottenere le migliori tariffe.",
            }
        },
        ru: {
            ogTitle: "Цены на Такси Хитроу | Надежные Трансферы из Лондонских Аэропортов",
            ogDescription: "Узнайте о наших конкурентоспособных ценах на такси из аэропорта Хитроу в различные места Лондона. Забронируйте трансфер онлайн для получения лучших тарифов.",
            twitterTitle: "Цены на Такси Хитроу | Надежные Трансферы из Лондонских Аэропортов",
            twitterDescription: "Проверьте наши конкурентоспособные цены на такси из аэропорта Хитроу в Лондон. Забронируйте сейчас для получения лучших предложений",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "Цены на Такси Хитроу",
                "url": "/ru/heathrow-taxi-prices",
                "description": "Конкурентоспособные цены на такси из аэропорта Хитроу в различные места Лондона. Забронируйте онлайн для получения лучших тарифов.",
            }
        },
        zh: {
            ogTitle: "希思罗机场出租车价格 | 从伦敦机场出发的可靠转机",
            ogDescription: "了解我们从希思罗机场到伦敦各地的出租车价格。现在在线预订，以获取最佳价格。",
            twitterTitle: "希思罗机场出租车价格 | 从伦敦机场出发的可靠转机",
            twitterDescription: "查看我们从希思罗机场到伦敦的出租车价格。现在预订以获取最佳优惠。",
            imageUrl:"heathrow.webp",
            schema: {
                "name": "希思罗机场出租车价格",
                "url": "/zh/heathrow-taxi-prices",
                "description": "希思罗机场到伦敦各地的出租车价格。在线预订以获取最佳价格。",
            }
        }
    },
    GATWICK:{
        en: {
            ogTitle: "Gatwick Taxi Prices | Affordable Transfers from London Airports",
            ogDescription: "Find competitive prices for transfers from Gatwick Airport to various locations in London. Book your taxi online for the best rates!",
            twitterTitle: "Gatwick Taxi Prices | Affordable Transfers from London Airports",
            twitterDescription: "Check our competitive prices for transfers from Gatwick Airport to London. Reserve your taxi today for the best deals!",
            imageUrl:"gatwick.webp",
            schema: {
                "description": "Competitive prices for transfers from Gatwick Airport to various locations in London. Book online for the best rates!",
                "name": "Gatwick Taxi Prices",
                "url": "/gatwick-taxi-prices",
            }
        },
        tr: {
            ogTitle: "Gatwick Taksi Fiyatları | Londra Havalimanlarından Uygun Fiyatlı Transferler",
            ogDescription: "Heathrow, Gatwick, Stansted, Luton ve City Havalimanlarından Gatwick Havalimanı'na uygun fiyatlarla transfer hizmetleri sunuyoruz. Şimdi rezervasyon yapın!",
            twitterTitle: "Gatwick Taksi Fiyatları | Londra Havalimanlarından Uygun Fiyatlı Transferler",
            twitterDescription: "Heathrow, Gatwick, Stansted, Luton ve City Havalimanlarından Gatwick Havalimanı'na uygun fiyatlarla transfer hizmetleri sunuyoruz. Şimdi rezervasyon yapın!",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "Gatwick Taksi Fiyatları",
                "url": "/tr/gatwick-taxi-prices",
                "description": "Uygun fiyatlarla Gatwick Havalimanı'na transfer hizmetleri. Şimdi online rezervasyon yapın!",
            }
        },
        ar: {
            ogTitle: "أسعار تاكسي جاتويك | نقل موثوق من مطار لندن",
            ogDescription: "اكتشف أسعارنا التنافسية لنقل تاكسي من مطار جاتويك إلى مواقع مختلفة في لندن. احجز نقلك عبر الإنترنت للحصول على أفضل الأسعار",
            twitterTitle: "أسعار تاكسي جاتويك | نقل موثوق من مطار لندن",
            twitterDescription: "تحقق من أسعارنا التنافسية لنقل التاكسي من مطار جاتويك إلى لندن. احجز الآن للحصول على أفضل العروض.",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "أسعار تاكسي جاتويك",
                "url": "/ar/gatwick-taxi-prices",
                "description": "أسعار تنافسية لنقل التاكسي من مطار جاتويك إلى مواقع مختلفة في لندن. احجز عبر الإنترنت للحصول على أفضل الأسعار.",
            }
        },
        es: {
            ogTitle: "Precios de Taxi en Gatwick | Transferencias Asequibles desde Aeropuertos de Londres",
            ogDescription: "Descubre nuestros precios competitivos para traslados en taxi desde el Aeropuerto de Gatwick a varias ubicaciones en Londres. Reserva tu taxi en línea para las mejores tarifas",
            twitterTitle: "Precios de Taxi en Gatwick | Transferencias Asequibles desde Aeropuertos de Londres",
            twitterDescription: "Consulta nuestros precios competitivos para traslados en taxi desde el Aeropuerto de Gatwick a Londres. Reserva ahora para obtener las mejores ofertas.",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "Precios de Taxi en Gatwick",
                "url": "/es/gatwick-taxi-prices",
                "description": "Precios competitivos para traslados en taxi desde el Aeropuerto de Gatwick a diversas ubicaciones en Londres. Reserva en línea para obtener las mejores tarifas.",
            }
        },
        it: {
            ogTitle: "Prezzi Taxi Gatwick | Trasferimenti Affidabili dagli Aeroporti di Londra",
            ogDescription: "Scopri i nostri prezzi competitivi per i trasferimenti in taxi dall'Aeroporto di Gatwick a varie località di Londra. Prenota il tuo trasferimento online per le migliori tariffe.",
            twitterTitle: "Prezzi Taxi Gatwick | Trasferimenti Affidabili dagli Aeroporti di Londra",
            twitterDescription: "Controlla i nostri prezzi competitivi per i trasferimenti in taxi dall'Aeroporto di Gatwick a Londra. Prenota ora per le migliori offerte",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "Prezzi Taxi Gatwick",
                "url": "/it/gatwick-taxi-prices",
                "description": "Prezzi competitivi per trasferimenti in taxi dall'Aeroporto di Gatwick a varie località di Londra. Prenota online per ottenere le migliori tariffe.",
            }
        },
        ru: {
            ogTitle: "Цены на Такси Гатвик | Надежные Трансферы из Лондонских Аэропортов",
            ogDescription: "Узнайте о наших конкурентоспособных ценах на такси из аэропорта Гатвик в различные места Лондона. Забронируйте трансфер онлайн для получения лучших тарифов.",
            twitterTitle: "Цены на Такси Гатвик | Надежные Трансферы из Лондонских Аэропортов",
            twitterDescription: "Проверьте наши конкурентоспособные цены на такси из аэропорта Гатвик в Лондон. Забронируйте сейчас для получения лучших предложений.",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "Цены на Такси Гатвик",
                "url": "/ru/gatwick-taxi-prices",
                "description": "Конкурентоспособные цены на такси из аэропорта Гатвик в различные места Лондона. Забронируйте онлайн для получения лучших тарифов.",
            }
        },
        zh: {
            ogTitle: "希思罗机场出租车价格 | 从伦敦机场出发的可靠转机",
            ogDescription: "了解我们从盖特威克机场到伦敦各地的出租车价格。现在在线预订，以获取最佳价格。",
            twitterTitle: "盖特威克机场出租车价格 | 从伦敦机场出发的可靠转机",
            twitterDescription: "查看我们从盖特威克机场到伦敦的出租车价格。现在预订以获取最佳优惠。",
            imageUrl:"gatwick.webp",
            schema: {
                "name": "盖特威克机场出租车价格",
                "url": "/zh/gatwick-taxi-prices",
                "description": "从盖特威克机场到伦敦各地的出租车价格。在线预订以获取最佳价格。",
            }
        }
    }
};