import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
export function useConfirm(params = {}) {
    let { previousUrl, nextUrl, currentUrls, messsage = "If you leave the page, all data will be deleted.", } = params
    const [confMessage, setConfMessage] = useState(messsage);
    const [isConfirmationShown, setConfirmationShown] = useState(false);
    const router = useRouter()


    useEffect(() => {
        const beforeUnloadHandler = (e) => {
            if (confMessage && !isConfirmationShown) {
                e.preventDefault();
                e.returnValue = confMessage;
                setConfirmationShown(true);
                return confMessage;
            }
        };
        //burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
        const beforeRouteHandler = (url) => {
            //it is array like ["tr/transferdetails","es/tradetail"...]
            //so i hcekc if url is included inside next url then do not give confirmation alert
            if (Array.isArray(nextUrl) && Array.isArray(previousUrl)) {
                //we can go back or step forward
                if (nextUrl.includes(url) || previousUrl.includes(url) || currentUrls.includes(url)) {
                    setConfMessage("")
                    setConfirmationShown(false);
                    return
                } else {
                    setConfMessage(messsage)
                    setConfirmationShown(false);
                }
            }
            if (Router.pathname !== url && !confirm(confMessage) && !isConfirmationShown) {
                Router.events.emit("routeChangeError");
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            }
        };

        window.addEventListener("beforeunload", beforeUnloadHandler);
        Router.events.on("routeChangeStart", beforeRouteHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, []);


    return confMessage
}

// export function useConfirm(params = {}) {
//     let { previousUrl, nextUrl, currentUrls, messsage = "If you leave the page, all data will be deleted.", } = params
//     const [confMessage, setConfMessage] = useState(messsage);

//     const router = useRouter()


//     useEffect(() => {
//         const beforeUnloadHandler = (e) => {
//             if (confMessage) {
//                 (e || window.event).returnValue = confMessage;
//                 return confMessage;
//             }
//         };
//         //burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
//         const beforeRouteHandler = (url) => {
//             //it is array like ["tr/transferdetails","es/tradetail"...]
//             //so i hcekc if url is included inside next url then do not give confirmation alert
//             if (Array.isArray(nextUrl) && Array.isArray(previousUrl)) {
//                 //we can go back or step forward
//                 if (nextUrl.includes(url) || previousUrl.includes(url) || currentUrls.includes(url)) {
//                     setConfMessage("")
//                     return
//                 } else {
//                     setConfMessage(messsage)
//                 }
//             } 
//             if (Router.pathname !== url && !confirm(confMessage)) {
//                 Router.events.emit("routeChangeError");
//                 throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
//             }
//         };

//         window.addEventListener("beforeunload", beforeUnloadHandler);
//         Router.events.on("routeChangeStart", beforeRouteHandler);

//         return () => {
//             window.removeEventListener("beforeunload", beforeUnloadHandler);
//             Router.events.off("routeChangeStart", beforeRouteHandler);
//         };
//     }, []);


//     return confMessage
// }