import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { MenuItem } from './menuItem.js';

export const Orders = new Mongo.Collection('orders');
export const Customers = new Mongo.Collection('customers');

var minID = [{
	type: 'gt',
	param: 0
}]

/*
 * Custom types
 */

Type.create({
	name: 'orderItem',
	class: 'orderItem'
})

/*
 * Class definitions
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
		}
	}
});

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
		// Elementary function required for Demo 1 functionality.
		placeOrder() {
			this.save();
		}
	}
});
