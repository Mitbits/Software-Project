import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

/**
 * @summary A simple router for Meteor and routes the pages based on the link entered in the BlazeLayout render.
 * @function FlowRouter.route
 * @param / - BlazeLayout.render("loginPage")
 * @param /floorplan -  BlazeLayout.render("floorplan")
 * @param /Reserve - BlazeLayout.render("reservationPage");
 * @param /Success - BlazeLayout.render("reservationSuccess");
 * @param /orderqueue - BlazeLayout.render("orderQueue");
 * @param /manager - BlazeLayout.render("manager");
 * @param /waiter - BlazeLayout.render("waiter");
 *
 */
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

