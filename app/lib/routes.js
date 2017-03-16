import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("loginPage");
    }
});
FlowRouter.route('/floorplan', {
    action: function() {
        BlazeLayout.render("floorplan");
    }
});

FlowRouter.route('/orderqueue', {
    action: function() {
        BlazeLayout.render("orderQueue");
    }
});