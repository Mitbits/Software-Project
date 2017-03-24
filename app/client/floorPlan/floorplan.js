import '../../imports/api/table.js';
import { Tables,Table, TableStatus, TableCluster } from '../../imports/api/table.js';
import { Mongo } from 'meteor/mongo';
import { Class,Enum } from 'meteor/jagi:astronomy'

Template.table.events({
    'click .icon.link' () {
        console.log(event.currentTarget.id);
    },
    'click .ui.teal.button' () {
    	Tables.update(this._id,{
		$set: { table_status : TableStatus.DIRTY},
	});
    },
    'click .red.right.corner.label' ()
    {
        Tables.update(this._id,{
            $set: { table_status : TableStatus.CLEAN}
        });
    },
    'click .green.right.corner.label' ()
    {
        Tables.update(this._id,{
            $set: { table_status : TableStatus.TAKEN}
        });
    },
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
});

Template.reservationPage.helpers({
    reservations() {
        return Reservations.find();
    },
});