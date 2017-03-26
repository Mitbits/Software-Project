import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Order, Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';

export class PriorityManager{
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

    static combineMealAndMenuItem(order, orderItem, menuItem) {
        return{ orderID: order.orderID, 
				itemName: menuItem.itemName,
				mealType: ORDER_TYPE.getIdentifier(menuItem.mealType),
				cookTime: menuItem.cookTime,
				specialRequests: orderItem.specialRequests };
    }
}

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