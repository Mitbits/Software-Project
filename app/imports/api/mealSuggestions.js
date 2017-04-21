import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { MenuItem, MenuItems, POPULARITY } from './menuItem.js';
import { inventoryItem } from './ingredient.js';

export const itemLeaderboard = new Mongo.Collection('itemLeaderboard');

/**
 * @global
 * @summary Validation parameter for unique ID numbers used in various classes.
 */
 
let minID = [{
	type: 'gt',
	param: 0
}];

export const popularItem = Class.create({
	name: 'popularItem',
	collection: itemLeaderboard,
	fields: {
		rank: {
			type: Number,
			validators: minID
		},
		menuItemID: {
			type: Number
		},
		cost: {
			type: Number
		},
		profit: {
			type: Boolean
		},
		revenue: {
			type: Number
		},
	}
});