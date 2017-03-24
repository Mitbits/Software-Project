import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy'
 
export const Orders = new Mongo.Collection('orders');
export const Customers = new Mongo.Collection('customers');

var minID = [{
	type: 'gt',
	param: 0
}]
 
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
			return ORDER_TYPE.getIdentifier(this.orderType);
		}
	}
})