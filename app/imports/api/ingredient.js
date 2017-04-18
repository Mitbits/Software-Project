import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

export const inventoryItems = new Mongo.Collection('inventoryTable');

Type.create({
    name: 'inventoryItem',
    class: 'inventoryItem'
});

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
        addQuantity(diff) {
            this.invQuantity += diff;
            this.save();
        },
        subtractQuantity(diff) {
            this.invQuantity -= diff;
            this.save();
        },
        incrementTimesUsed() {
            this.invTimesUsed += 1;
            this.save();
        }
    }
});