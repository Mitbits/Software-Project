import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'
export const selectedItems = new Mongo.Collection('selectedItems');

export const ORDER_TYPE = Enum.create({
    name: 'orderType',
    identifiers: {
        REFRESHMENT: 0,
        APPETIZER: 1,
        ENTREE: 2,
        DESSERT: 3,
        OTHER: 4,
        CANCELLED: 5
    }
});

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
