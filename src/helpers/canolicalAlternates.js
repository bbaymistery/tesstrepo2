
export const generateCanonicalAlternates = (pathname,env) => {
    const languages = ['en', 'tr', 'ar', 'es', 'it', 'ru', 'zh']; // Define your supported languages
    const websiteDomain = env.websiteDomain; // Assuming you have this environment variable set up
    return languages.map(lang => ({
        hrefLang: lang,
        // For English ('en'), do not add the language prefix to the URL
        href: lang === 'en' ? `${websiteDomain}${pathname}` : `${websiteDomain}/${lang}${pathname}`
    }));
};