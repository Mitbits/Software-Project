import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { ORDER_TYPE } from '../menuItem.js';
export const PopItems = new Mongo.Collection('PopItems');

export const PopItem = Class.create({
  name: 'PopItem',
	collection: PopItems,
	fields: {
		menuItemID: {
			type: Number
		},
    itemName: {
      type: String
    },
    mealType: {
      type: ORDER_TYPE
    },
		numCooked: {
			type: Number
		}
	}
});
