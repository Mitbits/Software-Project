import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const ArchivedReservations = new Mongo.Collection('archivedreservations');


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
		arcSave(){
			this.save();

		}

	}

});


