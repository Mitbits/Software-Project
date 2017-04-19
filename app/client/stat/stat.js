var dataItems; // dataItems object
import {createChart} from './chart.js';

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
  var data = [
    {date:new Date('2013-01-01'),n:120},
    {date:new Date('2013-01-02'),n:240},
    {date:new Date('2013-01-03'),n:360},
    {date:new Date('2013-01-04'),n:480}
  ];

  createChart(data, '.chart', 900);

});

Template.stat.onCreated(function() {
  dataItems = new DataItems();
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

    dataItems.populateData(clickedName);
  }
});

class DataItems {
  constructor() {
    this.data = {
      'General' : {},
      'Reservations' : {},
      'Kitchen' : {},
      'Busboy' : {},
      'Billing' : {},
    }
    this.names = Object.keys(this.data);
  }


  populateData(name) { // change the frontend based on 'name'

  }
}
