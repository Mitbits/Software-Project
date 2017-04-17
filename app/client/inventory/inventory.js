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
        //console.log(rvShoppingList);
        //var html = document.getElementById("shoppingTbl").innerHTML;
        //     console.log(shoppingList[i].id);
        //     html+="<tr id='"+shoppingList[i].id+"'>";
        //     html+="<td><i class='remove icon link'></i></td>";
        //     html+="<td>"+shoppingList[i].name+"</td>";
        //     html+="<td class='center'> <div class='ui transparent mini input' id='miniInput'> <input type='text' value='"+shoppingList[i].quantity+"'></div> </td>";
        //     html+="<td class='center'>$ "+shoppingList[i].price+"</td>";
        //     html+="</tr>";
       // totalCost+= shoppingList[i].price;
       // i++;
        //var tC = totalCost.toPrecision(4);
       // document.getElementById("totalCost").innerHTML = "$ " + tC;
        Template.inventoryPage.__helpers.get('totalCost')();
        //console.log(shoppingList);
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
})



/* Inventory.js */

Template.inventoryPage.helpers({
    ingredients() {
        console.log(inventoryItems.find({}));
        return inventoryItems.find({});
    },
    shoppingArray() {
        //console.log(rvShoppingList.get());
        return (rvShoppingList.get());
    },
    totalCost() {
        totalCost = 0.00;
        for(var i =0; i < shoppingList.length; i++)
        {
            totalCost+= shoppingList[i].price
        }
        var tC = totalCost.toPrecision(4);
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
    }
})

