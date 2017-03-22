import { Meteor } from 'meteor/meteor';
import {Table,Tables, TableStatus, TableType} from '../imports/api/table.js';

import '../imports/api/reservation.js';





Meteor.startup(() => {
	Table.remove({});

	for(i=1;i<=16;i++){
		//create astronomy table obj entry
		//L_status just for testing
		L_status = (i%4) ? TableStatus.CLEAN : TableStatus.RESERVED;
		var table_entry = new Table({
			"table_id":i,
			"size":4,
			"occupants" : 0,
			"table_status":L_status,
			"table_type":TableType.RESERVATION,
			"reservation_intv":10,
			"converted" : false,
			"billPaid"	: false,
		});
		table_entry.save();
		table_entry.reservation_intr();
		
	}

  // code to run on server at startup
});
