// Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
// Project Website: https://github.com/Mitbits/Software-Project
import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { inventoryItems, inventoryItem} from '../../imports/api/ingredient.js';
import { ReactiveVar } from 'meteor/reactive-var';


var shoppingList = [];
var rvShoppingList = new ReactiveVar([]);
var inventoryItem1;
var i = 0;
var k = 0;
var totalCost = 0.00;
var rvtotalCost = new ReactiveVar();

Template.inventoryPage.events({
    /**
     * @function #buyMore
     * @summary clicking the button in the inventory box adds it to the shopping list
     */
    'click #buyMore' () {
        inventoryItem1 = {
            id: this.invID,
            name: this.invName,
            quantity: this.invPerUnit,
            units: this.invUnits,
            price: this.invPrice,
        };
       // inventoryItem1.price = (inventoryItem1.price).toPrecision(4);
        //console.log(inventoryItem1.price);
        var toAdd = true;
        for(var i = 0; i < shoppingList.length; i++)
        {
            //console.log(shoppingList[i].id+ " " + this.invID);
            if(shoppingList[i].id == this.invID) {
                shoppingList[i].quantity += this.invPerUnit;
                shoppingList[i].price += this.invPrice;
                if(shoppingList[i].price > 100) {
                    var num = (shoppingList[i].price).toPrecision(5);
                }
                else {
                    var num = (shoppingList[i].price).toPrecision(4);
                }

                shoppingList[i].price = parseFloat(num);
                rvShoppingList.set(shoppingList);
                toAdd = false;
            }
        }
        if(toAdd)
        {
            shoppingList.push(inventoryItem1);
            rvShoppingList.set(shoppingList);
        }
        Template.inventoryPage.__helpers.get('totalCost')();
    },
    /**
     * @function click .remove.icon.link
     * @summary Removes the selected item from the shopping list
     */
    'click .remove.icon.link' () {
        for (i = 0; i < shoppingList.length; i++)
        {
            if (shoppingList[i].id == this.id) {
                shoppingList.splice(i, 1);
                break;
            }
        }
        rvShoppingList.set(shoppingList);
        Template.inventoryPage.__helpers.get('totalCost')();

    },
    /**
     * @function click #clearList
     * @summary Clears the shopping list
     */
    'click #clearList' () {
        shoppingList = [];
        rvShoppingList.set(shoppingList);
        Template.inventoryPage.__helpers.get('totalCost')();
    },
    /**
     * @function click .small.send.icon.link
     * @summary Sends the order, which automatically updates the inventory
     */
    'click .small.send.icon.link' () {
        console.log("Hullo");
        for(var i = 0; i < shoppingList.length; i++) {
            var updateItem = inventoryItem.findOne({invID: shoppingList[i].id});
            updateItem.addQuantity(shoppingList[i].quantity);
        }
        shoppingList = [];
        rvShoppingList.set(shoppingList);
        Template.inventoryPage.__helpers.get('totalCost')();
    }

})


/* Inventory.js */

Template.inventoryPage.helpers({
    /**
     * @function ingredients
     * @summary Returns the ingredients in the order of most frequently used
     */
    ingredients() {
        //console.log(inventoryItems.find({invThreshold: {$gt: 'invQuantity'}}));
        return inventoryItems.find({},{sort: {invTimesUsed: -1}});
    },
    /**
     * @function shoppingArray
     * @summary Returns all the items in the shopping list
     */
    shoppingArray() {
        //console.log(rvShoppingList.get());
        return (rvShoppingList.get());
    },
    /**
     * @function totalCost
     * @summary Returns the total cost of all items in the shopping list
     */
    totalCost() {
        totalCost = 0.00;
        for(var i =0; i < shoppingList.length; i++) {
            totalCost+= shoppingList[i].price
        }
        if(totalCost < 0 ){
            var tC = totalCost.toPrecision(2);
        }
        else if(totalCost < 10 && totalCost > 0 ) {
            var tC = totalCost.toPrecision(3);
        }
        else if(totalCost > 10 && totalCost < 100) {
            var tC = totalCost.toPrecision(4);
        }
        else if(totalCost > 100) {
            var tC = totalCost.toPrecision(5);
        }
        else if(totalCost > 1000) {
            var tC = totalCost.toPrecision(6);
        }
        rvtotalCost.set(tC);
        return (rvtotalCost.get());
    }
})
Template.ingredientRow.helpers({
    /**
     * @function belowThreshold
     * @summary Checks if the item is below the threshold
     * @returns {boolean}
     */
    belowThreshold() {
        if(this.invQuantity < this.invThreshold)
        {
            return true;
        }
    },
    /**
     * @function decimalPrice
     * @summary Converts the price to proper decimal places and returns the value
     */
    decimalPrice () {
        var price = this.invPrice;
        if(price < 0 ){
            price = price.toPrecision(2);
        }
        else if(price  < 10 && price  > 0) {
            price = price.toPrecision(3);
        }
        else if(price  > 10 && price  < 100) {
            price = price.toPrecision(4);
        }
        return price;
    },
    /**
     * @function precisionQuantity
     * @summary Converts the quantity of an item to propmer decimal places and returns the value
     */
    precisionQuantity () {
        var pQuantity = this.invQuantity;
        if(pQuantity < 10){
            pQuantity = pQuantity.toPrecision(3);
        }
        else if(pQuantity > 10 && pQuantity < 100) {
            pQuantity = pQuantity.toPrecision(4);
        }
        else if(pQuantity > 100 && pQuantity < 1000){
            pQuantity = pQuantity.toPrecision(5);
        }
        else if(pQuantity > 1000) {
            pQuantity = pQuantity.toPrecision(6);
        }
        return pQuantity;
    }
})

Template.shoppingRow.helpers({
    /**
     * @function decimalPrice
     * @summary Converts the price to proper decimal places and returns the value
     */
    decimalPrice () {
        var price = this.price;
        if(price < 0 ) {
            price = price.toPrecision(2);
        }
        else if(price < 10 && price > 0) {
            price = price.toPrecision(3);
        }
        else if(price > 10 && price < 100) {
            price = price.toPrecision(4);
        }
        else if(price > 100) {
            price = price.toPrecision(5);
        }
        return price;
    }

})

