// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
var dataItems; // dataItems object
import {createChart} from './chart.js';
import {AvgCookTime,AvgCookTimes} from '../../imports/api/data/avgCookTime.js';
//import {Kitchen} from './kitchen.js';

var prevSelected = 'general';

Template.stat.onRendered(function() {

  /*var data = [4, 8, 15, 16, 23, 42];

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

  d3.select(".chart")
    .selectAll("div")
      .data(data)
    .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; })
      .text(function(d) { return d; });*/


});


Template.stat.onCreated(function() {
  dataItems = new DataItems();
  for(var item of dataItems.names) {
    $('div#'+item.toLowerCase()).hide();
  }
});

Template.stat.helpers({
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
