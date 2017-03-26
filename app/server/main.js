import { Meteor } from 'meteor/meteor';
import {Table,Tables, TableStatus, TableType, TableCluster} from '../imports/api/table.js';
import { Reservation } from '../imports/api/reservation.js';

import '../imports/api/reservation.js';





Meteor.startup(() => {
    Table.remove({});
    TableCluster.remove({});
    Reservation.remove({});


	for(i=1;i<=4;i++){
		var tablecluster = new TableCluster({
	"size":i,
	"reservations": []
		});
		    tablecluster.save();
			tablecluster.tablechecker();

	}



    tablecluster.save();
    for(i=1;i<=16;i++){
        //create astronomy table obj entry
        //L_status just for testing
        L_status = (i%4) ? TableStatus.CLEAN : TableStatus.CLEAN;
		M_status = (i%4) ? TableType.WALKIN : TableType.RESERVATION;
		
        var table_entry = new Table({
            "table_id":i,
            "size":4,
            "occupants" : 0,
            "table_status":L_status,
            "table_type":M_status,
            "reservation_intv":10,
            "converted" : false,
            "billPaid"	: false,
			
        });
        table_entry.save();

	    
		tablecluster.save();
		/* 		table_entry.reservation_intr();
		 */
    }
    tablecluster.tablechecker();

    // code to run on server at startup
});
