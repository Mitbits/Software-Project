import {AvgCookTime, AvgCookTimes} from '../imports/api/data/avgCookTime.js';
import {MenuItems} from '../imports/api/menuItem.js';

export const initAvgCookTime = function() {
  let menuItems = MenuItems.find({});
  menuItems.forEach(function(menuItem) {
    let today = new Date();
    let start = new Date(today.setFullYear(today.getFullYear() - 1));
    
    let initCookTime = menuItem.cookTime;
    let ctSlope = -0.1*initCookTime / 365;
    let avgCookTime = initCookTime;
    let menuItemID = menuItem.itemID;
    for(let i = 0; i < 365; i++) {
      let nextDay = new Date(start.setDate(start.getDate() + 1));
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
  });

}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
