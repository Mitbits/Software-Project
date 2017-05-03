import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const AvgIngUsage = new Mongo.Collection('AvgIngUsage');

/**
 *@class IngUsage
 *@summary Data about the ingredients left in the inventory
 *@param {Date} time - time at which the data point was created
 *@param {Number} ingID - identifier of the ingredient
 *@param {Number} quantity - amount of ingredient left in the inventory
 *@param {Number} avgQuantity - average amount of ingredient in the inventory
 *@param {Number} threshold - amount of ingredient which tells us if the ingredient is low or not
 *@param {String} units - units of measurement of the ingredient
 */
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
