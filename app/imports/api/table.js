import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

export const Tables = new Mongo.Collection('table');

//status for each table
export const TableStatus = Enum.create({
	name : 'TableStatus',
	identifiers : {
		DIRTY: 'Dirty',
		CLEAN: 'Clean',
		RESERVED: 'Reserved',
		TAKEN: 'Taken'

	}

});


//types for each table
export const TableType = Enum.create({
	name : 'TableType',
	identifiers :{
		RESERVATION : 'Reservation',
		WALKIN : 'Walkin'

	}
});


function reservation_checker(id){
	table =Table.findOne({'table_id': id});
	var check = 0;
	if (table.table_type == TableType.RESERVATION && table.table_status==TableStatus.CLEAN){
		table.table_type = TableType.WALKIN;
		//console.log("TO WALKIN");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.CLEAN){
		table.table_type = TableType.RESERVATION;
		//console.log("TO RESERVATION");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.TAKEN){
		console.log("WAITING...");
		Meteor.setTimeout(function (){
			reservation_checker(id);
		},15*1000);

	}	
	table.save();
	Meteor.setTimeout(function (){
				reservation_checker(id);
			},table.reservation_intv*1000);
}

//table entries
export const Table = Class.create({
	name: 'TableEntry',
	collection: Tables,
	fields : {
		table_id : Number,
		size : Number,
		occupants: Number,
		table_status: TableStatus,
		table_type :TableType,
		reservation_intv : Number,
		billPaid: Boolean
	},
	meteorMethods :{
		reservation_intr(){
			if(this.table_type != TableType.RESERVATION){
				return;
			}
			var table = this;
			Meteor.setTimeout(function (){
				reservation_checker(table.table_id);
			},table.reservation_intv*1000)
		}
	}	


});

