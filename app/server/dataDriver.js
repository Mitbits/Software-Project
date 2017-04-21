import {AvgCookTime, AvgCookTimes} from '../imports/api/data/avgCookTime.js';
import {IngUsage, AvgIngUsage} from '../imports/api/data/avgIngUsage.js';
import {MenuItems} from '../imports/api/menuItem.js';
import {inventoryItems} from '../imports/api/ingredient.js';

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

export const initAvgIngUsage = function() {
  let ings = inventoryItems.find({});
  ings.forEach(function(ing) {
    let today = new Date();
    let start = new Date(today.setFullYear(today.getFullYear() - 1));

    let quantity = ing.invQuantity;
    let avgQuantity = quantity;
    let thresholdUnits = Math.floor(ing.invThreshold/ing.invPerUnit);
    let units = thresholdUnits * getRandomInt(10, 20);
    for(let i = 0; i < 365; i++) {
      let nextDay = new Date(start.setDate(start.getDate() + 1));
      let maxUsage = Math.floor(0.1*units);
      let minUsage = Math.floor(0.5*units);
      let usage = getRandomInt(minUsage, maxUsage);

      if((units - usage) > thresholdUnits || (units - usage) > 0 && getRandomInt(0, 4) !== 0) {
        // okay to subtract usage
        units -= usage;
      } else { // increase units
        units += thresholdUnits * getRandomInt(10, 20);
      }

      quantity = units * ing.invPerUnit;
      avgQuantity = (i*avgQuantity+ quantity)/(i+1);
      let newEntry = new IngUsage({
        'time' : nextDay,
        'ingID' : ing.invID,
        'quantity': quantity,
        'avgQuantity': avgQuantity,
        'threshold': ing.invThreshold,
        'units': ing.invUnits
      });
      newEntry.save();
    }
  });
}

export const initData = function() {
  AvgIngUsage.remove({});
  var count = AvgCookTimes.find({}).count();
  if(count === 0) {
    initAvgCookTime();
  }

  count = AvgIngUsage.find({}).count();
  if(count == 0) {
    initAvgIngUsage();
  }
}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
