
//pass trasnferdateTimeString as parametr then split it  to hour and minute
export const splitDateTimeStringIntoHourAndMinute = (dateString) => {
  return dateString?.split(" ")[1]?.split(":")
}

//pass trasnferdateTimeString as parameter then split it to date
export const splitDateTimeStringIntoDate = (dateString) => {
  return dateString?.split(" ")
}


export const splitAndTranslateDuration = (text, language, appData) => {
  if (language === "en") return text;

  // Split the duration into parts (e.g., ["10", "hours", "40", "minutes"]) ||  ["1", "hour", "1", "min"]) 
  if (text?.split(/[\s,]+/)) {
    // Map through the parts and replace words if necessary
    const translatedParts = text?.split(/[\s,]+/)?.map((part) => {
      if (/^hour$|^hours$/i.test(part)) {
        return appData?.words["strHour"] || "hours";
      }
      if (/^min$|^minutes$/i.test(part)) {
        return appData?.words["seMinuteWord"] || "minutes";
      }
      return part; // Keep the numbers and other text as is
    });

    // Join the translated parts back together
    return translatedParts?.join(" ");
  } else {
    return text;
  }
};