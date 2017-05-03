// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const inventoryItems = new Mongo.Collection('inventoryTable');
/** @typedef {inventoryItem}
 * @summary A single item belonging to a set of inventory
 */
Type.create({
    name: 'inventoryItem',
    class: 'inventoryItem'
});
/**
 * @class inventoryItem
 * @summary - One item in inventory
 * @param {Number} invID - itemID in inventory
 * @param {String} invName - Name of item in inventory
 * @param {String} invUnits - Units in inventory
 * @param {Number} invQuantity - Quantity of the item in inventory
 * @param {Number} invPrice - Price of item in inventory
 * @param {Number} invPerUnit - Number of items per unit
 * @param {Number} invThreshold - Threshold for the item in inventory
 * @param {Number} invTimesUsed - Times the item was used in inventory
 */
export const inventoryItem = Class.create({
    name: 'inventoryItem',
    collection: inventoryItems,
    fields: {
        invID: {
            type: Number
        },
        invName: {
            type: String,
        },
        invUnits: {
            type: String,
        },
        invQuantity: {
            type: Number
        },
        invPrice: {
            type: Number
        },
        invPerUnit: {
            type: Number
        },
        invThreshold: {
            type: Number
        },
        invTimesUsed: {
            type: Number
        }
    },
    meteorMethods: {
        /**
         * @function addQuantity
         * @summary Adds to the quantity in the inventory
         * @param diff
         */
        addQuantity(diff) {
            this.invQuantity += diff;
            this.save();
        },
        /**
         * @function subtractQuantity
         * @summary Subtracts from the quantity in the inventory
         * @param diff
         */
        subtractQuantity(diff) {
            this.invQuantity -= diff;
            this.save();
        },
        /**
         * @function incrementTimesUsed
         * @summary Increments the number of items each item was used
         */
        incrementTimesUsed() {
            this.invTimesUsed += 1;
            this.save();
        }
    }
});