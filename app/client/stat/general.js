import {createChart} from './chart.js';
import {TimeSpent,AvgTimeSpent} from '../../imports/api/data/avgTimeSpent.js';

Template.general.helpers({
  createTimeSpentGraph: function() {
    createTimeSpentDisplay();
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
