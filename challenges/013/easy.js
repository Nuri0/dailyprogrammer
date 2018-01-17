// https://www.reddit.com/r/dailyprogrammer/comments/pzo4w/2212012_challenge_13_easy/

"use strict";

const dayOfYear = (date) => {
  let month = date.getMonth();
  let year = date.getFullYear();
  
  let days = date.getDate();
  switch (month) {
    case 11: days += 30;  // have reached december => add november
    case 10: days += 31;  // have reached november => add october
    case  9: days += 30;  // have reached october => add september
    case  8: days += 31;  // have reached september => add august
    case  7: days += 31;  // have reached august => add july
    case  6: days += 30;  // have reached july => add june
    case  5: days += 31;  // have reached june => add may
    case  4: days += 30;  // have reached may => add april
    case  3: days += 31;  // have reached april => add march
    case  2: {
      days += 28;  // have reached march => add february (consider leap year)
      // https://support.microsoft.com/en-us/help/214019/method-to-determine-whether-a-year-is-a-leap-year
      if ((year % 4 == 0) && ((year % 100 !== 0) || (year % 400 == 0))) {
        days++;
      }
    }
    case  1: days += 31;  // have reached february => add january
    break;
  }
  
  return days;
}


console.log(dayOfYear(new Date()));
console.log(dayOfYear(new Date(2017,0,1)));
console.log(dayOfYear(new Date(2017,11,31)));
console.log(dayOfYear(new Date(2000,11,31)));
console.log(dayOfYear(new Date(1900,11,31)));