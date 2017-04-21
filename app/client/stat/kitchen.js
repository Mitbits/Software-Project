import {createChart} from './chart.js';
import {AvgCookTime,AvgCookTimes} from '../../imports/api/data/avgCookTime.js';
import {IngUsage,AvgIngUsage} from '../../imports/api/data/avgIngUsage.js';
import {MenuItems} from '../../imports/api/menuItem.js';
import {inventoryItems} from '../../imports/api/ingredient.js';

let listHTML= '';
let listIngHTML = '';

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
  },

  listIngredients: function() {
    if(listIngHTML === '') {
      let invItems = inventoryItems.find({});
      invItems.forEach(function(ing) {
        listIngHTML += '<option value="' + ing.invID + '">' +
          ing.invName + '</option>';
      });
      createIngUsageDisplay(0);
    }
    return listIngHTML;
  }
});

Template.kitchen.events({
  'change #cookTimeItems': function(event) { // menu item clicked render proper change
    var $clickedItem = $('#cookTimeItems option:selected');
    var clickedID = parseInt($clickedItem.attr('value'));
    createCookTimeDisplay(clickedID);
  },
  'change #ingredients': function(event) { // menu item clicked render proper change
    var $clickedItem = $('#ingredients option:selected');
    var clickedID = parseInt($clickedItem.attr('value'));
    createIngUsageDisplay(clickedID);
  }
});

const createCookTimeDisplay = function(itemID) {
  let avgCookTimes = [];
  AvgCookTimes.find({menuItemID: itemID}).forEach(
    function(ct){
      avgCookTimes.push(ct);
  });
  //console.log(avgCookTimes);
  createChart({data: avgCookTimes,x:'time',y:'cookTime',y2:'avgCookTime',selection:'#cookTimeGraph'});
}

const createIngUsageDisplay = function(itemID) {
  let avgIngUsage = [];
  AvgIngUsage.find({ingID: itemID}).forEach(
    function(ct){
      avgIngUsage.push(ct);
  });
  //console.log(avgCookTimes);

  createChart({data: avgIngUsage,x:'time',y:'quantity',y2:'avgQuantity',selection:'#ingUsageGraph'});
}

const Kitchen = {};
Kitchen.createDisplay = function() {
  console.log('createDisplay');
}

export {Kitchen};
