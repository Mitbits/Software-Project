//written by Dylan Herman
//debugged by Dylan Herman
//tested by Dylan Herman

import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy'

export const Reservations = new Mongo.Collection('reservations');

/**
 * @class Reservation
 * @summary Represents reservation records from the client-side reservation system
 * @param {String} firstName - First name of reservation holder
 * @param {String} lastName - Last name of reservation holder
 * @param {Number} phoneNum - Phone Number of reservation holder
 * @param {String} email - Email address of reservation holder
 * @param {Number} seats - Number of seats reserved
 * @param {Date} date - Date and time of reservation
 * @param {Boolean} assigned - whether reservation has been assigned a table
 *
 * @todo Either use the mongo unique '_id' to remove reservations, or create a 'reserverationID' field.
 */
export const Reservation = Class.create({
	name: 'TableReservation',
	collection: Reservations,
	fields : {
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		phoneNum: {
    		type: Number,
		},
		email: {
			type: String
        },
		seats: {
			type: Number
        },
		date: {
			type: Date
        },
		assigned: {
			type: Boolean,
			optional: true,
			default: function(){
				return false;
			}
		}
	},
	meteorMethods: {
        /**
		 * @function reservation_save
		 * @summary Saves/Writes reservation into the database
		 * @returns {Number} Status of database write operation
         */
		reservation_save() {
			return this.save();
		},
        /**
		 * @function isToday
		 * @summary Checks if the date of the Reservation corressonds to the current server date
		 * @returns {boolean} True if date matches, false otherwise
		 */
		isToday() {
			if (this.date == undefined)
				return false;
			var today = new Date();
			if(this.date.getFullYear() != today.getFullYear())
				return false;
			if(this.date.getMonth() != today.getMonth())
				return false;
			if(this.date.getDate() != today.getDate())
				return false;
			return true;
		},
        /**
		 * @function remote_delete
		 * @summary Deletes a Reservation matching the phone number
         */
		remote_delete() {
			Reservation.remove({'phoneNum': this.phoneNum});
		}
	}
});

