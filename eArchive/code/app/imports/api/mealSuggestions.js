// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { MenuItem, MenuItems, POPULARITY } from './menuItem.js';
import { inventoryItem } from './ingredient.js';

export const itemLeaderboard = new Mongo.Collection('itemLeaderboard');

/**
 * @readonly
 * @enum {Number}
 * @summary Enum for popularity periods.
 *
 */
export const POPULARITY_PERIOD = Enum.create({
	name: 'popularity_period',
	identifiers: {
		/** P **/
		WEEK: 0,
		MONTH: 1,
		QUARTER: 2
	}
});

/**
 * @class popularItem
 * @summary Class representing popular items and their attributes.
 * @param {Number} rank - The item's overall rank
 * @param {POPULARITY_PERIOD} period - The item's popularity period
 * @param {Number} cost - The total cost of the item in it's period
 * @param {Number} profit - The total profit of the item in it's period
 * @param {Number} revenue - The total revenue of the item in it's period
 */
export const popularItem = Class.create({
	name: 'popularItem',
	collection: itemLeaderboard,
	fields: {
		rank: {
			type: Number
		},
		period: {
			type: POPULARITY_PERIOD
		},
		menuItemID: {
			type: Number
		},
		cost: {
			type: Number
		},
		profit: {
			type: Number
		},
		revenue: {
			type: Number
		},
	},
	meteorMethods: {
		/**
		 * @function setCookTime
		 * @summary Sets the rank for the item
		 * @returns {Number} Status of database write operation
		 */
		setRank(mRank) {
			this.rank = mRank;
			return this.save();
		}
	}
});