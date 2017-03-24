import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy'
 
export const Orders = new Mongo.Collection('orders');
export const Customers = new Mongo.Collection('customers');

var minID = [{
	type: 'gt',
	param: 0
}]

/*
 * ENUM type definitions
 */

// Definition for Order types.
export const ORDER_TYPE = Enum.create({
	name: 'orderType',
	identifiers: {
		REFRESHMENT: 0,
		APPETIZER: 1,
		ENTREE: 2,
		DESSERT: 3,
		CANCELLED: 4,
		OTHER: 5
	}
});
 
/*
 * Class definitions
 */
export const Order = Class.create({
	name: 'Order',
	collection: Orders,
	fields: {
		orderID: {
			type: Number,
			validators: minID
		},
		orderType: {
			type: ORDER_TYPE
		},
		waiterID: {
			type: Number,
			validators: minID
		},
		menuItemID: {
			type: Number,
			validators: minID
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
	helpers: {
		orderTypeName() {
			console.log("test");
			return ORDER_TYPE.getIdentifier(this.orderType);
		}
	}
})