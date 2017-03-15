import '../../imports/api/table.js';
import { Tables,Table, TableStatus } from '../../imports/api/table.js';

Template.table.events({
    'click .icon.link' () {
        console.log(event.currentTarget.id);
        $('.ui.modal')
            .modal('show')
        ;

    },
    'click .set_taken' () {
    	Tables.update(this._id,{
		$set: { table_status : TableStatus.TAKEN},
	});
    
    }
});

Template.floorplan.helpers({
    tables()
    {
        return Table.find({});
    },
});
