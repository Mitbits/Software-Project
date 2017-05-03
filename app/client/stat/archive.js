// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import {Bills, billItem, Bill} from '../../imports/api/billsJS.js';

let dataArr = null;
let index = 0;
let total = 0;

/**
* @function datePickerFtn
* @summary shows the datepicker for the transaction viewing date
*/
Template.archive.onRendered(function(){
	$('#sandbox-container div').datepicker()
  .on('changeDate', function(e) {
    let dateSelected = e.date;
    bindData(dateSelected);
  });
});

Template.archive.events({
	/**
	* @function prevClick
	* @summary handles the click event to show previous transaction on the same day
	*/
	'click #prev': function(e) {
		if(index > 1 && index <= total) {

			setDataToHTML(--index, total);
		}
	},
	/**
	* @function nextClick
	* @summary handles the click event to show next transaction on the same day
	*/
	'click #next' : function(e) {
		if(index >= 1 && index <= total - 1) {
			setDataToHTML(++index, total);
		}
	}
})

/**
* @function bindData
* @summary pulls billing data from the database and binds it to the HTML page
*/
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

/**
* @function setDataToHTML
* @summary creates the HTML for the bill display
*/
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
