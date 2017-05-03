import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgNumOrders = new Mongo.Collection('AvgNumOrders');

/**
 *@class NumOrders
 *@summary Represents an data on number of orders in the order queue(completed)
 *@param {Date} time - time the data point was measured/created
 *@param {Number} numOrders - number of orders completed by the chef
 *@param {Number} avgNumOrders - avg number of orders completed at this hour
 */
export const NumOrders = Class.create({
  name: 'NumOrders',
	collection: AvgNumOrders,
	fields: {
		time: {
			type: Date
		},
		numOrders: {
			type: Number
		},
		avgNumOrders: {
			type: Number
		}
	}
});
