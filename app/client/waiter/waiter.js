// written by: Prabhjot Singh
// tested by: Dylan Herman
// debugged by: Raj Patel
// assisted by: Mit Patel
import { ReactiveVar } from 'meteor/reactive-var';

import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { Order, Orders, orderItem } from '../../imports/api/order.js';
import { Bill, billItem, Bills } from '../../imports/api/billsJS.js';
import { Tables,Table, TableStatus,TableType, TableManager } from '../../imports/api/table.js';



let selectedTable = 0;
let totalCost;
let itemQueue = [];
let orderArray = [];
let rvOrderArray = new ReactiveVar([]);
let topDrinksArray = [];
let rvtopDrinksArray = new ReactiveVar([]);
let topAppsArray = [];
let rvtopAppsArray = new ReactiveVar([]);
let topEntreesArray = [];
let rvtopEntreesArray = new ReactiveVar([]);
let topDessertsArray = [];
let rvtopDessertsArray = new ReactiveVar([]);


/**
 * @function createOrderItem
 * @summary Creates an order item with the following parameters
 * @param mItemID
 * @param mPriority
 * @param mMenuItemID
 * @param mSpecialRequests
 */
function createOrderItem(mItemID, mPriority, mMenuItemID, mSpecialRequests) {
    return new orderItem({
        "itemID": mItemID,
        "priority": mPriority,
        "menuItemID": mMenuItemID,
        "specialRequests": mSpecialRequests,
		"actualCookTime": MenuItem.findOne({itemID: mMenuItemID}).cookTime,
		"isCompleted": false
    });
};
/**
 * @function createBillItem
 * @summary Creates an a bill item with the following parameters
 * @param mBillItemName
 * @param mBillItemPrice
 */
function createBillItem(mBillItemName, mBillItemPrice) {
    return new billItem({
        "billItemName": mBillItemName,
        "billItemPrice": mBillItemPrice
    });
};
/**
 * @function setTableID
 * @summary sets the tableID to the selected table
 * @param tableID
 */
function setTableID(tableID) {
    selectedTable = tableID;
    console.log(selectedTable);
};

Template.table.events({
    /**
     * @function click .tableID
     * @summary Adds a red dashed border around the selected table and calls setTableID
     */
    'click .tableID' () {
        $("#"+this.table_id).toggleClass("selectedTable");
        var tableID = this.table_id;
        setTableID(tableID);
    },

});

Template.waiter.events({
    /**
     * @function click .Appetizers
     * @summary Displays the appetizers menu and hides the rest along with the sidebar
     */
    'click .Appetizers' () {
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("appMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        document.getElementById("printBill").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },
    /**
     * @function click .Entrees
     * @summary Displays the entrees menu and hides the rest along with the sidebar
     */
    'click .Entrees' () {
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayAll";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        document.getElementById("printBill").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },
    /**
     * @function click .FloorPlan
     * @summary Displays the floor plan and hides the rest along with the sidebar
     */
    'click .FloorPlan' () {
        document.getElementById("floorPlan").className = "displayAll";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        document.getElementById("printBill").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
    },
    /**
     * @function click .Desserts
     * @summary Displays the desserts menu and hides the rest along with the sidebar
     */
    'click .Desserts' () {
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayAll";
        document.getElementById("placeOrderMenu").className = "displayNone";
        document.getElementById("printBill").className = "displayNone";
        $('.menu-active').removeClass('menu-active');



    },
    /**
     * @function click .placeOrder
     * @summary Displays the place order tab and hides the rest along with the sidebar
     */
    'click .placeOrder' () {
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayAll";
        document.getElementById("printBill").className = "displayNone";
        $('.menu-active').removeClass('menu-active');
		Template.waiter.__helpers.get('selected')();
    },
    /**
     * @function click #placeOrder
     * @summary Takes all the Order items created by orderArray and fills in the rest of the fields of the order and places the order into the order collection
     */
    'click #placeOrder' () {
		var mOrderID = 1;
		if (!Order.find().count() == 0) { mOrderID = Order.findOne({}, { sort: {orderID: -1}}).orderID + 1; }
        new Order({
            orderID: mOrderID,
            tableID: selectedTable,
            waiterID: 69,
            orderItems: orderArray,
            timePlaced: new Date(),
			isCompleted: false
        }).placeOrder();
        orderArray = [];
		rvOrderArray.set(orderArray);
        totalCost = 0;
        let custID = Orders.findOne({tableID: selectedTable},{sort: {timePlaced: -1}});
        let billItems = Orders.findOne({tableID: selectedTable},{sort: {timePlaced: -1}}).orderItems;
        billItems.forEach(function(element) {
            let menuItem = MenuItems.findOne({ itemID: element.menuItemID });
            let billItem = createBillItem(menuItem.itemName, menuItem.itemPrice);
            itemQueue.push(billItem);
        });
        b = new Bill({
            "billItems": itemQueue,
            "billTimeCreated": new Date(),
            "billTable": selectedTable,
            "billPaid": false,
        });
        b.generateReceipt();
        rvOrderArray.set(orderArray);
    },
    /**
     * @function click #cancelOrder
     * @summary Drops all the selected items for the order
     */
    'click #cancelOrder' () {
        orderArray = [];
		rvOrderArray.set(orderArray);
    },
    /**
     * @function click .drinkicon
     * @summary Opens the drinks modal showcasing all the menu items classified as drinks
     */
    'click .drinkicon' () {
        $('#drinksModal')
            .modal('show')
        ;
    },
    /**
     * @function click .payBill
     * @summary Displays the bill for the table and hides the rest along with the sidebar
     */
    'click .payBill' () {
        document.getElementById("floorPlan").className = "displayNone";
        document.getElementById("entreeMenu").className = "displayNone";
        document.getElementById("appMenu").className = "displayNone";
        document.getElementById("dessertsMenu").className = "displayNone";
        document.getElementById("placeOrderMenu").className = "displayNone";
        document.getElementById("printBill").className = "displayAll";
        $('.menu-active').removeClass('menu-active');


    },
    /**
     * @function click #payButton
     * @summary Marks the bill as paid and sets the respective table to dirty
     */
    'click #payButton' () {
        $(".receipt").slideUp("slow");
        $(".paid").slideDown("slow");
        let PaidBill = Bill.findOne({},{sort:{billTimeCreated : -1}});
        PaidBill.payBill();
        var table = Table.findOne({ table_id: selectedTable });
        table.updateTableStatus(TableStatus.DIRTY);
    }

});

Template.menuCards.events({
    /**
     * @function click #addItem
     * @summary Creates the order item for the selected item and pushes the order back into the orderArray
     */
    'click #addItem'() {
        orderArray.push(createOrderItem(orderArray.length + 1, 2, this.itemID, "NONE"));
		rvOrderArray.set(orderArray);
    },
});

Template.selectedCards.events({
    /**
     * @function click #removeItem
     * @summary Removes the respective item from the orderArray so it is not placed in the final order
     */
    'click #removeItem' (){
        for (i = 0; i < orderArray.length; i++)
        {
			if (i == 0) {
				orderArray.shift();
				break;
			}
            if (orderArray[i].itemID == this.itemID) {
                orderArray.splice(i, 1);
                break;
            }
        }
		/** Update the itemIDs to fill in any potential gaps **/
		for (i = 0; i < orderArray.length; i++)
        {
			orderArray[i].itemID = i + 1;
        }
		rvOrderArray.set(orderArray);
    },

});

Template.waiter.helpers({
    /**
     * @function drinks
     * @summary returns all the objects from the database with the mealType of Enum 0, drinks.
     */
    drinks() {
        return MenuItems.find({mealType: 0});
    },
    /**
     * @function apps
     * @summary returns all the objects from the database with the mealType of Enum 1, appetizers.
     */
    apps() {
        return MenuItems.find({mealType: 1});
    },
    /**
     * @function entrees
     * @summary returns all the objects from the database with the mealType of Enum 2, entrees.
     */
    entrees() {
        return MenuItems.find({mealType: 2});
    },
    /**
     * @function desserts
     * @summary returns all the objects from the database with the mealType of Enum 3, desserts.
     */
    desserts() {
        return MenuItems.find({mealType: 3});

    },
    /**
     * @function selected
     * @summary returns all the objects from the orderArray reactive variable
     */
    selected() {
        return(rvOrderArray.get());
    },
    /**
     * @function orderList
     * @summary returns all the objects that are part of this table's bill
     */
    orderList() {
        //console.log(rvItemQueue.get());
        return Bills.findOne({},{sort:{billTimeCreated : -1}}).billItems;
    },
    /**
     * @function getTotalCost
     * @summary calculates and returns the total cost of all items on the bill to display.
     * @returns {number}
     */
    getTotalCost() {
        let totalCost = 0;
        let itemPrice = Bills.findOne({}, {sort: {billTimeCreated: -1}}).billItems
        itemPrice.forEach(function(element) {
            totalCost += element.billItemPrice;
        })
        if(totalCost < 10)
        {
            totalCost = totalCost.toPrecision(3);
        }
        else if(totalCost > 10 && totalCost < 100)
        {
            totalCost = totalCost.toPrecision(4);
        }
        else if(totalCost > 100)
        {
            totalCost = totalCost.toPrecision(5);
        }
        return totalCost;

    },
    /**
     * @function Date
     * @summary Gets the date of the current bill and returns it in a proper format
     */
    Date () {
        var date = Bills.findOne({},{sort:{billTimeCreated : -1}}).billTimeCreated;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var minute = date.getMinutes();
        var hour = date.getHours();
        date = (hour + ":" + minute + " " + month + "/" + day + "/" + year);
        return date;
    },
    /**
     * @function barcode
     * @summary Returns the unique ID of each bill to display
     */
    barcode () {
        return Bills.findOne({},{sort:{billTimeCreated : -1}})._id;
    },
    /** @function fifteenPercent
     * @summary Returns 15% of the total cost to suggest as a tip
     * @returns {number}
     */
    fifteenPercent () {
        let totalCost = 0;
        let itemPrice = Bills.findOne({}, {sort: {billTimeCreated: -1}}).billItems
        itemPrice.forEach(function(element) {
            totalCost += element.billItemPrice;
        })
        totalCost = 0.15*totalCost;
        if(totalCost < 10)
        {
            totalCost = totalCost.toPrecision(3);
        }
        else if(totalCost > 10 && totalCost < 100)
        {
            totalCost = totalCost.toPrecision(4);
        }
        else if(totalCost > 100)
        {
            totalCost = totalCost.toPrecision(5);
        }
        return totalCost;
    },
    /** @function eighteenPercent
     * @summary Returns 18% of the total cost to suggest as a tip
     * @returns {number}
     */
    eighteenPercent() {
        let totalCost = 0;
        let itemPrice = Bills.findOne({}, {sort: {billTimeCreated: -1}}).billItems;
        itemPrice.forEach(function(element) {
            totalCost += element.billItemPrice;
        })
        totalCost = 0.18*totalCost;
        if(totalCost < 10)
        {
            totalCost = totalCost.toPrecision(3);
        }
        else if(totalCost > 10 && totalCost < 100)
        {
            totalCost = totalCost.toPrecision(4);
        }
        else if(totalCost > 100)
        {
            totalCost = totalCost.toPrecision(5);
        }
        return totalCost;
    },
    /** @function twentyPercent
     * @summary Returns 20% of the total cost to suggest as a tip
     * @returns {number}
     */
    twentyPercent() {
        let totalCost = 0;
        let itemPrice = Bills.findOne({}, {sort: {billTimeCreated: -1}}).billItems
        itemPrice.forEach(function (element) {
            totalCost += element.billItemPrice;
        })
        totalCost = 0.20 * totalCost;
        if (totalCost < 10) {
            totalCost = totalCost.toPrecision(3);
        }
        else if (totalCost > 10 && totalCost < 100) {
            totalCost = totalCost.toPrecision(4);
        }
        else if (totalCost > 100) {
            totalCost = totalCost.toPrecision(5);
        }
        return totalCost;
    },
    /**
     * @function topThreeDrinks
     * @summary Returns the top three drinks, Appetizers, Entrees and Desserts in the menu
     */
    topThreeDrinks() {

        let i = 0;
        MenuItems.find({mealType: 0}, {sort: {timesOrdered: -1}}).forEach(function (element) {
            if (i < 3) {
                topDrinksArray[i] = element.itemID;
                i++;
            }
        });
        rvtopDrinksArray.set(topDrinksArray);
        i = 0;
        MenuItems.find({mealType: 1}, {sort: {timesOrdered: -1}}).forEach(function (element) {
            if (i < 3) {
                topAppsArray[i] = element.itemID;
                i++;
            }

        });
        rvtopAppsArray.set(topAppsArray);
        i = 0;
        MenuItems.find({mealType: 2}, {sort: {timesOrdered: -1}}).forEach(function (element) {
            if (i < 3) {
                topEntreesArray[i] = element.itemID;
                i++;
            }

        });
        rvtopEntreesArray.set(topEntreesArray);
        i = 0;
        MenuItems.find({mealType: 3}, {sort: {timesOrdered: -1}}).forEach(function (element) {
            if (i < 3) {
                topDessertsArray[i] = element.itemID;
                i++;
            }
        });
        rvtopDessertsArray.set(topDessertsArray);
    }
});

Template.selectedCards.helpers({
    /**
     * @function itemName
     * @summary returns the name of the menu item for the given order
     * @param order
     */
	itemName(order) {
		let menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemName;
	},
    /**
     * @function itemPrice
     * @summary returns the price of the menu item for the given order
     * @param order
     */
	itemPrice(order) {
		let menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemPrice;
	},
    /**
     * @function itemDescription
     * @summary returns the description of the menu item for the given order
     * @param order
     */
	itemDescription(order) {
		let menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemDescription;
	},
    /**
     * @function cookTime
     * @summary returns the cookTime for the given order
     * @param order
     */
	cookTime(order) {
		let menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.cookTime;
	}
});

Template.menuCards.helpers({
    /**
     * @function isTopOne
     * @summary Returns true if the item is first on the top list
     * @returns {boolean}
     */
    'isTopOne': function () {
        topDrinksArray = rvtopDrinksArray.get();
        topAppsArray = rvtopAppsArray.get();
        topEntreesArray = rvtopEntreesArray.get();
        topDessertsArray = rvtopDessertsArray.get();
        if (this.itemID == topDrinksArray[0] || this.itemID == topAppsArray[0] || this.itemID == topEntreesArray[0] || this.itemID == topDessertsArray[0])
        {
            return true;
        }
    },
    /**
     * @function isTopTwo
     * @summary Returns true if the item is second on the top list
     * @returns {boolean}
     */
    'isTopTwo': function() {
        topDrinksArray = rvtopDrinksArray.get();
        topAppsArray = rvtopAppsArray.get();
        topEntreesArray = rvtopEntreesArray.get();
        topDessertsArray = rvtopDessertsArray.get();
        if (this.itemID == topDrinksArray[1] || this.itemID == topAppsArray[1] || this.itemID == topEntreesArray[1] || this.itemID == topDessertsArray[1])
        {
            return true;
        }
    },
    /**
     * @function isTopThree
     * @summary Returns true if the item is third on the top list
     * @returns {boolean}
     */
    'isTopThree': function() {
        topDrinksArray = rvtopDrinksArray.get();
        topAppsArray = rvtopAppsArray.get();
        topEntreesArray = rvtopEntreesArray.get();
        topDessertsArray = rvtopDessertsArray.get();
        if (this.itemID == topDrinksArray[2] || this.itemID == topAppsArray[2] || this.itemID == topEntreesArray[2] || this.itemID == topDessertsArray[2])
        {
            return true;
        }
    }
});
