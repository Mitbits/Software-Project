
import { Tables,Table, TableStatus,TableType, TableManager } from '../../imports/api/table.js';

import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'
Template.table.events({

/**
* @function
* @name click .ui.yellow.button 
* @summary Updates table status to dirty from taken
*/
    'click .ui.yellow.button' () {
		var table = Table.findOne({ _id: this._id });
    	table.updateTableStatus(TableStatus.DIRTY);
        $('#table'+this._id).removeClass("selectedTable");

    },
/**
* @function
* @name click .red.right.corner.label 
* @summary Updates table status to Clean from Dirty
*/
    'click .red.right.corner.label' ()
    {
	//removes the reservation from the table and from the waitlist
    var table  = Table.findOne({ _id: this._id });


   
 
    if (table.table_status == TableStatus.DIRTY)

	{


      	table.clean(); 
    }



},
/**
* @function
* @name click .green.right.corner.label 
* @summary Updates table status to Taken from Clean & Updates number of Occupants on table
*/
    'click .green.right.corner.label' ()
    {
		var table = Table.findOne({ _id: this._id });
		if(table.occupants != 0) {
        		table.updateTableStatus(TableStatus.TAKEN);
		}
    },
/**
* @function
* @name click .gray.right.corner.label 
* @summary Updates table status to Taken from Reserved
*/
	'click .ui.gray.right.corner.label' (){
		var table = Table.findOne({ _id: this._id });
        table.updateTableStatus(TableStatus.TAKEN);

	},
/**
* @function
* @name click .plus.icon.link 
* @summary Increments Table Occupants by 1 with maximum of 4
*/
	 'click .plus.icon.link' () {

	let table = Table.findOne({_id: this._id});

	if (table.occupants < table.size){
		document.getElementById("minus").className = "big minus icon link"
		table.increaseOccupants();
	}
	else{
		 document.getElementById("plus").className = "big disabled plus icon link";
	}

    },
/**
* @function
* @name click .minus.icon.link 
* @summary Decrements Table Occupants by 1 with minimum of 0
*/
    'click .minus.icon.link' () {

	let table = Table.findOne({_id: this._id});
	if (table.occupants>=0){
		table.decreaseOccupants();
 		document.getElementById("minus").className = "big minus icon link";
            	document.getElementById("plus").className = "big plus icon link";


	}
	else{
		document.getElementById("minus").className = "big disabled minus icon link";
	}
    },

});




Template.floorplan.helpers({
/**
* @function
* @name tables 
* @summary Returns all Tables from the database
* @returns Table Collection
*/
    tables()
    {
        return Table.find();
    },
	/* reservations() {
        return Reservations.find();
    }, */
	
});

Template.table.helpers({
/**
* @function
* @name isDirty 
* @summary Checks if current table is Dirty
* @returns {Boolean}
*/
    'notMerged':function(){
	return !this.merged;
    },
    'isDirty': function() {
        if(this.table_status == 'Dirty') {
            return true;
        }
    },
/**
* @function
* @name isClean 
* @summary Checks if current table is Clean
* @returns {Boolean}
*/
    'isClean': function() {
        if(this.table_status == 'Clean') {
            return true;
        }
    },
/**
* @function
* @name isReserved 
* @summary Checks if current table is Reserved
* @returns {Boolean}
*/
    'isReserved': function() {
        if(this.table_status == 'Reserved') {
            return true;
        }
    },
/**
* @function
* @name isTaken 
* @summary Checks if current table is Taken
* @returns {Boolean}
*/
    'isTaken': function() {
        if(this.table_status == 'Taken') {
            return true;
        }
    },
/**
* @function
* @name restime 
* @summary Takes current reservation date from database and converts it into 12 Hour Standard Time 
* @returns 12 Hour Time Format
*/
	'restime': function() {
	//console.log(this);
	var hours = this.reservation.date.getHours() > 12 ? this.reservation.date.getHours() - 12 : this.reservation.date.getHours();
	var ampm = this.reservation.date.getHours() >= 12 ? "P.M." : "A.M.";
	hours = hours < 10 ? "0" + hours : hours;
	var minutes = this.reservation.date.getMinutes() < 10 ? "0" + this.reservation.date.getMinutes() : this.reservation.date.getMinutes();
	var reservationTime = hours + ":" + minutes + " " + ampm;   
	return reservationTime;   

	}
	
});

Template.reservationPage.helpers({
/**
* @function
* @name reservations 
* @summary Returns all Reservations from the database
* @returns Reservation Collection
*/  
   reservations() {
        return Reservations.find();
    },
});

