import {Bills, billItem, Bill} from '../../imports/api/billsJS.js';

let dataArr = null;
let index = 0;
let total = 0;

Template.archive.onRendered(function(){
	$('#sandbox-container div').datepicker()
  .on('changeDate', function(e) {
    let dateSelected = e.date;
    bindData(dateSelected);
  });
});

Template.archive.events({
	'click #prev': function(e) {
		if(index > 1 && index <= total) {

			setDataToHTML(--index, total);
		}
	},
	'click #next' : function(e) {
		if(index >= 1 && index <= total - 1) {
			setDataToHTML(++index, total);
		}
	}
})

let bindData = function(date) {
  let data = [];
  Bills.find({}).forEach(function(bill) {
    if(bill.billTimeCreated.toDateString() !== date.toDateString()) {
      return;
    }
    data.push({
      id : bill._id,
      time: bill.billTimeCreated,
      billItems : bill.billItems
    });
  });

  //$('#viewBills').empty();
  if(data.length !== 0) {
		dataArr = data;
		total = dataArr.length;
		index = 1;
		setDataToHTML(1, total);
  }

}

let setDataToHTML = function(ind, totalNum) {
	let dataItem = dataArr[ind - 1];
	$('#index').text(ind);
	console.log(ind);
	$('#itemsLength').text(totalNum);
	$('#order-id').text(dataItem.id);
	$('#time').text(dataItem.time.toTimeString());
	let itemNamesHTML = '<ul type="square">', itemCostsHTML = '<ul>', total = 0;
	for(let billItem of dataItem.billItems) {
		itemNamesHTML += '<li>' + billItem.billItemName + '</li>';
		itemCostsHTML += '<li>' + billItem.billItemPrice + '</li>';
		total += billItem.billItemPrice;
	}
	itemNamesHTML += '</ul>'; itemCostsHTML += '</ul>';
	$('#itemNames').html(itemNamesHTML);
	$('#itemCosts').html(itemCostsHTML);
	$('#total').html(total);
}
