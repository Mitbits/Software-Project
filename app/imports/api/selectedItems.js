import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { ORDER_TYPE } from './menuItem.js';

export const selectedItems = new Mongo.Collection('selectedItems');

/**
 * @class
 * @classdesc Represents items selected by the waiter while placing an order
 * @param {Number} itemID - Unique item identifier
 * @param {String} itemName - Name of the item
 * @param {String} itemDescription - Describes the item
 * @param {ORDER_TYPE} mealType - The type of item
 * @param {Number} itemPrice - The cost of the item
 * @param {Number} cookTime - Time to make the item in minutes
 *
 * @todo Remove this class and properly use client-side to display already existing data.
 */
export const selectedItem = Class.create({
    name: 'items',
    collection: selectedItems,
    fields: {
        itemID: {
            type: Number
        },
        itemName: {
            type: String
        },
        itemDescription: {
            type: String
        },
        mealType: {
            type: ORDER_TYPE
        },
        itemPrice: {
            type: Number
        },
        cookTime: {
            type: Number
        }
    },
    meteorMethods: {
        /**
         * @function Saves a `selectedItem` to the collection
         * @this refers to a `selectedItem` object
         * @returns {WriteResult} Status of database write operation
         */
        saveItem() {
           return this.save();
        },
        /**
         * @function Empties the selectedItems collection
         * @returns {WriteResult} Status of database write operation
         */
        removeCollection() {
            return selectedItems.remove({});
        },
        /**
         * @function Removes an item from selectedItems collection
         * @param {Number} id - itemID of the record to remove
         * @returns {WriteResult} Status of database write operation
         */
        removeItem(id) {
            return selectedItems.remove({_id:id});
        },
    }


});
