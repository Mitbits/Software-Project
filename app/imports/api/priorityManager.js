import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Order, Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';

/**
 * @function start
 * @summary Starts the priority manager, initializes the different variables needed for the function, operates on those variables to calculate the priorities
 * @returns {Array.<orderItems>} An array of order items in the correct order
 **/
export default function startPriorityManager() {
	var Appetizers = [];
	var Entrees = [];
	var Desserts = [];
	var config = require('./config.json');
	var orders = Orders.find({ isCompleted: false }, { sort: { timePlaced: 1 } });
	var mOrderQueueItems = [];
	
	orders.forEach(function (order) {
		var nApp = 0, nEnt = 0, nDes = 0;
		var S1 = config.prtyVal[0], S2 = config.prtyVal[1], S3 = config.prtyVal[2];
		var prtyApp = 0, prtyEnt = 0, prtyDes = 0;
		var orderItems = order.orderItems; // returns array of orderItems
		
		orderItems.forEach(function(orderItem) {
            if (orderItem.isCompleted == false) {
				var menuItem = MenuItems.findOne({ itemID: orderItem.menuItemID });
				mOrderQueueItems.push(mOrderQueueItem = new orderQueueItem({
					orderID: order.orderID,
					itemID: orderItem.itemID,
					menuItemID: orderItem.menuItemID,
					itemName: menuItem.itemName,
					mealType: ORDER_TYPE.getIdentifier(menuItem.mealType),
					cookTime: menuItem.cookTime,
					specialRequests: orderItem.specialRequests,
					priorityVal: 0
				}));

				if (menuItem.mealType == ORDER_TYPE.APPETIZER) {
					nApp++;
				}
				else if (menuItem.mealType == ORDER_TYPE.ENTREE) {
					nEnt++;
				}
				else if (menuItem.mealType == ORDER_TYPE.DESSERT) {
					nDes++;
				}
			}
		});
		
		if (!nApp) {
			if (!nEnt) {
				/** only dessert **/
				prtyDes = S1;
			}
			if(!nDes) {
				/** only entree **/
				prtyEnt = S1;
			}
			/** dessert and entree **/
			prtyEnt = S1, prtyDes = S2;
		}
		else {
			if (!nDes) {
				if (!nEnt) {
					/** only appetizer **/
					prtyApp = S1;
				}
				/** appetizer and entree **/
				prtyApp = S1, prtyEnt = S2;
			}
			if (!nEnt) {
				/** appetizer and dessert **/
				prtyApp = S1, prtyDes = S2;
			}
			/** all three **/
			prtyApp = S1, prtyEnt = S2, prtyDes = S3;
		}
		/** Assign priority values based on stage **/
		mOrderQueueItems.forEach(function(orderItem) {
			switch (orderItem.mealType) {
				case ORDER_TYPE.APPETIZER:
					orderItem.priorityVal = prtyApp;
					break;
				case ORDER_TYPE.ENTREE:
					orderItem.priorityVal = prtyEnt;
					break;
				case ORDER_TYPE.DESSERT:
					orderItem.priorityVal = prtyDes;
					break;
			}
		});
		/** Finally sort the array based on priority   **/
		/** Make all priority calculations before this **/
		mOrderQueueItems.sort(function(a, b) {
			return (a.priorityVal) - parseFloat(b.priorityVal);
		});
	});
	return mOrderQueueItems;
}

/**
 * @class
 * @classdesc Calculates the priority of each of the orders within the order collection
 */

/*
export class actualCookTimeUpdater{
    Orders.se
}
*/
export class PriorityManager{
    /**
     * @function start
     * @summary Starts the priority manager, initializes the different variables needed for the function, operates on those variables to calculate the priorities
     * @returns {Array.<orderItems>} An array of order items in the correct order
     */
    static start() {
        var Appetizers = [];
        var Entrees = [];
        var Desserts = [];
        var orders = Orders.find({}, { sort: { timePlaced: 1 } });

        orders.forEach(function (order) {
            var orderItems = order.orderItems; // returns array of orderItems

            for (var orderItem of orderItems) {
                var menuItem = MenuItems.findOne({ itemID: orderItem.menuItemID });

                if (menuItem.mealType == ORDER_TYPE.APPETIZER) {
                    Appetizers.push(PriorityManager.combineMealAndMenuItem(order, orderItem, menuItem));
                }
                else if (menuItem.mealType == ORDER_TYPE.ENTREE) {
                    Entrees.push(PriorityManager.combineMealAndMenuItem(order, orderItem, menuItem));
                }
                else if (menuItem.mealType == ORDER_TYPE.DESSERT) {
                    Desserts.push(PriorityManager.combineMealAndMenuItem(order, orderItem, menuItem));
                }
            }
        });

        var combinedArray = Appetizers.concat(Entrees).concat(Desserts);

        return combinedArray;
    }

    /**
     * @function combineMealAndMenuItems
     * @summary Combines information from both the Order object and the menuItem object
     * @param order Order object that contains the different fields of an order
     * @param orderItem A particular field of the an order instance that contains the list of items for a particular order
     * @param menuItem An object that contains the information specific to each item on the menu
     * @returns {{orderID: number, itemName: (orderQueue.fields.itemName|{type}|*|string|MenuItem.fields.itemName|selectedItem.fields.itemName), mealType, cookTime: (*|orderQueue.fields.cookTime|{type}|selectedItem.fields.cookTime|MenuItem.fields.cookTime|number), specialRequests: (orderQueue.fields.specialRequests|{type}|*|string|orderItem.fields.specialRequests)}}
     *
     * @todo Implement the class to be integrated with Astronomy
     * @todo Modify the priority algorithm to include unaccounted factors for improved accuracy
     */
    static combineMealAndMenuItem(order, orderItem, menuItem) {
        return{ orderID: order.orderID, 
				itemName: menuItem.itemName,
				mealType: ORDER_TYPE.getIdentifier(menuItem.mealType),
				cookTime: menuItem.cookTime,
				specialRequests: orderItem.specialRequests };
    }
}
/**
 * Begin redefintion of the priority manager module (not featured in Demo 1)
 */

export const orderQueueItem = Class.create ({
	name: 'orderQueueItem',
	fields: {
		orderID: {
			type: Number
		},
		itemID: {
			type: Number
		},
		menuItemID: {
			type: Number
		},
		itemName: {
			type: String
		},
		mealType: {
			type: ORDER_TYPE
		},
		cookTime: {
			type: Number
		},
		specialRequests: {
			type: String
		},
		priorityVal: {
			type: Number
		}
	},
	meteorMethods: {
		/**
		 * @function combineMealAndMenuItems
		 * @summary Combines information from both the Order object and the menuItem object
		 * @param order Order object that contains the different fields of an order
		 * @param orderItem A particular field of the an order instance that contains the list of items for a particular order
		 * @param menuItem An object that contains the information specific to each item on the menu
		 * @returns {{orderID: number, itemName: (orderQueue.fields.itemName|{type}|*|string|MenuItem.fields.itemName|selectedItem.fields.itemName), mealType, cookTime: (*|orderQueue.fields.cookTime|{type}|selectedItem.fields.cookTime|MenuItem.fields.cookTime|number), specialRequests: (orderQueue.fields.specialRequests|{type}|*|string|orderItem.fields.specialRequests)}}
		 *
		 * @todo Implement the class to be integrated with Astronomy
		 * @todo Modify the priority algorithm to include unaccounted factors for improved accuracy
		 **/
		setPriorityValue(mPrtyVal) {
			priorityVal = mPrtyVal;
			return this.save();
		}
	}
});