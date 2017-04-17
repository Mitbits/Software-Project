import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { MenuItem } from './menuItem.js';

export const Orders = new Mongo.Collection('orders');
export const Customers = new Mongo.Collection('customers');

/**
 * @global
 * @summary Validation parameter for unique ID numbers used in various classes.
 */
var minID = [{
	type: 'gt',
	param: 0
}]

/**
 * @typedef {orderItem}
 * @summary A single item belonging to a set of one or more orderItems of a single order
 */
Type.create({
	name: 'orderItem',
	class: 'orderItem'
})

/**
 * @class orderItem
 * @summary - Represents an item for an order.
 * @param {Number} itemID - Unique identifier representing an item within an order
 * @param {Number} priority - Priority number for item in the order queue
 * @param {Number} menuItemID - Indicates the menuItem this item represents
 * @param {String} specialRequests - Contains any requests by the customer to notify the chef about a particular item
 */
export const orderItem = Class.create({
	name: 'orderItem',
	fields: {
		itemID: {
			type: Number,
			validators: minID
		},
		priority: {
			type: Number
		},
		menuItemID: {
			type: Number
		},
		specialRequests: {
			type: String
		},
		actualCookTime: {
			type: Number
		}
	},
	meteorMethods: {
		setItemID(mID) {
			this.itemID = mID;
			return this.save();
		},
		setCookTime(mTime) {
			this.actualCookTime = mTime;
			return this.save();
		}
	}
});

/**
 * @class Order
 * @summary Represents an Order
 * @param {Number} orderID - Unique order identifier
 * @param {Number} waiterID - Waiter identifier for waiter that placed the order
 * @param {Array<orderItem>} orderItems - Contains all items for order
 * @param {Date} timePlaced - Time and date the order was created
 *
 * @todo Extend the order class to include a table identifier (integrate with the table class).
 * @todo Add meteor method(s) to extend the functionality of placing and viewing live orders.
 */
export const Order = Class.create({
	name: 'Order',
	collection: Orders,
	fields: {
		orderID: {
			type: Number,
			validators: minID
		},
		waiterID: {
			type: Number,
			validators: minID
		},
		orderItems: {
			type: [orderItem],
		},
		timePlaced: {
			type: Date
		},
		isCompleted: {
			type: Boolean
		}
	},
	indexes: {
		orderID: {
			fields: {
				orderID: 1
			},
			options: {
				unique: true
			}
		}
	},
	meteorMethods: {
		/**
		 * @function placeOrder
		 * @summary Makes an order available to the order queue by storing an 'order' document in the database
		 * @returns {Number} Status of database write operation
		 */
		placeOrder() {
			return this.save();
		}
	}
});
