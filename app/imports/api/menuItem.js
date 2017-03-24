import { Mongo } from 'meteor/mongo';
import {Class, Enum} from 'meteor/jagi:astronomy';

export const MenuItems = new Mongo.Collection('menuitems');

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
		OTHER: 4,
		CANCELLED: 5
	}
});

export const MenuItem = Class.create({
    name: 'MenuItem',
	collection: MenuItems,
	fields: {
		itemID: {
			type: Number
			validators: [{
				type: 'gt',
				param: 0
			}]
		},
		itemName: {
			type: String
		},
		itemDescription: {
			type: String
		},
		mealType: {
			type: ORDER_TYPE
		},
		itemPrice: {
			type: Number
		}
	}
});

