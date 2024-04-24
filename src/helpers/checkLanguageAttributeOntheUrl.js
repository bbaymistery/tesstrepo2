import { extractLanguage } from "./extractLanguage"


//when ever we  go to /tr/heahtor/heathrow airport or sth else  we r checking do we have lang attribute or not
//based on that we r making request to get appDatas and to show on the screen
export const checkLanguageAttributeOntheUrl = (url) => {

    let lang = ""

    let allLanguages = ["en", "tr", "ar", "es", "zh", "it", "ru"]
    let checkTheUrlIfLangExist = extractLanguage(url)//it is gonna match with first two letter

    if (checkTheUrlIfLangExist && allLanguages.includes(checkTheUrlIfLangExist)) {
        lang = checkTheUrlIfLangExist
    } else {
        lang = "en"
    }

    return lang
}