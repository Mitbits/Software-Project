import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgCookTimes = new Mongo.Collection('AvgCookTimes');

/**
 *@class AvgCookTime
 *@summary Represents the data on cook time of an item
 *@param {Date} time - time at which the data was created
 *@param {Number} menuItemID - id of the menu item
 *@param {Number} cookTime - time it took to cook the item in seconds
 *@param {Number} avgCookTime - average time it takes to cook the item in seconds
 */
export const AvgCookTime = Class.create({
  name: 'AvgCookTime',
	collection: AvgCookTimes,
	fields: {
		time: {
			type: Date
		},
		menuItemID: {
			type: Number
		},
		cookTime: {
			type: Number
		},
    avgCookTime: {
      type: Number
    }
	}
});
