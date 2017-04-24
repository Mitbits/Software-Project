import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgTimeSpent = new Mongo.Collection('AvgTimeSpent');

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
