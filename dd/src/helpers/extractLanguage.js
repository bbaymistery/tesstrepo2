
export const extractLanguage = (str) => {
   if(str?.length===3){
       const match = str?.match(/^\/([a-z]{2})\/?/i);//burda deyirikki get bizim /ru ile ve ya "/es ile match ol"
       if (match) {
           return match[1];
       } else {
           return null;
       }
   }else{
       const match = str?.match(/^\/[a-z]{2}\//i);
       if (match) {
           return match[0].substr(1, 2);
       } else {
           return null;
       }
   }
}

