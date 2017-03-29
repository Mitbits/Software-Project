import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { Order, Orders, orderItem } from '../../imports/api/order.js';
import { selectedItem,selectedItems } from '../../imports/api/selectedItems.js';

var orderArray = [];
var itemArray = [];

var mItemID = 1;
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
        "specialRequests": mSpecialRequests
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
        Template.menuCards.__helpers.get('cards')();

    },
    /**
     * @function click #placeOrder
     * @summary Takes all the Order items created by orderArray and fills in the rest of the fields of the order and places the order into the order collection
     */
    'click #placeOrder' () {
        new Order({
            orderID: Order.findOne({}, { sort: {orderID: -1}}).orderID + 1,
            waiterID: 69,
            orderItems: orderArray,
            timePlaced: new Date()
        }).placeOrder();
        new selectedItem().removeCollection();
        orderArray = [];
        itemArray = [];
    },
    /**
     * @function click #cancelOrder
     * @summary Drops all the selected items for the order
     */
    'click #cancelOrder' () {
        new selectedItem().removeCollection();
        itemArray = [];
        orderArray = [];
    },
    /**
     * @function click .drinkicon
     * @summary Opens the drinks modal showcasing all the menu items classified as drinks
     */
    'click .drinkicon' () {
        $('.ui.modal')
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
        orderArray.push(createOrderItem(mItemID, 2, this.itemID, "NONE"));
        //console.log(orderArray);
    },
});
Template.selectedCards.events({
    /**
     * @function click #removeItem
     * @summary Removes the respective item from the orderArray so it is not placed in the final order
     */
    'click #removeItem' (){
        new selectedItem().removeItem(this._id);
        for (i = 0; i < orderArray.length; i++)
        {
            if(orderArray[i].menuItemID == this.itemID) {
                orderArray.splice(i,1);
                break;
            }
        }
        console.log(orderArray);
    },

})

Template.menuCards.helpers({
    /**
     * @function cards
     * @summary Loops through the order array and adds the selected items to allow the application to display the data
     */
    cards() {
        for (i = 0; i < orderArray.length; i++) {
            itemArray.push(MenuItems.findOne({itemID: orderArray[i].menuItemID}));
            //console.log(MenuItems.findOne({ itemID: orderArray[i].menuItemID }));
            var item = MenuItems.findOne({itemID: orderArray[i].menuItemID});
            console.log("item" + item);
            new selectedItem({
                itemID: item.itemID,
                itemName: item.itemName,
                itemDescription: item.itemDescription,
                mealType: item.mealType,
                itemPrice: item.itemPrice,
                cookTime: item.cookTime,
            }).saveItem();
        }
    }
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
        //console.log(MenuItems.find({mealType: 3}));
        return MenuItems.find({mealType: 3});

    },
    /**
     * @function selected
     * @summary returns all the objects from the selectedItems collection
     */
    selected() {
        return(selectedItems.find({}));
    },
});



/*
 for (i = 0; i < orderArray.length; i++) {
 itemArray.push(MenuItems.findOne({ itemID: orderArray[i].itemID }));
 console.log(MenuItems.findOne({ itemID: orderArray[i].itemID }));
 }
 return itemArray;
 */