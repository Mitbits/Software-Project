/*
 Slidemenu
 */
Template.waiter.events({
    'click .Appetizers' () {
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayAll";
    },
    'click .Entrees' () {
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayAll";

    },
});