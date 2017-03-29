import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { ORDER_TYPE } from './menuItem.js';
export const selectedItems = new Mongo.Collection('selectedItems');

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
        saveItem() {
            this.save();
        },
        removeCollection() {
            selectedItems.remove({});
        },
        removeItem(id) {
            selectedItems.remove({_id:id});
        },
    }


});
