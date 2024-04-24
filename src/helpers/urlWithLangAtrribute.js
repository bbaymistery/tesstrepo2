//checking if url exist tr es en
export const urlWithLangAtribute = (params = {}) => {
    // will check if lang exist in url
    const languageRegex = /^\/[a-z]{2}\//


    let { languages = [], previousUrl = "", nextUrl, currentUrl } = params


    let previousUrls = []
    if (previousUrl === 'tohome') {
        previousUrls = languages.map((lang) => `/${lang.value === 'en' ? "" : lang.value}`)
    } else {
        previousUrls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${previousUrl?.replace(languageRegex, '/')}`)
    }

    let nexturls = []
    nexturls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${nextUrl}`)

    let currentUrls = []
    currentUrls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${currentUrl?.replace(languageRegex, '/')}`)

    return {
        nexturls,
        previousUrls,
        currentUrls
    }
};
    // let taxiPreviousUrls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${previousUrl?.replace(languageRegex, '/')}`)
        // nexturls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${nextUrl}`)
    // previousUrls = languages.map((lang) => `/${lang.value === 'en' ? "" : lang.value}`)
    // if (previousUrl?.length) {
    //     taxiPreviousUrls = languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${previousUrl?.replace(languageRegex, '/')}`)//tr/heathrow/details turn to /heathrow/details
    // }


    // let currentUrls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${currentUrl.replace(languageRegex, '/')}`)


//for quotation
      // will check if lang exist in url
  // const languageRegex = /^\/[a-z]{2}\//
  // let previousUrls = appData.languages.map((lang) => `/${lang.value === 'en' ? "" : lang.value}`)
  // let nexturls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}/transfer-details`)
  // let currentUrls = appData.languages.map((lang) => `${lang.value === 'en' ? "" : `/${lang.value}`}${router.asPath?.replace(languageRegex, '/')}`)

