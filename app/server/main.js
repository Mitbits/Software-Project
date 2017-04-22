import { Meteor } from 'meteor/meteor';
import { Table,Tables, TableStatus, TableType, TableCluster  } from '../imports/api/table.js';
import { Reservation } from '../imports/api/reservation.js';
import { Order, Orders, orderItem } from '../imports/api/order.js';
import { MenuItem, MenuItems, ingredientsArray } from '../imports/api/menuItem.js';
import { inventoryItem, inventoryItems } from '../imports/api/ingredient.js';
import { popularItem, itemLeaderBoard } from '../imports/api/mealSuggestions.js';

/**
 *@function Meteor.startup
 * @summary The code in this file is run every time meteor starts up. The file involves the creation of the sample data needed 
 * for the project and pushing them to their respective collections
 */
Meteor.startup(() => {
    Table.remove({});
	Order.remove({});
    TableCluster.remove({});
    Reservation.remove({});
	popularItem.remove({});

    for(i = 1; i <= 4; i++) {
		var tablecluster = new TableCluster({
			"size":i,
			"reservations": []
		});
		tablecluster.save();
		tablecluster.tableChecker();
    }
    tablecluster.save();

    // code to run on server at startup
	var curDate = new Date();

	Tables.remove({});
	
	var menuItems = require('./menuItems.json');
	var InventoryItems = require('./inventory.json');
	//console.log(menuItems.menu.items[0].ingredients.length);

	if (MenuItem.find().count() == 0) {
		MenuItems.remove({});
		for (var i = 0; i < menuItems.menu.items.length; i++) {
			var ingredientArr = [];
			for (var j = 0; j < menuItems.menu.items[i].ingredients.length; j++) {
				//console.log(menuItems.menu.items[i].ingredients[j]);
				ingredientArr.push(new ingredientsArray({
					"ingItemID": menuItems.menu.items[i].ingredients[j].itemID,
					"ingQuantity": menuItems.menu.items[i].ingredients[j].quantity
				}));
			}
			//console.log(ingredientArr)
			new MenuItem({
				"itemID": menuItems.menu.items[i].id,
				"itemName": menuItems.menu.items[i].name,
				"itemDescription": menuItems.menu.items[i].description,
				"mealType": menuItems.menu.items[i].type,
				"itemPrice": menuItems.menu.items[i].price,
				"cookTime": menuItems.menu.items[i].cookTime,
				"ingredients": ingredientArr,
				"timesOrdered": 0,
				"itemPopularity": -1
			}).save();
		}
	}
	
	if (inventoryItem.find().count() == 0) {
		inventoryItems.remove({});
		for(i = 0; i < InventoryItems.inventory.items.length; i++) {
			var inventory_entry = new inventoryItem({
				"invID": InventoryItems.inventory.items[i].id,
				"invName": InventoryItems.inventory.items[i].name,
				"invUnits": InventoryItems.inventory.items[i].units,
				"invQuantity": InventoryItems.inventory.items[i].quantity,
				"invPrice": InventoryItems.inventory.items[i].price,
				"invPerUnit": InventoryItems.inventory.items[i].perUnit,
				"invThreshold": InventoryItems.inventory.items[i].threshold,
				"invTimesUsed": 0
			});
			inventory_entry.save();
		}
	}
//
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
			"actualCookTime": 0,
			"isCompleted": true
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


	// Creating 5 order objects and storing in the collection.
	// Each object is getting the same array of `order_items`
	// Change if necessary for more diverse data - @raj
	
	for (var i = Date.now() - 7862400000; i <= Date.now(); i += 86400000) {

		var test = createOrderItems();

		var order_entry = new Order({
			"orderID": i,
			"waiterID": 1,
			"orderItems": test,
			"timePlaced": new Date(i),
			"isCompleted": true
		});

		order_entry.save();
	}

	for(i = 1; i <= 16; i++) {
		//create astronomy table obj entry
		//L_status just for testing
		var table_type = (i%4) ? TableType.WALKIN : TableType.RESERVATION;
		var table_entry = new Table({
			"table_id": i,
			"size": 4,
			"occupants" : 0,
			"table_status": TableStatus.CLEAN,
			"table_type": table_type,
			"reservation_intv": 1,
			"converted" : false,
			"billPaid"	: false
		});
		table_entry.save();
	}
	
	
	console.log("Calculating Priority");
	
	let weekItems = [], monthItems = [], quarterItems = [];
	console.log("Number of MenuItems: " + MenuItem.find().count());
	
	let last7Days = new Date(Date.now() - 604800000)
	let weekOrders = Order.find({ 
		timePlaced: { 
			$gt: { last7Days }
		} 
	});
	console.log(weekOrders);
	
	for (let menuItem = 0; menuItem < MenuItems.find().count(); menuItem++) {
		let COST = 0, REVENUE = 0, PROFIT = 0, costOfMeal = 0;
		let MEAL = MenuItem.findOne({ itemID: menuItem });
		
		for (let ing = 0; ing < MEAL.ingredients.length; ing++) {
			costOfMeal += MEAL.getIngredientPrice(MEAL.ingredients[ing].ingItemID) * MEAL.ingredients[ing].ingQuantity;
		}
		
		COST = costOfMeal * MEAL.timesOrdered;
		REVENUE = MEAL.timesOrdered * MEAL.itemPrice;
		PROFIT = REVENUE - COST;
	
		new popularItem({
			//"rank": 0,
			"menuItemID": MEAL.itemID,
			"cost": COST,
			"profit": PROFIT,
			"revenue": REVENUE 
		}).save;
	}
});
