const primaryColors = ['#B7A6AD', '#BEB2A7', '#CAB388', '#B5B292', '#A8ADB4'];
const secondaryColors = ['#502812', '#892034', '#6F256C', '#004236', '#9F9B74'];


var createChart = function(options) {
  var chart = d3.timeseries()
              .addSerie(options.data,{x:options.x,y:options.y},{interpolate:'monotone',color:primaryColors[getRandomInt(0,4)]})
              .addSerie(options.data,{x:options.x,y:options.y2},{interpolate:'monotone',color:secondaryColors[getRandomInt(0,4)]})
              .yscale.domain([0])
              .width(900)
              .margin.left(40);
  $(options.selection).empty();
  chart(options.selection);
}

var createPieChart = function(options) {

  var chart = c3.generate({
      bindto: options.selection,
      data: {
          columns: options.data,
          type : 'pie',
      }
  });
}

var createBarChart = function(options) {

	 var chart = c3.generate({
		 bindto: '#reservationChart',//options.selection,
		 data : {
			columns: options.data,
			type: 'bar'
		 },
		 bar: {
			width: {
				ratio: 0.5
			}
		 }

	 });

}


const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {createChart, createPieChart,createBarChart};
