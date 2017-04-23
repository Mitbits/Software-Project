import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'
import { Reservation } from './reservation.js'
export const Tables = new Mongo.Collection('table');
export const TableManagers = new Mongo.Collection('tablemanagers');





var DEFAULT_INTV = 2;
var RESERVATION_CHECK_TIME = 500;

/**
 * @readonly
 * @enum {String}
 * @summary Enum for the current status of a table
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
 * @summary Enum that represents the type of a table
 */
export const TableType = Enum.create({
	name: 'TableType',
	identifiers:{
		RESERVATION: 'Reservation',
		WALKIN: 'Walkin'
	}
});


function nextTableId(){
    var max_id = 0;
    Tables.find({}).forEach(function(tbl){
        if(tbl.table_id>max_id)
            max_id = tbl.table_id;
    });
    return max_id+1;

}

/**
 * @class Table
 * @summary Represents a table at the restaurant
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
			type: Number,
            optional:true,
            default:function(){
                return nextTableId();
            }
        },
		size: {
			type: Number
        },
		occupants: {
            type: Number,
            optional: true,
            default: function(){
                return 0;
            }
        },
		table_status: {
			type: TableStatus,
            optional:true,
            default: function(){
                return TableStatus.CLEAN;
            }
        },
		table_type: {
			type: TableType
        },
		billPaid: {
			type: Boolean,
            optional: true,
            default: function(){
                return false;
            }
        },
	reservation: {
		type :Reservation,
		optional :true,
		default:function(){
			return null;
		}
	},
        merged:{
            type: Boolean,
            optional: true,
            default :function(){
                return false;
            }
        },

        table_components: {
            type: [Number],
            optional: true,
            default: function(){
                return [];
            }
        },
	//detects if table is a candidate for manual merging (checked off)
	checked_for_merge:{
            type: Boolean,
	    optional: true,
	    default: function(){
		return false;
	    }
	}

            
	},
	meteorMethods: {
		//makes a table a candidate for manual merging
		change_for_merge(){
			this.checked_for_merge = !this.checked_for_merge;
			this.save();
			return this.checked_for_merge;
		},
     		clean(){
			if(this.reservation != null){
				var manager = TableManager.findOne({});
				manager.popReservation(this.reservation);
				this.reservation = null;

			}
			this.occupants = 0;
			this.save();
			this.updateTableStatus(TableStatus.CLEAN);

			if (this.table_components.length != 0){
				manager.unmergeTable(this.table_id);
			}
			
		},
        /**
		 * @function updateTableStatus
		 * @summary Changes the current table status to the specified status
         * @param toStatus
		 * @returns Status of database write operation
         */
 		updateTableStatus(toStatus) {
 			this.table_status = toStatus;
 			return this.save();
  		},
        /**
         * @function addOccupants
         * @summary Adds occupants to a table
         * @param {Number} numOccupants - number of occupants to be added to the table
         * @return Status of operation
         */
        addOccupants(numOccupants) {
                this.occupants = numOccupants + this.occupants;
                return this.save();

        },
        /**
         * @function setOccupantLimit
         * @summary Set maximum number of occupants
         * @param {Number} numOccupants - limit to set for the number of occupants for a table
         * @return Status of database write operation
         */
        setOccupantLimit(numOccupants) {
            this.occupants = numOccupants;
            return this.save();
        },
        /**
         * @function getNumOccupants
         * @summary Gets the number of occupants at a table
         * @returns {Number|*} - number of occupants at a table
         */
        getNumOccupants() {
            return this.occupants;
        }
    }
});


export const TableManager = Class.create({
    name: 'TableManagerEntry',
    collection: TableManagers,
    fields :{
        reservations:{
            type : [Reservation],
            optional : true,
            default: function(){
                return [];
            }
        },
        reservation_intv:{
            type: Number,
            optional: true,
            default: function(){
                return DEFAULT_INTV;
            }
        }
    },

    meteorMethods : {
        manager_save(){
           return this.save()
        
        },
        /**
		 * @function verifyReservation
		 * @summary Checks if a reservation can be added to the wait list.
         * @param {Number} time - Time to check the reservations
         * @returns {boolean} True if the number of reservation tables is less than the number reserved at some time.
         */
		verifyReservation(time) {
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

        pushReservation(reservation){
            this.reservations.push(reservation);
            this.save();
        },
        popReservation(res) {
			var res_ind = this.reservations.findIndex((res_loop) =>(res.phoneNum == res_loop.phoneNum));
            if (res_ind == -1)
                return false;
			this.reservations.splice(res_ind, 1);
			this.save();
			res.remote_delete();
            return true;
	},
	/*
	 * gets num tables if possible of table_type and table_status
	 * returns array of table id's
	 *
	 */
	getTables(num,size,table_type,table_status){
		 var table_list = [];
		 var count = 0;


		 Table.find({'size':size,'table_type': table_type, 'table_status': table_status,'merged':false,'occupants':0}).forEach(function(tbl){
			if(count < num){

			    table_list[count] = tbl.table_id;
			    count++;
			}
				       
		  });
	
		 return (table_list.length==0) ? null: table_list;
		  


	},
        assignTable(table,res){
	    console.log(table);
	    var table_obj = Table.findOne({'table_id':table});
	    
            res.assigned = true;
            res.save();
            table_obj.table_status = TableStatus.RESERVED;
            table_obj.reservation = res;
            table_obj.occupants = res.seats;
            table_obj.save();
            return;
        },
        // combines tables in list 'tables' into one temporarly
	// 'tables' contains the id's of tables to merge
        mergeTable(tables,res){
	    var size = 0;
	    var table_type = null;
	//make sure tables are of the same type...shouldn't be a problem since interface doesn't allow for 
		//mixed type merging...could technically remove
	    tables.forEach(function(table_id){
		table_obj = Table.findOne({'table_id':table_id});
	
		table_type = (table_type == null) ? table_obj.table_type : table_type;
	
		if(table_type != table_obj.table_type)
			throw ("table types do not match");

	    });
	//put table id's into array
	    tables.forEach(function(table_id){
		table_obj = Table.findOne({'table_id':table_id});
		table_obj.merged = true;
		table_obj.save();
		size+= table_obj.size;
		return;
	    });
	//form merged table
            var table_merged = new Table({
                "size": size,
                "occupants":(res!=null) ?res.seats: 0,
                "table_status": (res!=null)? TableStatus.RESERVED: TableStatus.Taken,
                "table_type": (res!=null) ?TableType.RESERVATION: TableType.WALKIN,
                "table_components": tables
            });
	//attach reservation if reserved
	    if (res != null){
	    	res.assigned = true;
	    	res.save();
	    	table_merged.reservation = res;
	    }
	    table_merged.save();
	    return;          
            
        },
	//breaks table_merged into its components and deletes it
        unmergeTable(table_merged_id){
	    //pass table id since meteor is stupid
            //break table up into its components
	    var table_merged = Table.findOne({'table_id':table_merged_id});
            var tables = table_merged.table_components;
            tables.forEach(function(table){
                table = Table.findOne({'table_id':table});
                table.merged = false;

                table.save();
            });
	
            table_merged.remove();
            return;
        
        },
        startPollReservations(){
        	var size = this.size;
   		Meteor.setInterval(function(){
             
                var manager = TableManager.findOne({});
		var now = new Date();
		//looks through all reservations less than reservation_invl from now
		//finds a table that suits them
		manager.reservations.forEach(function(res_id) {
			var res = Reservation.findOne({'phoneNum':res_id.phoneNum});
	
			if(res == undefined){
				return;
			}
			if(!res.isToday() || res.assigned) {
				return;
			}
 
		    var time_difference = Math.floor(((res.date.getTime()*1-now.getTime()*1)/1000)/3600);
		    var size = res.seats;
		    if (time_difference < manager.reservation_intv ) {
				var table  = null;
				//needs to be multiple of two
			    	//round up
			        size = (size%2!=0) ? size+1 : size;

			    	table = manager.getTables(1,size,TableType.RESERVATION,TableStatus.CLEAN);

			    	if (table !=null){
 					manager.assignTable(table[0],res);
					return;
				} 
			    	else {
					table = manager.getTables(2,size/2,TableType.RESERVATION,TableStatus.CLEAN);
					if(table != null && table.length == 2){
						manager.mergeTable(table,res);
						return;
					}else{
						table = manager.getTables(1,size+2,TableType.RESERVATION,TableStatus.CLEAN);
						if(table != null){
							manager.assignTable(table[0],res);
							return;
						}
					
					}
				}
			    	manager.popReservation(res);
				return;
		    }

		});
            },RESERVATION_CHECK_TIME);
        }
                    
    }
});






