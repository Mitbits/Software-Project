import '../../imports/api/table.js';
import { Tables,Table, TableStatus, TableCluster } from '../../imports/api/table.js';
import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

Template.table.events({
   /*  'click .icon.link' () {
        console.log(event.currentTarget.id);
    }, */
    'click .ui.teal.button' () {
    	Table.findOne({ _id: this._id }).updateTableStatus(TableStatus.DIRTY);

    },
    'click .red.right.corner.label' ()
    {
        Table.findOne({ _id: this._id }).updateTableStatus(TableStatus.CLEAN);
    },
    'click .green.right.corner.label' ()
    {
        Table.findOne({ _id: this._id }).updateTableStatus(TableStatus.TAKEN);
		
    },
	 'click .plus.icon.link' () {
        let count = document.getElementById("counts");
        maxCount = 4;
        if(count.innerHTML >= 0 && count.innerHTML < maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            count.innerHTML++;
        }
        else {
            document.getElementById("plus").className = "big disabled plus icon link";
        }
    },
    'click .minus.icon.link' () {
        let count = document.getElementById("counts");
        if(count.innerHTML > 0 && count.innerHTML <= maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            document.getElementById("plus").className = "big plus icon link";
            count.innerHTML--;
        } else {
            document.getElementById("minus").className = "big disabled minus icon link";
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
	var hours = this.reservation.date.getHours() > 12 ? this.reservation.date.getHours() - 12 : this.reservation.date.getHours();
	var ampm = this.reservation.date.getHours() >= 12 ? "P.M." : "A.M.";
	hours = hours < 10 ? "0" + hours : hours;
	var minutes = this.reservation.date.getMinutes() < 10 ? "0" + this.reservation.date.getMinutes() : this.reservation.date.getMinutes();
	var reservationTime = hours + ":" + minutes + " " + ampm;   
	$('#dateDisplay').append(reservationTime);   
	}
	
});

Template.reservationPage.helpers({
    reservations() {
        return Reservations.find();
    },
});

