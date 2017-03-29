import { Mongo } from 'meteor/mongo';
import {Class, Enum} from 'meteor/jagi:astronomy';

export const MenuItems = new Mongo.Collection('menuitems');

/**
 * @readonly
 * @enum {number}
 * Enum for order types.
 */
export const ORDER_TYPE = Enum.create({
	name: 'orderType',
	identifiers: {
		/** Basic meal stages*/
		REFRESHMENT: 0,
		APPETIZER: 1,
		ENTREE: 2,
		DESSERT: 3,
		/** Unclassified orders*/
		OTHER: 4,
		/** Cancelled order*/
		CANCELLED: 5
	}
});

/**
 * @class
 * @classdesc Class representing an item on a menu.
 * @param {Number} itemID - Unique item identifier
 * @param {String} itemName - Name of the item
 * @param {String} itemDescription - Describes the item
 * @param {ORDER_TYPE} mealType - The type of item
 * @param {Number} itemPrice - The cost of the item
 * @param {Number} cookTime - Time to make the item in minutes
 */
export const MenuItem = Class.create({
    name: 'MenuItem',
	collection: MenuItems,
	fields: {
		itemID: {
			type: Number
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
		},
		cookTime: {
			type: Number
		}
	}
});

