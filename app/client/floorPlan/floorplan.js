import '../../imports/api/table.js';
import { Tables,Table, TableStatus, TableCluster } from '../../imports/api/table.js';
import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

Template.table.events({
   /*  'click .icon.link' () {
        console.log(event.currentTarget.id);
    }, */
    'click .ui.yellow.button' () {
		var table = Table.findOne({ _id: this._id });
    	table.updateTableStatus(TableStatus.DIRTY);
		table.updateOccupantsmax(0);

    },
    'click .red.right.corner.label' ()
    {
	//removes the reservation from the table and from the waitlist
        var table  = Table.findOne({ _id: this._id });
	table.updateTableStatus(TableStatus.CLEAN);
	var cluster = Cluster.findOne({'size':this.seats});
	cluster.popReservation(table.reservation);
	table.removeReservaton();
     },
    'click .green.right.corner.label' ()
    {
		var table = Table.findOne({ _id: this._id });
		if(table.checknumofOccupant() != 0) {
        table.updateTableStatus(TableStatus.TAKEN);
		}
    },
	'click .ui.gray.right.corner.label' (){
		var table = Table.findOne({ _id: this._id });
        table.updateTableStatus(TableStatus.TAKEN);

	},
	 'click .plus.icon.link' () {
        let count = document.getElementById("counts");
        maxCount = 4;
        if(Table.findOne({ _id: this._id }).checknumofOccupant() >= 0 && Table.findOne({ _id: this._id }).checknumofOccupant() < maxCount) {
            document.getElementById("minus").className = "big minus icon link";
           // count.innerHTML++;
			Table.findOne({ _id: this._id }).updateOccupants(1);
        }
        else {
            document.getElementById("plus").className = "big disabled plus icon link";
			Table.findOne({ _id: this._id }).updateOccupantsmax(4);

        }
    },
    'click .minus.icon.link' () {
        let count = document.getElementById("counts");
        if(Table.findOne({ _id: this._id }).checknumofOccupant() > 0 && Table.findOne({ _id: this._id }).checknumofOccupant() <= maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            document.getElementById("plus").className = "big plus icon link";
           // count.innerHTML--;
			Table.findOne({ _id: this._id }).updateOccupants(-1);
			} else {
            document.getElementById("minus").className = "big disabled minus icon link";
			Table.findOne({ _id: this._id }).updateOccupantsmax(0);

        }
    }
});

Template.floorplan.helpers({
    tables()
    {
        return Table.find();
    },
	reservations() {
        return Reservations.find();
    },
	

});

Template.table.helpers({
    'isDirty': function() {
        if(this.table_status == 'Dirty') {
            return true;
        }
    },
    'isClean': function() {
        if(this.table_status == 'Clean') {
            return true;
        }
    },
    'isReserved': function() {
        if(this.table_status == 'Reserved') {
            return true;
        }
    },
    'isTaken': function() {
        if(this.table_status == 'Taken') {
            return true;
        }
    },
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
    reservations() {
        return Reservations.find();
    },
});

