import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { Order, Orders, orderItem } from '../../imports/api/order.js';
import { selectedItem,selectedItems } from '../../imports/api/selectedItems.js';

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
        Template.menuCards.__helpers.get('cards')();

    },
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
    'click #cancelOrder' () {
        new selectedItem().removeCollection();
        itemArray = [];
        orderArray = [];
    },
    'click .drinkicon' () {
        $('.ui.modal')
            .modal('show')
        ;
    },

});

Template.menuCards.events({
    'click #addItem'() {
        orderArray.push(createOrderItem(mItemID, 2, this.itemID, "NONE"));
        //console.log(orderArray);
    },
});
Template.selectedCards.events({
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
        //console.log(MenuItems.find({mealType: 3}));
        return MenuItems.find({mealType: 3});

    },
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