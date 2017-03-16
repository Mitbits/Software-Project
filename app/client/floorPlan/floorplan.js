import '../../imports/api/table.js';
import { Table } from '../../imports/api/table.js';

Template.table.events({
    'click .icon.link' () {
        console.log(event.currentTarget.id);
        $('.ui.modal')
            .modal('show')
        ;

    }
})
Template.floorplan.helpers({
    tables()
    {
        return Table.find({});
    },
});