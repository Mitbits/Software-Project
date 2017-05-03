// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import { Mongo } from 'meteor/mongo';
import { Class , Type} from 'meteor/jagi:astronomy';

export const Bills = new Mongo.Collection('bills');
/**
 * @typedef {billItem}
 * @summary A single item belonging to a set of one or more bill items
 */
Type.create({
    name: 'billItem',
    class: 'billItem'
});
/**
 * @class billItem
 * @summary Each item in a bill
 * @param {String} billItemName - Name for the item on the bill
 * @param {Number} billItemPrice - Price of the item in the bill
 */
export const billItem = Class.create ({
    name: 'billItem',
    fields: {
        billItemName: {
            type: String
        },
        billItemPrice: {
            type: Number
        }
    }
});
/**
 * @class Bill
 * @summary Represents a bill
 * @param {Date} billTimeCreated - time the bill was made
 * @param {Number} billTable - The table ID of the bill
 * @param {Boolean} billPaid - If bill was paid or not
 */
export const Bill = Class.create({
    name: 'Bill',
    collection: Bills,
    fields: {
        billItems: {
            type: [billItem],
        },
        billTimeCreated: {
            type: Date
        },
        billTable: {
            type: Number
        },
        billPaid: {
            type: Boolean
        }
    },
    meteorMethods: {
        /**
         * @function generateReceipt
         * @summary Generates the bill
         */
        generateReceipt() {
            return this.save();
        },
        /**
         * @function payBill
         * @summary Sets the bill status to paid
         */
        payBill() {
            this.billPaid = true;
            return this.save();
        }
    }
});