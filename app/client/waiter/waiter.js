
import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';

import { Order, Orders, orderItem } from '../../imports/api/order.js';

var orderArray = [];
var itemArray = [];

var mItemID = 1;

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
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayAll";
        $('.menu-active').removeClass('menu-active');

        for (i = 0; i < orderArray.length; i++) {
            itemArray.push(MenuItems.findOne({ itemID: orderArray[i].itemID }));
            console.log(MenuItems.findOne({ itemID: orderArray[i].itemID }).itemName);
        }
        Template.waiter.__helpers.get('selected')();

        // Create new order with orderID as the highest orderID in collection + 1
        new Order({
            orderID: Order.findOne({}, { sort: {orderID: -1}}) + 1,
            waiterID: 69,
            orderItems: orderArray,
            timePlaced: new Date()
        }).placeOrder();

		orderArray = [];
    },
    'click .drinkicon' () {
        console.log("hello")
        $('.ui.modal')
            .modal('show')
        ;
    },
});

Template.menuCards.events({
    'click .ui.bottom.attached.button'() {
        orderArray.push(createOrderItem(mItemID, 2, this.itemID, "NONE"));
        console.log(orderArray);
    },

});



Template.waiter.helpers({
    drinks() {
        return MenuItems.find({mealType: 0});
    },
	apps() {
        return MenuItems.find({mealType: 1});
    },
    entrees() {
        return MenuItems.find({mealType: 2});
    },
    desserts() {
        return MenuItems.find({mealType: 3});

    },
    selected: function() {
        return _.map(Object, function(itemID, itemName, itemDescription, mealType, itemPrice, cookTime){
            return {
                itemid: itemID,
                name : itemName,
                desc: itemDescription,
                type: mealType,
                price: itemPrice,
                timeCook: cookTime,
            }
        })

    },
});



/*
		for (i = 0; i < orderArray.length; i++) {
			itemArray.push(MenuItems.findOne({ itemID: orderArray[i].itemID }));
			console.log(MenuItems.findOne({ itemID: orderArray[i].itemID }));
		}
		return itemArray;
*/