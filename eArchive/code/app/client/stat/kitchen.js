// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import {createChart} from './chart.js';
import {AvgCookTime,AvgCookTimes} from '../../imports/api/data/avgCookTime.js';
import {IngUsage,AvgIngUsage} from '../../imports/api/data/avgIngUsage.js';
import {NumOrders, AvgNumOrders} from '../../imports/api/data/avgNumOrders.js';
import {MenuItems} from '../../imports/api/menuItem.js';
import {inventoryItems} from '../../imports/api/ingredient.js';

let listHTML= '';
let listIngHTML = '';

Template.kitchen.helpers({
  /**
  * @function listMenuItems
  * @summary Displays the menuItems select feature
  */
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

  /**
  * @function listIngredients
  * @summary Displays the ingredients select feature
  */
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
  },

  /**
  * @function createNumOrdersGraph
  * @summary creates the number of orders graph
  */
  createNumOrdersGraph: function() {
    createNumOrdersDisplay();
  }
});

Template.kitchen.events({
  /**
  * @function clickCookTimeItems
  * @summary Handles the click events on different menu items select feature
  */
  'change #cookTimeItems': function(event) { // menu item clicked render proper change
    var $clickedItem = $('#cookTimeItems option:selected');
    var clickedID = parseInt($clickedItem.attr('value'));
    createCookTimeDisplay(clickedID);
  },
  /**
  * @function clickIngredients
  * @summary Handles the click events on the different ingredients select feature
  */
  'change #ingredients': function(event) { // menu item clicked render proper change
    var $clickedItem = $('#ingredients option:selected');
    var clickedID = parseInt($clickedItem.attr('value'));
    createIngUsageDisplay(clickedID);
  }
});

/**
* @function createCookTimeDisplay
* @summary Pulls appropriate data of cook times from database and creates the chart to be displayed
*/
const createCookTimeDisplay = function(itemID) {
  let avgCookTimes = [];
  AvgCookTimes.find({menuItemID: itemID}).forEach(
    function(ct){
      avgCookTimes.push(ct);
  });
  //console.log(avgCookTimes);
  createChart({data: avgCookTimes,x:'time',y:'cookTime',y2:'avgCookTime',selection:'#cookTimeGraph'});
}

/**
* @function createIngUsageDisplay
* @summary Pulls appropriate data of ingredient usage from database and creates the chart to be displayed
*/
const createIngUsageDisplay = function(itemID) {
  let avgIngUsage = [];
  AvgIngUsage.find({ingID: itemID}).forEach(
    function(ct){
      avgIngUsage.push(ct);
  });
  //console.log(avgCookTimes);

  createChart({data: avgIngUsage,x:'time',y:'quantity',y2:'avgQuantity',selection:'#ingUsageGraph'});
}

/**
* @function createNumOrdersDisplay
* @summary Pulls appropriate data of number of orders from database and creates the chart to be displayed
*/
const createNumOrdersDisplay = function() {
  let numOrders = [];
  AvgNumOrders.find({}).forEach(
    function(ct) {
      numOrders.push(ct);
  });

  createChart({data: numOrders,x:'time',y:'numOrders',y2:'avgNumOrders',selection:'#numOrdersGraph'});
}

const Kitchen = {};
/**
* @function createDisplay
* @summary Called by the master controller in statjs
*/
Kitchen.createDisplay = function() {
  console.log('createDisplay');
}

export {Kitchen};
