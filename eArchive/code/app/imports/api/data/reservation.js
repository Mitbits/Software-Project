//written by Dylan Herman
//tested by Dylan Herman
//debugged by Dylan Herman
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const ArchivedReservations = new Mongo.Collection('archivedreservations');

/**
 *@class ArchivedReservation
 *@summary Represents an archived reservation
 *@param {Date} Hour - hour of reservation
 *@param {Number} Count - number of reservations at that hour
 */
export const ArchivedReservation = Class.create({
	name: "AReservations",
	collection: ArchivedReservations,
	fields: {
		Hour: Date,
		Count: {
			type: Number,
			default: function(){
				return 1;
			}
		}
	
	},

	
	meteorMethods:{
		/**
		 *@function arcSave
		 *@summary saves ArchivedReservation to db
		 */
		arcSave(){
			this.save();

		}

	}

});


