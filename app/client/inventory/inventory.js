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
// function createShoppingList(itemName,itemQuantity,itemPrice) {
//
// };
Template.inventoryPage.events({
    'click #inventoryPlus' () {
        $('#addIngredientModal')
            .modal('show')
        ;
    },
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
    'click #clearList' () {
        shoppingList = [];
        rvShoppingList.set(shoppingList);
        Template.inventoryPage.__helpers.get('totalCost')();
    },
    'click .small.send.icon.link' () {
        console.log("Hullo");
        for(var i = 0; i < shoppingList.length; i++) {
            var updateItem = inventoryItem.findOne({invID: shoppingList[i].id});
            updateItem.updateQuantity(shoppingList[i].quantity);
        }
        shoppingList = [];
        rvShoppingList.set(shoppingList);
        Template.inventoryPage.__helpers.get('totalCost')();
    }

})
Template.addItemModal.events({
    'click .ui.red.right.floated.button' () {
        console.log("Hello");
        // var ItemName = document.getElementById('itemName').value;
        // var ItemQuantity = document.getElementById('itemQuantity').value;
        // var ItemPrice = document.getElementById('itemPrice').value;
        // var ItemPerUnit = document.getElementById('itemPerUnit').value;
        // var ItemUnits = document.getElementById("itemUnits").innerHTML;
        // var ItemThreshold = document.getElementById('itemThreshold').value;
        // new inventoryItem({
        //     invID: inventoryItem.findOne({}, { sort: {invID: -1}}).invID + 1,
        //     invName: ItemName,
        //     invQuantity: ItemQuantity,
        //     invPrice: ItemPrice,
        //     invPerUnit: ItemPerUnit,
        //     invUnits: ItemUnits,
        //     invThreshold: ItemThreshold,
        // }).addItem();
    }
})


/* Inventory.js */

Template.inventoryPage.helpers({
    ingredients() {
        //console.log(inventoryItems.find({invThreshold: {$gt: 'invQuantity'}}));
        return inventoryItems.find({});
    },
    shoppingArray() {
        //console.log(rvShoppingList.get());
        return (rvShoppingList.get());
    },
    totalCost() {
        totalCost = 0.00;
        for(var i =0; i < shoppingList.length; i++) {
            totalCost+= shoppingList[i].price
        }
        if(totalCost < 10 ) {
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
    belowThreshold() {
        if(this.invQuantity < this.invThreshold)
        {
            return true;
        }
    },
    decimalPrice () {
        var price = this.invPrice;
        if(this.invPrice < 10)
        {
            price = price.toPrecision(3);
        }
        else if(this.invPrice > 10 && this.price < 100)
        {
            price = price.toPrecision(4);
        }
        return price;
    }
})

Template.shoppingRow.helpers({
    decimalPrice () {
        var price = this.price;
        if(this.price < 10)
        {
            price = price.toPrecision(3);
        }
        else if(this.price > 10 && this.price < 100)
        {
            price = price.toPrecision(4);
        }
        else if(this.price > 100)
        {
            price = price.toPrecision(5);
        }
        return price;
    }
})

