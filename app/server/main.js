import { Meteor } from 'meteor/meteor';
import { Table, Tables, TableStatus, TableType } from '../imports/api/table.js';
import { Order, Orders, orderItem } from '../imports/api/order.js';
import { MenuItem, MenuItems } from '../imports/api/menuItem.js';


import '../imports/api/reservation.js';


// loops through all reservation tables checking if they can be made walkins 
function check_reservation_interval(){

	Table.find({$or: [{'table_type':TableType.RESERVATION},{'converted':true}]}).forEach(function(table_entry){

		//if the table is not reserved, convert it to walk for this hour
		if(table_entry.table_type == TableType.RESERVATION && table_entry.table_status != TableStatus.RESERVED){

			table_entry.table_type = TableType.WALKIN;
			table_entry.converted = true;
			table_entry.save();
		}
		//if it was converted to walk and is not taken, convert back
		else if(table_entry.converted == true && table_entry.table_status != TableStatus.TAKEN){
			table_entry.table_type = TableType.RESERVATION;
			table_entry.converted = false;
			table_entry.save();
		}
	});
}

Meteor.startup(() => {
	var curDate = new Date();

	Tables.remove({});
	Orders.remove({});
	MenuItems.remove({});

	var menuItems = require('./menuItems.json');

	// Populate the menu with items from the JSON file.
	// This only needs to be done once and is static.
	// Needs to be changed in the future - @raj
	for(i = 0; i < 20; i++) {
		var menuitem_entry = new MenuItem({
			"itemID": menuItems.menu.items[i].id,
			"itemName": menuItems.menu.items[i].name,
			"itemDescription": menuItems.menu.items[i].desc,
			"mealType": menuItems.menu.items[i].type,
			"itemPrice": menuItems.menu.items[i].price,
			"cookTime": menuItems.menu.items[i].cookTime
		});
		menuitem_entry.save();
	}
	
	// A wrapper function to create a new orderItem object.
	// These items DO NOT get directly stored in a collection.
	// An order object (which is stored) will hold this data. - @raj
	function createOrderItem(mItemID, mPriority, mMenuItemID, mSpecialRequests) {
		 return new orderItem({
			"itemID": mItemID,
			"priority": mPriority,
			"menuItemID": mMenuItemID,
			"specialRequests": mSpecialRequests
		});
	}


    function getRandomNumber(min, max)
	{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

    // Creating an array of requests that can be used for different items
    var specialRequests = ["Less Oil ", "Half a Portion", "Less Butter", "None"];

	// create list of items for a specific order
	var next_mItemID = 1;

	function createOrderItems()
	{
		var orderItems = [];

		var numberOfItems = getRandomNumber(1,11);

		for(var i =1; i<=numberOfItems; i++)
		{

			var random_mPriority = getRandomNumber(1,10); // random value for now..
			var random_mMenuItemID = getRandomNumber(0,20);
			var random_mSpecialRequests = specialRequests[getRandomNumber(0,4)];

			orderItems.push(createOrderItem(next_mItemID,random_mPriority, random_mMenuItemID, random_mSpecialRequests));
			next_mItemID++;

		}
		return orderItems;
	}

	
	// Creating 5 order objects and storing in the collection.
	// Each object is getting the same array of `order_items`
	// Change if necessary for more diverse data - @raj
	for (var i = 1; i <= 5; i++) {

		var test = createOrderItems();

		var order_entry = new Order({
			"orderID": i,
			//"orderType": (i % 3),
			"waiterID": 1,
			//"menuItemID": 7,
			"orderItems": test,
			"timePlaced": new Date()
		});

		order_entry.save();
	}
	
	for(i = 1; i <= 16; i++) {
		//create astronomy table obj entry
		//L_status just for testing
		L_status = (i%4) ? TableStatus.CLEAN : TableStatus.RESERVED;
		var table_entry = new Table({
			"table_id": i,
			"size": 4,
			"occupants" : 0,
			"table_status": L_status,
			"table_type": TableType.RESERVATION,
			"reservation_intv":1,
			"converted" : false,
			"billPaid"	: false,
		});
		table_entry.save();
	}

	//set loop for reservation interval checkup 
	//Meteor.setInterval(check_reservation_interval,Table.findOne({'table_type':TableType.RESERVATION})*3600*1000);
	Meteor.setInterval(check_reservation_interval,10*1000);

  // code to run on server at startup
});