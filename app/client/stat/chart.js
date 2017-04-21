var createChart = function(options) {
  var chart = d3.timeseries()
              .addSerie(options.data,{x:options.x,y:options.y},{interpolate:'monotone',color:"#333"})
              .addSerie(options.data,{x:options.x,y:options.y2},{interpolate:'monotone',color:'#666'})
              .yscale.domain([0])
              .width(900)
              .margin.left(40);
  $(options.selection).empty();
  chart(options.selection);
}

export {createChart};
