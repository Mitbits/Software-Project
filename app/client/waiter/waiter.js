import { MenuItems } from '../../imports/api/menuItem.js';

Template.waiter.events({
    'click .Appetizers' () {
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("appMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },
    'click .Entrees' () {
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },

    'click .FloorPlan' () {
        document.getElementById("floorPlan").className = "displayAll";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },

    'click .Desserts' () {
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayAll";
        $('.menu-active').removeClass('menu-active');

    },
    'click .drinkicon' () {
        console.log("hello")
        $('.ui.modal')
            .modal('show')
        ;
    }
});

Template.drinksCards.events({
    'click .ui.fluid.card'()
    {
        $('.ui.fluid.card').toggleClass("ui fluid card").toggleClass("ui blue fluid card");
    }

});

Template.waiter.helpers({
    drinks()
    {
        return MenuItems.find({mealType: 0});
    },
    apps()
    {
        return MenuItems.find({mealType: 1});
    },
    entrees()
    {
        return MenuItems.find({mealType: 2});
    },
    desserts()
    {
        return MenuItems.find({mealType: 3});
    },

});