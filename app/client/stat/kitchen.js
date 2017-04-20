import {createChart} from './chart.js';
import {AvgCookTime,AvgCookTimes} from '../../imports/api/data/avgCookTime.js';
import {MenuItems} from '../../imports/api/menuItem.js';

let listHTML= '';


Template.kitchen.helpers({
  listMenuItems: function() {
    if(listHTML === '') {
      let menuItems = MenuItems.find({});
      menuItems.forEach(function(menuItem) {
        listHTML += '<option value="' + menuItem.itemID + '">' +
          menuItem.itemName + '</option>';
      });
      createCookTimeDisplay(0);
    }
    return listHTML;
  }
});

Template.kitchen.events({
  'change #cookTimeItems': function(event) { // menu item clicked render proper change
    var $clickedItem = $('#cookTimeItems option:selected');
    var clickedID = parseInt($clickedItem.attr('value'));
    createCookTimeDisplay(clickedID);
  }
});

const createCookTimeDisplay = function(itemID) {
  let avgCookTimes = [];
  AvgCookTimes.find({menuItemID: itemID}).forEach(
    function(ct){
      avgCookTimes.push(ct);
  });
  //console.log(avgCookTimes);
  createChart(avgCookTimes, '#cookTimeGraph', 900);
}

const Kitchen = {};
Kitchen.createDisplay = function() {
  console.log('createDisplay');
}

export {Kitchen};
