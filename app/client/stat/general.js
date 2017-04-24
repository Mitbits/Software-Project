import {createChart, createPieChart} from './chart.js';
import {TimeSpent,AvgTimeSpent} from '../../imports/api/data/avgTimeSpent.js';
import {PopItem, PopItems} from '../../imports/api/data/popularItems.js';

Template.general.helpers({
  createTimeSpentGraph: function() {
    createTimeSpentDisplay();
  },
  createPopItemsCharts: function() {
    createPopItemsDisplay();
  }
});

const createTimeSpentDisplay = function() {
  let timeSpent = [];
  AvgTimeSpent.find({}).forEach(
    function(ct) {
      timeSpent.push(ct);
  });

  createChart({data: timeSpent,x:'time',y:'spent',y2:'avgSpent',selection:'#timeSpentGraph'});
}

const createPopItemsDisplay = function() {
  let refreshments = [], appetizers = [], entrees = [], desserts = [];
  PopItems.find({}).forEach(
    function(ct) {
      switch(ct.mealType) {
        case 0:
          refreshments.push([ct.itemName, ct.numCooked]);
          break;
        case 1:
          appetizers.push([ct.itemName, ct.numCooked]);
          break;
        case 2:
          entrees.push([ct.itemName, ct.numCooked]);
          break;
        case 3:
          desserts.push([ct.itemName, ct.numCooked]);
          break;
        default:
          break;
      }
  });
  createPieChart({selection: '#refreshmentPieChart', data: refreshments});
  createPieChart({selection: '#appetizerPieChart', data: appetizers});
  createPieChart({selection: '#entreePieChart', data: entrees});
  createPieChart({selection: '#dessertPieChart', data: desserts});


}
