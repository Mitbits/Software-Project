import { Mongo } from 'meteor/mongo';
import { Class , Type} from 'meteor/jagi:astronomy';

export const Bills = new Mongo.Collection('bills');

Type.create({
    name: 'billItem',
    class: 'billItem'
});

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
        generateReceipt() {
            return this.save();
        },
        payBill() {
            this.billPaid = true;
            return this.save();
        }
    }
});