import { useEffect, useState } from 'react';
import { postDataAPI } from '../helpers/fetchDatas';
import env from '../resources/env';

const usePageContentHook = (pagePathname, language) => {
    // Set up state variables
    const [metaTitle, setmetaTitle] = useState("");
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState("");
    const [pageContent, setPageContent] = useState("");
    const [pageTitle, setPageTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    useEffect(() => {
        // Define async function to fetch data from API
        async function fetchData() {
            // Construct URL and request body
            let url = `${env.apiDomain}/api/v1/pages/details`;
            let body = { pagePathname: `/${pagePathname}`, language };

            // Make API request with postDataAPI function from helpers
            let datas = await postDataAPI({ url, body });

            // Handle response data based on status code
            if (datas.status === 200) {
                let { data: { metaTitle, keywords, metaDescription, pageContent, pageTitle, shortDescription } } = datas;
                setmetaTitle(metaTitle);
                setKeywords(keywords);
                setDescription(metaDescription);
                setPageContent(pageContent);
                setPageTitle(pageTitle);
                setShortDescription(shortDescription);
            } else {
                setmetaTitle("");
                setKeywords("");
                setDescription("");
                setPageContent("");
                setPageTitle("");
                setShortDescription("");
            }
        }
        fetchData();
    }, [language, pagePathname]);

    // Return state variables as an object
    return { metaTitle, keywords, description, pageContent, pageTitle, shortDescription };
};

export default usePageContentHook;
