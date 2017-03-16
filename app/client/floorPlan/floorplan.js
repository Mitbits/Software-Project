import '../../imports/api/table.js';
import { Tables,Table, TableStatus } from '../../imports/api/table.js';

Template.table.events({
    'click .icon.link' () {
        console.log(event.currentTarget.id);
    },
    'click .set_taken' () {
    	Tables.update(this._id,{
		$set: { table_status : TableStatus.RESERVED},
	});
    },
    'click .link.card' () {
        console.log(this._id);
        $("#this._id")
            .modal('show')
        ;
    },
    'click .red.right.corner.label' ()
    {
        Tables.update(this._id,{
            $set: { table_status : TableStatus.CLEAN}
        });
    },
});

Template.floorplan.helpers({
    tables()
    {
        return Table.find({});
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