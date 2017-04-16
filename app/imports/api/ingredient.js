import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { Type } from 'meteor/jagi:astronomy';

Type.create({
    name: 'inventoryItem',
    class: 'inventoryItem'
})

export const inventoryItem = Class.create({
    name: 'inventoryItem',
    fields: {
        Name: {
            type: String,
        },
        Quantity: {
            type: Number
        },
       Price: {
            type: Number
        },
        Units: {
            type: String
        },
        Threshold: {
            type: Number
        },
    }
});