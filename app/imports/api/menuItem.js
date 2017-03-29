import { Mongo } from 'meteor/mongo';
import {Class, Enum} from 'meteor/jagi:astronomy';

export const MenuItems = new Mongo.Collection('menuitems');

/**
 * @readonly
 * @enum {Number}
 * @summary Enum for order types.
 *
 * @todo Convert this Enum from type: Number to type: String and refactor code based on change
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
 * @class MenuItem
 * @summary Class representing an item on a menu.
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

