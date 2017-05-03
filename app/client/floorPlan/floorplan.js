/**
 * Authors - Mit, Raj, Prabhjot, Nill, Dylan, Mouli
 * Project Website - https://github.com/Mitbits/Software-Project
 */

import { Tables,Table, TableStatus,TableType, TableManager } from '../../imports/api/table.js';

import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

Template.floorplan.events({
	/**
	 * @function click #merge_button
	 * @summary transistions interface to manual merge interface, allows for selecting tables to merge
	 */
	'click #merge_button' (){
		// check of the button to enter the merge interface was clicked
		if($(event.target).attr("clicked") == "false"){
			//bring up the merge confirmation button and cancel button
			$(event.target).attr("clicked",true);
			$(event.target).html("Merge");
			$(event.target).after("<button class=\"ui button\" id=\"cancel\">Cancel</button>");

			$("#cancel").click(function(){
				//when cancel is clicked it will change the state back, for all tables, to not being a merge candidate
				Table.find({'checked_for_merge':true}).forEach(function(table){
					$("#"+table.table_id).css("background","#1b1c1d");
					//uncheck merge candidacy
					table.change_for_merge();

				});
				//return interface back
				$("#merge_button").html("Manual Merge");
				$("#merge_button").attr("clicked", false);
				$("#cancel").remove();
				$(".ui.small.blue.bottom.right.attached.label").remove();

				
			});
			//add the check box to each table when in merge interface
			Table.find({'table_type':TableType.WALKIN, 'table_status':TableStatus.CLEAN}).forEach(function(table_obj){
				$("#"+table_obj.table_id).append("<div class= \"ui small blue bottom right attached label\"><input class=\"merge_check\" type=\"checkbox\"></div>");
			});
			//change table to merge candidate when check box is clicked
			$(".merge_check").click(function(e){
				Table.findOne({"table_id":parseInt($(e.target).parent().parent().attr("id"))}).change_for_merge();
				
			});
	
		} else{
			//merging
			var tables = [];
			//get all candidates
			Table.find({'checked_for_merge' : true}).forEach(function(table_obj){
				//return them to normal for when they unmerge and put into merge component list
				tables.push(table_obj.table_id);
				table_obj.change_for_merge();
			
			});
			//a merge must have more than 2 components	
			if(tables.length >= 2){
				var manager = TableManager.findOne({});
				try{
					manager.mergeTable(tables,null);
				} catch(e){
					//error will be merging two or more tables of different table type
					alert(e);
				}
			}else{
				alert("Need more than 2 tables to merge");
			}
			//trigger cancel click
			$("#cancel").trigger("click");

			
		}

	}

});


Template.table.events({

/**
* @function
* @name click .ui.yellow.button 
* @summary Updates table status to dirty from taken
*/
    'click .ui.yellow.button' () {
        $("#"+this.table_id).removeClass("selectedTable");

    },
/*
 * @function click .small.red.button.left.attached.label
 * @summary unmerges selected table
 */
    'click .small.red.bottom.left.attached.label' (){
	    //break up merged table
		var manager = TableManager.findOne({});
	    //fetch the id from the parent inverted segment
		var table   =Table.findOne({'table_id':parseInt($(event.target).parent().attr("id"))});

		manager.unmergeTable(table.table_id);


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
        if(table.getNumOccupants() != 0) {
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
        let count = document.getElementById("counts");
        let maxCount = Table.findOne({ _id: this._id });
        maxCount = maxCount.size;
        if(Table.findOne({ _id: this._id }).getNumOccupants() >= 0 && Table.findOne({ _id: this._id }).getNumOccupants() < maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            // count.innerHTML++;
            Table.findOne({ _id: this._id }).addOccupants(1);
        }
        else {
            document.getElementById("plus").className = "big disabled plus icon link";
            Table.findOne({ _id: this._id }).setOccupantLimit(maxCount);

        }
    },
/**
* @function
* @name click .minus.icon.link 
* @summary Decrements Table Occupants by 1 with minimum of 0
*/
    'click .minus.icon.link' () {
        let count = document.getElementById("counts");
        let maxCount = Table.findOne({ _id: this._id });
        maxCount = maxCount.size;
        if(Table.findOne({ _id: this._id }).getNumOccupants() > 0 && Table.findOne({ _id: this._id }).getNumOccupants() <= maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            document.getElementById("plus").className = "big plus icon link";
            // count.innerHTML--;
            Table.findOne({ _id: this._id }).addOccupants(-1);
        } else {
            document.getElementById("minus").className = "big disabled minus icon link";
            Table.findOne({ _id: this._id }).setOccupantLimit(0);

        }
    }

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
/*
 * @function merging
 * @summary checks if merge button was clicked
 * @returns {Boolean} - whether button was clicked
 */
    merging(){

	return (($("#merge_button").attr("clicked") == "true") ? true: false); 
    }
	/* reservations() {
        return Reservations.find();
    }, */
	
});

Template.table.helpers({
/**
 *@function isMergedTable
 *@summary filters out tables that are can't be used for manual merge
 *@returns {Boolean} - whether table is allowed for manual merge
 */
	//used by blaze to check if table is a 'merged table'
    'isMergedTable': function(){
	return (this.table_components.length == 0||this.table_type!=TableType.WALKIN)? false: true;
    },
/**
 *@function notMergeComponent
 *@summary filters out tables that are merge components
 *@return {Boolean}  - whether table is a merge component
 */
	//used by blaze to check if table is a component of a 'merged table'
    'notMergeComponent':function(){
	return !this.merged;
    },
/**
* @function
* @name isDirty 
* @summary Checks if current table is Dirty
* @returns {Boolean}
*/
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

