import { MenuItems } from '../../imports/api/menuItem.js';
import { Order, Orders, orderItem } from '../../imports/api/order.js';

var orderArray = [];

var mItemID =1;

function createOrderItem(mItemID, mPriority, mMenuItemID, mSpecialRequests) {
    return new orderItem({
        "itemID": mItemID,
        "priority": mPriority,
        "menuItemID": mMenuItemID,
        "specialRequests": mSpecialRequests
    });
};

Template.waiter.events({
    'click .Appetizers' () {
        console.log("test");
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("appMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },
    'click .Entrees' () {
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone"
        $('.menu-active').removeClass('menu-active');
    },

    'click .FloorPlan' () {
        document.getElementById("floorPlan").className = "displayAll";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },

    'click .Desserts' () {
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayAll";
        document.getElementById("placeOrderMenu").className = "displayNone";
        $('.menu-active').removeClass('menu-active');

    },
    'click .placeOrder' () {
        console.log("test111");
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayAll";
        $('.menu-active').removeClass('menu-active');

    },
    'click .drinkicon' () {
        console.log("hello")
        $('.ui.modal')
            .modal('show')
        ;
    },
    'click .ui.bottom.attached.button' ()
    {
        orderArray.push(createOrderItem(mItemID, 2, this.itemID, "NONE"));
        console.log(orderArray);
    },

});

Template.drinksCards.events({
    'click .ui.bottom.attached.button' ()
    {

    },
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

