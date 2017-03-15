import { Meteor } from 'meteor/meteor';
import {Table, TableStatus, TableType} from '../imports/api/table.js'
Meteor.startup(() => {
	Table.remove({});
	for(i=1;i<=16;i++){
		//create astronomy table obj entry
		var table_entry = new Table({
			"table_id":i,
			"size":4,
			"table_status":TableStatus.CLEAN,
			"table_type":TableType.RESERVATION,
			"reservation_intv":1
		});
		table_entry.save();
	}
  // code to run on server at startup
});
