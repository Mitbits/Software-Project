import { MenuItems } from '../../imports/api/menuItem.js';
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
		
		var lastOrder = Orders.find({},{limit: 1, sort: {orderID: -1}});
		var lastOrder2 = Order.find({},{limit: 1, sort: {orderID: -1}});
		
		console.log(lastOrder[0]);
		console.log(lastOrder2[0]);
		
		new Order({
			orderID: lastOrder.orderID + 1,
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
});



/*
		for (i = 0; i < orderArray.length; i++) {
			itemArray.push(MenuItems.findOne({ itemID: orderArray[i].itemID }));
			console.log(MenuItems.findOne({ itemID: orderArray[i].itemID }));
		}
		return itemArray;
*/