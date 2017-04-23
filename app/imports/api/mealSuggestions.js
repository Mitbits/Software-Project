import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { MenuItem, MenuItems, POPULARITY } from './menuItem.js';
import { inventoryItem } from './ingredient.js';

export const itemLeaderboard = new Mongo.Collection('itemLeaderboard');

export const POPULARITY_PERIOD = Enum.create({
	name: 'popularity_period',
	identifiers: {
		/** P **/
		WEEK: 0,
		MONTH: 1,
		QUARTER: 2
	}
});

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
		setRank(mRank) {
			this.rank = mRank;
			return this.save();
		}
	}
});