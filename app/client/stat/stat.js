// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
var dataItems; // dataItems object
import {createChart} from './chart.js';
import {AvgCookTime,AvgCookTimes} from '../../imports/api/data/avgCookTime.js';
//import {Kitchen} from './kitchen.js';

var prevSelected = 'general';

/**
* @function create menu
* @summary Creates the menu based on the statistics to be shown (based on the DataItems object)
*/
Template.stat.onCreated(function() {
  dataItems = new DataItems();
  for(var item of dataItems.names) {
    $('div#'+item.toLowerCase()).hide();
  }
});

Template.stat.helpers({
  /**
  * @function menuItems
  * @summary Switches between different statistics on the menu
  */
  menuItems() { // initialize menu items properly
    var html = '';
    for(var ind in dataItems.names) {
      if(ind == 0) { // first one is active
        html += '<a class="active item menu-item">';
      } else {
        html += '<a class="item menu-item">';
      }
      html += dataItems.names[ind] + '</a>'
    }
    return html;
  }

});

Template.stat.events({
  /**
  * @function clickMenu
  * @summary Handles the click events on the menu
  */
  'click .menu-item': function(event) { // menu item clicked render proper change
    var $clickedItem = event.target;
    var clickedName = $clickedItem.text;
    $('a.menu-item.active').removeClass('active');
    $($clickedItem).addClass('active');

    $('div#'+prevSelected).hide();
    $('div#'+clickedName.toLowerCase()).show();
    prevSelected = clickedName.toLowerCase();
  }
});

/**
 *@class DataItems
 *@summary Contains the statistics to be shown 
 */
class DataItems {
  constructor() {
    this.names = [
      'General',
      'Reservations',
      'Kitchen',
      'Archive'
    ];
  }
}
