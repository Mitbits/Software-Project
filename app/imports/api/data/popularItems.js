import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';
import { ORDER_TYPE } from '../menuItem.js';
export const PopItems = new Mongo.Collection('PopItems');
/**
 *@class PopItem
 *@summary Represents the temporary (weekly) popular items
 *@param {Number} menuItemID - ID of the menuItem
 *@param {String} itemName - name of the menuItem
 *@param {ORDER_TYPE} mealType - Order Type Enum of the menuItem
 *@param {Number} numCooked - number of completed orders of this item
 */
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
