import { arTranslation, arTranslation2, enTranslation, enTranslation2, esTranslation, esTranslation2, itTranslation, itTranslation2, ruTranslation, ruTranslation2, trTranslation1, trTranslation2, zhTranslation, zhTranslation2 } from '../../constants/registerTranslations'

/**
 * A mapping of translation objects for different languages, used in the account registration process.
 * The translation objects contain two properties, `translation1` and `translation2`, which hold the translated strings for each language.
 * The supported languages are: Turkish (tr), English (en), Spanish (es), Italian (it), Russian (ru), Chinese (zh), and Arabic (ar).
 */
export const translationMap = {
  
    tr: { translation1: trTranslation1, translation2: trTranslation2 },
    en: { translation1: enTranslation, translation2: enTranslation2 },
    es: { translation1: esTranslation, translation2: esTranslation2 },
    it: { translation1: itTranslation, translation2: itTranslation2 },
    ru: { translation1: ruTranslation, translation2: ruTranslation2 },
    zh: { translation1: zhTranslation, translation2: zhTranslation2 },
    ar: { translation1: arTranslation, translation2: arTranslation2 },
  };