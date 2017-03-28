import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Order, Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';

/**
 *
 * @class Calculates the priority of each of the orders within the order collection
 *
 *
 *
 */

export class PriorityManager{
    /**
     * @function Starts the priority manager, initializes the different variables needed for the function, operates on those variables to calculate the priorities
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
     * @function Combines information from both the Order object and the menuItem object
     * @param order Order object that contains the different fields of an order
     * @param orderItem A particular field of the an order instance that contains the list of items for a particular order
     * @param menuItem An object that contains the information specific to each item on the menu
     * @returns {{orderID: number, itemName: (orderQueue.fields.itemName|{type}|*|string|MenuItem.fields.itemName|selectedItem.fields.itemName), mealType, cookTime: (*|orderQueue.fields.cookTime|{type}|selectedItem.fields.cookTime|MenuItem.fields.cookTime|number), specialRequests: (orderQueue.fields.specialRequests|{type}|*|string|orderItem.fields.specialRequests)}}
     */
    static combineMealAndMenuItem(order, orderItem, menuItem) {
        return{ orderID: order.orderID, 
				itemName: menuItem.itemName,
				mealType: ORDER_TYPE.getIdentifier(menuItem.mealType),
				cookTime: menuItem.cookTime,
				specialRequests: orderItem.specialRequests };
    }
}
// Not commented for now, cause not used for the project yet
export const orderQueue = Class.create ({
	name: 'orderQueue',
	fields: {
		orderID: {
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
		}
	}
})