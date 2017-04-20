import { Meteor } from 'meteor/meteor';
import {Table,Tables, TableStatus, TableType, TableManager} from '../imports/api/table.js';
import { Reservation } from '../imports/api/reservation.js';
import { Order, Orders, orderItem } from '../imports/api/order.js';
import { MenuItem, MenuItems } from '../imports/api/menuItem.js';
import { selectedItem,selectedItems } from '../imports/api/selectedItems.js';
import {inventoryItem, inventoryItems} from '../imports/api/ingredient.js';

/**
 *@function Meteor.startup
 * @summary The code in this file is run every time meteor starts up. The file involves the creation of the sample data needed 
 * for the project and pushing them to their respective collections
 */
Meteor.startup(() => {
    TableManager.remove({});
    Table.remove({});
    Reservation.remove({});


    var table_manager = new TableManager();
    table_manager.save();
    table_manager.startPollReservations();

    // code to run on server at startup
	var curDate = new Date();

	Tables.remove({});
	Orders.remove({});
	MenuItems.remove({});
	selectedItems.remove({});
	inventoryItems.remove({});

	var menuItems = require('./menuItems.json');
	var InventoryItems = require('./inventory.json');

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
	for(i = 0; i < 45; i++) {
		var inventory_entry = new inventoryItem({
			"invID": InventoryItems.inventory.items[i].id,
            "invName": InventoryItems.inventory.items[i].name,
            "invUnits": InventoryItems.inventory.items[i].units,
            "invQuantity": InventoryItems.inventory.items[i].quantity,
            "invPrice": InventoryItems.inventory.items[i].price,
            "invPerUnit": InventoryItems.inventory.items[i].perUnit,
            "invThreshold": InventoryItems.inventory.items[i].threshold
		});
		inventory_entry.save();
	}

	// A wrapper function to create a new orderItem object.
	// These items DO NOT get directly stored in a collection.
	// An order object (which is stored) will hold this data. - @raj
    /**
	 * @function createOrderItem
     * @param {Number} mItemID - Unique identifier representing an item within an order
     * @param {Number} mPriority - Priority number for item in the order queue
     * @param {Number} mMenuItemID - Indicates the menuItem this item represents
     * @param {String} mSpecialRequests - Contains any requests by the customer to notify the chef about a particular item
     */
	function createOrderItem(mItemID, mPriority, mMenuItemID, mSpecialRequests) {
		 return new orderItem({
			"itemID": mItemID,
			"priority": mPriority,
			"menuItemID": mMenuItemID,
			"specialRequests": mSpecialRequests,
			"actualCookTime": 0
		});
	}

    /**
	 * @function getRandomNumber
	 * @summary Generates a random number
     * @param {Number} min - Lower bound of the random number
     * @param max - Upper bound of the random number
     * @returns {Number}
     */
    function getRandomNumber(min, max)
	{
		min = Math.ceil(min);
		max = Math.floor(max);
		return (Math.floor(Math.random() * (max - min)) + min);
	}

    // Creating an array of requests that can be used for different items
    var specialRequests = ["Less Oil ", "Half a Portion", "Less Butter", "None"];

	// create list of items for a specific order
	

    /**
	 * @function createOrderItems
	 * @summary Generates an array of random orderItems using the getRandomNumber and createOrderItem functions. 
     * @returns {Array}
     */
	function createOrderItems()
	{
		var orderItems = [];

		var numberOfItems = getRandomNumber(1, 11);

		for (var i = 1, next_mItemID = 1; i <= numberOfItems; i++, next_mItemID++)
		{
			var random_mMenuItemID = getRandomNumber(0, 20);
			var random_mSpecialRequests = specialRequests[getRandomNumber(0, 4)];

			orderItems.push(createOrderItem(next_mItemID, 0, random_mMenuItemID, random_mSpecialRequests));
		}
		return orderItems;
	}

/*
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
			"timePlaced": new Date(),
			"isCompleted": false
		});

		//order_entry.save();
	}

*/
	
	for(i = 1; i <= 16; i++) {
		//create astronomy table obj entry
		//L_status just for testing
		var table_type = (i%4) ? TableType.WALKIN : TableType.WALKIN;
		var table_size = 2
		
		if(i%4==1)
			table_size = 8
		else if(i%4==2)
			table_size = 6
		else if(i%4==3)
			table_size = 4 
		else 
			table_size = 2;
		if(i>12)
			table_type = TableType.RESERVATION;
		var table_entry = new Table({
			
			
			"size": 2,
			"table_type": table_type,
			
		});
		table_entry.save();
	}
   /* 
    var table_entry = new Table({
        "size": 2,
        "table_type":TableType.RESERVATION
    
    });
    table_entry.save();
     var table_entry = new Table({
        "size": 2,
        "table_type":TableType.RESERVATION
    
    });
    table_entry.save();*/
    
    

    

	
	
	process.env.MAIL_URL='smtp://irestaurant12%40gmail.com:ece4life@smtp.gmail.com:587';
    SSR.compileTemplate('htmlEmail', Assets.getText('reservation-email.html'));
	Meteor.methods ({
		'sendEmail' : function(to,subj,emailData){
			this.unblock();

			Email.send({
				to: to,
				from: 'iRestaurant@ires.com',
				subject: subj,
				html: SSR.render('htmlEmail', emailData),
			});
		}
	})


});
