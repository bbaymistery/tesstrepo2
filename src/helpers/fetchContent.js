import env from "../resources/env";
import { parseCookies } from "./cokieesFunc";



export const    fetchContent = async (pagePathname, cookie, firstLoadLangauge, pathnameUrlWHenChangeByTopbar) => {
    let metaTitle = ""
    let pageContent = ""
    let metaDescription = ""
    let keywords = ""
    let shortDescription = ""
    let pageTitle = ""
    let breadcrumb = ""
    let lang = "en"
    // Use the function to parse the Cookie header
    const cookies = parseCookies(cookie);
    if (firstLoadLangauge === 'en' && pathnameUrlWHenChangeByTopbar.includes("json")) {
        //http://localhost:3500/tr  nburda ise degisilir langauge topbardan 
        lang = cookies['lang'];
    } else {
        //http://localhost:3500/tr   yazb enter edilirse
        lang = firstLoadLangauge
    }
    let url = `${env.apiDomain}/api/v1/pages/details`;
    let body = { pagePathname: pagePathname, language: lang };
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
        status: datas.status ? datas.status : 400,
    }
}