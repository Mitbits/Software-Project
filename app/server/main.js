import { Meteor } from 'meteor/meteor';
import { Table, Tables, TableStatus, TableType } from '../imports/api/table.js';
import { Order, Orders } from '../imports/api/orders.js';

import '../imports/api/reservation.js';


// loops through all reservation tables checking if they can be made walkins 
function check_reservation_interval(){
	//console.log("Triggered check reservation");
	Table.find({$or: [{'table_type':TableType.RESERVATION},{'converted':true}]}).forEach(function(table_entry){

		//if the table is not reserved, convert it to walk for this hour
		if(table_entry.table_type == TableType.RESERVATION && table_entry.table_status != TableStatus.RESERVED){

			table_entry.table_type = TableType.WALKIN;
			table_entry.converted = true;
			table_entry.save();
		}
		//if it was converted to walk and is not taken, convert back
		else if(table_entry.converted == true && table_entry.table_status != TableStatus.TAKEN){
			table_entry.table_type = TableType.RESERVATION;
			table_entry.converted = false;
			table_entry.save();
		}


	});

	

}


Meteor.startup(() => {
	var curDate = new Date();

	
	Tables.remove({});
	Orders.remove({});

	for(i=1;i<=16;i++){
		//create astronomy table obj entry
		//L_status just for testing
		L_status = (i%4) ? TableStatus.CLEAN : TableStatus.RESERVED;
		var table_entry = new Table({
			"table_id": i,
			"size": 4,
			"occupants" : 0,
			"table_status":L_status,
			"table_type":TableType.RESERVATION,
			"reservation_intv":1,
			"converted" : false,
			"billPaid"	: false,
		});
		table_entry.save();
	}
	
	for ( i = 1; i <= 5; i++)
	{
		var order_entry = new Order({
			"orderID": i,
			"waiterID": 1,
			"menuItemID": 7,
			"timePlaced": curDate
		});
		order_entry.save();
	}
	
	//console.log(Tables.find({}));

	//set loop for reservation interval checkup 
	//Meteor.setInterval(check_reservation_interval,Table.findOne({'table_type':TableType.RESERVATION})*3600*1000);
	Meteor.setInterval(check_reservation_interval,10*1000);

  // code to run on server at startup
});
