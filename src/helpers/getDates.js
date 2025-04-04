//!  'yyyy-mm-dd HH:MM'   FOR   transferDateTimeString
export const dateTimeStringFunc = () => {
  let tmpDt = new Date(Date.now() + 1000 * 60 * 60 * 6); //6
  let year = tmpDt.getFullYear();
  let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
  let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
  let hours = tmpDt.getHours() < 10 ? `0${tmpDt.getHours()}` : tmpDt.getHours();
  let minute = "00";
  let currentDate = `${year}-${month}-${date} ${hours}:${minute}`;
  return currentDate;
};

export const dateTimeStringFuncForReturn = () => {
  //6+24 =>BIR GUN FARK
  // 6+24+24 >IIKI GUN FARK
  //6+24+24+24 =>3 GUN FARK
  let tmpDt = new Date(Date.now() + 1000 * 60 * 60 * (6 + 24 + 24 + 24)); //9

  let year = tmpDt.getFullYear();
  let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
  let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
  let hours = tmpDt.getHours() < 10 ? `0${tmpDt.getHours()}` : tmpDt.getHours();
  let minute = "00";
  let currentDate = `${year}-${month}-${date} ${hours}:${minute}`;
  return currentDate;
};


export const currentDate = () => {
  let tmpDt = new Date(Date.now());
  let year = tmpDt.getFullYear();
  let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
  if (month === "00") {
    month = "01"
  }
  let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
  let currentDate = `${year}-${month}-${date}`;
  return currentDate;
};


//*newww
//!'yyyy-mm-dd HH:MM'   FOR   transferDateTimeString
export const currentDateForJourney = () => {
  let tmpDt = new Date(Date.now() + 1000 * 60 * 60 * 6); //6
  let year = tmpDt.getFullYear();
  let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
  let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
  let hours = tmpDt.getHours() < 10 ? `0${tmpDt.getHours()}` : tmpDt.getHours();
  let minute = "00";
  let currentDate = `${year}-${month}-${date} ${hours}:${minute}`;
  return currentDate;
};
//if return date is behind transfer date it will show up error
//we used to compare date(with milliseconds)
export const convertDateToMilliSecond = (data) => {
  var myDate = data.split("-");
  var newDateWithMs = new Date(Number(myDate[0]), Number(myDate[1] - 1), Number(myDate[2]));
  return newDateWithMs.getTime();
};
