import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'
import { Reservation } from './reservation.js'
export const Tables = new Mongo.Collection('table');
export const TableClusters = new Mongo.Collection('TableClusters');

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
	name: 'TableType',
	identifiers:{
		RESERVATION: 'Reservation',
		WALKIN: 'Walkin'
	}
});


function reservation_checker(id){
	table =Table.findOne({'table_id': id});

	if (table.table_type == TableType.RESERVATION && table.table_status ==TableStatus.CLEAN){
		table.table_type = TableType.WALKIN;
		//console.log("TO WALKIN");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.CLEAN){
		table.table_type = TableType.RESERVATION;
		//console.log("TO RESERVATION");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.TAKEN){
		//console.log("WAITING...");
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
	secured: false,
	collection: Tables,
	fields: {
		table_id: Number,
		size: Number,
		occupants: Number,
		table_status: TableStatus,
		table_type :TableType,
		reservation_intv : Number,
		billPaid: Boolean,
		reservation: {
			type :Reservation,
			optional :true,
			default:function(){
				return null;
			}
		}
	},
	meteorMethods: {

 		reservation_intr() {
 			if(this.table_type != TableType.RESERVATION) { return; }
  			var table = this;
 			Meteor.setTimeout(function() {
  				reservation_checker(table.table_id);
 			},
 			table.reservation_intv*1000)
 		},
		removeReservation(){
			this.reservation.remote_delete();
			this.reservation = null;
			this.save();
		},
 		updateTableStatus(toStatus) {
 			this.table_status = toStatus;
 			this.save();
  		},
		updateOccupants(numofoccupant) {
 			this.occupants = numofoccupant + this.occupants;
 			this.save();
		},
		updateOccupantsmax(num) {
 			this.occupants = num;
 			this.save();
		},
		checknumofOccupant() {
			return this.occupants;

		}
	}
 
 });

export const TableCluster = Class.create({
	name : 'TableClusters',
	collection : TableClusters,
	fields : {
		size: Number,
		reservations: [Reservation]
		
	},
	meteorMethods: {
			sssave()
			{
				//helper for saving on client side
				return this.save();
			},
			popReservation(res){
				//pops reservation entry from waitlist
				var res_ind = this.reservations.findIndex((res_loop) =>(res.phoneNum == res_loop.phoneNum));
				this.reservations.splice(res_ind,1);
				this.save()
			},
			pushReservation(res){
				//adds reservation entity to wait list
				this.reservations.push(res);
				this.save();
			},
			checkValidReservation(time){
				//checks if reservation can be added to waitlist
				//the number of reses for a given time must not exceed # of reservation tables
				
				var numResTbls = Table.find({'table_type':TableType.RESERVATION}).count();
				var numRes = 0;
				this.reservations.forEach(function(res){

					if(res.date.getTime() == time.getTime())
						numRes++;
				});
				console.log(numRes);
				return (numRes+1<=numResTbls) ? true : false;
			},
			tablechecker()
			{
				var size = this.size;
				Meteor.setInterval(function(){
				function reserve(size) {
					var now = new Date();
					var cluster = TableCluster.findOne({'size':size});

					//console.log(cluster.reservations);
					cluster.reservations.forEach(function(res_id){
		
						var res = Reservation.findOne({'phoneNum':res_id.phoneNum});
						if(!res.isToday() || res.assigned){
							return;
						}
						var diff = ((res.date.getTime()*1-now.getTime()*1)/1000)/3600;
					
						if(diff <2){
							
							var table; 
							Table.find({'size':cluster.size,'table_type':TableType.RESERVATION,'table_status':TableStatus.CLEAN}).forEach(function(tbl){
								table = tbl;
								return;
							});
						
							res.assigned = true;
							res.save();
							table.table_status = TableStatus.RESERVED;
							table.reservation = res;
							table.occupants = res.seats;
							table.save();
						}

					});
					
				}; reserve(size);},500);
			
			}
			
		}
});





