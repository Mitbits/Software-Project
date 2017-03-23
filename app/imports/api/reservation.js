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
			},
			isToday(){
				var today = new Date();
				if(this.date.getFullYear() != today.getFullYear())
					return false;
				if(this.date.getMonth() != today.getMonth())
					return false;
				if(this.date.getDate() != today.getDate())
					return false;
				return true;
			}
		}
});
		
