import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgCookTimes = new Mongo.Collection('AvgCookTimes');

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
