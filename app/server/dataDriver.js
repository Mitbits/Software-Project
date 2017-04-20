import {AvgCookTime, AvgCookTimes} from '../imports/api/data/avgCookTime.js';


export const initAvgCookTime = function() {
  let today = new Date();
  let start = new Date(today.setFullYear(today.getFullYear() - 1));

  let initCookTime = 23;
  let ctSlope = -0.1*initCookTime / 365;
  let avgCookTime = initCookTime;
  for(let i = 0; i < 365; i++) {
    let nextDay = new Date(start.setDate(start.getDate() + 1));
    let menuItemID = 1;
    let cookTime = Math.floor(ctSlope*i + initCookTime);
    cookTime += getRandomInt(-0.3*cookTime, 0.3*cookTime);
    avgCookTime = (i*avgCookTime + cookTime)/(i+1);

    let newEntry = new AvgCookTime({
      'time' : nextDay,
      'menuItemID' : menuItemID,
      'cookTime': cookTime,
      'avgCookTime': avgCookTime
    });
    newEntry.save();
  }
}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
