import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgIngUsage = new Mongo.Collection('AvgIngUsage');

export const IngUsage = Class.create({
  name: 'IngUsage',
	collection: AvgIngUsage,
	fields: {
		time: {
			type: Date
		},
		ingID: {
			type: Number
		},
		quantity: {
			type: Number
		},
    avgQuantity: {
      type: Number
    },
    threshold: {
      type: Number
    },
    units: {
      type: String
    }
	}
});
