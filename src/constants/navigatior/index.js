//for footer
export const Airports = [
    {
        innerText: "Heathrow Airport Transfer",
        path: "/heathrow-taxi-prices",
        title: "London Heathrow Transfer",
        type: "cell",
        hasTaxiDeals: "heathrow",
        id: 1,
        translateTitle: "strHeathrowTaxiPrices",

    },
    {
        innerText: "Gatwick Airport Transfer",
        path: "/gatwick-taxi-prices",
        title: "London Gatwick Transfer",
        type: "cell",
        hasTaxiDeals: "gatwick",
        id: 2,
        translateTitle: "strGatwickTaxiPrices",
    }
    ,
    {
        innerText: "City Airport Transfer",
        path: "/london-city-taxi-prices",
        title: "London City Airport Transfer",
        type: "cell",
        hasTaxiDeals: "city",
        id: 3,
        translateTitle: "strLCYTaxiPrices",

    }
    ,
    {
        innerText: "Luton Airport Transfer",
        path: "/luton-taxi-prices",
        title: "Luton Airport Transfer",
        type: "cell",
        hasTaxiDeals: "luton",
        id: 4,
        translateTitle: "strLutonTaxiPrices",
    },
    {
        innerText: "Stansted Airport Transfer",
        path: "/stansted-taxi-prices",
        title: "London Stansted Airport Transfer",
        type: "cell",
        hasTaxiDeals: "stansted",
        id: 5,
        translateTitle: "strStanstedTaxiPrices",
    }
]
export const CruisePorts = [
    {
        innerText: "Dover Cruise Port",
        path: "/dover-cruise-taxi",
        title: "Dover Cruise Terminal Transfer",
        type: "cell",
        hasTaxiDeals: "dover",
        translateTitle: "strDoverCruisePort",
        imgUrl: "/images/cruiseto/cruise1__.webp",
        id: 1,
    },
    {
        innerText: "Harwich Cruise Port ",
        path: "/harwich-taxi-prices",
        title: "Harwich Cruise Port  Transfer",
        type: "cell",
        hasTaxiDeals: "harwich",
        title: "Harwich Cruise Port",
        id: 2,
        imgUrl: "/images/cruiseto/cruise2__.webp",
        translateTitle: "strHarwichCruisePort",
    },
    {
        innerText: "Portsmouth Cruise Port",
        path: "/portsmouth-taxi-prices",
        title: "Portsmouth Cruise Port Transfer",
        translateTitle: "strPortsmouthCruisePort",
        type: "cell",
        hasTaxiDeals: "portsmouth",
        imgUrl: "/images/cruiseto/cruise3__.webp",

        id: 3,
    },
    {
        innerText: "Southampton Cruise Port",
        path: "/southampton-cruise-taxi",
        title: "Southampton Cruise Port Transfer",
        type: "cell",
        hasTaxiDeals: "southampton",
        translateTitle: "strSouthamptonCruisePort",
        imgUrl: "/images/cruiseto/cruise4__.webp",

        id: 4,


    },
]

// normal list
//hasTaxideals=>when we select any link we store that name of
//..hasTaxideals to redux then When we get from that redux and use it inside  Heathrow Airport Transfer|| Gatwick Airport Transfer
//+
export const navigator = [
    {
        innerText: "home",
        path: "/",
        title: "strNavHome",
        type: "cell",
        hasTaxiDeals: "",
        strInnerText: "strNavHome",
    },
    {
        innerText: "airports",
        path: "/",
        type: "list",
        hasTaxiDeals: "",
        strInnerText: "strAirportTaxi",
        list: [
            {
                innerText: "Heathrow Airport Transfer",
                path: "/heathrow-taxi-prices",
                title: "strHeathrowTaxiPrices",
                type: "cell",
                hasTaxiDeals: "heathrow",
                strInnerText: "strHeathrowTaxiPrices",
            },
            {
                innerText: "Gatwick Airport Transfer",
                path: "/gatwick-taxi-prices",
                title: "strGatwickTaxiPrices",
                type: "cell",
                hasTaxiDeals: "gatwick",
                strInnerText: "strGatwickTaxiPrices",
            },
            {
                innerText: "City Airport Transfer",
                path: "/london-city-taxi-prices",
                title: "strLCYTaxiPrices",
                type: "cell",
                hasTaxiDeals: "city airport",
                strInnerText: "strLCYTaxiPrices"
            },
            {
                innerText: "Luton Airport Transfer",
                path: "/luton-taxi-prices",
                title: "strLutonTaxiPrices",
                type: "cell",
                hasTaxiDeals: "luton",
                strInnerText: "strLutonTaxiPrices"
            },
            {
                innerText: "Stansted Airport Transfer",
                path: "/stansted-taxi-prices",
                title: "strStanstedTaxiPrices",
                type: "cell",
                hasTaxiDeals: "stansted",
                strInnerText: "strStanstedTaxiPrices"
            }
        ]
    },
    {
        innerText: "Cruise Ports",
        path: "/",
        type: "list",
        hasTaxiDeals: "",
        strInnerText: "strCruiseTaxi",
        list: [
            {
                innerText: "Southampton Cruise Port",
                path: "/southampton-cruise-taxi",
                title: "strSouthamptonCruisePort",
                type: "cell",
                hasTaxiDeals: "southampton",
                strInnerText: "strSouthamptonCruisePort"
            },
            {
                innerText: "Dover Cruise Port",
                path: "/dover-cruise-taxi",
                title: "strDoverCruisePort",
                type: "cell",
                hasTaxiDeals: "dover",
                strInnerText: "strDoverCruisePort"

            },
            {
                innerText: "Portsmouth Cruise Port",
                path: "/portsmouth-taxi-prices",
                title: "strPortsmouthCruisePort",
                type: "cell",
                hasTaxiDeals: "portsmouth",
                strInnerText: "strPortsmouthCruisePort"
            },
            {
                innerText: "Harwich Cruise Port ",
                path: "/harwich-taxi-prices",
                title: "strHarwichCruisePort",
                type: "cell",
                hasTaxiDeals: "harwich",
                strInnerText: "strHarwichCruisePort"
            },
        ]
    },
    {
        innerText: "Terms",
        path: "/terms",
        type: "cell",
        hasTaxiDeals: "",
        title: "strTerms",
        strInnerText: "strTerms"
    },
    {
        innerText: "Our Fleet",
        path: "/fleet",
        type: "cell",
        hasTaxiDeals: "",
        title: "strOurFleet",
        strInnerText: "strOurFleet"
    },
    {
        innerText: "Contact Us ",
        path: "/contact-us",
        title: "appContactUsHeader",
        type: "cell",
        hasTaxiDeals: "",
        strInnerText: "appContactUsHeader"

    },

]
//+
export const navigatorMobile = [
    {
        innerText: "home",
        path: "/",
        title: "strNavHome",
        type: "cell",
        hasTaxiDeals: "",
        strInnerText: "strNavHome",
        firstChild: false,
    },
    {
        innerText: "airports",
        path: "/",
        type: "list",
        hasTaxiDeals: "",
        strInnerText: "strAirportTaxi",
        firstChild: true,
        list: [
            {
                innerText: "Heathrow Airport Transfer",
                path: "/heathrow-taxi-prices",
                title: "strHeathrowTaxiPrices",
                type: "cell",
                strInnerText: "strHeathrowTaxiPrices",
                hasTaxiDeals: "heathrow",
            }, {
                innerText: "Gatwick Airport Transfer",
                path: "/gatwick-taxi-prices",
                title: "strGatwickTaxiPrices",
                type: "cell",
                hasTaxiDeals: "gatwick",
                strInnerText: "strGatwickTaxiPrices",
            }, {
                innerText: "City Airport Transfer",
                path: "/london-city-taxi-prices",
                title: "strLCYTaxiPrices",
                type: "cell",
                hasTaxiDeals: "city",
                strInnerText: "strLCYTaxiPrices"
            }, {
                innerText: "Luton Airport Transfer",
                path: "/luton-taxi-prices",
                title: "strLutonTaxiPrices",
                type: "cell",
                hasTaxiDeals: "luton",
                strInnerText: "strLutonTaxiPrices"
            },
            {
                innerText: "Stansted Airport Transfer",
                path: "/stansted-taxi-prices",
                title: "strStanstedTaxiPrices",
                type: "cell",
                hasTaxiDeals: "stansted",
                strInnerText: "strStanstedTaxiPrices"
            }
        ]
    },
    {
        innerText: "Cruise Ports",
        path: "/",
        firstChild: true,
        type: "list",
        hasTaxiDeals: "",
        strInnerText: "strCruiseTaxi",
        list: [
            {
                innerText: "Southampton Cruise Port",
                path: "/southampton-cruise-taxi",
                title: "strSouthamptonCruisePort",
                type: "cell",
                hasTaxiDeals: "southampton",
                strInnerText: "strSouthamptonCruisePort"
            },
            {
                innerText: "Dover Cruise Port",
                path: "/dover-cruise-taxi",
                title: "strDoverCruisePort",
                type: "cell",
                strInnerText: "strDoverCruisePort",
                hasTaxiDeals: "dover",
            },
            {
                innerText: "Portsmouth Cruise Port",
                path: "/portsmouth-taxi-prices",
                title: "strPortsmouthCruisePort",
                type: "cell",
                strInnerText: "strPortsmouthCruisePort",
                hasTaxiDeals: "portsmouth",
            },
            {
                innerText: "Harwich Cruise Port ",
                path: "/harwich-taxi-prices",
                title: "strHarwichCruisePort",
                type: "cell",
                hasTaxiDeals: "harwich",
                strInnerText: "strHarwichCruisePort"
            },
        ]
    },
    {
        innerText: "Terms",
        path: "/terms",
        type: "cell",
        hasTaxiDeals: "",
        strInnerText: "strTerms",
        title: "strTerms",
        firstChild: false

    },
    {
        innerText: "Contact Us ",
        path: "/contact-us",
        title: "appContactUsHeader",
        strInnerText: "appContactUsHeader",
        type: "cell",
        hasTaxiDeals: "",
        firstChild: false
    },{
        innerText: "Travel Agents",
        path: "/travel-agents",
        type: "cell",
        hasTaxiDeals: "",
        strInnerText: "strTravelAgents",
        title: "strTravelAgents",
        firstChild: false
    },
    {
        innerText: "Our Fleet",
        path: "/fleet",
        type: "cell",
        hasTaxiDeals: "",
        title: "strOurFleet",
        strInnerText: "strOurFleet"
    },
    {
        innerText: "managebooking",
        path: "/manage-booking.html",
        type: "cell",
        hasTaxiDeals: "",

        title: "strManageBooking",
        strInnerText: "strManageBooking",
        firstChild: false

    }
]


let taxiPricesLinks = [
    "/gatwick-taxi-prices",
    "/heathrow-taxi-prices",
    "/london-city-taxi-prices",
    "/luton-taxi-prices",
    "/stansted-taxi-prices",
    "/dover-cruise-taxi",
    "/harwich-taxi-prices",
    "/portsmouth-taxi-prices",
    "/southampton-cruise-taxi",
    "/stansted-taxi-prices"
]

export let lists = {
    "strNavHome": "home",
    "strNavAirports": "airports",
    "strNavHeathrowAirportTransfer": "heathrow airport transfer",
    "strNavGatwickAirportTransfer": "gatwick airport transfer",
    "strNavCityAirportTransfer": "city airport transfer",
    "strNavLutonAirportTransfer": "luton airport transfer",
    "strNavStanstedAirportTransfer": "stansted airport transfer",
    "strNavCruisePorts": "cruise ports",
    "strNavSouthamptonCruisePort": "southampton cruise port",
    "strNavDoverCruisePort": "dover cruise port",
    "strNavPortsmouthCruisePort": "portsmouth cruise port",
    "strNavHarwichCruisePort": "harwich cruise port",
    "strNavTerms": "terms",
    "strNavContactUs": "contact us",
    "strNavManageMyBooking": "manage my booking",
    "strNavCorporate": "corporate",
}