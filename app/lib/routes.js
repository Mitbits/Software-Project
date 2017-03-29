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
FlowRouter.route('/Reserve', {
    action: function() {
        BlazeLayout.render("reservationPage");
    }
});
FlowRouter.route('/Success', {
    action: function() {
        BlazeLayout.render("reservationSuccess");
    }
});
FlowRouter.route('/orderqueue', {
    action: function() {
        BlazeLayout.render("orderQueue");
    }
});
FlowRouter.route('/manager', {
    action: function() {
        BlazeLayout.render("manager");
    }
});
FlowRouter.route('/waiter', {
    action: function() {
        BlazeLayout.render("waiter");
    }
});

