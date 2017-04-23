import {Bills, billItem, Bill} from '../../imports/api/billsJS.js';


Template.archive.onRendered(function(){
	$('#sandbox-container div').datepicker()
  .on('changeDate', function(e) {
    let dateSelected = e.date;
    bindData(dateSelected);
  });
});

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
    let dataItem = data[0];
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

}
