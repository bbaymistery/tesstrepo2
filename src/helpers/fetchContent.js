import { fetchConfig } from "../resources/getEnvConfig";
import { parseCookies } from "./cokieesFunc";


/**
 * Fetches content for a given page pathname and language.
 *
 * @param {string} pagePathname - The pathname of the page to fetch content for.
 * @param {string} cookie - The cookie header to use for the request.
 * @param {string} firstLoadLangauge - The initial language to use for the request.
 * @param {string} pathnameUrlWHenChangeByTopbar - The pathname of the page when the language is changed by the top bar.
 * @param {string} pathNameUrlCanonical - The canonical pathname of the page.
 * @returns {Promise<{
 *   lang: string,
 *   metaTitle: string,
 *   keywords: string,
 *   pageContent: string,
 *   metaDescription: string,
 *   shortDescription: string,
 *   pageTitle: string,
 *   breadcrumb: string,
 *   canonicalUrl: string,
 *   status: number
 * }>} - The fetched content and metadata.
 */

export const fetchContent = async (pagePathname, cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar, pathNameUrlCanonical) => {
    const env = await fetchConfig(); // Fetch the env config

    let metaTitle = ""
    let pageContent = ""
    let metaDescription = ""
    let keywords = ""
    let shortDescription = ""
    let pageTitle = ""
    let breadcrumb = ""
    let lang = "en"
    let canonicalUrl = ""
    // Use the function to parse the Cookie header
    const cookies = parseCookies(cookie);

    if (firstLoadLangauge === 'en' && pathnameUrlWHenChangeByTopbar?.includes("json")) {
        //http://localhost:3500/tr  nburda ise degisilir langauge topbardan 
        lang = cookies['lang'];

    } else {
        //http://localhost:3500/tr   yazb enter edilirse
        lang = firstLoadLangauge
    }

    //if we r on home page remove slahs 
    if (pathNameUrlCanonical === '/') {
        canonicalUrl = `${env.websiteDomain}/${lang}`
        //we r on home page remove en attribute
        if (lang === "en") {
            canonicalUrl = `${env.websiteDomain}`
        }
    } else {
        //if we r on not on home page remove attribute
        if (lang === "en") {
            canonicalUrl = `${env.websiteDomain}${pathNameUrlCanonical}`
        } else {
            //we r on not on home page add normal language attribute 
            canonicalUrl = `${env.websiteDomain}/${lang}${pathNameUrlCanonical}`
        }
    }

    let url = `${env.apiDomain}/api/v1/pages/details`;
    let body = { pagePathname, language: lang };

    const method = "POST"
    const headers = { "Content-Type": "application/json", }
    const reqOpt = { body: JSON.stringify(body), method, headers }

    const response = await fetch(url, reqOpt);
    const datas = await response.json();
    if (datas.status === 200) {
        metaTitle = datas.data.metaTitle
        keywords = datas.data.keywords
        pageContent = datas.data.pageContent
        metaDescription = datas.data.metaDescription
        shortDescription = datas.data.shortDescription
        pageTitle = datas.data.pageTitle
        breadcrumb = datas.data.breadcrumb
    }


    return {
        lang,
        metaTitle,
        keywords,
        pageContent,
        metaDescription,
        shortDescription,
        pageTitle,
        breadcrumb,
        canonicalUrl,
        status: datas.status ? datas.status : 400,
    }
}