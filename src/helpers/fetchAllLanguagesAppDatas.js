import env from "../resources/env";
import { getDataApi } from "./fetchDatas";

const allLanguages = ["en", "tr", "ar", "es", "zh", "it", "ru"]
export const fetchAllLanguagesAppDatas = async () => {
  let allAppDatas = {}
  try {
    await Promise.all(allLanguages.map(async (lang) => {
      const appDataUrl = `${env.apiDomain}/app/${lang}`;
      let langKey = lang
      const data = await getDataApi({ url: appDataUrl })
      allAppDatas[langKey] = data
      sessionStorage.setItem('allAppDatas', JSON.stringify(allAppDatas));
    }));

  } catch (error) {
    console.log(error);
  }
}