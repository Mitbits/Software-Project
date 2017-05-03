import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgTimeSpent = new Mongo.Collection('AvgTimeSpent');

/**
 *@class TimeSpent
 *@summary Represents the time spent by a customer in the restaurant
 *@param {Date} time - time when the data point was created
 *@param {Number} spent - time in seconds the customer spent in the restaurant
 *@param {Number} avgSpent - average time in seconds the customer spends "at this hour"
 */
export const TimeSpent = Class.create({
  name: 'TimeSpent',
	collection: AvgTimeSpent,
	fields: {
		time: {
			type: Date
		},
		spent: {
      type: Number
    },
    avgSpent: {
      type: Number
    }
	}
});
