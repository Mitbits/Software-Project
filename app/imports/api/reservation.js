import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy'

export const Reservations = new Mongo.Collection('reservations');

/**
 * @class
 * @classdesc Represents reservation records from the client-side reservation system
 * @param {String} firstName - First name of reservation holder
 * @param {String} lastName - Last name of reservation holder
 * @param {Number} phoneNum - Phone Number of reservation holder
 * @param {String} email - Email address of reservation holder
 * @param {Number} seats - Number of seats reserved
 * @param {Date} date - Date and time of reservation
 * @param {Boolean} assigned -
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
		 * @function Saves/Writes reservation into the database
		 * @this Refers to a 'Reservation' object
		 * @returns {WriteResult} Status of database write operation
         */
		sssave() {
			return this.save();
		},
        /**
		 * @function Checks if the date of the Reservation corressonds to the current server date
         * @returns {boolean} True if date matches, false otherwise
         */
		isToday() {
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
		 * @function Deletes a Reservation matching the phone number
		 * @this Refers to a 'Reservation' object
         */
		remote_delete() {
			Reservation.remove({'phoneNum': this.phoneNum});
		}
	}
});

