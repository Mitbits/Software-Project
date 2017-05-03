// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
const primaryColors = ['#B7A6AD', '#BEB2A7', '#CAB388', '#B5B292', '#A8ADB4'];
const secondaryColors = ['#502812', '#892034', '#6F256C', '#004236', '#9F9B74'];

/**
* @function createChart
* @summary creates the actual HTML graphics object for the chart using the d3 timerseries api - used for two data series
*/
var createChart = function(options) {
	console.log(options.data);
  var chart = d3.timeseries()
              .addSerie(options.data,{x:options.x,y:options.y},{interpolate:'monotone',color:primaryColors[getRandomInt(0,4)]})
              .addSerie(options.data,{x:options.x,y:options.y2},{interpolate:'monotone',color:secondaryColors[getRandomInt(0,4)]})
              .yscale.domain([0])
              .width(900)
              .margin.left(40);
  $(options.selection).empty();
  chart(options.selection);
}

/**
* @function createChartSingleY
* @summary creates the actual HTML graphics object for the chart using the d3 timerseries api - used for only one data series
*/
var createChartSingleY = function(options) {
  var chart = d3.timeseries()
              .addSerie(options.data,{x:options.x,y:options.y},{interpolate:'monotone',color:primaryColors[getRandomInt(0,4)]})
              .yscale.domain([0])
              .width(900)
              .margin.left(40);
  $(options.selection).empty();
  chart(options.selection);
}

/**
* @function createPieChart
* @summary creates the actual HTML graphics object for the chart using the c3 api - used for pie charts only
*/
var createPieChart = function(options) {

  var chart = c3.generate({
      bindto: options.selection,
      data: {
          columns: options.data,
          type : 'pie',
      }
  });
}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {createChart, createPieChart,createChartSingleY};
