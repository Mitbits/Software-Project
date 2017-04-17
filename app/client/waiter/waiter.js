import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { Order, Orders, orderItem } from '../../imports/api/order.js';
import { ReactiveVar } from 'meteor/reactive-var'

var orderArray = []
var rvOrderArray = new ReactiveVar([]);

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
		"actualCookTime": 0,
		"isCompleted": false
    });
};

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
        document.getElementById("placeOrderMenu").className = "displayNone"
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
            waiterID: 69,
            orderItems: orderArray,
            timePlaced: new Date(),
			isCompleted: false
        }).placeOrder();
        orderArray = [];
		rvOrderArray = ([]);
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
            if (orderArray[i].itemID == this.itemID) {
                orderArray.splice(i, 1);
                break;
            }
        }
		/** Update the itemIDs to fill in any potential gaps **/
		for (i = 0; i < orderArray.length; i++)
        {
			orderArray[i].itemID = i + 1;
			rvOrderArray.set(orderArray);
        }
    },

})

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
     * @summary returns all the objects from the selectedItems collection
     */
    selected() {
        return(rvOrderArray.get());
    },
});

Template.selectedCards.helpers({
	itemName(order) {
		var menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemName;
	},
	itemPrice(order) {
		var menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemPrice;
	},
	itemDescription(order) {
		var menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.itemDescription;
	},
	cookTime(order) {
		var menuItem = MenuItems.findOne({itemID: order.menuItemID});
		return menuItem.cookTime;
	}
})