import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy'
export const Reservations = new Mongo.Collection('reservations');


export const Reservation = Class.create({
	
		name: 'TableReservation',
		collection: Reservations,
		fields : {
			firstName: String,
			lastName: String,
			phoneNum: Number,
			email: String,
			seats: Number,
			date: Date
		},
		meteorMethods: {
			sssave()
			{
				return this.save();
			}
		}
});
		