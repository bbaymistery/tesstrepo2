export const titleStringOfHastaxiDeals = (hasTaxiDeals) => {
    let titleString = ""
    if (hasTaxiDeals === "dover") {
        titleString = "strDoverCruisePort"
    } else if (hasTaxiDeals === "southampton") {
        titleString = "strSouthamptonCruisePort"
    } else if (hasTaxiDeals === "portsmouth") {
        titleString = "strPortsmouthCruisePort"
    } else if (hasTaxiDeals === "harwich") {
        titleString = "strHarwichCruisePort"
    } else if (hasTaxiDeals === "heathrow") {
        titleString = "strHeathrowTaxiPrices"
    } else if (hasTaxiDeals === "gatwick") {
        titleString = "strGatwickTaxiPrices"
    } else if (hasTaxiDeals === "luton") {
        titleString = "strLutonTaxiPrices"
    } else if (hasTaxiDeals === "stansted") {
        titleString = "strStanstedTaxiPrices"
    } else if (hasTaxiDeals === "city airport") {
        titleString = "strLCYTaxiPrices"
    }

    return titleString
}