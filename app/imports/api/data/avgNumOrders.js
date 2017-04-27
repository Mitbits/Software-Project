import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgNumOrders = new Mongo.Collection('AvgNumOrders');

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
