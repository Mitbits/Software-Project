var createChart = function(data, selection, width) {
  var chart = d3.timeseries()
              .addSerie(data,{x:'time',y:'cookTime'},{interpolate:'monotone',color:"#333"})
              .addSerie(data,{x:'time',y:'avgCookTime'},{interpolate:'monotone',color:'#666'})
              .yscale.domain([0])
              .width(width)
              .margin.left(40);
  $(selection).empty();
  chart(selection);
}

export {createChart};
