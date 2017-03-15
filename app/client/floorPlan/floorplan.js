Template.table.events({
    'click .icon.link' () {
        console.log(event.currentTarget.id);
        $('.ui.modal')
            .modal('show')
        ;

    }
})