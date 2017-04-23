

import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy'


export const ArchivedReservations = new Mongo.Collection('ArchivedReservations');


export const ArchivedReservation = Class.create({
	name: 'AReservation',
	collection: ArchivedReservations,
	fields: {
		date: {
			type:  Number
		},
		count:{
			type:Number
		}

	},
		meteorMethods: {
        /**
		 * @function sssave
		 * @summary Saves/Writes reservation into the database
		 * @returns {Number} Status of database write operation
         */
		arcres_save() {
			return this.save();
		}
		}
});


