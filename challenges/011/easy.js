// https://www.reddit.com/r/dailyprogrammer/comments/pwons/2192012_challenge_11_easy/

"use strict";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html
/*
day = 1 .. 31
month = 1 (Jannuary) .. 12 (December)
year is four-digit
*/
const dayOfTheWeek = (day, month, year) => {
  let c = Math.floor(year/100); // century
  let y = year % 100; // last two digits of year
  
  if (month <= 2) y--;
  if (y < 0) {
    y = 99;
    c--;
  }
  
  month = (month+9)%12+1;
  // convert month to julian calendar
  
  let weekDay = (day + Math.floor(2.6*month - 0.2) - 2*c + y + Math.floor(y/4) + Math.floor(c/4)) % 7;
  if (weekDay < 0) weekDay += 7;
  
  return days[weekDay];
}

const dayOfTheWeekBuiltIn = (day,month,year) => {
  let date = new Date(year,month-1,day);
  return days[date.getDay()];
}

console.log(dayOfTheWeek(19,9,2017));
console.log(dayOfTheWeek(1,1,1970));
console.log(dayOfTheWeek(1,1,2000));
console.log(dayOfTheWeek(1,1,2017));
console.log(dayOfTheWeek(1,2,2017));
console.log(dayOfTheWeek(1,3,2017));