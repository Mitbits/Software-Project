import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

export const Tables = new Mongo.Collection('table');

//status for each table
export const TableStatus = Enum.create({
	name : 'TableStatus',
	identifiers : {
		DIRTY: 1,
		CLEAN: 2,
		RESERVED: 3,
		TAKEN: 4

	}

});

//types for each table
export const TableType = Enum.create({
	name : 'TableType',
	identifiers :{
		RESERVATION :1,
		WALKIN : 2

	}
});


//table entries
export const Table = Class.create({
	name: 'TableEntry',
	collection: Tables,
	fields : {
		table_id : Number,
		size : Number,
		table_status: TableStatus,
		table_type :TableType,
		reservation_intv : Number
	}
});

