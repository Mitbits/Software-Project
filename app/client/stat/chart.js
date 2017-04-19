var createChart = function(data, selection, width) {
  var chart = d3.timeseries()
              .addSerie(data,{x:'date',y:'n'},{interpolate:'monotone',color:"#333"})
              .yscale.domain([0])
              .width(width)
              .margin.left(40);
  chart(selection);
}

export {createChart};
