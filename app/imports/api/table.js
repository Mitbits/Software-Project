import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'
import { Reservation } from './reservation.js'
export const Tables = new Mongo.Collection('table');
export const TableClusters = new Mongo.Collection('TableClusters');

/**
 * @readonly
 * @enum {String}
 * Enum for the current status of a table
 */
export const TableStatus = Enum.create({
	name : 'TableStatus',
	identifiers : {
		DIRTY: 'Dirty',
		CLEAN: 'Clean',
		RESERVED: 'Reserved',
		TAKEN: 'Taken'
	}
});

/**
 * @readonly
 * @enum {String}
 * Enum that represents the type of a table
 */
export const TableType = Enum.create({
	name: 'TableType',
	identifiers:{
		RESERVATION: 'Reservation',
		WALKIN: 'Walkin'
	}
});

/**
 * @function Sets table statuses based on their existing current status.
 * @param id
 */
function reservation_checker(id){
	table = Table.findOne({'table_id': id});

	if (table.table_type == TableType.RESERVATION && table.table_status == TableStatus.CLEAN) {
		table.table_type = TableType.WALKIN;
		//console.log("TO WALKIN");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.CLEAN) {
		table.table_type = TableType.RESERVATION;
		//console.log("TO RESERVATION");
	} else if (table.table_type == TableType.WALKIN && table.table_status == TableStatus.TAKEN) {
		//console.log("WAITING...");
		Meteor.setTimeout(function () {
			reservation_checker(id);
		}, 15 * 1000);
	}

	table.save();
    /**
	 * @function Calls the reservation_check function on an interval to update table status
     */
	Meteor.setTimeout(function () {
		reservation_checker(id);
	}, table.reservation_intv * 1000);
}

/**
 * @class
 * @class Represents a table at the restaurant
 * @param {Number} table_id - Unqiue table identifier
 * @param {Number} size - Size of the table in seats
 * @param {Number} occupants - Number of people seated at the table
 * @param {TableStatus} table_status - Current status of the table
 * @param {TableType} table_type - The type of table
 * @param {Number} reservation_intv - Time interval used to update reservations
 */
export const Table = Class.create({
	name: 'TableEntry',
	secured: false,
	collection: Tables,
	fields: {
		table_id: {
			type: Number
        },
		size: {
			type: Number
        },
		occupants: {
			type: Number
        },
		table_status: {
			type: TableStatus
        },
		table_type: {
			type: TableType
        },
		reservation_intv: {
			type: Number
        },
		billPaid: {
			type: Boolean
        },
		reservation: {
			type :Reservation,
			optional :true,
			default:function(){
				return null;
			}
		}
	},
	meteorMethods: {
        /**
		 * @function Deletes a reservation entry from the table
		 * @returns Status of database write operation
		 *
		 * @todo Redo logic of this function. Seems repetitive.
         */
		removeReservation(){
			this.reservation.remote_delete();
			this.reservation = null;
			return this.save();
		},
        /**
		 * @function Changes the current table status to the specified status
         * @param toStatus
		 * @returns Status of database write operation
         */
 		updateTableStatus(toStatus) {
 			this.table_status = toStatus;
 			return this.save();
  		},
        /**
		 * @function
         * @param {Number} numOccupants - number of occupants to be added to the table
		 * @return Status of operation
         */
		addOccupants(numOccupants) {
			if (numOccupants >= 1) {
                this.occupants = numOccupants + this.occupants;
                return this.save();
            }
            else {
				return new Error("Can't add less than 1 occupant!");
			}
		},
        /**
		 * @function
         * @param {Number} numOccupants - limit to set for the number of occupants for a table
		 * @return Status of database write operation
         */
		setOccupantLimit(numOccupants) {
 			this.occupants = numOccupants;
 			return this.save();
		},
        /**
		 * @function - gets the number of occupants at a table
         * @returns {Number|*} - number of occupants at a table
         */
		getNumOccupants() {
			return this.occupants;
		}
	}
});

/**
 * @class
 * @classdesc A node that groups Table objects based on size. Also accounts for reserved tables.
 * @param {Number} size - Size of the TableCluster
 * @param {Reservation} reservations - reservations of tables
 */
export const TableCluster = Class.create({
	name : 'TableClusters',
	collection : TableClusters,
	fields : {
		size: Number,
		reservations: [Reservation]
		
	},
	meteorMethods: {
        /**
		 * @function Saves a table cluster entry from the client side.
		 * @returns Status of database write operation
         */
		sssave() {
			return this.save();
		},
        /**
		 * @function Removes a reservation from the wait list
         * @param {Reservation} res - reservation to be removed
		 * @returns Status of database write operation
         */
		popReservation(res) {
			var res_ind = this.reservations.findIndex((res_loop) =>(res.phoneNum == res_loop.phoneNum));
			this.reservations.splice(res_ind, 1);
			return this.save()
		},
        /**
		 * @function Adds a reservation to the wait list
         * @param res - reservation to be added
		 * @returns Status of database write operation
         */
		pushReservation(res) {
			//adds reservation entity to wait list
			this.reservations.push(res);
			return this.save();
		},
        /**
		 * @function Checks if a reservation can be added to the wait list.
         * @param time
         * @returns {boolean} True if the number of reservation tables is less than the number reserved at some time.
         */
		checkValidReservation(time) {
			//the number of reses for a given time must not exceed # of reservation tables
			var numResTables = Table.find({'table_type':TableType.RESERVATION}).count();
			var numRes = 0;
			this.reservations.forEach(function(res) {
				if(res.date.getTime() == time.getTime()) {
                    numRes++;
                }
			});
			return (numRes + 1 <= numResTables) ? true : false;
		},
        /**
		 * @function Table management function that checks table statuses, reservations, & occupants on an interval
         */
		tableChecker()
		{
			var size = this.size;
			Meteor.setInterval(function(){
			function reserve(size) {
				var now = new Date();
				var cluster = TableCluster.findOne({'size':size});

				//console.log(cluster.reservations);
				cluster.reservations.forEach(function(res_id) {

					var res = Reservation.findOne({'phoneNum':res_id.phoneNum});
					if(!res.isToday() || res.assigned) {
						return;
					}
					var diff = ((res.date.getTime()*1-now.getTime()*1)/1000)/3600;

					if (diff < 2) {
						var table;
						Table.find({'size':cluster.size,'table_type':TableType.RESERVATION,'table_status':TableStatus.CLEAN}).forEach(function(tbl) {
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

			}; reserve(size);}, 500);
		}
	}
});





